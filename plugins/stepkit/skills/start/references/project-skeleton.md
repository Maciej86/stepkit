# Szkielet projektu

Czytasz ten plik w kroku 2 `/stepkit:start` (kopiowanie) i w kroku 5 (dopasowanie po wywiadzie).

## Kopiowanie (krok 2)

Szablon leży w folderze pluginu: `<katalog bazowy tego skilla>/../../template/` (katalog bazowy skilla jest podany
na początku treści skilla jako „Base directory for this skill”).

1. Folder projektu musi być pusty albo zawierać tylko ukryte pliki (np. `.git`). Jeśli są inne pliki, zapytaj, czy na
   pewno to ten folder. **Nigdy nie nadpisuj istniejących plików użytkownika.**
2. Skopiuj szablon bez `node_modules` i `dist`:
   ```bash
   tar -C "<ścieżka do template>" --exclude=node_modules --exclude=dist --exclude=test-results -cf - . | tar -xf -
   ```
3. Zmień `"name"` w głównym `package.json` na nazwę projektu (małe litery, myślniki).
4. `.env` z losowymi sekretami, **bez wypisywania ich** (hasła nie mogą pojawić się w rozmowie):
   ```bash
   cp .env.example .env
   node -e "const fs=require('fs'),c=require('crypto'),r=n=>c.randomBytes(n).toString('hex');let s=fs.readFileSync('.env','utf8');s=s.replace(/^JWT_SECRET=.*$/m,'JWT_SECRET='+r(48)).replace(/^DB_PASSWORD=.*$/m,'DB_PASSWORD='+r(16)).replace(/^MYSQL_ROOT_PASSWORD=.*$/m,'MYSQL_ROOT_PASSWORD='+r(16));fs.writeFileSync('.env',s)"
   ```
   Nie wyświetlaj potem zawartości `.env` (`cat .env` itp.).
5. `npm install` (powiedz: „Pobieram biblioteki, to potrwa kilka minut za pierwszym razem.”).
6. `npx playwright install chromium` (powiedz: „Pobieram przeglądarkę do testów, jednorazowo.”).
7. `npm run check` musi przejść.
8. Porty: jeśli `npm run dev` zgłosi, że port jest zajęty (`Port 5173 is in use`), odkomentuj w `.env` odpowiednią
   linię (`FRONTEND_PORT`, `MOCKUPS_PORT`, `PHPMYADMIN_PORT`, `PORT`) z innym numerem. Gdy zmieniasz
   `FRONTEND_PORT`, zmień też port w `FRONTEND_URL` (serwer używa go w linkach w e-mailach). Sprawdź wolne porty od
   razu, zanim użytkownik zobaczy błąd: `npm run db` i `npm run dev` też zgłoszą zajęty port.
9. Baza: `npm run db`, poczekaj ok. 20 sekund, `npm run migrate` musi wypisać „Baza jest aktualna.”. Błąd połączenia
   zaraz po starcie: poczekaj jeszcze chwilę i powtórz `npm run migrate`.
10. **Ściągawka:** `README.md` projektu to miejsce, gdzie użytkownik sprawdza, jak uruchomić aplikację i gdzie co
    podejrzeć. Jeśli zmieniłeś jakiś port, popraw go w tabeli „Gdzie co podejrzeć” (adresy mają się zgadzać z `.env`).
    Powiedz użytkownikowi: „Jak uruchomić aplikację, pod jakimi adresami co jest i jak zalogować się do podglądu bazy,
    znajdziesz w pliku `README.md` w folderze projektu. Będę go uzupełniać na bieżąco.”

Co jest w szkielecie (żeby wiedzieć, gdzie zmieniać):

| Gdzie | Co |
|---|---|
| `shared/src/navigation.config.ts` | `AREAS`, `ROLE_HOME`, `PUBLIC_NAVIGATION`, `ACCOUNT_NAVIGATION`, `NAVIGATION` |
| `shared/src/constants/` | role, klucze komunikatów serwera, stałe modułów |
| `shared/locales/pl/` | wszystkie teksty (`common`, `server`, `validation`, `email`, jeden plik na moduł) |
| `frontend/src/core/routes/pages.ts` | ekran prawdziwej aplikacji dla każdej pozycji nawigacji |
| `mockups/src/screens.tsx` | ekran makiety dla każdej pozycji nawigacji |
| `backend/src/app.ts` | miejsce dopisania tras modułów |
| `backend/src/db/sql/activity_log.sql` | gotowa tabela historii zmian (kopiowana tylko, gdy historia jest włączona) |
| `docs/STATUS.md` | plik stanu |

## Dopasowanie po wywiadzie (krok 5)

Według tabeli „Jak odpowiedzi zmieniają szkielet” w `interview.md`:

1. `AREAS`: ustaw `public`, `account`, `admin`. Wyłączona część: usuń jej pozycje z nawigacji, wpisy w `PAGES`
   i `SCREENS` oraz foldery jej ekranów startowych (`home`, `my-account`, `dashboard`) w `frontend/src/modules/`
   i `mockups/src/modules/`, a także ich pliki tekstów w `shared/locales/pl/` i importy w `shared/src/i18n.ts`.
2. `ROLES` (identyfikatory po angielsku, np. `admin`, `employee`, `customer`), `ROLE_LABELS` (klucze
   `common.roles.<rola>`, polskie nazwy w `common.json`), `ROLE_HOME`.
3. Trzy nawigacje: na tym etapie tylko pozycje ze startowymi ekranami; pełna nawigacja powstaje w makiecie (krok 6).
4. Wzorce opcjonalne: według `../../dalej/references/code-conventions.md`.
5. `npm run check` musi przejść (test `navigation.test.ts` pilnuje, że każda rola ma stronę domową w włączonej części
   i każda etykieta ma polski tekst).
