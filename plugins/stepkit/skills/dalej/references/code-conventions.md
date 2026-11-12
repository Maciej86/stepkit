# Zasady kodu aplikacji

Czytasz ten plik na etapach **spec**, **plan** i **implementacja** (oraz w kroku 7 `/stepkit:start` przy projekcie
bazy). To są reguły, nie propozycje. Stos jest stały: React + Vite + TypeScript + Mantine, Express + mysql2 +
TypeScript, zod, i18next, MySQL w Dockerze. **Nie dodawaj bibliotek spoza szablonu**, poza tymi, gdy moduł ich
wymaga: `nodemailer` (e-mail), `multer` (pliki), `cron`, `exceljs`, `winston`, `sanitize-html`.

## Struktura modułu

Jedna pozycja nawigacji = jeden moduł = jedna nazwa folderu (po angielsku, małe litery, myślniki):

| Gdzie | Co |
|---|---|
| `shared/src/schemas/<module>.ts` | schematy zod (formularze i API) |
| `shared/src/constants/<module>.ts` | statusy, limity, długości pól modułu |
| `shared/locales/pl/<module>.json` | wszystkie teksty modułu (dopisany w `shared/src/i18n.ts`) |
| `backend/migrations/NNN_<opis>.sql` | zmiany bazy |
| `backend/src/modules/<module>/<module>.routes.ts` | adresy API, `requireRole`, `validateBody` |
| `backend/src/modules/<module>/<module>.queries.ts` | zapytania SQL |
| `backend/src/modules/<module>/<module>.service.ts` | logika (gdy jest więcej niż samo zapytanie) |
| `frontend/src/modules/<module>/` | ekrany prawdziwej aplikacji |
| `mockups/src/modules/<module>/` | ekrany makiety |
| `e2e/<module>.spec.ts` | testy przeglądarkowe |
| `docs/modules/<module>/` | `QUESTIONS.md`, `SPEC.md`, `PLAN.md`, `TESTS.md` |

Nowa pozycja nawigacji: wpis w `NAVIGATION` (panel, ścieżka od `/admin`), `ACCOUNT_NAVIGATION` (konto, ścieżka od
`/account`) albo `PUBLIC_NAVIGATION` (strona); wpis w `frontend/src/core/routes/pages.ts` i
`mockups/src/screens.ts`; trasy API dopisane w `backend/src/app.ts` (`api.use('/<module>', <module>Routes)`).

## Nazwy i stałe

- **Identyfikatory po angielsku:** foldery, pliki, funkcje, zmienne, typy, tabele, kolumny, adresy URL.
  `orders/OrderList.tsx`, tabela `orders`, kolumna `created_at`. **Nie:** `zamowienia/ListaZamowien.tsx`, `data_utworzenia`.
- **Po polsku tylko to, co czyta człowiek:** teksty w plikach `locales`, treść dokumentów, opisy commitów.
- **Zero „magicznych” liczb i tekstów w logice.** Statusy modułu:
  ```ts
  // shared/src/constants/orders.ts
  export const ORDER_STATUSES = ['new', 'in_progress', 'sent'] as const;
  export type OrderStatus = (typeof ORDER_STATUSES)[number];
  export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    new: 'orders.status.new', in_progress: 'orders.status.in_progress', sent: 'orders.status.sent',
  };
  ```
- `.env` tylko na hasła i ustawienia zależne od komputera (porty, adresy). Wszystko inne to stałe w kodzie:
  `shared/src/constants/`, `backend/src/config/constants.ts`, `frontend/src/config/constants.ts`.

## Teksty

- Żaden tekst dla człowieka nie jest wpisany w kod. Klucz `<module>.<ekran>.<element>`, np. `orders.list.empty`.
- Front i makiety: `const { t } = useTranslation('<module>')`, potem `t('list.empty')`.
- Klucze z innej przestrzeni (np. etykiety ról): `translateKey(t, ROLE_LABELS[role])` z `@app/shared`.
- Schematy zod: komunikaty to klucze `validation.*` (wspólne) albo `<module>.validation.*`; front tłumaczy je
  `translateKey`.
- Backend zwraca **klucze**, nigdy polskie zdania: `sendError(res, 404, SERVER_MESSAGES.notFound)` albo klucz z
  `shared/src/constants/<module>.ts`. Nowe klucze serwera dopisz do `server.json` (wspólne) lub `<module>.json`.
- Nowy język: skopiuj `shared/locales/pl/` do `shared/locales/en/`, przetłumacz wartości, dopisz `en` w `resources`.

## API i bezpieczeństwo

- **Każda trasa modułu ma `requireRole(...)`.** Ukrycie pozycji w menu nie jest zabezpieczeniem.
- Trasy strony publicznej (formularze dla odwiedzających) nie mają `requireRole`, ale mają `validateBody` i limit
  zapytań (`express-rate-limit`, ustawienia w `backend/src/config/constants.ts`).
