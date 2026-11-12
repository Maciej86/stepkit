---
name: start
description: Użyj, gdy użytkownik wpisuje /stepkit:start, chce zacząć nową aplikację www lub SaaS ze stepkit albo wraca do nieskończonego planowania aplikacji (sprawdzenie komputera, opis, wywiad, makieta, spec ogólny).
---

# stepkit: start nowej aplikacji

Prowadzisz osobę, która **nie programuje**, od pomysłu do planu aplikacji. Mówisz po polsku, prosto, każde pojęcie
techniczne wyjaśniasz jednym zdaniem. **Jedno pytanie na raz.** Nigdy nie wykonujesz kilku kroków naraz ani nie
piszesz kodu modułów: ten skill kończy się planem, a budowa to `/stepkit:dalej`.

Pliki pomocnicze leżą w `references/` obok tego pliku (ścieżka: katalog bazowy tego skilla). Czytaj je dopiero w kroku,
który ich potrzebuje.

## Gdzie jesteśmy

Najpierw sprawdź, czy w folderze projektu jest `docs/STATUS.md`:

- **Nie ma** → pierwsze uruchomienie: zacznij od kroku 0.
- **Jest i w sekcji „Start aplikacji” są nieodhaczone kroki** → powiedz jednym zdaniem, na czym skończyliście,
  i kontynuuj od pierwszego nieodhaczonego. Kroku 0 nie powtarzaj.
- **Wszystkie kroki odhaczone** → powiedz: „Plan aplikacji jest gotowy. Otwórz nową rozmowę i wpisz `/stepkit:dalej`.”
  i zakończ.

Po każdym kroku odhacz go w `docs/STATUS.md` (`- [x]`) i zaktualizuj „Następny krok”.

## Krok 0: powitanie (tylko przy pierwszym uruchomieniu)

Zacznij od jednego zdania, czym jest stepkit: „stepkit służy do budowy aplikacji, które działają w internecie, pod
własnym adresem www (np. twojafirma.pl) i otwiera się je w przeglądarce, także na telefonie. Nie zbudujemy tu aplikacji
do pobrania ze sklepu (App Store, Google Play) ani programu instalowanego na komputerze.”

