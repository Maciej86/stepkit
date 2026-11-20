# Aktualizacja projektu do nowej wersji stepkit

**Aktualna wersja stepkit:** 0.1.47

Szablon kopiuje się do projektu tylko raz, przy `/stepkit:start`. Gdy stepkit się zmienia, starsze projekty nie mają
nowych plików, a nowe zasady o nich mówią. Ten plik mówi, co przenieść.

## Kiedy

Wersję projektu podaje linia `**Wersja stepkit:** X.Y.Z` w `docs/STATUS.md`. Brak tej linii = projekt sprzed 0.1.4
(najstarszy). Aktualizacja jest potrzebna, gdy wersja projektu jest **niższa niż numer najnowszej sekcji** poniżej
(porównuj liczbowo: 0.1.11 > 0.1.9).

## Jak

1. Powiedz prostym językiem: „stepkit się zaktualizował, a Twój projekt powstał na starszej wersji. Żeby nowe zasady
   pasowały do projektu, trzeba w nim poprawić: …” (wypunktuj sekcje do zrobienia, po jednym zdaniu, bez nazw plików)
   „Zajmie to chwilę i nie zmieni tego, co już działa. Zrobić to teraz?” **Nic nie zmieniaj przed odpowiedzią.**
2. Po „tak”: sekcje po kolei, od najstarszej potrzebnej. Szablon jest w `<katalog bazowy tego skilla>/../../template/`.
   - **Nowy plik** (projekt go nie ma): skopiuj z szablonu. Od 0.1.27 testy w szablonie leżą w `__tests__` (poza
     `src/test/`): gdy starsza sekcja podaje `<folder>/<plik>.test.ts`, weź go z `<folder>/__tests__/<plik>.test.ts`
     i tam go umieść.
   - **Plik, który projekt mógł zmienić** (oznaczony „połącz”): nie nadpisuj. Dopisz tylko opisaną zmianę, zachowując
     wszystko, co dodały moduły (pozycje menu, ekrany, teksty).
   - Po każdej sekcji: `npm run check` zielony, zapis na GitHubie („Aktualizacja stepkit: <sekcja>”).
3. Zawsze podmień `docs/CONVENTIONS.md` na aktualny `code-conventions.md` (obok tego pliku) i cały folder
   `docs/conventions/` na aktualne `domains/` (usuń stare pliki, skopiuj wszystkie); projekt ich nie zmienia, wyjątki
   są w `SPEC-GENERAL.md`. Na końcu ustaw w `docs/STATUS.md` linię `**Wersja stepkit:** <aktualna wersja z góry tego pliku>` (zaraz pod
   tytułem; dopisz, jeśli jej nie ma) i wpis w „Ostatnie decyzje”. Potem **zatrzymaj się**. Jednym krótkim akapitem,
   bez nazw technicznych, powiedz, co się zmieniło i że sprawdzenie (`npm run check`) przeszło. Podaj jedną–dwie rzeczy
   do sprawdzenia w aplikacji, związane z tym, co się zmieniło (np. „zaloguj się i otwórz listę pracowników”).
   Zapytaj: „Wracamy do <moduł>, etap <etap>?”. Dalszą pracę zaczynasz dopiero po odpowiedzi.
4. Moduł w toku: aktualizację rób przed dalszą pracą nad nim; jego plików nie ruszaj poza tym, co opisuje sekcja.
5. **Aplikacja opublikowana i wszystkie moduły zrobione:** aktualizację proponuj tylko wtedy, gdy któraś z brakujących
   sekcji dotyczy bezpieczeństwa (oznaczone „bezpieczeństwo”) albo gdy użytkownik zaczyna nowy moduł. Działającej
   aplikacji nie przebudowujesz dla samych nowości stepkit.
6. „Nie teraz”: pracuj dalej, ale przy następnym `/stepkit:dalej` zapytaj ponownie. Przed etapem **makieta** aktualizacja
   jest konieczna (makiety korzystają z motywu i panelu pytań).

## 0.1.4: ściągawka w README

- **Połącz** `README.md` projektu z `template/README.md`: sekcje „Uruchomienie”, „Gdzie co podejrzeć” (porty z `.env`
  projektu), logowanie do phpMyAdmin, „Ważne pliki”, „Coś nie działa?”. Zachowaj to, co projekt już dopisał.
- `.env`: jeśli `FRONTEND_PORT` jest zmieniony, popraw port w `FRONTEND_URL`.

## 0.1.5: pomysły na później

- Nowy plik `docs/IDEAS.md` z szablonu (jeśli go nie ma) i wiersz o nim w tabeli „Ważne pliki” w `README.md`.

## 0.1.6: wspólny wygląd makiet i aplikacji, panel pytań

- Nowe pliki: `shared/src/theme.ts`, `shared/src/theme.css`, `frontend/src/test/theme.test.tsx`,
  `mockups/src/test/theme.test.tsx`, `mockups/src/common/Question.test.tsx`.
- **Połącz** `shared/package.json`: pole `exports` jak w szablonie.
- Jeśli projekt ma `frontend/src/core/theme.ts` ze zmianami (inne niż `primaryColor: 'blue', defaultRadius: 'md'`),
  przenieś je do `shared/src/theme.ts`; potem usuń `frontend/src/core/theme.ts`.
