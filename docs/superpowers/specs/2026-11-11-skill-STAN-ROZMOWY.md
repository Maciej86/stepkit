# Skill do planowania aplikacji: stan rozmowy

**Data:** 2026-11-11 · **Status:** brainstorming w toku, nic nie jest jeszcze zbudowane ani zatwierdzone
**Cel tego pliku:** zapis ustaleń, żeby rozmowę można było podjąć w nowej sesji bez utraty kontekstu.

---

## 1. Problem (słowa właściciela)

Na grupach FB widać wiele osób, które **nie umieją programować, a piszą własne aplikacje lub SaaS z AI**.
Ich typowy kłopot to **szybkie zużywanie tokenów**. Założenie właściciela: prowadzą wszystko w jednej
rozmowie i nie planują pisania aplikacji.

## 2. Wizja skilla (słowa właściciela)

1. **Aplikacja ma działać jako strona www.**
2. **Start:** ogólne pytanie „co chcesz stworzyć?”. Opis użytkownika bywa bardzo skromny („Chciałbym zbierać
   zamówienia własnej firmy”), dlatego skill ma wymusić dłuższy opis (min. ~200 znaków, może więcej).
3. **Wywiad:** po analizie opisu seria pytań, na przykład: czy jest logowanie, czy jest rejestracja, czy są role
   (administrator / użytkownik), czy administrator nadaje dostęp do części aplikacji i tak dalej.
4. **Podsumowanie do akceptacji** z możliwością korekty.
5. **Plan ogólny** tworzenia aplikacji: podział na części, wszystko w plikach `.md`.
6. Dalej praca **schematem właściciela** wypracowanym przy Antalo (`/home/maciej/www/register`):
   **Opis → Makiety → Pytania → Spec → Plan → Implementacja**.
   - Opis już jest, bo powstał z wywiadu.
   - Claude tworzy makiety, w których **są pytania**, na które użytkownik musi odpowiedzieć.
   - **Najważniejsza jest nawigacja aplikacji.** Każda pozycja nawigacji jest potem rozbijana na mniejsze
     elementy, zależnie od specyfikacji.
7. **Wzorzec testowy:** Antalo. Skill sprawdzamy tym, czy zaprojektowałby aplikację tego typu.
8. Właściciel nigdy nie pisał skilla i prosi o korektę, jeśli coś robi źle.

## 3. Uwagi i propozycje Claude'a (do potwierdzenia przez właściciela)

