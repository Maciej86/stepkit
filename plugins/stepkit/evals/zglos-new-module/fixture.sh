mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Sklep

**Wersja stepkit:** 0.1.46

**Następny krok:** Zamówienia, makieta.

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
| 1 | Logowanie | login | zrobiony | — | — |
| 2 | Klienci | customers | zrobiony | — | login |
| 3 | Zamówienia | orders | czeka | makieta | customers |

## Ostatnie decyzje

- 2026-11-12: plan gotowy
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Sklep
Role: admin (właściciel), user (klient). Części: strona, konto, panel.
Moduły: Logowanie, Klienci (lista klientów w panelu), Zamówienia (klient składa zamówienie w koncie, właściciel je realizuje).
MD
mkdir -p shared/src/schemas shared/src/constants backend/src/modules frontend/src/modules mockups/src
printf '{"name":"sklep","private":true,"workspaces":["shared","backend","frontend","mockups"],"scripts":{"check":"npm run typecheck --workspaces --if-present && npm test --workspaces --if-present"}}\n' > package.json
printf '{"name":"@app/shared","private":true,"type":"module","main":"src/index.ts","scripts":{"test":"vitest run"}}\n' > shared/package.json
printf 'export * from "./constants";\n' > shared/src/index.ts
printf 'export const ROLES = ["admin", "user"] as const;\n' > shared/src/constants/index.ts