- **Połącz** `frontend/src/main.tsx` i `mockups/src/main.tsx`: motyw z `@app/shared/theme`, import
  `@app/shared/theme.css`, `<MantineProvider theme={theme}>`. To samo w `frontend/src/test/render.tsx`
  i `mockups/src/test/render.tsx`.
- `mockups/src/common/Question.tsx` z szablonu (`Questions` i `Question`), klucze `mockup.questions_*`
  i `mockup.question_about` w `shared/locales/pl/common.json`. Istniejące makiety: przenieś wszystkie `<Question>`
  ekranu do jednego `<Questions>` na górze ekranu (z `about`).

## 0.1.8: przełącznik jasny/ciemny, kolory tylko z motywu

- **Połącz** `shared/src/theme.ts`: `COLOR_SCHEME_TOGGLE` (domyślnie `false`) i `colorSchemeProps` jak w szablonie;
  nowy `shared/src/theme.test.ts`.
- Nowe pliki: `ColorSchemeToggle.tsx` i `ColorSchemeToggle.test.tsx` w `frontend/src/common/` i `mockups/src/common/`,
  `frontend/src/test/colors.test.ts`.
- **Połącz** `main.tsx` (oba): `{...colorSchemeProps()}` w `MantineProvider`. Nagłówki `AppLayout.tsx`,
  `AccountLayout.tsx` i pasek w `mockups/src/Shell.tsx`: `{COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}`.
- Klucze `color_scheme` w `shared/locales/pl/common.json`.
- Jeśli `colors.test.ts` znajdzie kolory wpisane na sztywno w modułach, zamień je na kolory Mantine.
- Zapytaj o przełącznik jasny/ciemny (pytanie z obszaru „Wygląd” w wywiadzie) i ustaw `COLOR_SCHEME_TOGGLE`.

## 0.1.11: ikony Lucide

- `npm uninstall -w @app/frontend -w @app/mockups @tabler/icons-react` i
  `npm install -w @app/frontend -w @app/mockups lucide-react@^1.72.0`.
- `icons.tsx` i `icons.test.tsx` z szablonu w `frontend/src/common/` i `mockups/src/common/`; menu makiet
  (`mockups/src/Shell.tsx`, **połącz**) dostaje `leftSection={<NavIcon name={item.icon} />}`.
- **Połącz** `shared/src/navigation.config.ts`: każde pole `icon` na nazwę z https://lucide.dev/icons/ (Tabler
  `home` → `house`, inne według podobieństwa) i dopisz te ikony do `NAV_ICONS` w obu `icons.tsx`.
- W modułach zamień importy z `@tabler/icons-react` na odpowiedniki z `lucide-react`
  (`IconCheck` → `Check`, `IconTrash` → `Trash2` …); `ColorSchemeToggle.tsx` z szablonu.

## 0.1.13: numer wersji w projekcie

- Linia `**Wersja stepkit:**` w `docs/STATUS.md` (krok 3 z „Jak”).

## 0.1.14: moduł „Wygląd” i księga wyglądu

- Nowe pliki: `docs/DESIGN.md`, cały folder `mockups/src/appearance/` (`ThemeVariants.tsx`, `ThemeVariants.test.tsx`,
  `variants.ts`, `variants.css`).
- **Połącz** `mockups/src/main.tsx`: `ThemeVariantProvider variants={THEME_VARIANTS}` zamiast `MantineProvider`, import
  `./appearance/variants.css`. `mockups/src/Shell.tsx`: `<VariantSwitch />` obok przełącznika motywu.
  `mockups/src/test/theme.test.tsx` z szablonu. Klucz `mockup.variant` w `shared/locales/pl/common.json`.
- **Połącz** `README.md`: wiersz `docs/DESIGN.md` w „Ważne pliki”.
- Tabela modułów w `STATUS.md` bez modułu `appearance`: zapytaj „Dodać moduł »Wygląd«, w którym dopracujemy kolory
  i styl całej aplikacji?” (polecam, jeśli żaden moduł nie jest jeszcze zrobiony). Tak → wiersz „Wygląd” (folder
  `appearance`, `czeka`, `makieta`, bez zależności) **zaraz za modułem w toku** (albo jako pierwszy, gdy nic nie jest
  w toku), przenumerowanie, `appearance` w „Zależy od” Publikacji. Nie → opisz obecny wygląd w `DESIGN.md`
  (z `shared/src/theme.ts` i ekranów) ze stanem „ustalony”.

## 0.1.15: API domyślnie zamknięte, uprawnienia z nawigacji

- Nowy plik `backend/src/middleware/mountModule.ts`; **połącz** `shared/src/navigation.ts` (funkcja `rolesFor`)
  i testy (`backend/src/app.test.ts`, `shared/src/navigation.test.ts`) z szablonem.
- **Połącz** `backend/src/app.ts`: trasy publiczne (health, logowanie, formularze strony) przed
  `api.use(requireAuth)`, wszystkie moduły po nim przez `mountModule`. Sprawdź każdy istniejący moduł: rola z
  nawigacji zgadza się z tym, co miał w `requireRole`? Różnica → zapytaj użytkownika, która jest dobra.