Zanim cokolwiek sprawdzisz albo zainstalujesz, napisz krótko (ok. 10 linii), co będzie potrzebne i po co. Nacisk:
**to głównie narzędzia Twojej (Claude'a) pracy**; użytkownik instaluje je raz i nie musi się ich uczyć, a dzięki nim
praca jest szybsza, stabilniejsza i bezpieczniejsza:

- **Node.js** (https://nodejs.org, wersja LTS): silnik, na którym działa aplikacja; dzięki niemu sam ją uruchamiasz
  i testujesz, zamiast zgadywać.
- **Docker Desktop** (https://www.docker.com/products/docker-desktop): „pudełko” z bazą danych, które działa tak samo na
  każdym komputerze i na serwerze.
- **Git** (https://git-scm.com/downloads) **i konto GitHub** (https://github.com/signup): punkty zapisu jak w grze; po
  każdej działającej części zapis, do którego zawsze można wrócić.
- **superpowers**: sprawdzone sposoby pracy (specyfikacja, plan, przegląd kodu), dzięki którym mniej się mylisz.
- **Playwright**: pozwala Ci samemu klikać w aplikacji i sprawdzać ją, zanim poprosisz o to użytkownika.
- **frontend-design**: wiedza projektanta wyglądu, dzięki której makiety i aplikacja wyglądają jak dopracowany produkt,
  a nie jak szablon.

Linki podaj dokładnie takie, jak wyżej. Dopisz jedno zdanie: „Nie pobieraj jeszcze niczego: za chwilę sprawdzę, które
z tych narzędzi już masz, i poprowadzę przez instalację tylko tego, czego brakuje. superpowers, Playwright i frontend-design to
dodatki do Claude Code, instaluje się je komendą, pokażę jaką.”

Zakończ zdaniem: „Ty mówisz, co ma działać, a narzędziami zajmuję się ja.” Jeśli nie wiesz z systemu, zapytaj, czy ma
Windows czy Maca. Na końcu zapytaj dokładnie tak: „Czy mogę sprawdzić, jakie narzędzia masz zainstalowane na
komputerze?” Nie pisz „co jest już zainstalowane” ani „co masz na komputerze”: brzmi jak przeszukiwanie całego
komputera, a sprawdzasz tylko narzędzia z listy.

## Krok 1: sprawdzenie komputera

Czytasz `references/install-windows.md` albo `references/install-macos.md`. Sprawdzasz po kolei: `node --version`,
`git --version`, `docker --version` i `docker info`, plugin Playwright, plugin superpowers, plugin frontend-design, opcjonalnie `gh --version`.
Przy brakach prowadzisz po jednym programie. **Nie przechodzisz dalej**, dopóki nie działają Node, Git i Docker oraz nie
ma pluginów Playwright i frontend-design. Brak superpowers nie blokuje: zapisz w `docs/STATUS.md` („Ostatnie decyzje”),
że pracujemy na wzorach stepkit. (`docs/STATUS.md` tworzysz w kroku 2; do tego czasu pamiętaj ustalenia.)

## Krok 2: szkielet i repo

Czytasz `references/project-skeleton.md` (kopiowanie) i `references/github.md`. Wynik: projekt skopiowany z szablonu,
`.env` z wygenerowanymi sekretami, `npm install`, `npx playwright install chromium`, `npm run check` zielony, baza
działa (`npm run db`, `npm run migrate`), prywatne repo na GitHubie z pierwszym zapisem, `.env` nie jest wysyłany.
Odhacz kroki 1 i 2 w `docs/STATUS.md` (plik pochodzi z szablonu; wpisz nazwę projektu w tytule).

## Krok 3: opis

Czytasz `references/interview.md` (część „Krok 3”). Zapytaj: „Opisz własnymi słowami, co chcesz stworzyć. Kto będzie
z tego korzystał i co ma się dziać?”

Opis bywa krótki („chcę zbierać zamówienia”). **Nigdy go nie odrzucaj i nie przechodź z nim dalej.** Zadaj **jedno**
pytanie o pierwszą brakującą rzecz (kto używa / co się dzieje krok po kroku / jakie dane), poczekaj na odpowiedź,
i tak do skutku. Jeśli użytkownik wpisał opis razem z poleceniem `/stepkit:start`, traktuj go jako odpowiedź na to
pytanie.

## Krok 4: wywiad

Czytasz `references/interview.md` (część „Krok 4”). 20 obszarów w podanej kolejności, dopasowanych do opisu: to, co
wynika z opisu, tylko potwierdzasz; obszar, który nie dotyczy aplikacji, pomijasz; przy niejasnościach warianty a/b/c
z „(polecam)”. Archiwum **sam proponujesz** (obszar 12).

## Krok 5: podsumowanie

Pokaż podsumowanie, poprawiaj do akceptacji, zapisz `docs/OVERVIEW.md`. Dopasuj szablon według tabeli „Jak odpowiedzi
zmieniają szkielet” (`interview.md`) i `references/project-skeleton.md` (część „Dopasowanie”). `npm run check` zielony.

**Pomysły na później.** Jeśli w wywiadzie padło coś, co wykracza poza ustalony rdzeń (użytkownik sam mówi „kiedyś”,
„może później”, albo wybrał to jako niewymagane na start), wpisz to do `docs/IDEAS.md` ze statusem `pomysł`, a nie do
podsumowania. Po akceptacji powiedz:

> „Jeśli w trakcie budowy wpadnie Ci pomysł na rozbudowę (np. dodanie czasu pracy), po prostu napisz go w dowolnej
> chwili. Zapiszę go w pliku `docs/IDEAS.md` i zajmiemy się nim, gdy zbudujemy to, co właśnie ustaliliśmy.
> Pomysły nie zmieniają obecnego planu.”

## Krok 6: makieta ogólna

Czytasz `../dalej/references/mockups.md`. **Najpierw wygląd** (sekcja „Wygląd”): wywołaj skill `frontend-design`,
ustal kierunek wyglądu dla tej aplikacji i zapisz go w `shared/src/theme.ts` i `shared/src/theme.css`. Potem
w `mockups/`: włączone części, pełne `PUBLIC_NAVIGATION`, `ACCOUNT_NAVIGATION` i `NAVIGATION`
w `shared/src/navigation.config.ts`, ekran na zmyślonych danych dla każdej pozycji, pytania w panelu `<Questions>` na
górze ekranu (jedno z pytań: czy wygląd się podoba). Najważniejsza jest **nawigacja**: każda pozycja to później osobny moduł. Uruchom
`npm run dev` i poproś o obejrzenie `http://localhost:5174` i odpowiedzi na pytania. Odpowiedzi zapisz w `docs/OVERVIEW.md`.

## Krok 7: spec ogólny

Czytasz `../dalej/references/document-templates.md` (wzór `SPEC-GENERAL.md`) i `../dalej/references/code-conventions.md`
(„Baza danych”, „Archiwum”, „Historia zmian”, „Wzorce opcjonalne”). Projekt bazy z tabelą relacji i regułą przy
usunięciu dla każdej z nich, lista danych z archiwum, zakres historii zmian. Gdy historia jest włączona, **tylko zapisz
w specu**, że moduł Logowanie doda tabelę `activity_log` zaraz po `users` (ma klucz obcy do `users`, więc wcześniej
migracja by się nie udała).

Kolejność modułów: **1. Logowanie** → moduł z obszaru 20 wywiadu → pozostałe pozycje nawigacji → **E-mail** (folder
`email`) przed pierwszym modułem, który wysyła e-maile → na końcu zawsze **Publikacja** (folder `deploy`, zależny od
wszystkich). Każdy moduł z kolumną „Zależy od”. Decyzje nie z rozmowy oznacz **[decyzja AI]**. Poproś o akceptację.

## Krok 8: plik stanu i pożegnanie

Tabela modułów w `docs/STATUS.md` (format z `document-templates.md`, wszystkie moduły `czeka`, etap `makieta`), zapis
na GitHubie („Plan aplikacji gotowy”, `git push`, przedtem `git check-ignore .env`). Zakończ dokładnie:

> „Plan jest gotowy. Postęp zobaczysz na http://localhost:5174/progress. Otwórz nową rozmowę i wpisz `/stepkit:dalej`.”

Wyjaśnij jednym zdaniem, dlaczego nowa rozmowa: krótsza rozmowa to mniej tokenów i mniej pomyłek.

## Zakazy

- Nie piszesz kodu modułów (logowanie, zamówienia itd.); to robi `/stepkit:dalej`.
- Nie zmieniasz stosu i nie dodajesz bibliotek spoza szablonu.
- Nie usuwasz makiet.
- `.env` nigdy nie trafia na GitHub ani do rozmowy.
- Nie zadajesz kilku pytań naraz.
