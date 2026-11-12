# Moduł „Wygląd”

Czytasz ten plik w module **Wygląd** (folder `appearance`, zawsze pierwszy w kolejności). Najpierw przeczytaj
`mockups.md`, sekcja „Wygląd”. Wywołaj skill `frontend-design` przed każdym etapem tego modułu.

Moduł nie ma spec, planu ani implementacji: jego wynikiem jest motyw (`shared/src/theme.ts`, `shared/src/theme.css`)
i księga wyglądu `docs/DESIGN.md`. Rozmowa o wyglądzie może trwać kilka rozmów; po każdej zapisz w `STATUS.md`, na
czym stanęliście.

| Etap | Co robisz | Użytkownik |
|---|---|---|
| makieta | 3 warianty wyglądu w `mockups/src/appearance/variants.ts` | przełącza „Wariant” w pasku makiety i ogląda swoje ekrany |
| pytania | poprawki wybranego wariantu, aż użytkownik powie „tak” | mówi, co zmienić |
| zamknięcie | motyw i `DESIGN.md`, warianty usunięte, sprawdzenie | potwierdza |

## Makieta: trzy warianty

1. Przeczytaj „Wygląd” w `docs/OVERVIEW.md` (kolory firmowe, nastrój albo „wybiera Claude”, przełącznik jasny/ciemny)
   i dodatki (np. wersja na telefon).
2. Przygotuj **3 wyraźnie różne kierunki** dopasowane do dziedziny i użytkowników, np. A jasny firmowy, B kolorowy
   nowoczesny, C ciemny albo stonowany. Przy kolorach firmowych wszystkie trzy z kolorów firmy, różne układem i
   nastrojem. Każdy wariant to pełny `MantineThemeOverride` (własna paleta 10 odcieni, `primaryColor`, `fontFamily`,
   `headings`, `defaultRadius`, wygląd komponentów) w `THEME_VARIANTS`; czcionki wariantów w
   `mockups/src/appearance/variants.css`.
3. Warianty pokazują się na **prawdziwych ekranach makiety** (przełącznik „Wariant wyglądu” w pasku). Zadbaj, żeby
   makieta ogólna miała co najmniej: pulpit z boksami (`InfoCard`), listę w tabeli, formularz z przyciskami z ikonami,
   a przy stronie dla odwiedzających stronę główną z nagłówkiem ze zdjęciem i sekcjami (`PageSection`).
   Wzorce startowe z `docs/DESIGN.md` (układ, boksy, ikony przycisków, dymki, tabele) obowiązują we wszystkich
   wariantach; warianty różnią się kolorem, czcionką, zaokrągleniami i nastrojem. Gdy użytkownik chce inaczej (np.
   menu u góry zamiast z boku, bez dymków), zapisz to w `DESIGN.md` jako zmianę wzorca startowego.
4. Powiedz: „Otwórz http://localhost:5174 i przełączaj »Wariant wyglądu« w żółtym pasku. Który kierunek jest
   najbliższy? Możesz mieszać, np. »B, ale kolory z A«.” Przy włączonym przełączniku jasny/ciemny niech obejrzy też
   ciemny motyw.

## Pytania: poprawki

- Zmieniaj tylko wybrany wariant (pozostałe możesz usunąć z listy). Po każdej poprawce poproś o ponowne obejrzenie.
- Każdą decyzję dopisuj od razu do `docs/DESIGN.md` (sekcje „Kolory”, „Czcionki”, „Wzorce”), żeby przetrwała koniec
  rozmowy.

## Zamknięcie

1. Zaakceptowany wariant przenieś do `shared/src/theme.ts` (`theme`) i czcionki do `shared/src/theme.css`.
2. `THEME_VARIANTS = []`, wyczyść `variants.css`. Makiety i aplikacja korzystają teraz z motywu.
3. Uzupełnij `docs/DESIGN.md`: charakter, kolory i ich role, czcionki, odstępy, wzorce (tabela, formularz, przyciski,
   statusy, karty z liczbami, pusta lista, potwierdzenie usunięcia), **Stan: ustalony (data)**.
4. `npm run check`; Playwright: zrzuty kilku ekranów makiety (w obu motywach, jeśli jest przełącznik, i w szerokości
   390 px przy wersji na telefon); popraw to, co się rozjechało.
5. Moduł `zrobiony` po potwierdzeniu użytkownika, zapis „Moduł Wygląd gotowy” i `git push`.

## Zmiany wyglądu w późniejszych modułach

Każda makieta modułu zaczyna od przeczytania `docs/DESIGN.md` i używa opisanych tam wzorców. Gdy użytkownik prosi
o zmianę wyglądu, rozróżnij:

- **Tylko ten ekran** („kalendarz większy”, „przycisk wyżej”): zmieniasz w module.
- **Styl całej aplikacji** („przyciski bardziej zaokrąglone”, „statusy jako kropki”): powiedz wprost: „To zmieni wygląd
  całej aplikacji, także ekranów już zrobionych: … Zmienić?” Po „tak”: `shared/src/theme.ts` / `theme.css`, wpis
  w `DESIGN.md` („Historia zmian wyglądu”), zrzuty ekranów zrobionych modułów i poprawki tego, co się rozjechało.
- **Nowy wzorzec** (np. oś czasu, której jeszcze nie było): po akceptacji makiety dopisz go do „Wzorce” w `DESIGN.md`,
  żeby kolejne moduły robiły go tak samo.