- Dopisz „Mapę dostępu” do `SPEC-GENERAL.md` (strony z nawigacji, trasy istniejących modułów); co do stron dla
  odwiedzających zaproponuj podział publiczne / po zalogowaniu i poproś o potwierdzenie.
- Moduł Logowanie zrobiony: `authenticate` z aktualną rolą z bazy (`domains/login.md`) z testami.

## 0.1.16: daty i święta, wzorce startowe wyglądu, menu, zasady serwera i bibliotek

Daty i święta:
- Nowe pliki: `shared/src/constants/dates.ts`, `shared/src/constants/ui.ts`, `shared/src/date.ts`,
  `shared/src/holidays.ts` z testami (`date.test.ts`, `holidays.test.ts`). **Połącz** `shared/src/index.ts` (eksport
  `./date` i `./holidays`), `shared/src/constants/index.ts` (`./dates`, `./ui`), `shared/package.json` (`dayjs`),
  `shared/locales/pl/common.json` (klucze `empty_value` i `holidays`), potem `npm install`.
- **Połącz** `frontend/src/config/constants.ts`: `NOTIFICATION_AUTOCLOSE_MS` z `@app/shared` (usuń lokalną liczbę).
- **Połącz** `backend/src/db/pool.ts`: `dateStrings: ['DATE']`. Potem przejrzyj moduły: kod, który z kolumny `DATE`
  dostawał `Date` (np. `.toISOString()`, `new Date(row.start_date)`), dostaje teraz tekst `RRRR-MM-DD`; popraw go
  i testy.
- Nowe pliki `frontend/src/common/DateText.tsx` i `mockups/src/common/DateText.tsx` (z testami) oraz
  `frontend/src/test/dates.test.ts` (od 0.1.20: `formatting.test.ts`). Gdy test znajdzie w modułach własne formatowanie dat (`toLocaleDateString`,
  `getMonth()` …), zamień je na `formatDate` / `DateText`; własne listy świąt zamień na `getPolishHolidays`.

Wygląd i menu:
- Nowe pliki w `frontend/src/common/` i `mockups/src/common/`: `InfoCard.tsx`, `PageSection.tsx`, `ButtonIcon.tsx`;
  `frontend/src/core/notify.ts` i `mockups/src/common/notify.ts` z testami (jeśli projekt ma już `notify.ts`, zostaw
  jego, dopisz tylko brakujące stałe i test); testy `tables.test.ts` w `frontend/src/test/` i `mockups/src/test/`.
- **Połącz** `mockups/src/main.tsx`: `<Notifications />` i `import '@mantine/notifications/styles.css'`.
- **Połącz** `shared/src/navigation.ts` (funkcja `activeNavKey`) i jej testy; `frontend/src/common/NavMenu.tsx`
  i `mockups/src/Shell.tsx`: `active={item.key === activeKey}` zamiast `pathname === item.path`.
- **Połącz** `shared/src/theme.css` (zmienna `--app-panel-background`), `AppShell.Main` w `AppLayout.tsx`,
  `AccountLayout.tsx` i `mockups/src/Shell.tsx` z tym tłem.
- **Połącz** `frontend/src/common/PublicLayout.tsx`: `padding={0}` i podświetlona bieżąca podstrona. Ekrany strony dla
  odwiedzających, które liczyły na odstęp od brzegu, owiń w `PageSection`.
- Gdy `tables.test.ts` znajdzie tabelę bez `Table.ScrollContainer`, owiń ją.
- **Połącz** `docs/DESIGN.md`: sekcje „Układ”, wiersze „Wzorce” oznaczone „szablon”, „Ikony przycisków”. Jeśli wygląd
  jest już ustalony i różni się od wzorców startowych (np. menu u góry), zostaw ustalenie projektu i zapytaj
  użytkownika tylko o różnice.

Nowe projekty (bez zmian w istniejących): `/stepkit:start` nie kopiuje już `package-lock.json` szablonu, tylko
instaluje najnowsze poprawki bibliotek w ramach wersji z `package.json`.

Zasady (bez zmian w kodzie, chyba że przegląd coś znajdzie):
- Dopisz do `SPEC-GENERAL.md` sekcję „Biblioteki” (paczki spoza szablonu, które projekt już ma, z modułem).
- Przejrzyj trasy zrobionych modułów pod kątem „Serwer jest jedynym źródłem prawdy” (`code-conventions.md`): pola
  właściciela, roli, firmy i wartości wyliczane brane z żądania popraw, z testem.
- Moduły zależne od siebie: dopisz „Powiązania” do ich `SPEC.md` przy następnej pracy nad nimi.

## 0.1.17: zasady w projekcie (CLAUDE.md), drobne zmiany, łatki bezpieczeństwa

- Nowy plik `CLAUDE.md` z szablonu (tytuł: nazwa aplikacji). Projekt ma już `CLAUDE.md` → **połącz**: dopisz sekcje
  szablonu, zachowaj to, co projekt dodał.
- Nowy plik `docs/CONVENTIONS.md`: kopia `code-conventions.md` (krok 3 w „Jak”).
- **Połącz** `README.md`: wiersze `CLAUDE.md` i `docs/CONVENTIONS.md` w „Ważne pliki”.
- Projekt opublikowany: w sekcji „Wgraj nową wersję” w `STATUS.md` dopisz linię z `npm run check` i
  `npm audit --omit=dev` (wzór w `deploy-ovh.md`).

