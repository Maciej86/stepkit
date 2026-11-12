mkdir -p docs/modules/customers
cat > docs/STATUS.md <<'MD'
# Stan projektu: Kwiaciarnia

**Następny krok:** Klienci, makieta.

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
| 2 | Klienci | customers | czeka | makieta | login |

## Ostatnie decyzje

- 2026-11-12: Logowanie gotowe
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Kwiaciarnia
Kwiaciarnia przyjmuje zamówienia na bukiety. Role: admin (właścicielka), user (florystka). Części: panel.
Moduł Klienci: lista stałych klientów kwiaciarni (imię, nazwisko, telefon, ulubione kwiaty, notatki), dodawanie i edycja.
MD
mkdir -p shared/src/constants shared/locales/pl mockups/src/modules mockups/src/common
printf '{"name":"kwiaciarnia","private":true,"workspaces":["shared","backend","frontend","mockups"]}\n' > package.json
printf "import type { MantineThemeOverride } from '@mantine/core';\nexport const theme: MantineThemeOverride = { primaryColor: 'grape', defaultRadius: 'lg', fontFamily: 'Nunito, sans-serif' };\n" > shared/src/theme.ts
printf '/* style wspólne */\n' > shared/src/theme.css
printf "export const NAVIGATION = [{ key: 'customers', path: '/admin/customers', label: 'common.nav.customers', icon: 'users', roles: ['admin', 'user'] }];\n" > shared/src/navigation.config.ts
printf '{"nav":{"customers":"Klienci"}}\n' > shared/locales/pl/common.json
printf "export const screens = {\n  login: () => null,\n};\n" > mockups/src/screens.tsx
