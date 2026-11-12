# Sprawdzanie w przeglądarce

Czytasz ten plik na etapie **testy** każdego modułu, zanim poprosisz użytkownika o przeklikanie `TESTS.md`.

## Gdy masz narzędzia Playwright

(Narzędzia o nazwach `browser_navigate`, `browser_click`, `browser_snapshot` itp., zwykle z przedrostkiem
`mcp__…playwright…`.)

1. Upewnij się, że działają baza i aplikacja: `npm run db`, `npm run dev` (w tle). Adresy: aplikacja
   `http://localhost:5173` (albo `FRONTEND_PORT` z `.env`), makiety `http://localhost:5174`.
2. Dla **każdej roli** z `TESTS.md` przejdź jej scenariusze krok po kroku: logowanie, kliknięcia, wypełnianie
   formularzy (także błędnymi danymi), sprawdzenie komunikatów.
3. Po każdym ekranie modułu: `browser_snapshot` albo zrzut ekranu i `browser_console_messages`. Każdy błąd w konsoli
   to usterka do naprawy.
4. Porównaj z makietą tego modułu (`http://localhost:5174`): układ i teksty mają się zgadzać, chyba że `QUESTIONS.md`
   mówi inaczej.
5. Usterka: napraw ją (najpierw test, który ją pokazuje), `npm run check`, i przejdź scenariusz od nowa.
6. Dopiero gdy wszystko przechodzi: `npm run test:e2e`, a potem prośba do użytkownika:
   „Sprawdziłem moduł w przeglądarce dla ról: … Teraz Ty: otwórz http://localhost:5173 i przejdź listę z
   docs/modules/<module>/TESTS.md. Napisz »działa« albo opisz, co jest nie tak.”

Dane testowe, które dodałeś w przeglądarce, opisz użytkownikowi (np. „dodałem klienta »Test Kowalski«”) albo usuń.

## Gdy ich nie ma

Playwright jest wymagany. Zatrzymaj etap testów i powiedz:

> „Żeby sprawdzić moduł w przeglądarce, potrzebuję dodatku Playwright. Wpisz w Claude Code:
> `/plugin install playwright@claude-plugins-official`, potem zamknij i otwórz Claude Code i wpisz `/stepkit:dalej`.”

Zapisz w `docs/STATUS.md` etap `testy (czeka na Playwright)`. Nie oznaczaj modułu jako zrobionego.
