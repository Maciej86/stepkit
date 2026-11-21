# Aktualizacja projektu do nowej wersji stepkit

**Aktualna wersja stepkit:** 1.0.0

**Pliki aktualizacji** (folder `upgrades/` obok tego pliku, od najstarszego): brak

Szablon kopiuje się do projektu tylko raz, przy `/stepkit:start`. Gdy stepkit się zmienia, starsze projekty nie mają
nowych plików, a nowe zasady o nich mówią. Pliki aktualizacji mówią, co przenieść. Wersje, które zmieniły tylko
zasady, nie mają pliku.

## Kiedy

Wersję projektu podaje linia `**Wersja stepkit:** X.Y.Z` w `docs/STATUS.md`. Aktualizacja jest potrzebna, gdy wersja projektu
jest **niższa niż ostatni numer na liście „Pliki aktualizacji”** (porównuj liczbowo: 1.0.11 > 1.0.9). Lista „brak” =
żaden projekt nie wymaga aktualizacji. „Aktualna wersja stepkit” bywa wyższa, bo wersje ze zmianą samych zasad nie mają
pliku; z nią wersji projektu nie porównujesz.

## Jak

1. Powiedz prostym językiem: „stepkit się zaktualizował, a Twój projekt powstał na starszej wersji. Żeby nowe zasady
   pasowały do projektu, trzeba w nim poprawić: …” (wypunktuj pliki do zrobienia, po jednym zdaniu, bez nazw plików; czytasz tylko pliki z listy o numerze wyższym niż wersja projektu)
   „Zajmie to chwilę i nie zmieni tego, co już działa. Zrobić to teraz?” **Nic nie zmieniaj przed odpowiedzią.**
2. Po „tak”: te pliki po kolei, od najstarszego (`upgrades/<wersja>.md`); innych nie otwierasz. Szablon jest w `<katalog bazowy tego skilla>/../../template/`.
   - **Nowy plik** (projekt go nie ma): skopiuj z szablonu.
   - **Plik, który projekt mógł zmienić** (oznaczony „połącz”): nie nadpisuj. Dopisz tylko opisaną zmianę, zachowując
     wszystko, co dodały moduły (pozycje menu, ekrany, teksty).
   - Po każdym pliku: `npm run check` zielony, zapis na GitHubie („Aktualizacja stepkit: <tytuł pliku>”).
3. Zawsze podmień `docs/CONVENTIONS.md` na aktualny `code-conventions.md` (obok tego pliku) i cały folder
   `docs/conventions/` na aktualne `domains/` (usuń stare pliki, skopiuj wszystkie); projekt ich nie zmienia, wyjątki
   są w `SPEC-GENERAL.md`. Na końcu ustaw w `docs/STATUS.md` linię `**Wersja stepkit:** <aktualna wersja z góry tego pliku>` (zaraz pod
   tytułem; dopisz, jeśli jej nie ma) i wpis w „Ostatnie decyzje”. Potem **zatrzymaj się**. Jednym krótkim akapitem,
   bez nazw technicznych, powiedz, co się zmieniło i że sprawdzenie (`npm run check`) przeszło. Podaj jedną–dwie rzeczy
   do sprawdzenia w aplikacji, związane z tym, co się zmieniło (np. „zaloguj się i otwórz listę pracowników”).
   Zapytaj: „Wracamy do <moduł>, etap <etap>?”. Dalszą pracę zaczynasz dopiero po odpowiedzi.
4. Moduł w toku: aktualizację rób przed dalszą pracą nad nim; jego plików nie ruszaj poza tym, co opisuje plik aktualizacji.
5. **Aplikacja opublikowana i wszystkie moduły zrobione:** aktualizację proponuj tylko wtedy, gdy któryś z brakujących
   plików dotyczy bezpieczeństwa (oznaczony „bezpieczeństwo”) albo gdy użytkownik zaczyna nowy moduł. Działającej
   aplikacji nie przebudowujesz dla samych nowości stepkit.
6. „Nie teraz”: pracuj dalej, ale przy następnym `/stepkit:dalej` zapytaj ponownie. Przed etapem **makieta** aktualizacja
   jest konieczna (makiety korzystają z motywu i panelu pytań).
