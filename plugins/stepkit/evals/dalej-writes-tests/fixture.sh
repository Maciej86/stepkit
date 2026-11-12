mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Sklep

**Wersja stepkit:** 0.1.17

**Następny krok:** Zamówienia, implementacja: krok 1 z 3.

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
| 1 | Zamówienia | orders | w toku | implementacja (krok 1/3) | — |

## Ostatnie decyzje

- 2026-11-12: plan gotowy
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Sklep
Role: admin (właściciel), user (klient). Części: strona, konto, panel.
MD
mkdir -p docs/modules/orders shared/src/schemas backend/src/modules
printf '# Plan: Zamówienia\n\n- [ ] 1. Schemat zamówienia shared/src/schemas/orders.ts (pola: customerName wymagane, quantity liczba > 0) + testy\n- [ ] 2. Trasa POST /api/orders + testy\n- [ ] 3. Ekran listy\n' > docs/modules/orders/PLAN.md
printf '# Spec: Zamówienia\nZamówienie: customerName (wymagane), quantity (liczba > 0).\n' > docs/modules/orders/SPEC.md
mkdir -p shared/src/schemas shared/src/constants backend/src/modules frontend/src/modules mockups/src
printf '{"name":"sklep","private":true,"workspaces":["shared","backend","frontend","mockups"],"scripts":{"check":"npm run typecheck --workspaces --if-present && npm test --workspaces --if-present"}}\n' > package.json
printf '{"name":"@app/shared","private":true,"type":"module","main":"src/index.ts","scripts":{"test":"vitest run"}}\n' > shared/package.json
printf 'export * from "./constants";\n' > shared/src/index.ts
printf 'export const ROLES = ["admin", "user"] as const;\n' > shared/src/constants/index.ts