- **Tokeny oszczędza zmiana nawyku, nie same pliki.** Zasada „jedna część = jedna nowa rozmowa”. Każda
  rozmowa zaczyna się od przeczytania krótkiego pliku stanu („gdzie jesteśmy”), a kończy jego aktualizacją.
  Skill na koniec etapu mówi wprost: „otwórz nową rozmowę i wpisz: …”. *(propozycja Claude'a)*
- **Minimum 200 znaków nie da się wymusić technicznie**, bo skill to instrukcja dla Claude'a, a nie formularz.
  Zamiast odrzucać krótki opis, Claude dopytuje o to, czego brakuje (kto używa, co się dzieje krok po kroku).
  *(propozycja Claude'a)*
- **Pytania w wywiadzie dopasowane do opisu.** Gdy odpowiedź wynika z opisu, Claude ją zgaduje i prosi tylko
  o potwierdzenie. *(propozycja Claude'a)*
- **Skill może korzystać z innych skilli** (np. `frontend-design`), ale tylko wtedy, gdy użytkownik ma je
  zainstalowane. Odbiorcy zwykle ich nie mają, więc skill potrzebuje własnych, krótkich wskazówek do makiet,
  a `frontend-design` traktuje jako opcję. *(propozycja Claude'a)*

## 4. Co pokazuje Antalo (`/home/maciej/www/register`), przegląd z 2026-11-11

Na przykładzie modułu **Zadania** (najpełniejszy ślad procesu):

1. **Wpis pomysłu** w `dokumentacja/ROZWÓJ.md`: status, krótka idea, lista **otwartych pytań**.
2. **Propozycja zakresu:** ponumerowane pytania, każde z wariantami a/b/c i **rekomendacją** przy jednym
   z nich. Właściciel wybiera warianty.
3. **Decyzje właściciela w rundach**, każda z datą („Decyzje 2026-10-31”, „druga runda”), plus osobna sekcja
   „Dodane przez właściciela (poza pytaniami)”. Rzeczy odłożone są zapisane jako **ODŁOŻONE** razem z kształtem
   na później.
4. **Klikalna makieta** w prawdziwej aplikacji (gałąź `feature/zadania`, `frontend-app/src/features/Dashboard/TasksMockup/`).
5. **Spec ogólny** (`docs/superpowers/specs/2026-10-31-zadania-spec-ogolny-design.md`) zawiera: cel i kryterium
   sukcesu, słownik pojęć, **podział na części** (1. Fundament, 2. Komunikacja, 3. Demo, z uzasadnieniem
   „po co osobno”), zasady wspólne dla wszystkich części, tabelę uprawnień według ról, model danych w zarysie.
   Decyzje, które nie padły w rozmowie, są oznaczone **[decyzja autora specu]**.
6. **Spec szczegółowy dla każdej części**, potem **plan dla każdej części**
   (`docs/superpowers/specs/…-czesc-N-…-design.md`, `docs/superpowers/plans/…-czesc-N-….md`).
7. **Implementacja** (subagent-driven, ślady w `.superpowers/sdd/`).
8. **Ręczny plan testów** dla każdej części (`dokumentacja/TESTY-ZADANIA-N.md`) i **dokumentacja działania**
   (`dokumentacja/działanie-aplikacji/ZADANIA.md`).
9. Istnieje też plik stanu rozmowy (`docs/superpowers/specs/2026-10-06-terminal-STAN-ROZMOWY.md`), czyli ten sam
   mechanizm przekazywania kontekstu między sesjami, który proponuję w punkcie 3.

**Obserwacja do wyjaśnienia:** w Zadaniach kolejność była **Pytania (z wariantami) → Decyzje → Makieta → Spec**,
a w opisanym schemacie jest **Makiety → Pytania**. Możliwe, że makieta z pytaniami to wersja docelowa dla osób
nietechnicznych, bo łatwiej im odpowiadać, gdy widzą ekran.

## 5. Ustalenia z 2026-11-11 (druga część rozmowy)

- **Schemat doprecyzowany (właściciel):** **Opis → Makieta → Pytania → Spec → Plan → Implementacja.**
  - *Opis* to tekst użytkownika plus dopytania Claude'a.
  - Na tej podstawie powstaje *Makieta*.
  - *Pytania* są **wpisane w makietę**.
  - `ROZWÓJ.md` w Antalo to luźna lista pomysłów na moduły, a **nie** część procesu. Obserwacja z punktu 4
    o kolejności jest nieaktualna.
- **Skill sam proponuje kolejność budowy (właściciel):**
  1. projekt bazy danych, czyli jakie dane są zbierane,
  2. statyczny ekran logowania,
  3. podpięcie logowania do bazy,
  4. pierwsze API,
  5. potem kolejne pozycje nawigacji jako osobne części.
- **Technologia narzucona, bez wyboru pakietów (właściciel):** zestaw Antalo plus TypeScript.
  - Front: React + Vite + TypeScript.
  - Backend: Express + mysql2 + TypeScript. *(zod i JWT jak w Antalo to propozycja Claude'a)*
- **Jedno repo (właściciel)** z folderami `frontend/`, `backend/`, `docs/` i główny `package.json`, w którym
  `npm run dev` uruchamia oba. *(układ folderów to propozycja Claude'a)*
- **GitHub krok po kroku (właściciel).** Propozycje Claude'a:
  - repo prywatne domyślnie, zakładane przez `gh`, a gdy go nie ma, instrukcja w przeglądarce,
  - `.env` w `.gitignore` od pierwszego dnia,
  - zapis (commit) z polskim opisem po każdej działającej części, jako „punkt zapisu”.

- **Środowisko pracy (właściciel):** dwa scenariusze, terminal (jak u właściciela) albo edytor kodu
  (np. VS Code). W obu przypadkach **pliki są na komputerze użytkownika**. Czat na claude.ai z kopiowaniem kodu
  odpada. Opis skilla musi uwzględniać oba scenariusze.
  *(Claude: oba to Claude Code, czyli CLI albo rozszerzenie VS Code, a skill działa tak samo w obu.)*

- **Makiety oddzielone od aplikacji (właściciel).** Doświadczenie z Antalo: po prośbie o usunięcie makiet,
  żeby widzieć, co jest naprawdę zrobione, okazywało się później, że makiet brakowało. Wniosek: makiety
  **przeżywają proces co najmniej do zakończenia modułu**, który obejmują, i leżą w **osobnym, trzecim folderze
  `makiety/`**, obok `frontend/` i `backend/`.
  *(propozycje Claude'a, do potwierdzenia:*
  - *`makiety/` jako osobna mała aplikacja React + Vite na innym porcie, z wyraźnym paskiem „MAKIETA”,*
  - *pytania wpisane w ekrany makiety, a odpowiedzi zapisywane w `docs/`,*
  - *po zakończeniu modułu makieta jest oznaczana jako zrealizowana albo przenoszona do archiwum, a nie usuwana.)*

- **Zrobione części w makiecie (właściciel):** ekran makiety, którego moduł jest już zrobiony, zamienia się
  w zaślepkę „Tę część już wykonano”. Makieta pozwala zobaczyć wygląd przed prawdziwą implementacją.
- **Komponenty UI (właściciel): Mantine** (darmowe). **Walidacja na froncie i w backendzie (właściciel).**
  W backendzie biblioteka jak w Antalo, czyli **zod**.
- **Zestaw startowy bibliotek** *(propozycja Claude'a na podstawie przeglądu `package.json` w Antalo)*:
  - **Front:** react, react-router, @mantine/core + hooks + form + notifications + dates, zod
    (te same schematy co w backendzie, podpięte do formularzy Mantine), axios.
    **Bez** Redux i redux-saga (za dużo pojęć na start), **bez** styled-components (Mantine to pokrywa).
  - **Backend:** express, mysql2, zod, bcryptjs, jsonwebtoken, cookie-parser (token w ciasteczku jak w Antalo),
    helmet, cors, express-rate-limit (ochrona logowania), dotenv.
  - **Dopiero gdy potrzebne:** multer (pliki), cron, wysyłka e-mail, exceljs, winston, sanitize-html, i18next.
  - **Folder `shared/`** ze schematami zod używanymi przez front i backend. Reguła jest zapisana raz i sprawdzana
    po obu stronach, co jest zaletą jednego repo.

- **Język (właściciel):** na start tylko polski. W wywiadzie pada pytanie, czy aplikacja ma obsługiwać wiele
  języków. Tłumaczenia dochodzą później.
- **Układ folderów wzorowany na Antalo (właściciel). Zatwierdzone: podział według modułów, jedna pozycja
  nawigacji = jeden folder (właściciel).** Szczegóły:
  - **Front:** podział `core/` (api, routes, style), `common/` (komponenty, hooki), `features/` jest dobry i zostaje.
  - **Backend:** w Antalo jeden moduł jest rozrzucony po warstwach (`routes/common/tasks.js`,
    `query/common/tasks/`, `features/tasks/`). Propozycja Claude'a: grupowanie **po module**
    (`backend/src/modules/<modul>/` z plikami routes, queries, service). Wspólne rzeczy zostają osobno:
    config, middleware autoryzacji, migrations, jobs.
  - **Jedna pozycja nawigacji = ten sam folder modułu wszędzie:** `makiety/`, `frontend/src/modules/`,
    `backend/src/modules/`, `docs/moduly/`. AI w rozmowie o jednym module czyta jeden folder w każdej części,
    co oszczędza tokeny. *(propozycja Claude'a)*

- **Konfiguracja nawigacji jak w Antalo (właściciel):** sprawdza się przy różnych rolach. W Antalo
  (`frontend-app/src/features/AppShell/Navigation/`, opis w `dokumentacja/działanie-aplikacji/WYŚWIETLANIE NAWIGACJI.md`)
  jest to config z pozycjami i polem `roles`, a ten sam config służy do budowy menu (`useNavigation`) i do pilnowania
  dostępu do adresów (`routeAccess`).
  *(propozycje Claude'a:*
  - *jeden plik `navigation.config.ts` jako lista pozycji (adres, etykieta, ikona, `roles`, opcjonalnie podmenu),*
  - *jedna funkcja „czy użytkownik widzi tę pozycję”, zamiast dokładania kolejnych parametrów jak w Antalo
    (`bookkeeping`, `modules`, `fleet`),*
  - *ten sam config używany przez menu, ochronę adresów na froncie i przez makiety,*
  - *backend zawsze sprawdza rolę niezależnie, bo ukrycie pozycji w menu nie jest zabezpieczeniem.)*

- **Zakres skilla (właściciel):** prowadzi przez **każdy moduł**, osobnym poleceniem.
  *(propozycja Claude'a, jak to ułożyć:*
  - *polecenie startowe, np. `/nowa-aplikacja`: repo i GitHub, wywiad, podsumowanie, makieta z nawigacją, pytania
    w makiecie, spec ogólny z projektem bazy, lista modułów w kolejności budowy, plik stanu;*
  - *polecenie modułowe, np. `/nastepny-modul`: czyta plik stanu i kontynuuje bieżący moduł od miejsca, w którym
    przerwano (makieta → pytania → spec → plan → implementacja), albo zaczyna następny. Na końcu aktualizuje plik
    stanu, robi commit, zamienia ekran makiety na zaślepkę „Tę część już wykonano” i mówi „otwórz nową rozmowę
    i wpisz /nastepny-modul”;*
  - *kilka poleceń w jednej paczce oznacza dystrybucję jako plugin Claude Code.)*

- **Baza lokalnie w Dockerze z instrukcją krok po kroku (właściciel).** Odbiorcy pracują na Windows i macOS,
  Linux jest mało prawdopodobny. Osobna instalacja MySQL + MySQL Workbench odrzucona jako zbyt skomplikowana.
  *(propozycje Claude'a:*
  - *`docker-compose.yml` w repo: MySQL + **phpMyAdmin** do podglądu bazy w przeglądarce, w miejsce Workbencha,
    bez dodatkowej instalacji;*
  - *na starcie `/nowa-aplikacja` sprawdza, co jest zainstalowane (Node.js, Git, Docker, opcjonalnie `gh`), i podaje
    instrukcję tylko dla brakujących;*
  - *w instrukcji dla Windows pamiętać o WSL2, którego wymaga Docker Desktop. To najczęstsza przeszkoda;*
  - *w instrukcji dla macOS rozróżnić procesor Apple (M1 i nowsze) od Intela.)*

- **Wdrożenie (właściciel):** poza zakresem, na start wszystko lokalnie.

## 6. Otwarte pytania

- Dystrybucja: jak odbiorcy z FB mają go zainstalować?

## 7. Następny krok (stan na koniec sesji 2026-11-11)

- Dokument projektowy **zaakceptowany**: `2026-11-11-plugin-budowa-aplikacji-design.md`.
- Plan gotowy: `../plans/2026-11-11-stepkit.md` (13 zadań). **Czeka na przegląd właściciela i wybór sposobu
  wykonania** (rekomendacja Claude'a: bezpośrednio w jednej sesji, recenzent na końcu).
- Dopisane na koniec sesji przez właściciela: **aplikacja użytkownika ma pisać testy**. Zakres zaproponowany
  w specu §9, do potwierdzenia na początku następnej sesji. Testy przeglądarkowe `@playwright/test` (`npm run test:e2e`):
  **tak** (właściciel, 2026-11-11), już wpisane do specu i planu.
- Przed zadaniem 5: właściciel uruchamia Docker Desktop na Windows i włącza integrację WSL.
- Przed zadaniem 11: właściciel zakłada publiczne repo na GitHubie.

## 8. Sesja 2026-11-12

Dopisane i włączone do specu (spec przepisany, żeby każda decyzja była we właściwej sekcji) i do planu:
- trzy części aplikacji (strona / konto / panel), lista 17 obszarów wywiadu (po opisie),
- nazwy w kodzie po angielsku, stałe w plikach konfiguracyjnych, teksty jako klucze (i18next, `shared/locales/pl/`),
- e-maile: Mailpit lokalnie, Mailgun ze zrzutami ekranu; publikacja na VPS OVH jako ostatni moduł,
- powitanie „po co te narzędzia” tylko przy pierwszym uruchomieniu `/stepkit:start`.

Otwarte (spec §11): zakres automatycznych testów kodu, Playwright zalecany czy wymagany, adresy URL po angielsku.
Dalej: przegląd planu przez właściciela i wybór sposobu wykonania.

Później tego samego dnia: zatwierdzony zakres testów, Playwright wymagany, URL po angielsku; dodane klucze obce
z regułą przy usunięciu, archiwum (miękkie usuwanie), historia zmian (obszary 11–12 wywiadu, razem 19). Spec i plan
sprawdzone w całości pod kątem spójności. Czeka: przegląd planu i wybór sposobu wykonania.
