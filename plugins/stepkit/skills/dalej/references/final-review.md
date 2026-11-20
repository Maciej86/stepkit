# Przegląd przed oddaniem

Robisz go na końcu etapu **testy**: po próbach nadużyć (`abuse.md`), sprawdzeniu w przeglądarce (`browser.md`)
i `npm run test:e2e`, a **przed** prośbą, żeby użytkownik przeszedł `TESTS.md`. Sprawdzasz, czy moduł zgadza się ze
wszystkim, co ustaliliście, a nie tylko, czy kod jest poprawny (to robił przegląd kodu po implementacji).

**Kto:** nowy recenzent (narzędzie Agent) bez historii tej rozmowy. To jedyny wyjątek od „bez subagentów”: chodzi
o świeże spojrzenie. Dostaje ścieżki do `SPEC.md`, `PLAN.md`, `TESTS.md` i `QUESTIONS.md` modułu, do jego makiety
(`mockups/src/modules/<folder>/`), do `docs/STATUS.md`, `docs/SPEC-GENERAL.md` i `docs/FIXES.md`, do tego pliku
i `code-conventions.md` oraz zakres zmian `git diff <commit przed makietą modułu>..HEAD`. Nie dostaje Twoich
wniosków ani opisu, co zrobiłeś. Bez narzędzia Agent przechodzisz listę sam, czytając pliki od nowa.

## Lista

1. **Spec → kod.** Każdy ekran, pole, tekst, pusty stan, kolejność, kolor i warunek ze specu ma swoje miejsce
   w kodzie. Każda „[decyzja AI]” jest zrobiona; nic ponad spec.
2. **Makieta → ekran.** Układ, kolejność boksów, kolory stanów i zachowanie na telefonie jak w makiecie. Każda
   różnica jest opisana w `PLAN.md` jako świadoma.
3. **Plan → kod.** Każdy krok odhaczony, a każda „Uwaga” i notatka z przeglądu kodu jest prawdziwa w kodzie (np.
   „używa wspólnej listy kolumn” = naprawdę jej używa).
4. **Wspólne zamiast kopii w całym projekcie.** Każdy klocek z „Wydzielam” jest w `frontend/src/common/` **i**
   w `mockups/src/common/` (albo ma zapisany powód, dlaczego makieta go nie potrzebuje). W żadnej makiecie, także
   w makiecie tego modułu, nie zostaje kopia. Przy każdym nowym komponencie jest „Porównane z: …”, a recenzent sam
   otwiera wymienione pliki i szuka podobnych po wyglądzie.
5. **Dokumenty.** `STATUS.md` (etap, decyzje), Mapa dostępu w `SPEC-GENERAL.md`, `FIXES.md` (błędy odłożone
   w trakcie są zapisane), `TESTS.md` (próby nadużyć z wynikiem). W `shared/locales` nie ma nieużywanych kluczy
   tego modułu.
6. **Na koniec** `npm run check` i `npm run test:e2e` zielone po wszystkich poprawkach.

## Wynik

Lista „zgodne / do poprawy” z plikiem i linią. Wszystko, co nie zmienia ustaleń, poprawiasz od razu (z testem, gdy
zmienia działanie), według „Wspólne zamiast kopii” także w makietach. O odstępstwa, które wymagają zmiany specu,
pytasz użytkownika. Potem jedno zdanie do użytkownika: „Zanim oddam moduł, sprawdziłem go jeszcze raz z opisem,
makietą i zasadami: <co poprawiłem albo „wszystko się zgadza”>.” Dopiero wtedy prosisz o przejście `TESTS.md`.