## 0.1.19: pliki od użytkowników, nazwa projektu w Dockerze

- Nowe pliki `backend/src/files/storage.ts` i `storage.test.ts`. **Połącz** `backend/src/env.ts` (`UPLOAD_DIR`),
  `backend/src/config/constants.ts` (`UPLOAD_MAX_BYTES`, `UPLOAD_MAX_FILES`, `UPLOAD_FILE_TYPES`),
  `shared/src/constants/messages.ts` (`fileTooLarge`, `fileTypeNotAllowed`) i `shared/locales/pl/server.json`.
- **Połącz** `.gitignore` (`uploads/`), `docker-compose.prod.yml` (wolumen `uploads_data:/app/uploads` w `backend`
  i na liście `volumes`), `scripts/backup-db.sh` z szablonu (kopia plików obok bazy; projekt zwykle go nie zmieniał,
  wtedy podmień), `CLAUDE.md` (linia o plikach w „Bezpieczeństwo”).
- Projekt już przyjmuje pliki: przenieś je do układu `uploads/<moduł>/<id>/` z losowymi nazwami albo zostaw stary
  układ i zapisz to w „Zasadach wspólnych” `SPEC-GENERAL.md`; sprawdź, że pobieranie idzie trasą API z kontrolą
  dostępu, a nie wprost z folderu. Na opublikowanym serwerze: przed „wgraj nową wersję” skopiuj pliki z kontenera
  do wolumenu (zapytaj użytkownika, pokaż polecenia), inaczej znikną przy przebudowie.
- `.env` bez `COMPOSE_PROJECT_NAME`: dopisz `COMPOSE_PROJECT_NAME=<nazwa folderu projektu>` (ta sama nazwa, której
  Docker używał dotąd, więc baza zostaje ta sama).

## 0.1.20: liczby i kwoty, dni wolne firmy, pełna szerokość ekranów

- Nowe pliki `shared/src/constants/numbers.ts`, `shared/src/number.ts`, `shared/src/number.test.ts`. **Połącz**
  `shared/src/index.ts` (`./number`) i `shared/src/constants/index.ts` (`./numbers`).
- **Połącz** `shared/src/holidays.ts` i jego test (parametr `extraDaysOff` w `isWorkingDay` i `countWorkingDays`).
- Zmień nazwę `frontend/src/test/dates.test.ts` na `formatting.test.ts` i weź treść z szablonu. Gdy test znajdzie
  w modułach `toFixed` albo `Intl.NumberFormat`, zamień je na `formatMoney` / `formatNumber` (albo dopisz
  `// format-ok: <powód>`, gdy to obliczenie).
- **Połącz** `docs/DESIGN.md` („Układ”: ekrany panelu i konta na całą szerokość). Ekrany panelu i konta zamknięte
  w `Container` albo z `maw` na całej stronie: usuń ograniczenie (makieta i aplikacja).
- **Połącz** `shared/src/navigation.ts` (`rolesFor` łączy role wszystkich pozycji o tym samym kluczu) i test.
  Moduł z pozycją w koncie i w panelu (np. powiadomienia) dostaje wtedy dostęp dla obu ról.
- Nowy `frontend/src/common/SideMenuLayout.tsx` z testem; `AppLayout.tsx` i `AccountLayout.tsx` z szablonu (projekt
  zwykle ich nie zmieniał; jeśli zmienił, przenieś zmiany do `SideMenuLayout`). **Połącz** `mockups/src/Shell.tsx`
  (przycisk menu, przełączniki makiety w menu na telefonie) i jego test, klucze `menu_open`, `menu_close`
  w `common.json`. Obejrzyj panel i konto przy 390 px.
- Belka z menu użytkownika: nowe `frontend/src/common/UserMenu.tsx` i `mockups/src/common/UserMenu.tsx` (z testami),
  `mockups/src/common/mockUsers.ts` (zmyślone osoby dla ról projektu); **połącz** `shared/src/navigation.ts`
  (`findVisibleNavItem`, `initials`), `SideMenuLayout.tsx` i `mockups/src/Shell.tsx` z szablonem, klucz `user_menu`
  w `common.json`. `LogoutButton.tsx` usuń, jeśli nic go już nie używa. **Połącz** `docs/DESIGN.md` („Górna belka”).
- Strona „Postęp”: **połącz** `mockups/src/progress/parseStatus.ts` (`dependencyNames`), `ProgressPage.tsx` i test,
  klucz `mockup.depends_all` w `common.json` (projekt zwykle ich nie zmieniał, wtedy podmień).

## 0.1.22: pola formularzy, pobieranie danych, listy, transakcje, zasady dziedzinowe, testy zasad

- **Zasady dziedzinowe:** utwórz `docs/conventions/` i skopiuj do niego wszystkie pliki z `domains/` (krok 3 w „Jak”).
  **Połącz** `docs/SPEC-GENERAL.md`: w tabeli „Moduły i kolejność” dodaj kolumnę „Wzorce” (po „Zależy od”) i wypełnij
  ją według „Wzorce dziedzin” w `code-conventions.md` (np. Logowanie: `login`; moduł bez pasującego pliku: `—`).
  Pokaż użytkownikowi jednym zdaniem, co wpisałeś.
