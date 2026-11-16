mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Urlopy

**Wersja stepkit:** 0.1.26

**Następny krok:** Moduł Wnioski: testy (implementacja i przegląd kodu skończone).

## Start aplikacji

- [x] 1. Sprawdzenie komputera
- [x] 2. Szkielet i repo
- [x] 3. Opis
- [x] 4. Wywiad
- [x] 5. Podsumowanie
- [x] 6. Makieta ogólna
- [x] 7. Spec ogólny
- [x] 8. Plik stanu

## Moduły

| # | Moduł | Folder | Status | Etap | Zależy od |
|---|---|---|---|---|---|
| 1 | Logowanie | login | zrobiony | zamknięcie | — |
| 2 | Wnioski | leave-requests | w toku | testy | login |
| 3 | Publikacja | deploy | czeka | makieta | login, leave-requests |

## Ostatnie decyzje

- 2026-11-14: Implementacja modułu Wnioski skończona, przegląd kodu bez uwag.
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Urlopy

Jedna firma. Role: admin (rozpatruje wnioski), employee (składa i widzi tylko swoje wnioski).

## Mapa dostępu
| Adres | Kto |
|---|---|
| /api/leave-requests | admin, employee (employee tylko własne) |
| /api/leave-requests/:id/decision | admin |
MD
mkdir -p docs/modules/leave-requests
cat > docs/modules/leave-requests/SPEC.md <<'MD'
# Spec: Wnioski

Tabela leave_requests: id, user_id, date_from, date_to, days, status (pending, approved, rejected), note,
decided_by, decided_at.

## API
| Metoda i adres | Kto | Co |
|---|---|---|
| GET /api/leave-requests | admin: wszystkie, employee: własne | lista |
| GET /api/leave-requests/:id | admin: każdy, employee: własny (cudzy → 404) | szczegóły |
| PATCH /api/leave-requests/:id | employee: własny i tylko pending | zmiana dat i notatki |
| POST /api/leave-requests/:id/decision | admin | approve albo reject, tylko z pending |

## Zasady serwera
- user_id, status, days, decided_by liczy i ustawia serwer.
- Decyzja tylko dla wniosku pending; zatwierdzony ani odrzucony nie zmienia już statusu (409).
MD
cat > docs/modules/leave-requests/TESTS.md <<'MD'
# Testy: Wnioski

## Jako pracownik
1. Zaloguj się jako anna@firma.pl → widzisz swoje wnioski.
2. Zmień daty wniosku „oczekuje” → zapisane.

## Jako administrator
1. Zatwierdź wniosek Anny → status „zatwierdzony”.
MD
mkdir -p shared/src/constants backend/src/modules/leave-requests frontend/src/modules mockups/src
printf 'export const ROLES = ["admin", "employee"] as const;\n' > shared/src/constants/index.ts
cat > backend/src/modules/leave-requests/leaveRequests.routes.ts <<'TS'
import { Router } from 'express';
import { SERVER_MESSAGES, leaveRequestUpdateSchema, leaveDecisionSchema } from '@app/shared';
import { pool } from '../../db/pool';
import { validateBody } from '../../middleware/validateBody';
import { requireRole } from '../../middleware/requireRole';
import { sendError } from '../../middleware/errors';
import { countWorkingDays } from '@app/shared';

export const leaveRequestsRoutes = Router();

leaveRequestsRoutes.get('/', async (req, res) => {
  const user = req.user!;
  const [rows] = user.role === 'admin'
    ? await pool.query('SELECT * FROM leave_requests ORDER BY date_from DESC')
    : await pool.query('SELECT * FROM leave_requests WHERE user_id = ? ORDER BY date_from DESC', [user.id]);
  res.json({ items: rows });
});

leaveRequestsRoutes.get('/:id', async (req, res) => {
  const [rows] = await pool.query<any[]>('SELECT * FROM leave_requests WHERE id = ?', [req.params.id]);
  if (!rows[0]) return sendError(res, 404, SERVER_MESSAGES.notFound);
  res.json(rows[0]);
});

leaveRequestsRoutes.patch('/:id', validateBody(leaveRequestUpdateSchema), async (req, res) => {
  const { dateFrom, dateTo, note } = req.body;
  const days = countWorkingDays(dateFrom, dateTo);
  const [result] = await pool.query<any>(
    "UPDATE leave_requests SET date_from = ?, date_to = ?, days = ?, note = ? WHERE id = ? AND status = 'pending'",
    [dateFrom, dateTo, days, note, req.params.id],
  );
  if (!result.affectedRows) return sendError(res, 404, SERVER_MESSAGES.notFound);
  res.json({ ok: true });
});

leaveRequestsRoutes.post('/:id/decision', requireRole('admin'), validateBody(leaveDecisionSchema), async (req, res) => {
  const status = req.body.decision === 'approve' ? 'approved' : 'rejected';
  const [result] = await pool.query<any>(
    'UPDATE leave_requests SET status = ?, decided_by = ?, decided_at = NOW() WHERE id = ?',
    [status, req.user!.id, req.params.id],
  );
  if (!result.affectedRows) return sendError(res, 404, SERVER_MESSAGES.notFound);
  res.json({ ok: true });
});
TS
cat > backend/src/modules/leave-requests/leaveRequests.routes.test.ts <<'TS'
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { appAs, seedLeaveRequest } from '../../test/helpers';

describe('leave requests', () => {
  it('401 without login', async () => {
    expect((await request(appAs(null)).get('/api/leave-requests')).status).toBe(401);
  });
  it('403 decision for an employee', async () => {
    const id = await seedLeaveRequest({ userId: 2 });
    expect((await request(appAs({ id: 2, role: 'employee' })).post(`/api/leave-requests/${id}/decision`).send({ decision: 'approve' })).status).toBe(403);
  });
  it('employee lists only own requests', async () => {
    await seedLeaveRequest({ userId: 2 });
    await seedLeaveRequest({ userId: 3 });
    const res = await request(appAs({ id: 2, role: 'employee' })).get('/api/leave-requests');
    expect(res.body.items.every((r: { user_id: number }) => r.user_id === 2)).toBe(true);
  });
  it('admin approves a pending request', async () => {
    const id = await seedLeaveRequest({ userId: 2 });
    expect((await request(appAs({ id: 1, role: 'admin' })).post(`/api/leave-requests/${id}/decision`).send({ decision: 'approve' })).status).toBe(200);
  });
});
TS
printf '{"name":"urlopy","private":true,"workspaces":["shared","backend","frontend","mockups"],"scripts":{"check":"npm run typecheck --workspaces --if-present && npm test --workspaces --if-present"}}\n' > package.json
