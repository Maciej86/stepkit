# stepkit: plugin Claude Code do budowy aplikacji www przez osoby nietechniczne (projekt)

**Data:** 2026-11-11, uporządkowany 2026-11-12 · **Status:** zaakceptowany przez właściciela 2026-11-11, uzupełnienia
z 2026-11-12 włączone do właściwych sekcji
**Źródło ustaleń:** rozmowy z 2026-11-11 i 2026-11-12. Historia: `2026-11-11-skill-STAN-ROZMOWY.md` (ten sam folder).
**Oznaczenia:** **[właściciel]** to decyzja właściciela z rozmowy. **[decyzja Claude'a]** to rzecz, która nie padła
w rozmowie, a którą właściciel może zmienić. Wszystko bez oznaczenia wynika wprost z ustaleń.

---

## 1. Po co

Na grupach FB wiele osób, które **nie umieją programować**, buduje z AI własne aplikacje i SaaS-y. Ich kłopot to
**szybkie zużywanie tokenów**. Przyczyna: cały projekt w jednej rozmowie, bez planu. Rozmowa puchnie, każda
wiadomość kosztuje coraz więcej, a AI gubi wcześniejsze ustalenia. **[właściciel]**

Plugin daje takiej osobie sprawdzony proces właściciela z Antalo (`/home/maciej/www/register`):
**Opis → Makieta → Pytania → Spec → Plan → Implementacja** **[właściciel]**. Do tego dochodzą trzy nawyki:
- praca w małych porcjach, gdzie jedna porcja to jedna nowa rozmowa,
- zapisywanie stanu w plikach `.md`,
- zapis na GitHubie po każdej działającej części.

## 2. Cele, nie-cele, anty-cele

**Cele**
1. Osoba nietechniczna z luźnym pomysłem („chcę zbierać zamówienia mojej firmy”) dostaje aplikację www z logowaniem,
   rolami i kolejnymi modułami: najpierw działającą lokalnie, na końcu opublikowaną w internecie.
2. Każda rozmowa z Claude'em jest krótka: zaczyna się od przeczytania pliku stanu, a kończy jego aktualizacją
   i poleceniem „otwórz nową rozmowę”.
3. Plugin **sam proponuje, co budować i w jakiej kolejności** **[właściciel]**.
4. **Kryterium sukcesu [właściciel]:** dla opisu aplikacji typu Antalo (firma, pracownicy, role, moduły) plugin
   projektuje nawigację, role, bazę i kolejność modułów porównywalne z tym, co powstało w Antalo.

**Nie-cele (świadomie poza zakresem)**
- Publikacja w trakcie budowy. Aplikacja powstaje lokalnie, a publikacja w internecie to **ostatni moduł** (§7.4),
  chyba że użytkownik poprosi wcześniej **[właściciel, 2026-11-12]**.
- Kilka języków na start. Interfejs jest tylko po polsku, ale wszystkie teksty od początku leżą w plikach z kluczami,
  więc dodanie języka to tłumaczenie plików (§8) **[właściciel]**.
- Wybór technologii przez użytkownika. Stos jest narzucony **[właściciel]**.
- Praca w czacie claude.ai z kopiowaniem kodu. Plugin zakłada pliki na komputerze użytkownika **[właściciel]**.
- Instrukcje dla Linuksa na komputerze użytkownika. Odbiorcy używają Windows i macOS **[właściciel]**.
  (Serwer w module „Publikacja” to Ubuntu, ale Claude obsługuje go sam przez SSH.)

**Anty-cele (porażka, nawet jeśli „działa”)**
- Makiety wymieszane z prawdziwą aplikacją albo usunięte przed zakończeniem modułu. To lekcja z Antalo **[właściciel]**.
- Jedna gigantyczna rozmowa, w której plugin buduje „od razu wszystko”.
- Język techniczny w rozmowie z użytkownikiem bez wyjaśnienia. Odbiorca nie programuje.
- Uprawnienia pilnowane tylko w menu na froncie. Backend zawsze sprawdza rolę sam.
- Hasła i klucze (`.env`) wypchnięte na GitHub albo wklejone do rozmowy.
- Makiety opublikowane na serwerze.

## 3. Odbiorca i środowisko

- Osoba nietechniczna na **Windows lub macOS** **[właściciel]**.
- Pracuje w **Claude Code** w terminalu albo jako rozszerzenie w edytorze, np. VS Code **[właściciel]**. Plugin działa
  tak samo w obu, a opis pluginu musi to mówić wprost.
- **Windows natywnie, nie w WSL** **[decyzja Claude'a]**. Użytkownik nie pracuje w WSL i nie musi o nim wiedzieć.
  Node.js i Git instaluje zwykłymi instalatorami Windows, a Claude Code działa w powłoce Git Bash (instalowanej razem
  z Gitem). WSL2 jest potrzebny tylko pod spodem Dockera Desktop: instalator Dockera sam proponuje jego włączenie
  (czasem jedna komenda `wsl --install` i restart). Warunki: Windows 10 lub 11 z aktualizacjami i włączona
  wirtualizacja w BIOS-ie (instrukcja mówi, jak rozpoznać brak). Na macOS WSL nie występuje. Skille wydają komendy działające w Git Bash
  i w terminalu macOS: `node`, `npm`, `git`, `docker compose`, `gh`, `ssh`.
- Rozmowa z użytkownikiem: **po polsku, prostym językiem**. Każde pojęcie techniczne wyjaśnione jednym zdaniem przy
  pierwszym użyciu **[decyzja Claude'a]**.
- **Zrzuty ekranu:** przy konfiguracji usług zewnętrznych (Mailgun, OVH) Claude prosi o zrzut ekranu po każdym
  etapie **[właściciel]**. Zrzut wkleja się do Claude Code (przeciągnięcie pliku albo wklejenie ze schowka). Przed
  każdym zrzutem Claude prosi o zasłonięcie haseł i kluczy; klucze użytkownik wpisuje sam do `.env`, nigdy do
  rozmowy **[decyzja Claude'a]**.

## 4. Kształt pluginu

Plugin Claude Code z dwoma skillami wywoływanymi poleceniem **[właściciel: osobne polecenie na każdy moduł;
podział na dwa skille: decyzja Claude'a]**:

| Polecenie | Kiedy | Co robi |
|---|---|---|
| `/stepkit:start` | raz, na początek | powitanie „po co te narzędzia” (tylko za pierwszym razem) → sprawdzenie komputera → szkielet i repo → opis → wywiad → podsumowanie → makieta z nawigacją i pytaniami → spec ogólny (części aplikacji, role, baza, nawigacja, kolejność modułów) → plik stanu |
| `/stepkit:dalej` | wielokrotnie, zawsze w nowej rozmowie | czyta plik stanu, kontynuuje bieżący moduł od miejsca przerwania albo zaczyna następny; po każdym etapie aktualizuje stan |

Nazwa pluginu: **`stepkit`** **[właściciel]**. Skille: `start` i `dalej` **[`dalej`: właściciel przyjął rekomendację
Claude'a; `start`: decyzja Claude'a]**. Nazwa pluginu jest przedrostkiem poleceń, więc pełne polecenia to
**`/stepkit:start`** i **`/stepkit:dalej`**. Po wpisaniu samego `/dalej` Claude Code podpowiada pełną nazwę. README
i komunikaty zawsze podają pełną formę. Przed publikacją trzeba sprawdzić, czy nazwa `stepkit` nie jest zajęta.

**Dystrybucja [właściciel]:** darmowo, przez publiczne repo na GitHubie jako marketplace pluginów Claude Code.
README prowadzi przez instalację krok po kroku.

**Skład repo pluginu [decyzja Claude'a]:**
```
skilsaas/                                repo = marketplace
├── .claude-plugin/marketplace.json
├── README.md                            dla człowieka: co to jest, jak zainstalować, jak zacząć
├── tests/antalo-expected.md             wejście i oczekiwany wynik testu Antalo
└── plugins/stepkit/
    ├── .claude-plugin/plugin.json
    ├── skills/start/
    │   ├── SKILL.md                     przebieg startu, krótki
    │   └── references/                  czytane tylko wtedy, gdy potrzebne
    │       ├── install-windows.md       Node.js, Git, Docker Desktop (z WSL2), gh, superpowers, Playwright
    │       ├── install-macos.md         to samo, z rozróżnieniem Apple / Intel
    │       ├── github.md                repo prywatne przez gh albo klik po kliku w przeglądarce
    │       ├── interview.md             obszary wywiadu i zasady zadawania pytań (§6.1)
    │       └── project-skeleton.md      kopiowanie i dopasowanie szablonu
    ├── skills/dalej/
    │   ├── SKILL.md                     przebieg etapów jednego modułu
    │   └── references/
    │       ├── mockups.md               makiety trzech części, pytania w ekranach, zaślepka
    │       ├── code-conventions.md      moduły, nazwy, teksty, stałe, walidacja, bezpieczeństwo, testy, wzorce opcjonalne
    │       ├── document-templates.md    wzory STATUS, OVERVIEW, SPEC-GENERAL, QUESTIONS, SPEC, PLAN, TESTS
    │       ├── email-mailgun.md         moduł E-mail: Mailpit lokalnie, Mailgun ze zrzutami ekranu
    │       ├── deploy-ovh.md            moduł Publikacja: VPS OVH, domena, Mailgun z domeną, kopie bazy
    │       ├── browser.md               sprawdzanie w przeglądarce przez plugin Playwright
    │       └── superpowers.md           które skille superpowers na którym etapie i z jakimi nadpisaniami
    ├── evals/                           automatyczne testy zachowania pluginu (`claude plugin eval`)
    └── template/                        gotowy szkielet aplikacji (§5), kopiowany do projektu użytkownika
```
Zasada: `SKILL.md` są krótkie, a szczegóły leżą w `references/` i są czytane tylko w kroku, który ich potrzebuje.
To ta sama oszczędność tokenów, której plugin uczy użytkownika. Treść skilli po polsku **[decyzja Claude'a]**.

**Gotowy szkielet zamiast pisania od zera [decyzja Claude'a]:** `/stepkit:start` kopiuje `template/` i dopasowuje go
po wywiadzie. To mniej tokenów i za każdym razem ten sam, przetestowany wynik. Wersje bibliotek w szablonie trzeba co
jakiś czas odświeżać.

**Inne pluginy:**
- **superpowers: wymagany [właściciel: skille do speca, planu i code review]**. Przypisanie do etapów
  **[decyzja Claude'a]**:
  - Spec → `superpowers:brainstorming`, tylko część pisania dokumentu, bo pytania zadała już makieta,
  - Plan → `superpowers:writing-plans`,
  - Implementacja → `superpowers:executing-plans` w głównej rozmowie oraz `superpowers:test-driven-development`,
  - po implementacji → `superpowers:requesting-code-review`.

  Nadpisania:
  - ścieżki `docs/modules/<module>/SPEC.md` i `PLAN.md` zamiast `docs/superpowers/...`,
  - bez worktree i bez implementacji przez subagentów, bo to zbędne i drogie w tokenach dla osoby nietechnicznej.

  Gdy superpowers nie da się zainstalować, plugin działa dalej według własnych wzorów z `document-templates.md`.
- **Playwright: wymagany [właściciel, 2026-11-12]**. Pozwala Claude'owi samemu klikać w aplikacji (§7.2).
  `/stepkit:start` nie idzie dalej bez niego; `/stepkit:dalej`, gdy go nie wykryje, prosi o instalację przed etapem testów.

## 5. Aplikacja, którą plugin buduje

### 5.1 Technologia, narzucona **[właściciel]**

- **Front:** React + Vite + TypeScript, komponenty **Mantine** **[właściciel]**.
- **Backend:** Express + mysql2 + TypeScript **[właściciel]**.
- **Walidacja na froncie i w backendzie** przez **zod** **[właściciel]**.
- **Baza:** MySQL w Dockerze, lokalnie **[właściciel]**, podgląd przez phpMyAdmin w przeglądarce **[decyzja Claude'a]**.
- **Teksty jako klucze:** `i18next` + `react-i18next` od początku **[właściciel]**.

Zestaw bibliotek w szablonie, na podstawie Antalo **[decyzja Claude'a]**:
- **front:** `react-router`, `@mantine/core`, `hooks`, `form`, `notifications`, `dates`, `dayjs`, `lucide-react`,
  `mantine-form-zod-resolver`, `zod`, `axios`, `i18next`, `react-i18next`.
  **Bez** Redux, redux-saga i styled-components.
- **backend:** `express`, `mysql2`, `zod`, `bcryptjs`, `jsonwebtoken`, `cookie-parser` (token w ciasteczku httpOnly,
  jak w Antalo), `helmet`, `cors`, `express-rate-limit` (logowanie), `dotenv`, `i18next`.
- **testy:** `vitest`, `@testing-library/react`, `supertest`, `@playwright/test`.
- **dopiero gdy moduł tego potrzebuje:** `nodemailer` (e-mail), `multer` (pliki), `cron`, `exceljs`, `winston`,
  `sanitize-html`.

### 5.2 Jedno repo **[właściciel]**, układ **[decyzja Claude'a; zasada modułów: właściciel]**

```
my-app/
├── mockups/          osobna aplikacja React + Vite + Mantine, pasek „MAKIETA”, port 5174, nie trafia na serwer
├── frontend/src/
│   ├── config/       constants.ts (stałe interfejsu)
│   ├── core/         api, routing, auth, style (wzór Antalo)
│   ├── common/       wspólne komponenty i układy stron (wzór Antalo)
│   └── modules/<module>/
├── backend/src/
│   ├── config/       constants.ts (stałe serwera)
│   ├── middleware/   logowanie, role, walidacja, limity
│   ├── db/  auth/  jobs/  email/ (gdy potrzebny)
│   └── modules/<module>/   <module>.routes.ts  <module>.queries.ts  <module>.service.ts
├── backend/migrations/    ponumerowane pliki SQL
├── shared/
│   ├── src/navigation.config.ts  trzy nawigacje i części aplikacji (§5.3)
│   ├── src/constants/            role, komunikaty serwera, stałe modułów
│   ├── src/schemas/              schematy zod wspólne dla frontu i backendu
│   └── locales/pl/               teksty: common, server, validation, email, <module>
├── e2e/              testy przeglądarkowe (@playwright/test)
├── docs/             zob. 5.5
├── docker-compose.yml       MySQL + phpMyAdmin (+ Mailpit, gdy aplikacja wysyła e-maile)
├── docker-compose.prod.yml  serwer: MySQL + backend + Caddy
├── Caddyfile  scripts/backup-db.sh  .env.production.example   pliki do publikacji (§7.4)
├── .env.example      .env w .gitignore od pierwszego commita
└── package.json      npm run dev (makiety, front, backend), npm run db, npm run check, npm run test:e2e
```

**Jedna pozycja nawigacji = ten sam folder modułu wszędzie** **[właściciel]**: `mockups/src/modules/<module>`,
`frontend/src/modules/<module>`, `backend/src/modules/<module>`, `shared/locales/pl/<module>.json`,
`docs/modules/<module>`. Rozmowa o module czyta tylko jego pliki.

`navigation.config.ts` leży w `shared/`, a nie we froncie, bo ten sam plik czytają front i makiety **[decyzja Claude'a]**.

### 5.3 Części aplikacji, nawigacja i role

**Trzy możliwe części [właściciel, 2026-11-12]**, w dowolnym zestawie ustalonym w wywiadzie:

| Część | Adres | Kto | Przykład |
|---|---|---|---|
| strona dla odwiedzających | `/` | każdy, bez logowania | strona główna, oferta, cennik, formularz |
| konto użytkownika | `/account` | zalogowany odwiedzający | „Moje zamówienia”, „Moje dane” |
| panel administracyjny | `/admin` | administrator, pracownicy | wszystkie zamówienia, ustawienia |

Każda część ma własną nawigację i własną makietę **[właściciel]**. Konfiguracja jak w Antalo **[właściciel]**,
w formie **[decyzja Claude'a]**:
- w `shared/src/navigation.config.ts`: `PUBLIC_NAVIGATION` (bez ról), `ACCOUNT_NAVIGATION` i `NAVIGATION` (panel),
  obie z `roles`, oraz `AREAS = { public, account, admin }` ustawiane w `/stepkit:start` po wywiadzie;
- `ROLE_HOME` mówi, dokąd trafia rola po zalogowaniu (np. `user` → `/account`, `admin` → `/admin`). Rola może mieć
  pozycje w kilku częściach;
- wyłączona część znika z tras i makiet. Bez strony publicznej `/` przekierowuje do logowania. Bez konta i panelu
  nie ma logowania ani ról;
- z tego samego pliku korzystają menu, ochrona adresów na froncie i makiety;
- widoczność rozstrzyga jedna funkcja przyjmująca obiekt użytkownika, a nie kolejne parametry jak w Antalo;
- **backend zawsze sprawdza rolę niezależnie od menu**, w middleware każdej trasy modułu. W koncie dane są zawsze
  filtrowane po zalogowanej osobie.

**Wzorce opcjonalne**, włączane tylko gdy wywiad je potwierdzi; decyzja zapada w specu ogólnym, przed modułem
Logowanie, bo zmienia tabelę użytkowników **[decyzja Claude'a]**:
- **wiele firm:** kolumna `company_id` w każdej tabeli danych, brana zawsze z tokenu, nigdy z żądania (zasada z Antalo);
- **dostęp nadawany przez administratora:** tabela przydziałów użytkownik ↔ moduł, sprawdzana w funkcji widoczności
  nawigacji i w middleware backendu;
- **archiwum** i **historia zmian** (§8), też ustalane w wywiadzie i wpisane do szkieletu przed modułem Logowanie.

### 5.4 Kolejność budowy, którą plugin proponuje **[właściciel]**

1. Projekt bazy danych, czyli jakie dane aplikacja zbiera. Powstaje w specu ogólnym.
2. Statyczny ekran logowania.
3. Podpięcie logowania do bazy: tabela użytkowników, hasła `bcryptjs`, token w ciasteczku, role (oraz blokada
   zarchiwizowanych kont, gdy archiwum obejmuje użytkowników).
4. Pierwsze API.
5. Kolejne pozycje nawigacji jako osobne moduły, w kolejności z pliku stanu. Moduł wskazany w wywiadzie jako
   „najważniejszy na start” (obszar 20) idzie zaraz po logowaniu.
6. **Publikacja** jako ostatni moduł (§7.4) **[właściciel]**.

Kroki 2–4 to pierwszy moduł, „Logowanie” **[decyzja Claude'a]**. Rejestracja i zarządzanie użytkownikami, jeśli są,
to osobne moduły zaraz po nim. Moduł **„E-mail”** (§7.3), jeśli aplikacja wysyła e-maile, stoi przed pierwszym modułem,
który go potrzebuje. Każdy moduł ma w `STATUS.md` listę modułów, od których zależy.

### 5.5 Dokumenty w `docs/` **[decyzja Claude'a, wzorowane na Antalo]**

| Plik | Treść | Kto czyta |
|---|---|---|
| `docs/STATUS.md` | gdzie jesteśmy: kroki startu, lista modułów ze statusem, etapem i zależnościami, następny krok, ostatnie decyzje, procedura „wgraj nową wersję” (po publikacji). **Krótki, maks. ok. 60 linii.** | każda rozmowa na start |
| `docs/OVERVIEW.md` | opis użytkownika + wynik wywiadu, zaakceptowane podsumowanie | spec ogólny, rzadko potem |
| `docs/SPEC-GENERAL.md` | słownik pojęć, części aplikacji, role i tabela uprawnień, nawigacja, model danych w zarysie z tabelą relacji (reguła przy usunięciu), lista danych z archiwum, zakres historii zmian, lista modułów z kolejnością, uzasadnieniem i zależnościami, zasady wspólne | początek każdego modułu |
| `docs/modules/<module>/QUESTIONS.md` | pytania z makiety (warianty a/b/c + rekomendacja) i odpowiedzi z datą | spec modułu |
| `docs/modules/<module>/SPEC.md` | spec modułu | plan, implementacja |
| `docs/modules/<module>/PLAN.md` | kroki implementacji z testami, każdy możliwy do sprawdzenia | implementacja |
| `docs/modules/<module>/TESTS.md` | scenariusze „kliknij i sprawdź” dla każdej roli, jak `TESTY-*.md` w Antalo; z nich powstają testy e2e | Claude w przeglądarce, użytkownik, testy e2e |

Decyzje, których użytkownik nie podjął, są w specach oznaczane **[decyzja AI]**, jak w Antalo **[decyzja Claude'a]**.
Wartości statusów w `STATUS.md` są po polsku (`zrobiony`, `w toku`, `wstrzymany`, `czeka`), bo czyta je człowiek.

## 6. Przebieg `/stepkit:start`

0. **Powitanie i „po co te narzędzia” [właściciel, 2026-11-12], tylko przy pierwszym uruchomieniu**
   `/stepkit:start` w danym projekcie (gdy nie ma jeszcze `docs/STATUS.md`). Przy wznowieniu i w `/stepkit:dalej`
   Claude go nie powtarza. Zanim Claude cokolwiek sprawdzi, krótko (kilka
   zdań, bez żargonu) wyjaśnia, co będzie potrzebne i po co. Nacisk: **to głównie narzędzia pracy Claude'a**.
   Użytkownik instaluje je raz i nie musi się ich uczyć, a dzięki nim praca jest szybsza, stabilniejsza i bezpieczniejsza.
   Treść **[decyzja Claude'a]**:
   - **Node.js:** silnik, na którym działa aplikacja na Twoim komputerze. Claude używa go do uruchamiania, budowania
     i testowania aplikacji, więc sam widzi, czy coś działa, zamiast zgadywać;
   - **Docker:** „pudełko” z bazą danych. Baza działa tak samo na każdym komputerze i na serwerze, bez ręcznej
     instalacji MySQL, i da się ją włączyć i wyłączyć jedną komendą;
   - **Git i GitHub:** punkty zapisu jak w grze. Po każdej działającej części powstaje zapis. Gdy coś się zepsuje,
     wracamy do wersji, która działała, a kod jest bezpieczny, nawet jeśli komputer padnie. Z GitHuba aplikacja
     trafi też na serwer;
   - **superpowers:** sprawdzone sposoby pracy dla Claude'a (spec, plan, przegląd kodu), dzięki którym mniej się myli;
   - **Playwright:** pozwala Claude'owi samemu klikać w aplikacji i sprawdzać ją, zanim poprosi o to Ciebie.

   Na koniec jedno zdanie: „Ty mówisz, co ma działać, a narzędziami zajmuję się ja.”
1. **Sprawdzenie komputera.** Claude sprawdza Node.js, Git, Docker, superpowers, Playwright i opcjonalnie `gh`. Dla
   brakujących podaje instrukcję krok po kroku z `references/` dla systemu użytkownika: Windows (Docker z WSL2) albo
   macOS (Apple / Intel) **[właściciel: Docker z instrukcją; reszta: decyzja Claude'a]**. Nie idzie dalej, dopóki
   `node --version`, `git --version` i `docker --version` nie działają, a plugin Playwright nie jest zainstalowany.
   superpowers jest wymagany, ale gdy instalacja się nie uda, nie blokuje: plugin przechodzi na własne wzory i zapisuje
   to w `STATUS.md`.
2. **Szkielet i repo.** Kopia szablonu (§5.2), `npm install`, jednorazowe pobranie przeglądarki do testów
   (`npx playwright install chromium`), `npm run check`. Repo **prywatne** na GitHubie przez `gh`, a bez niego
   instrukcja w przeglądarce **[właściciel: instrukcja GitHub; prywatne i gh: decyzja Claude'a]**. Pierwszy commit
   już z `.gitignore` zawierającym `.env`.
3. **Opis.** „Opisz własnymi słowami, co chcesz stworzyć.” Właściciel chciał wymusić min. ~200 znaków. Skill nie może
   tego technicznie zablokować, więc krótki opis nie jest odrzucany, tylko Claude dopytuje o to, czego brakuje: kto
   używa, co robi krok po kroku, jakie dane się zbiera. Robi to, aż opis ma treść porównywalną z ~200+ znakami
   **[właściciel: cel; sposób: decyzja Claude'a]**.
4. **Wywiad** (§6.1), już na podstawie opisu.
5. **Podsumowanie do akceptacji** z możliwością poprawek **[właściciel]**. Zapis do `docs/OVERVIEW.md`. Dopasowanie
   szablonu: `AREAS`, role, trzy nawigacje.
6. **Makieta ogólna.** `mockups/` z włączonymi częściami (przełącznik „Strona | Konto | Panel”), pełną nawigacją
   każdej części, przełącznikiem „Oglądam jako: <rola>” w koncie i panelu oraz prostym ekranem każdej pozycji na
   zmyślonych danych. Na ekranach **pytania** w wyróżnionych ramkach **[właściciel; nawigacja jako najważniejsza:
   właściciel; przełączniki: decyzja Claude'a]**. Użytkownik ogląda makietę w przeglądarce i odpowiada w rozmowie,
   a odpowiedzi trafiają do `docs/`.
7. **Spec ogólny** (`docs/SPEC-GENERAL.md`): części aplikacji, role, tabela uprawnień, nawigacja, **projekt bazy**
   z kluczami obcymi i regułą przy usunięciu dla każdej relacji, archiwum i historia zmian (zakres z wywiadu),
   wzorce opcjonalne, lista modułów w kolejności z §5.4, z zależnościami, zakończona modułem „Publikacja”. Do akceptacji
   użytkownika.
8. **Plik stanu i pożegnanie.** `docs/STATUS.md`, commit „Plan aplikacji gotowy”, push, a na koniec komunikat:
   **„Otwórz nową rozmowę i wpisz `/stepkit:dalej`.”**

Jeśli kroki 1–8 nie zmieszczą się w jednej rozmowie, `/stepkit:start` zapisuje postęp w `docs/STATUS.md` (sekcja
„Start aplikacji”) i przy ponownym uruchomieniu kontynuuje od miejsca przerwania **[decyzja Claude'a]**.

### 6.1 Wywiad

Na sztywno zapisana jest tylko **lista obszarów**. Konkretne pytania Claude dopasowuje do opisu
**[właściciel: obszary 1, 3–6, 11, 12, 14, 17; pozostałe: decyzja Claude'a]**:
- gdy odpowiedź wynika z opisu, Claude ją zgaduje i prosi tylko o potwierdzenie,
- gdy obszar nie dotyczy aplikacji, pomija go,
- gdy coś jest niejasne, pyta z **wariantami a/b/c i rekomendacją** („(polecam)”), jak w Antalo,
- zadaje **jedno pytanie na raz**, prostym językiem.

Obszary, w tej kolejności (1–7 decydują o szkielecie, więc idą pierwsze; 8, 11 i 12 o kształcie bazy):

1. **Części aplikacji:** strona dla odwiedzających, konto użytkownika, panel administracyjny. Które są potrzebne?
2. **Kto używa:** jakie grupy ludzi? Z tego wychodzą role.
3. **Logowanie:** kto się loguje, a kto korzysta bez konta?
4. **Rejestracja:** konta zakładane samodzielnie czy przez administratora?
5. **Role i uprawnienia:** co każda grupa widzi i może zmieniać?
6. **Dostęp do części aplikacji:** czy administrator włącza lub wyłącza części konkretnym osobom?
7. **Wiele firm:** jedna firma czy wiele, każda ze swoimi danymi (SaaS)?
8. **Dane:** co aplikacja zbiera i przechowuje?
9. **Główna czynność:** co dzieje się krok po kroku od początku do końca?
10. **Statusy:** czy rzeczy mają etapy (np. nowe / w realizacji / wysłane)?
11. **Historia zmian [właściciel, 2026-11-12]:** czy aplikacja ma zapisywać i pokazywać, **kto, co i kiedy** zrobił?
    Jeśli tak: **zakres** (np. zmiany i usunięcia danych, zmiany statusów, logowania; których modułów dotyczy) i **kto
    widzi historię** (np. tylko administrator).
12. **Usuwanie i archiwum [właściciel, 2026-11-12]:** Claude **sam proponuje**, które dane archiwizować zamiast usuwać
    (domyślnie: ludzie, np. pracownicy i klienci, oraz główne rekordy, np. zamówienia), i prosi o potwierdzenie.
    Pyta też, kto może przywracać z archiwum i czy z archiwum da się usunąć na stałe.
13. **Powiadomienia w aplikacji:** czy ktoś ma widzieć informacje o zdarzeniach po zalogowaniu?
14. **E-maile:** czy aplikacja wysyła e-maile, do kogo i przy jakich zdarzeniach?
15. **Pliki:** zdjęcia, dokumenty?
16. **Raporty i eksporty:** podsumowania, pobieranie do Excela?
17. **Wygląd:** kolory (firmowe, nastrój albo wybiera Claude) i przełącznik jasny/ciemny motyw.
18. **Języki:** tylko polski czy później inne (czy zaplanować przełącznik języka)?
19. **Publikacja:** czy jest już domena lub serwer? Jeśli nie, domyślnie OVH na końcu budowy.
20. **Co najważniejsze na start:** gdyby aplikacja miała umieć tylko jedną rzecz, to którą?

## 7. Przebieg `/stepkit:dalej`

Na start: przeczytaj `docs/STATUS.md`, a potem tylko `docs/SPEC-GENERAL.md` i pliki bieżącego modułu. Powiedz
użytkownikowi w jednym zdaniu, gdzie jesteśmy i co teraz robimy. Brak `STATUS.md` albo nieskończony start →
skieruj do `/stepkit:start`.

### 7.1 Etapy jednego modułu **[właściciel]**

| Etap | Wynik | Akceptacja użytkownika |
|---|---|---|
| **Makieta** | szczegółowe ekrany modułu w `mockups/src/modules/<module>` z pytaniami w ramkach | ogląda w przeglądarce |
| **Pytania** | odpowiedzi w `QUESTIONS.md` (warianty + rekomendacja) | odpowiada |
| **Spec** | `SPEC.md`: ekrany, dane i zmiany w bazie, uprawnienia, walidacja, teksty | akceptuje |
| **Plan** | `PLAN.md`: małe kroki z testami, każdy kończy się czymś do sprawdzenia | akceptuje |
| **Implementacja** | testy, potem kod w `frontend/`, `backend/`, `shared/`, migracja SQL; `npm run check` po każdym kroku; przegląd kodu | — |
| **Testy** | Claude w przeglądarce (§7.2), testy e2e, potem użytkownik według `TESTS.md` | potwierdza, że działa |
| **Zamknięcie** | ekran modułu w makiecie zamieniony na zaślepkę **„Tę część już wykonano”** **[właściciel]**; `STATUS.md`; commit z polskim opisem; push | — |

**Nieskończony moduł [pytanie właściciela; odpowiedź: decyzja Claude'a]:** polecenie **nigdy nie przeskakuje**
nieskończonego modułu. Gdy w `STATUS.md` jest moduł w toku, Claude mówi, na czym stanęło (moduł, etap, krok planu),
i kontynuuje. Jeśli użytkownik wprost chce zająć się innym modułem:
- Claude wyjaśnia skutki i prosi o potwierdzenie,
- bieżący moduł dostaje status **„wstrzymany”** z dokładnym miejscem powrotu,
- w toku może być tylko jeden moduł naraz, a wstrzymane wracają jako pierwsze,
- **nie da się zacząć modułu, którego zależności nie są zrobione** (np. nic przed Logowaniem).

Dlatego polecenie nazywa się `dalej`, a nie „następny moduł”: często kontynuuje bieżący moduł zamiast zaczynać nowy.

**Granice rozmów [decyzja Claude'a]:** po zakończeniu etapu Claude aktualizuje `STATUS.md` i ocenia, czy rozmowa jest
już długa. Jeśli tak, mówi „Otwórz nową rozmowę i wpisz `/stepkit:dalej`.” Implementacja dużego modułu może obejmować
kilka rozmów, a `PLAN.md` z odhaczonymi krokami mówi, gdzie wrócić. Duży moduł można podzielić na części (jak
„część 1 / 2 / 3” w Antalo) już na etapie specu.

**Makiety żyją do końca modułu [właściciel]:** plugin nigdy nie usuwa makiety modułu, który nie jest zamknięty.
Po zamknięciu zostaje zaślepka. Cała `mockups/` zostaje w repo.

**Podgląd postępu [właściciel: potrzebny, w makietach]:** ostatnia pozycja nawigacji makiet **„Postęp”**, a nie
w prawdziwej aplikacji, bo informacje dla twórcy nie powinny trafić do jej przyszłych użytkowników. Strona czyta
`docs/STATUS.md` bezpośrednio, więc jest zawsze aktualna, i pokazuje moduły ze statusem oraz następny krok
**[forma: decyzja Claude'a]**.

### 7.2 Testy aplikacji **[właściciel: aplikacja ma testy, zapisane testy przeglądarkowe, testowanie w przeglądarce]**

Trzy warstwy:
1. **Automatyczne testy kodu**, pisane przed kodem, uruchamiane `npm run check` po każdym kroku planu. Zakres
   **[propozycja Claude'a, zatwierdzona przez właściciela 2026-11-12]**:
   - backend: test każdej trasy modułu (poprawne dane, błędna walidacja, brak logowania, zła rola),
   - `shared/`: schematy zod,
   - frontend: formularze i listy modułu,
   - skutki usuwania (reguły kluczy obcych), archiwum i przywracanie, wpisy w historii zmian (gdy dotyczą modułu).
2. **Claude klika w przeglądarce na żywo** (plugin Playwright, wymagany): po implementacji otwiera aplikację i makietę,
   przechodzi `TESTS.md` dla każdej roli, robi zrzuty ekranu, czyta błędy konsoli, naprawia usterki.
3. **Zapisane testy przeglądarkowe** (`@playwright/test`, `e2e/<module>.spec.ts`) ze scenariuszy `TESTS.md`,
   uruchamiane jedną komendą `npm run test:e2e`, która sama startuje aplikację. Uruchamiane przy zamknięciu modułu,
   bo wymagają bazy. Powtarzalne po każdej zmianie, więc pokazują, czy nowy moduł nie zepsuł starego.

Moduł jest „zrobiony” dopiero po potwierdzeniu użytkownika.

### 7.3 Moduł „E-mail” **[właściciel: dopytać o e-maile, zewnętrzna usługa Mailgun, zrzuty ekranu; Mailpit: właściciel przyjął propozycję Claude'a]**

- **Lokalnie najpierw Mailpit:** kontener dopisywany do `docker-compose.yml`, który łapie wszystkie wysłane e-maile
  i pokazuje je w przeglądarce (`http://localhost:8025`). E-maile da się zbudować i przetestować bez konta i bez ryzyka
  wysłania czegoś do prawdziwych ludzi.
- **Jeden sposób wysyłki:** SMTP przez `nodemailer`. Mailpit i Mailgun różnią się tylko danymi w `.env`
  (`EMAIL_TRANSPORT=mailpit|mailgun`). To jedna biblioteka zamiast `mailgun.js` z Antalo **[decyzja Claude'a]**.
- **Mailgun ze zrzutami ekranu:** rejestracja, region **EU**, domena testowa (sandbox) i jej ograniczenie (wysyła tylko
  do zatwierdzonych adresów), dodanie swojego adresu jako odbiorcy, dane SMTP, e-mail testowy. Własna domena w module
  „Publikacja”.
- Treści e-maili jako klucze w `shared/locales/pl/email.json`.

### 7.4 Moduł „Publikacja” **[właściciel: ostatni krok łączący Mailgun i serwer, domyślnie OVH, zrzuty ekranu, na końcu chyba że użytkownik chce wcześniej]**

**Dlaczego razem:** domena kupiona w OVH ma strefę DNS w panelu OVH, a tam trafiają też rekordy weryfikujące domenę
w Mailgun. Jedna wizyta w panelu DNS załatwia oba tematy. Forma **[decyzja Claude'a]**:
- **OVH: VPS** (najmniejszy wystarczy na start) z Ubuntu LTS i **domena**. Zwykły hosting www OVH nie uruchamia
  aplikacji Node.js, o czym instrukcja mówi wprost;
- **na serwerze ten sam Docker co lokalnie:** `docker-compose.prod.yml` z MySQL, backendem i **Caddy** (serwer www,
  który sam załatwia certyfikat HTTPS). Front jest budowany (`npm run build`) i serwowany przez Caddy;
  **makiety nie są publikowane**;
- **kroki:**
  1. zakup VPS i domeny (zrzuty ekranu),
  2. klucz SSH, który Claude generuje na komputerze użytkownika i podaje, gdzie wkleić,
  3. przygotowanie serwera przez SSH: aktualizacje, zapora (22, 80, 443), Docker,
  4. rekord A domeny na IP serwera,
  5. kod z GitHuba na serwer, `.env` produkcyjny z nowymi, silnymi hasłami (tworzony na serwerze, nie w repo),
     uruchomienie, migracje, pierwszy administrator,
  6. Mailgun: własna domena, rekordy DNS w OVH, weryfikacja, `EMAIL_TRANSPORT=mailgun`,
  7. **kopia zapasowa bazy:** codzienny `mysqldump` przez cron, 7 ostatnich (wzór: kopie w Antalo),
  8. sprawdzenie: Claude otwiera adres w przeglądarce i uruchamia testy e2e tylko do odczytu;
- **aktualizacja po zmianach:** procedura „wgraj nową wersję” zapisana w `STATUS.md` (`git pull`, przebudowa, migracje);
- **inny dostawca niż OVH:** kroki 3–8 są takie same (każdy VPS z Ubuntu), zmieniają się tylko zrzuty z panelu.

## 8. Zasady obowiązujące w kodzie aplikacji

- **Nazwy w kodzie po angielsku [właściciel, 2026-11-12]:** foldery, pliki, funkcje, zmienne, typy, klucze modułów,
  tabele i kolumny, nazwy plików dokumentów. Także **adresy URL** (`/account`, `/admin`) **[właściciel, 2026-11-12]**. Po
  polsku tylko to, co czyta człowiek: interfejs, komunikaty, treść dokumentów i skilli, opisy commitów. Wyjątek:
  polecenie `dalej`.
- **Teksty jako klucze w osobnych plikach [właściciel, 2026-11-12, wzór: Antalo]:** żaden tekst widoczny dla
  człowieka nie jest wpisany w kod. Forma **[decyzja Claude'a]**:
  - jedno miejsce dla frontu, makiet i backendu: `shared/locales/pl/<namespace>.json`; przestrzenie `common`,
    `server`, `validation`, `email` i **jedna na moduł**. W Antalo jest jeden duży plik na język, a podział na moduły
    oszczędza tokeny tak samo jak foldery modułów;
  - backend zwraca **klucze**, nie teksty (jak w Antalo): `{ error: { message: 'server.not_found', fields?: { email:
    'validation.email_invalid' } } }`, z właściwym kodem HTTP. Front tłumaczy przez `t()`. Klucze komunikatów serwera
    jako stałe w `shared/src/constants/messages.ts` (jak `MESSAGES` w Antalo);
  - schematy zod mają komunikaty jako klucze `validation.*`; e-maile tłumaczy backend własną instancją i18next;
  - makiety używają tych samych kluczy, więc teksty z makiety przechodzą do aplikacji bez przepisywania;
  - nowy język: skopiować `pl/` do np. `en/` i przetłumaczyć wartości.
- **Stałe w plikach konfiguracyjnych [właściciel, 2026-11-12]:** wartości zmieniane tylko w kodzie (role, statusy,
  limity, długości pól, czas ważności tokenu) w `shared/src/constants/` (wspólne; stałe modułu w `<module>.ts`),
  `backend/src/config/constants.ts` i `frontend/src/config/constants.ts`. Bez „magicznych” liczb i tekstów
  w modułach. `.env` tylko na sekrety i ustawienia zależne od komputera.
- Rola sprawdzana w backendzie na każdej trasie modułu. Menu tylko ukrywa pozycje.
- Ten sam schemat zod waliduje formularz na froncie i żądanie w backendzie (`shared/`).
- Zapytania SQL tylko z parametrami (`?` w mysql2), nigdy sklejane z tekstu.
- Hasła tylko jako hash `bcryptjs`. Token w ciasteczku httpOnly. Limit prób logowania (`express-rate-limit`).
- Każda zmiana bazy jako ponumerowana migracja SQL, nigdy ręcznie w phpMyAdmin.
- **Klucze obce w bazie [właściciel, 2026-11-12]:** każda relacja między tabelami ma klucz obcy, żeby usunięcie
  jednych danych porządkowało powiązane. Model danych w specu ogólnym i w specu modułu mówi przy **każdej relacji**,
  co się dzieje przy usunięciu. Reguły domyślne **[decyzja Claude'a, wzór: Antalo „usuwanie twarde, z kaskadą”]**:
  - `ON DELETE CASCADE` dla danych, które bez rodzica nie mają sensu (zamówienie → pozycje zamówienia),
  - `ON DELETE SET NULL` dla autorstwa (`created_by`, `updated_by`), żeby usunięcie konta nie kasowało jego pracy;
    tam, gdzie trzeba pokazać autora, obok zapisana kopia imienia i nazwiska (jak komentarze w Antalo),
  - `ON DELETE RESTRICT`, gdy usunięcie skasowałoby ważne dane, których użytkownik by się nie spodziewał (np. klient
    z zamówieniami). Wtedy makieta pyta, co ma się stać, a interfejs przed usunięciem pokazuje, ile powiązanych
    rekordów zniknie albo dlaczego nie można usunąć;
  - tabele InnoDB, indeks na każdej kolumnie klucza obcego; testy usuwania w backendzie sprawdzają skutki kaskady.
- **Miękkie usuwanie, czyli archiwum [właściciel, 2026-11-12, wzór: archiwizacja w Antalo]:** dla danych wskazanych
  w wywiadzie (obszar 12) „Usuń” w interfejsie oznacza **przeniesienie do archiwum**, a nie skasowanie. Forma
  **[decyzja Claude'a]**:
  - kolumny `archived_at DATETIME NULL` i `archived_by` (FK do `users`, `SET NULL`); `NULL` oznacza aktywny rekord;
  - listy domyślnie pokazują tylko aktywne; obok zakładka lub filtr **„Archiwum”** z akcją **„Przywróć”**;
  - zarchiwizowany rekord dalej widać tam, gdzie był użyty (np. przy starym zamówieniu), z dopiskiem
    „zarchiwizowany”, ale nie da się go wybrać w nowych formularzach (zasada z Zadań w Antalo);
  - **zarchiwizowany użytkownik nie może się zalogować**, a jego otwarte sesje wygasają od razu: backend przy każdym
    żądaniu sprawdza, czy konto jest aktywne (jak `tokens_valid_from` w Antalo);
  - archiwizacja rodzica z dziećmi (np. firma z pracownikami) archiwizuje też dzieci ze znacznikiem „razem z rodzicem”,
    a przywrócenie rodzica przywraca tylko te dzieci (jak `archived_by_company` w Antalo);
  - usunięcie na stałe, jeśli w ogóle dozwolone, jest możliwe **tylko z archiwum**, dla ról ustalonych w wywiadzie,
    po potwierdzeniu z liczbą powiązanych rekordów; wtedy działają reguły kluczy obcych;
  - unikalne pola (np. e-mail) obejmują też archiwum: zamiast tworzyć nowe konto z tym samym adresem, aplikacja
    proponuje przywrócenie;
  - archiwizacja i przywrócenie trafiają do historii zmian, jeśli jest włączona.
- **Historia zmian [właściciel, 2026-11-12]**, gdy wywiad (obszar 11) ją potwierdzi. Forma **[decyzja Claude'a,
  wzór: `activity_log` w Antalo]**:
  - tabela `activity_log`: kto (`user_id` z `SET NULL` + kopia nazwy), co (`action`, `entity_type`, `entity_id`),
    zmiany jako pary „przed → po” (JSON), kiedy (`created_at`);
  - **bez klucza obcego do rekordu, którego dotyczy wpis**, żeby historia przetrwała usunięcie tego rekordu
    (świadomy wyjątek od zasady kluczy obcych);
  - wpisy zapisywane w warstwie zapytań modułu, w tej samej transakcji co zmiana (zasada z Antalo);
  - ekran „Historia zmian” w panelu z filtrami (moduł, osoba, data), widoczny dla ról ustalonych w wywiadzie;
  - zakres z wywiadu zapisany w `SPEC-GENERAL.md`; każdy spec modułu wymienia, które jego czynności trafiają do historii.
  Jeśli historia jest potrzebna, jest wpisana do szkieletu od pierwszego modułu, bo dorabianie jej później oznacza
  brak wpisów za wcześniejszy okres.
- Teksty interfejsu bez żargonu. Pusta lista pokazuje komunikat zachęcający do działania.

## 9. Co zostaje dla wykonawcy

- Dokładne brzmienie `SKILL.md` i plików `references/`.
- Konkretne wersje bibliotek (aktualne stabilne w chwili pisania).
- Wygląd zaślepki, paska „MAKIETA”, ramek z pytaniami i strony „Postęp”.

## 10. Jak sprawdzimy plugin

1. **Test Antalo [właściciel]:** `tests/antalo-expected.md` zawiera opis wejściowy napisany jak przez nietechnicznego
   właściciela firmy oraz oczekiwane części aplikacji, role, pozycje nawigacji, główne tabele i kolejność modułów,
   wyciągnięte z dokumentacji Antalo. „Porównywalne” oznacza te same role, wszystkie główne obszary nawigacji
   i logowanie jako pierwszy moduł.
2. **Test skromnego opisu:** „Chciałbym zbierać zamówienia własnej firmy”. Plugin ma dopytać, a nie ruszyć dalej
   z pustym opisem.
3. **Test nowej rozmowy:** po zamknięciu rozmowy w połowie modułu `/stepkit:dalej` ma wrócić dokładnie tam, gdzie
   przerwano, czytając tylko `STATUS.md`, `SPEC-GENERAL.md` i pliki modułu.
4. **Evale** (`claude plugin eval`): zachowanie skilli w typowych sytuacjach (powitanie przy pierwszym uruchomieniu,
   krótki opis, kontynuacja, odmowa pominięcia, wstrzymanie, brak stanu, oszczędne czytanie, testy przed kodem).
5. **Test instalacji** na czystym Windows (Docker z WSL2) i na macOS: właściciel albo ochotnik z grupy, bo wykonawca
   pracuje na WSL.
6. **Test publikacji** na prawdziwym VPS OVH z domeną testową, łącznie z Mailgun i kopią bazy.

## 11. Rozstrzygnięte 2026-11-12

- Zakres automatycznych testów kodu (§7.2): zatwierdzony.
- Playwright: wymagany (§4).
- Adresy URL po angielsku (`/account`, `/admin`): zatwierdzone.
- Doszło: klucze obce z regułą przy usunięciu, archiwum (miękkie usuwanie), historia zmian (§8; obszary 11–12 wywiadu).