- **Gotowe pola i listy:** nowe `shared/src/schemas/fields.ts`, `list.ts` i ich testy. **Połącz**
  `shared/src/index.ts` (eksport `./schemas/fields` i `./schemas/list`), `shared/locales/pl/validation.json` (nowe
  klucze z szablonu; istniejące zostaw), `shared/src/constants/messages.ts` (`passwordChangeRequired`, jeśli go nie
  ma) i `server.json` (`password_change_required`).
- **Backend:** nowe `backend/src/db/transaction.ts`, `backend/src/middleware/validateQuery.ts` (z testami).
  **Połącz** `backend/src/middleware/mountModule.ts` (rejestr `mountedModules`). Ręczne transakcje w modułach
  (`getConnection` / `beginTransaction`) zamień na `withTransaction`.
- **Front:** `npm install -w @app/frontend @tanstack/react-query@5.105.0`. Nowe `frontend/src/common/DataState.tsx`,
  `frontend/src/core/api/queryClient.ts` (z testami). **Połącz** `frontend/src/main.tsx` (`QueryClientProvider`),
  `frontend/src/test/render.tsx` (`QueryClientProvider` w `renderWithProviders`), `frontend/src/config/constants.ts`
  (`SESSION_EXPIRED_PATH`, `PASSWORD_CHANGE_PATH`, `QUERY_STALE_MS`), `frontend/src/core/api/client.ts`
  (`handleSessionError`, `sessionRedirect`) i jego test, klucze `retry`, `empty_list`, `load_error` w `common.json`.
  Zrobionych modułów nie przepisuj na TanStack Query; nowe i zmieniane ekrany już tak.
- **Testy zasad:** nowe `backend/src/test/conventions.test.ts`, `backend/src/test/routeProtection.test.ts`,
  `frontend/src/test/conventions.test.ts`. Dopisz `// rule-ok: <powód>` w `backend/src/modules/health/health.routes.ts`
  (nad `healthRoutes`) i przy `beginTransaction` w `backend/src/db/migrate.ts`, jak w szablonie. Uruchom
  `npm run check`: czerwone testy zasad pokazują miejsca w zrobionych modułach, które łamią zasady. Popraw kod
  (z testem) albo, gdy zasada naprawdę nie pasuje, dodaj `// rule-ok:` z konkretnym powodem. Wypisz użytkownikowi
  prostym językiem, co poprawiłeś.
- **Połącz** `CLAUDE.md` (stos z TanStack Query, `validateQuery`, `withTransaction`, sekcja „Kod wspólny”, `DataState`,
  testy zasad, odnośnik do `docs/conventions/`).


## 0.1.23: makieta bez strony dla odwiedzających, kopie zapasowe poza serwerem, próby nadużyć (bezpieczeństwo)

- **Połącz** `mockups/src/App.tsx`: gdy `areas.public` jest wyłączone, adres `/` przekierowuje (`Navigate`) do
  `/account` albo `/admin` i od tej części zależy rola startowa (`homePath`, `startPath` jak w szablonie). Dopisz dwa
  testy z `mockups/src/Shell.test.tsx` („opens … at /”). Projekt zwykle nie zmieniał tego pliku, wtedy podmień.
- Nowe pliki z szablonu: `backend/src/backups/` (cały folder z testami), `backend/src/db/sql/backup_runs.sql`,
  `backend/src/db/sql/system_alerts.sql`, `scripts/backup/` (cały folder). Usuń `scripts/backup-db.sh`.
- **Połącz** `backend/src/env.ts` (`BACKUP_SLOTS`, `BACKUP_ALERT_EMAIL`) i `.env.production.example` (dwie linie
  kopii na końcu).
- Moduły w toku i kolejne dostają na etapie testy próby nadużyć (`abuse.md`); zrobionych modułów nie przerabiasz,
  ich bloki `abuse` dopisuje dopiero moduł „Publikacja”.
- **Bezpieczeństwo, aplikacja już opublikowana:** kopie leżą tylko na serwerze. Zaproponuj „Kopie zapasowe poza
  serwerem” z `deploy-ovh.md` (sekcja 7, kroki 1–13), potem wyłącz stary cron (`crontab -l | grep -v backup-db.sh |
  crontab -`) i dopisz w `README.md` oraz `STATUS.md` to, co sekcja „Zamknięcie” mówi o kopiach i poziomach
  gotowości. Stare kopie w `~/backups` zostaw (skrypt i tak sprząta tylko pliki `*.age`).

## 0.1.25: wdrożenia jednym skryptem (z komputera albo z GitHuba)

- Nowe pliki z szablonu: `scripts/deploy.sh`, `scripts/github-deploy.yml`.
- **Połącz** `scripts/backup/backup.sh`: zmienna `BACKUP_WAIT=1` (czekanie na trwający przebieg zamiast pominięcia,
  jak w szablonie). Projekt zwykle nie zmieniał tego pliku, wtedy podmień.
