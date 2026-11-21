mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Sklep

**Wersja stepkit:** 0.1.51

**Następny krok:** Poprawka z FIXES.md: link „Nie pamiętasz hasła?” pod polem hasła.

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
| 1 | Wygląd | appearance | zrobiony | zamknięcie | — |
| 2 | Logowanie | login | zrobiony | zamknięcie | appearance |
| 3 | Klienci | customers | czeka | makieta | login |

## Ostatnie decyzje

- 2026-11-12: plan gotowy
MD
cat > docs/FIXES.md <<'MD'
# Poprawki do zrobienia

| Data | Rodzaj | Co | Moduł | Status |
|---|---|---|---|---|
| 2026-11-15 | zmiana | Na ekranie logowania link „Nie pamiętasz hasła?” ma być pod polem hasła, nie pod przyciskiem | login | czeka |
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Sklep
Role: admin (właściciel), user (klient). Części: strona, konto, panel.
MD
mkdir -p shared/src/schemas shared/src/constants backend/src/modules frontend/src/modules mockups/src
printf '{"name":"sklep","private":true,"workspaces":["shared","backend","frontend","mockups"],"scripts":{"check":"npm run typecheck --workspaces --if-present && npm test --workspaces --if-present"}}\n' > package.json
printf '{"name":"@app/shared","private":true,"type":"module","main":"src/index.ts","scripts":{"test":"vitest run"}}\n' > shared/package.json
printf 'export * from "./constants";\n' > shared/src/index.ts
printf 'export const ROLES = ["admin", "user"] as const;\n' > shared/src/constants/index.ts
mkdir -p frontend/src/modules/login mockups/src/modules/login docs/modules/login
for f in frontend/src/modules/login/LoginPage.tsx mockups/src/modules/login/LoginPage.tsx; do
cat > "$f" <<'TSX'
import { Anchor, Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export const LoginPage = () => {
  const { t } = useTranslation('login');
  return (
    <Stack>
      <TextInput label={t('form.email')} />
      <PasswordInput label={t('form.password')} />
      <Button type="submit">{t('form.submit')}</Button>
      <Anchor href="/forgot-password">{t('form.forgot')}</Anchor>
    </Stack>
  );
};
TSX
done
printf '# Spec: Logowanie\n\nEkran /login: e-mail, hasło, przycisk „Zaloguj”, link „Nie pamiętasz hasła?”.\n' > docs/modules/login/SPEC.md
