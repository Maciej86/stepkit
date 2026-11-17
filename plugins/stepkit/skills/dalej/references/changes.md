# Zgłoszenie: pomysł, zmiana albo błąd

Czytasz ten plik, gdy użytkownik zgłasza coś nowego: wpisał `/stepkit:zglos` albo w trakcie `/stepkit:dalej` mówi
„mam pomysł”, „a może dodać”, „zmień”, „to nie działa”.

## 1. Rozpoznaj rodzaj

Przeczytaj `docs/STATUS.md` (lista modułów), `docs/SPEC-GENERAL.md` i `docs/IDEAS.md`. Kod czytasz dopiero przy
błędzie albo zmianie, tylko z modułu, którego dotyczy. Potem nazwij rodzaj jednym zdaniem, np. „To zmiana w gotowym
module Pracownicy.”:

| Rodzaj | Po czym poznać |
|---|---|
| **Błąd** | coś, co miało działać, nie działa albo działa inaczej niż w specu |
| **Drobna zmiana** | jeden zrobiony moduł, bez nowego ekranu, roli, tabeli i trasy API (nowa kolumna w tabeli jest w porządku) |
| **Większa zmiana** | zrobiony moduł dostaje nowy ekran, rolę, tabelę albo trasę |
| **Nowy moduł** | czegoś takiego nie ma w liście modułów ani w `SPEC-GENERAL.md` |
| **Zmiana bieżącego** | dotyczy modułu `w toku` |
| **Już jest** | jest w liście modułów albo w `IDEAS.md`: powiedz gdzie i kiedy przyjdzie jego kolej |

Nie wiesz, który to rodzaj → zapytaj jednym pytaniem z propozycjami a/b.

## 2. Doprecyzuj (najwyżej 3 pytania naraz, z propozycjami a/b i *(polecam)*)

- **Błąd:** na którym ekranie (adres albo nazwa z menu), co zrobiłeś, co się stało, czego się spodziewałeś. Poproś
  o zrzut ekranu. Na koniec: jak często się zdarza (zawsze / czasem).
- **Drobna zmiana:** który ekran i co dokładnie; gdzie ma być nowa rzecz; kto ją widzi (role). Gdy są dwa sensowne
  warianty, daj a/b.
- **Większa zmiana i nowy moduł:** kto z tego korzysta (role), co jest najważniejsze (jedno zdanie), czy pilne
  (przed resztą listy czy na koniec). Szczegóły i tak ustalisz przy makiecie, więc tu nie robisz pełnego wywiadu.
- **Zmiana bieżącego:** co zmienia się w ustaleniach i czy ma wejść teraz, czy po zamknięciu modułu.

## 3. Co robisz

- **Błąd:** naprawiasz zawsze, także w trakcie innego modułu (potem wracasz do niego). Kolejno jak „Drobna zmiana”,
  od punktu 2, bez czekania na „tak”.
- **Drobna zmiana:**
  1. Jednym zdaniem: co zmienisz i gdzie to będzie widać. Poczekaj na „tak”.
  2. Test, który nie przechodzi; kod (makieta i aplikacja, gdy zmienia się ekran; migracja, gdy baza); `npm run check`.
  3. Użytkownik sprawdza w przeglądarce; zmianę ustaleń dopisz do `SPEC.md` tego modułu.
  4. Zapis „Poprawka: <co>” i `git push`. Po publikacji przypomnij o „wgraj nową wersję”.

  Gdy jakiś moduł jest `w toku`, zapisz ją w `docs/IDEAS.md` i zrób po jego zamknięciu, chyba że użytkownik chce teraz.
  Porządki („wydziel wspólne”, według „Wspólne zamiast kopii” w `code-conventions.md`) obejmują cały projekt: front,
  backend, `shared` i makiety, także gdy zgłoszenie wymienia tylko część.
- **Większa zmiana i nowy moduł:** zapytaj „Budujemy to zaraz po bieżącym module czy na końcu?”.
  - **Na końcu** (pomysł na później): wiersz w `docs/IDEAS.md` (data, pomysł jednym zdaniem, `pomysł`, w „Uwagi”
    odpowiedzi z kroku 2; brak pliku → utwórz go z tabelą `| Data | Pomysł | Status | Uwagi |`). Nie zmieniasz listy
    modułów, planu ani speca. Potwierdź: „Zapisałem w `docs/IDEAS.md`. Zajmiemy się tym po zbudowaniu tego, co
    ustaliliśmy.”
  - **Wcześniej** (pomysł na teraz): bieżącego modułu nie przerywasz. Zaproponuj nowy moduł zaraz za bieżącym (albo
    w miejscu, które wskazał, ale nie przed modułami, od których zależy), pokaż nową kolejność całej listy modułów
    i zapytaj: „Czy tak ustawić?”. Dopiero po „tak”: wiersz w tabeli modułów w `STATUS.md` (nazwa po polsku, folder po
    angielsku, `czeka`, etap `makieta`, „Zależy od”), przenumerowanie, w `IDEAS.md` status `zaplanowany`, wpis
    w „Ostatnie decyzje”. Większa zmiana zrobionego modułu to nowy moduł o nazwie „<moduł>: <co>”, np. „Pracownicy:
    historia umów”.
- **Zmiana bieżącego:** to zmiana ustaleń. Powiedz, co zmieni się w planie, i po „tak” zapisz w `SPEC.md` i `PLAN.md`
  modułu.

## 4. Zakończenie

- Zapisane na później albo w kolejce: „Zapisałem. Wracamy do pracy: wpisz `/clear`, a potem `/stepkit:dalej`.”
  (w trakcie `/stepkit:dalej` po prostu wracasz do bieżącego modułu).
- Naprawione albo zmienione: „Gotowe, sprawdź <gdzie>. Napisz »działa« albo opisz, co jest nie tak.”
- Nigdy nie zaczynasz budowy nowego modułu w tej rozmowie: zacznie się sam w `/stepkit:dalej`, gdy przyjdzie jego
  kolej.