- **Aplikacja już opublikowana:** przy najbliższym „wgraj nową wersję” wyjaśnij, czym jest wdrożenie, zadaj pytanie
  o sposób wdrożeń i ustaw wybrany wariant według `deploy-ovh.md`, sekcja 9 (wymaga kopii poza serwerem z 0.1.23).
  Potem zamień sekcję „Wgraj nową wersję” w `STATUS.md` i linię „Nowa wersja” w `README.md` na wzór z „Zamknięcia”.

## 0.1.26: nagłówki stron, żądania z obcych stron, koniec sesji po zmianie hasła (bezpieczeństwo)

- **Połącz** `Caddyfile`: blok `header { … }` z szablonu zaraz pod `encode gzip`. Jeśli moduły ładują coś z innych
  serwerów (mapa, czcionki, płatności), dopisz te adresy do `Content-Security-Policy`, inaczej przestaną działać.
- Nowy plik z szablonu: `backend/src/middleware/sameOrigin.ts`. **Połącz** `backend/src/app.ts`: import
  i `app.use(sameOrigin)` zaraz po `cors`. **Połącz** `backend/src/app.test.ts`: bloki `sameOrigin` i `JWT_SECRET`
  (oraz `const { env } = await import('./env')`).
- **Połącz** `backend/src/auth/token.ts`: `algorithm: 'HS256'` w `jwt.sign` i `{ algorithms: ['HS256'] }`
  w `jwt.verify`. **Połącz** `backend/src/env.ts`: sprawdzenie długości `JWT_SECRET` (`JWT_SECRET_MIN_LENGTH`).
  Jeśli aplikacja nie startuje z komunikatem „za krótki”, wygeneruj nowy sekret tak jak `/stepkit:start`.
- **Połącz** `docker-compose.yml`: porty MySQL i phpMyAdmin z przedrostkiem `127.0.0.1:`; potem `npm run db`.
- **Moduł Logowanie zrobiony:** nowa migracja z `users.token_version` i zmiany z punktu „Zmiana hasła kończy inne
  sesje” w `domains/login.md` (token z `ver`, sprawdzenie w `authenticate`, podniesienie przy każdej zmianie hasła),
  z testami. Moduły, w których rola widzi tylko część rekordów: sprawdź, czy warunek jest w zapytaniu i cudzy rekord
  daje 404 („Trzy sprawdzenia przy każdej trasie” w `code-conventions.md`); brak popraw, z testem.
- **Aplikacja już opublikowana:** po wdrożeniu sprawdź w przeglądarce, że strony działają (CSP blokuje zasoby spoza
  listy) i że nagłówki przychodzą: `curl -sI https://<domena>/ | grep -i content-security`.

## 0.1.27: testy w folderach __tests__

- Każdy `*.test.ts` i `*.test.tsx` w `backend/`, `frontend/`, `shared/` i `mockups/` poza `src/test/` przenieś przez
  `git mv` do folderu `__tests__` obok testowanego pliku (np. `modules/clients/clients.routes.test.ts` →
  `modules/clients/__tests__/clients.routes.test.ts`). W przeniesionych plikach popraw ścieżki względne o jeden
  poziom (`'./x'` → `'../x'`, `'../x'` → `'../../x'`) w `import`, `await import(…)` i `vi.mock(…)`.
- **Połącz** `backend/src/test/conventions.test.ts` z szablonem: test obok `*.routes.ts` szuka pliku w `__tests__/`,
  szukanie `it.todo` w `shared/src/schemas/__tests__/`, nowy blok `tests live in __tests__ folders`. Projekt nie
  zmienia tego pliku, więc zwykle wystarczy go podmienić.
- `npm run check` musi przejść; czerwony test „keep their tests in __tests__” wypisuje pliki, które zostały na miejscu.

## 0.1.28: funkcje strzałkowe

- W `backend/`, `frontend/`, `shared/`, `mockups/` i `e2e/` zamień każdą deklarację `function` na stałą ze strzałką,
  także w zrobionych modułach: `export function useClients(p: ListQuery) { … }` →
  `export const useClients = (p: ListQuery) => { … };`, `async function x()` → `const x = async () =>`,
  `export default function App()` → `const App = () => …; export default App;`. W `.tsx` typ ogólny z przecinkiem
  (`<T,>`). To zmiana zapisu, nie działania: nie zmieniaj treści funkcji.
- **Połącz** `backend/src/test/conventions.test.ts` z szablonem (blok `functions are arrow functions`); projekt nie
  zmienia tego pliku, więc zwykle wystarczy go podmienić.
- `npm run check` musi przejść. Błąd typów „użyta przed deklaracją” znaczy, że funkcję trzeba przenieść wyżej, przed
  miejsce, w którym kod ją wywołuje.

## 0.1.29: numer z adresu przez idParam, wspólna odpowiedź usługi (bezpieczeństwo)

- Nowe pliki z szablonu: `backend/src/middleware/routeHelpers.ts` i `backend/src/middleware/__tests__/routeHelpers.test.ts`.
  Jeśli projekt ma już własny plik o tej nazwie albo własne `idParam`, `fail`, `reply` (np. w plikach tras modułów),
  zostaw jeden wspólny `routeHelpers.ts` z szablonu i przepnij moduły na niego; dane dodatkowe dla ekranu (np.
  `archivedUser`) przechodzą przez `fail(…, { … })` bez zmian.