- W koncie użytkownika dane są **zawsze** filtrowane po `req.user.id` (klient nie zobaczy cudzych zamówień, nawet
  gdy zmieni numer w adresie).
- `validateBody(schema)` z tym samym schematem co formularz (`zodResolver(schema)` z `mantine-form-zod-resolver`
  w `useForm`).
- Format błędu jest jeden: `{ error: { message: <klucz>, fields?: { pole: <klucz> } } }`, kody 400/401/403/404/409/503.
  Na froncie: `apiErrorMessage(err, t)` z `frontend/src/core/api/client.ts` i `notifications.show`.
- SQL **tylko z parametrami** `?`: `pool.query('SELECT * FROM orders WHERE id = ?', [id])`. Nigdy nie sklejaj SQL
  z danymi od użytkownika.
- Kilka zapisów, które muszą się udać razem: transakcja (`const conn = await pool.getConnection();
  await conn.beginTransaction(); … await conn.commit()` / `rollback()` / `conn.release()`).

## Baza danych

- Każda zmiana bazy = nowy plik `backend/migrations/NNN_<opis>.sql` (kolejny numer, np. `003_orders.sql`), potem
  `npm run migrate`. **Nigdy** nie zmieniaj bazy ręcznie w phpMyAdmin i nie edytuj migracji, która już została
  zastosowana; napisz nową.
- Tabele `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci`, klucz `id INT UNSIGNED AUTO_INCREMENT`,
  `created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`, `updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP`.
- **Każda relacja ma klucz obcy** z indeksem i z regułą przy usunięciu. Regułę zapisz w specu (tabela relacji):

| Reguła | Kiedy | Przykład |
|---|---|---|
| `ON DELETE CASCADE` | dziecko bez rodzica nie ma sensu | `order_items.order_id` → `orders` |
| `ON DELETE SET NULL` + kopia nazwy | autorstwo (`created_by`, `updated_by`) | `orders.created_by` → `users`, obok `created_by_name` |
| `ON DELETE RESTRICT` | usunięcie skasowałoby ważne dane bez ostrzeżenia | `orders.customer_id` → `customers` |

  Przy `RESTRICT` makieta pyta, co ma się stać, a interfejs przed usunięciem mówi, dlaczego nie można (np. „Ten klient
  ma 3 zamówienia. Najpierw przenieś go do archiwum.”). Przy `CASCADE` okno potwierdzenia mówi, ile rzeczy zniknie.
- Test backendu dla każdej relacji `CASCADE` i `RESTRICT` (usunięcie rodzica → dzieci znikają / błąd 409).

## Archiwum (miękkie usuwanie)

Dla danych z listy „Archiwum” w `docs/SPEC-GENERAL.md`:

- Kolumny `archived_at DATETIME NULL`, `archived_by INT UNSIGNED NULL` (klucz obcy do `users`, `ON DELETE SET NULL`),
  przy dzieciach archiwizowanych razem z rodzicem także `archived_with_parent BOOLEAN NOT NULL DEFAULT FALSE`.
- Trasy: `POST /api/<module>/:id/archive` i `POST /api/<module>/:id/restore` z `requireRole`.
- Listy: domyślnie `WHERE archived_at IS NULL`; zakładka „Archiwum” wysyła `?archived=1`
  (`WHERE archived_at IS NOT NULL`) i ma przycisk „Przywróć”.
- „Usuń” w interfejsie = archiwizacja. Usunięcie na stałe (`DELETE /api/<module>/:id`), jeśli w ogóle dozwolone, tylko
  dla rekordu w archiwum, inaczej 409 `server.archive_first` (dopisz klucz do `server.json` i `SERVER_MESSAGES`);
  okno potwierdzenia mówi, ile powiązanych rzeczy zniknie.
- Zarchiwizowany rekord dalej widać tam, gdzie był użyty, z dopiskiem „zarchiwizowany”; w nowych formularzach nie da
  się go wybrać (zapytania list wyboru mają `archived_at IS NULL`).
- Archiwizacja rodzica: w tej samej transakcji archiwizuje aktywne dzieci z `archived_with_parent = TRUE`;
  przywrócenie rodzica przywraca tylko dzieci z `archived_with_parent = TRUE` i zeruje ten znacznik.
- Unikalne pola (np. e-mail) obejmują archiwum: zamiast drugiego konta z tym samym adresem zaproponuj przywrócenie.
- **Użytkownicy w archiwum:** w module Logowanie `authenticate` sprawdza w bazie, że konto nie ma `archived_at`
  (zarchiwizowane → `req.user = undefined`, a `GET /api/auth/me` daje 401 `server.account_archived`); logowanie
  zarchiwizowanego konta odrzucone tym samym kluczem.
- Testy: lista nie zwraca zarchiwizowanych; przywrócenie wraca rekord; `DELETE` aktywnego → 409; zarchiwizowany
  użytkownik z ważnym tokenem → 401; rodzic archiwizuje i przywraca tylko „swoje” dzieci.