- **Połącz** `backend/src/middleware/errors.ts`: `sendError` z piątym argumentem `extra` jak w szablonie (projekt mógł
  go już dodać).
- **Połącz** `backend/src/test/conventions.test.ts` z szablonem (sprawdzenie 8: `rawParamNumber`); zwykle wystarczy
  podmienić. Każde `Number(req.params…)` i `parseInt(req.params…)` w modułach zamień na `idParam`, z testem:
  `1e3`, `0x10` i `007` w adresie → 404.

## 0.1.31: powrót na otwierany adres po zalogowaniu (bezpieczeństwo)

- **Połącz** `shared/src/navigation.ts` i `shared/src/__tests__/navigation.test.ts` z szablonem: nowa funkcja
  `safeNextPath` z testami. Jeśli projekt ma już `safeNextPath` (np. z modułu E-mail), porównaj i zostaw działającą
  wersję, nie dubluj; adresy w koncie (`/account`) przyjmuje tylko wtedy, gdy aplikacja ma konto.
- Gdy moduł Logowanie jest zrobiony, a powrotu po zalogowaniu jeszcze nie ma, zapisz go w `docs/IDEAS.md` jako
  poprawkę Logowania według „Powrót na otwierany adres” w `domains/login.md`; nie budujesz go w ramach aktualizacji.

## 0.1.32: nowa rozmowa przez /clear

- W `README.md` projektu zamień linię „Dalsza praca: …” na tę z szablonu (nowa rozmowa przez `/clear`, potem
  `/stepkit:dalej`). Jeśli użytkownik zmienił ten fragment po swojemu, zostaw go.

## 0.1.33: godziny w UTC, podświetlenie menu, „dzisiaj” i „wczoraj”

- **Połącz** `backend/src/db/pool.ts` z szablonem (`timezone: 'Z'`) i dodaj `backend/src/db/__tests__/pool.test.ts`.
  W `docker-compose.yml` i `docker-compose.prod.yml` dopisz do `command` bazy `"--default-time-zone=+00:00"`, potem
  `npm run db` (baza uruchomi się na nowo, dane zostają). Jeśli projekt ma już `timezone: 'Z'`, zostaw.
- **Połącz** `shared/src/navigation.ts` i jego test z szablonem: `activeNavKey` z `PART_HOMES` (pozycja pod `/`,
  `/admin`, `/account` świeci tylko na tym adresie). Projekt mógł to już poprawić; zostaw jedną wersję.
- **Połącz** `shared/src/date.ts`, `shared/src/__tests__/date.test.ts` i klucze `date.*` w
  `shared/locales/pl/common.json` z szablonem (`formatRelativeDateTime`, `formatRelativeDay`). Własne funkcje
  „dzisiaj/wczoraj” w modułach (np. `whenLabel`, `dayLabel` w Powiadomieniach) przepnij na wspólne i usuń, razem
  z ich kluczami tekstów, jeśli nic innego ich nie używa; testy modułu mają dalej przechodzić.

## 0.1.34: polecenie /stepkit:zglos

- W `README.md` projektu pod linią „Dalsza praca: …” dopisz linię z szablonu: „Pomysł, zmiana albo błąd: wpisz
  `/stepkit:zglos` i opisz to własnymi słowami.”
- Po aktualizacji powiedz jednym zdaniem: „Nowość: pomysł, zmianę albo błąd zgłaszasz teraz poleceniem
  `/stepkit:zglos`.”

## 0.1.35: pole daty w formularzach

- Nowe pliki z szablonu: `frontend/src/common/DateField.tsx` i `mockups/src/common/DateField.tsx` z testami
  w `__tests__/`. `npm install -w @app/mockups @mantine/dates` (w aplikacji już jest), w obu `src/main.tsx` import
  `@mantine/dates/styles.css`.
- **Połącz** z szablonem: `shared/src/date.ts` (`parseTypedDate`, import `dayjs/locale/pl`),
  `shared/src/schemas/fields.ts` (`isoDate`, `FIELD_MESSAGES.date`), ich testy, klucze `validation.date`
  i `common.date_placeholder`.
- Jeśli projekt ma już `DateField`, `isoDate` albo `parseTypedDate`, zostaw jedną wersję z szablonu i przepnij na nią
  moduły. Własne pola daty w modułach (zwykły `TextInput` albo `DateInput` z innymi ustawieniami) zamień na
  `DateField`, z testem modułu.

## 0.1.36: grupy w menu, wspólne zamiast kopii

- **Połącz** z szablonem `frontend/src/common/NavMenu.tsx`, `frontend/src/core/routes/buildRoutes.tsx`,
  `mockups/src/Shell.tsx`, `mockups/src/App.tsx` i ich testy: grupa w menu tylko rozwija swoje pozycje i nie ma
  własnej trasy. Jeśli projekt już to poprawił, zostaw jedną wersję.