## Historia zmian

Gdy `docs/SPEC-GENERAL.md` ma włączoną historię:

- Raz, przed modułem Logowanie (albo w nim, po tabeli `users`): skopiuj `backend/src/db/sql/activity_log.sql`
  do `backend/migrations/` jako kolejną migrację.
- Każda zmiana z zakresu historii, w **tej samej transakcji** co zmiana:
  ```ts
  import { diffChanges, logActivity } from '../../db/activityLog';
  await logActivity(conn, {
    userId: req.user!.id, userName: req.user!.name,
    action: 'update', entityType: 'orders', entityId: id,
    changes: diffChanges(before, after),
  });
  ```
  Akcje: `create`, `update`, `delete`, `archive`, `restore`, `status` (zmiana statusu), `login` (jeśli w zakresie).
- Ekran „Historia zmian” w panelu (moduł `activity`): tabela z filtrami moduł / osoba / data, widoczny dla ról
  z `SPEC-GENERAL.md`.
- Test: zmiana tworzy wpis z poprawnymi parami „przed → po”; usunięcie rekordu nie usuwa jego historii.

## Wzorce opcjonalne

Tylko gdy wywiad je potwierdził (decyzja w `SPEC-GENERAL.md`, przed modułem Logowanie):

- **Wiele firm:** tabela `companies`; `company_id` (klucz obcy) w `users` i w każdej tabeli danych; `companyId`
  w `SessionUser` i w tokenie; **każde zapytanie** ma `WHERE company_id = ?` z `req.user.companyId`, nigdy z danych
  żądania.
- **Dostęp nadawany przez administratora:** tabela `user_modules(user_id, module_key)` (oba klucze obce, `CASCADE`),
  pole `modules?: string[]` w `SessionUser`, rozszerzenie `canSee` o warunek modułu i middleware
  `requireModule('<module>')` na trasach modułu.

Zmiana `SessionUser` = zmiana w `shared/src/navigation.ts`, `backend/src/auth/token.ts` i testach obu.

## Moduł Logowanie

- Migracja `users`: `id`, `name`, `email` (unikalny), `password_hash`, `role`, `created_at`, `updated_at`;
  `archived_at`, `archived_by` gdy archiwum obejmuje użytkowników; `company_id` gdy wiele firm.
- `POST /api/auth/login` (`loginLimiter`, `validateBody`), `POST /api/auth/logout`, `GET /api/auth/me`
  (zwraca `{ user }` albo 401). Hasła `bcryptjs` z kosztem `BCRYPT_COST`. Token i ciasteczko przez
  `signToken`, `setAuthCookie`, `clearAuthCookie` z `backend/src/auth/token.ts`.
- Zły e-mail i złe hasło dają ten sam komunikat (`server.login_failed`), żeby nie zdradzać, które konta istnieją.
- Pierwszy administrator: skrypt `backend/src/scripts/createAdmin.ts` (`npm run admin -w @app/backend`), pyta
  w terminalu o imię, e-mail i hasło.
- Ekran `/login` (`frontend/src/modules/login/`, wpis `login` w `PAGES`); po zalogowaniu `refresh()` z `useAuth`
  i przejście do `ROLE_HOME[user.role]`.

## Testy modułu

Najpierw test, potem kod (TDD). Krok planu jest zrobiony dopiero po `npm run check` bez błędów.

- **Backend** (`*.test.ts` obok kodu, supertest na `createApp({ extraRoutes })` albo na trasach modułu): każda trasa:
  poprawne dane → sukces; błędne dane → 400 z kluczami pól; bez logowania → 401; zła rola → 403; w koncie cudze
  dane → 404. Plus reguły usuwania, archiwum i historii, jeśli dotyczą modułu.
- **`shared/`:** schematy zod (poprawne i błędne dane, klucze komunikatów).
- **Frontend:** formularze (błędy pól po polsku) i listy (pusta lista, dane), z `renderWithProviders` z
  `frontend/src/test/render.tsx`.
- **E2E** (`e2e/<module>.spec.ts`, `@playwright/test`): scenariusze z `TESTS.md`, po jednym na rolę. Wymagają bazy
  (`npm run db`), uruchamiane `npm run test:e2e` przy zamknięciu modułu.

## Lista kontrolna przeglądu kodu

Używaj jej, gdy nie ma `superpowers:requesting-code-review`:

- [ ] każda trasa ma `requireRole` (albo świadomie jest publiczna z limitem)
- [ ] SQL tylko z `?`, dane konta filtrowane po `req.user.id`, przy wielu firmach po `company_id`
- [ ] każda relacja ma klucz obcy z regułą zgodną ze specem
- [ ] brak polskich tekstów i liczb „z ręki” w kodzie
- [ ] te same schematy zod na froncie i w backendzie
- [ ] testy dla każdej trasy i formularza, `npm run check` zielony
- [ ] `.env` nie jest w repo (`git check-ignore .env`)