- W `CLAUDE.md` projektu podmień linię „Wspólne zamiast kopii” na tę z szablonu. Istniejących powtórzeń w modułach
  **nie** wydzielasz w ramach aktualizacji: zrobi to plan następnego modułu, który ich potrzebuje (sekcje „Używam
  ponownie” i „Wydzielam” w `PLAN.md`). Po aktualizacji powiedz jednym zdaniem: „Nowa zasada: przed każdym planem
  sprawdzam, czy coś podobnego już jest w projekcie, i wtedy przenoszę to do wspólnego miejsca.”

## 0.1.38: wspólny typ `Db` dla zapytań

- **Połącz** z szablonem `backend/src/db/pool.ts` (eksport `type Db`) i `backend/src/db/__tests__/pool.test.ts`.
- W `CLAUDE.md` projektu dopisz pod linią o `withTransaction` linię o `db: Db` z szablonu i podmień punkt „Wspólne
  zamiast kopii” na ten z szablonu (wydzielenie od razu podmienia wszystkie kopie). Jeśli `docs/IDEAS.md` ma
  odłożone porządki „wspólne zamiast kopii” po wydzieleniu, zrób je przy najbliższym planie modułu (sekcja
  „Wydzielam”), bez pytania użytkownika.
- Nowy plik z szablonu: `docs/FIXES.md`. Przenieś do niego z `docs/IDEAS.md` wiersze, które są ustaloną poprawką,
  a nie pomysłem „na kiedyś” (błąd, drobna zmiana albo porządki „zrobić po <moduł>”, np. dokończenie porządków
  „wspólne zamiast kopii”): w `FIXES.md` status `czeka`, w `IDEAS.md` usuń wiersz. W `README.md` projektu dopisz
  wiersz `docs/FIXES.md` w tabeli plików, w `CLAUDE.md` linię o `FIXES.md` z szablonu. Po aktualizacji powiedz
  jednym zdaniem: „Odłożone poprawki trzymam teraz w osobnym pliku i robię je przed każdym następnym modułem.”
- Jeśli moduły mają własne `type Db = Pick<typeof pool, 'query'>` (albo podobny typ „pula lub połączenie”) w plikach
  `*.queries.ts`, usuń te kopie i importuj `type Db` z `backend/src/db/pool.ts`. Bez zmian w działaniu,
  `npm run check` zielony.

## 0.1.43: konta testowe E2E bez zaśmiecania bazy

- **Połącz** `.env.example` z szablonem (zakomentowana linia `E2E_PASSWORD`).
- Jeśli moduł Logowanie jest zrobiony: według „Konta i dane w E2E” w `code-conventions.md` i `domains/login.md` dodaj
  `e2e/global-setup.ts` i `e2e/global-teardown.ts`, wpisz je w `e2e/playwright.config.ts`, dopisz `E2E_PASSWORD` do
  `.env` (jeśli go nie ma) i przepisz testy E2E na stałe konta `e2e.<rola>@test.local`; konta tymczasowe tylko tam,
  gdzie test sprawdza zakładanie konta. Dane tworzone w testach dostają przedrostek `E2E ` i sprzątanie
  w `global-teardown.ts`.
- Nagromadzone konta testowe w lokalnej bazie: policz konta `e2e.tmp.%@test.local` (i inne konta testowe poza
  stałymi, np. o adresach w domenie `test.local`), powiedz użytkownikowi, ile ich jest, i po jego zgodzie usuń je
  razem z danymi, które utworzyły. Tylko baza lokalna, nigdy serwer.
- Sprawdź: dwa przebiegi `npm run test:e2e` pod rząd, potem lista użytkowników ma tylko stałe konta testowe
  i prawdziwe konta.
- Po aktualizacji powiedz jednym zdaniem: „Testy w przeglądarce używają teraz kilku stałych kont i sprzątają po
  sobie, więc lista użytkowników nie będzie już rosła.”

## 0.1.46: wspólne ramy szuflady, okna i kółka osoby

- Podmień `frontend/src/test/conventions.test.ts` na ten z szablonu (plik stepkit: nowy test 14, „ta sama rama
  w dwóch modułach”).
- W `CLAUDE.md` projektu podmień punkt „Wspólne zamiast kopii” na ten z szablonu (dochodzi „Przed nowym komponentem”).
- `npm run check`. Gdy test 14 jest czerwony, każdą wymienioną ramę (`Drawer`, `Modal`, `Avatar`, `Tabs`) wydziel
  według „Przed nowym komponentem porównaj” w `code-conventions.md`: jeden klocek w `frontend/src/common/` i ten sam
  w `mockups/src/common/`, treść przez `children`, z testem, i podmień **wszystkie** użycia w modułach, bez pytania
  użytkownika (np. szuflada z prawej → `SideDrawer`, okno formularza z Anuluj/Zapisz → `FormModal`, kółko osoby →
  `PersonAvatar`). Gdy kopie wyglądały różnie, wybierz wersję z `docs/DESIGN.md` (albo tę z większej liczby miejsc)
  i powiedz o tym jednym zdaniem. Makiet zrobionych modułów nie ruszasz. W `docs/DESIGN.md` przy wzorcach wpisz nazwy
  nowych klocków.
- Po aktualizacji powiedz jednym zdaniem: „Nowa zasada: zanim zbuduję nowy element ekranu, porównuję go z podobnymi
  w innych modułach; szuflady, okna i kółka osób są teraz wspólne, więc wszędzie wyglądają tak samo.”

