---
name: dalej
description: Użyj, gdy użytkownik wpisuje /stepkit:dalej, chce kontynuować budowę aplikacji zaczętej przez stepkit, prosi o kolejny moduł, o inny moduł niż bieżący, o publikację albo o „wgraj nową wersję”.
---

# stepkit: dalej

Budujesz aplikację osoby, która **nie programuje**, moduł po module, w krótkich rozmowach. Mówisz po polsku, prosto.
Pliki pomocnicze leżą w `references/` obok tego pliku; czytaj je dopiero na etapie, który ich potrzebuje.

## 1. Na start każdej rozmowy

Przeczytaj **tylko**: `docs/STATUS.md`, `docs/SPEC-GENERAL.md` i pliki bieżącego modułu w `docs/modules/<folder>/`.
Nie czytaj folderów innych modułów ani całego kodu „na zapas”.

- Nie ma `docs/STATUS.md` → „Najpierw zaplanujmy aplikację: wpisz `/stepkit:start`.” i koniec.
- W sekcji „Start aplikacji” są nieodhaczone kroki → „Planowanie nie jest skończone: wpisz `/stepkit:start`, dokończymy
  je.” i koniec.

Potem jedno zdanie: „Jesteśmy przy: <moduł>, <etap>. Teraz: <co robimy>.”

**Pomysł na później.** Gdy użytkownik (w tej wiadomości albo w trakcie pracy) zgłasza nową funkcję spoza ustaleń
bieżącego modułu i `SPEC-GENERAL.md` („mam pomysł”, „a może dodać”, „kiedyś chciałbym”), dopisz wiersz do
`docs/IDEAS.md` (data, pomysł jednym zdaniem, `pomysł`; brak pliku → utwórz go z tabelą `| Data | Pomysł | Status | Uwagi |`) i potwierdź: „Zapisałem w `docs/IDEAS.md`. Zajmiemy się tym
po zbudowaniu tego, co ustaliliśmy.” **Nie** dodajesz go do tabeli modułów, nie zmieniasz planu ani speca i wracasz
do bieżącego modułu. Wyjątek: użytkownik wprost chce zmienić bieżący moduł („w logowaniu dodajmy jeszcze…”); wtedy
to zmiana ustaleń: zapisz w `SPEC.md` i `PLAN.md` modułu, przedtem powiedz, co zmieni się w planie.

## 2. Który moduł

Dokładnie w tej kolejności:
1. Moduł ze statusem `w toku` → **kontynuuj go** od etapu i kroku zapisanego w `STATUS.md` i `PLAN.md`.
2. Brak `w toku` → moduł `wstrzymany` o najniższym numerze.
3. Brak wstrzymanych → pierwszy `czeka`, którego wszystkie „Zależy od” są `zrobiony`.
4. Wszystkie `zrobiony` → gratulacje, adres aplikacji (jeśli opublikowana), przypomnienie „Wgraj nową wersję”. Pokaż
   pomysły ze statusem `pomysł` z `docs/IDEAS.md` i zapytaj, który budujemy. Wybrany dopisz jako moduł przed
   „Publikacja” (albo po niej, jeśli już zrobiona), a w `IDEAS.md` zmień status na `zaplanowany`.

Nigdy nie przeskakujesz nieskończonego modułu i nigdy nie masz dwóch modułów `w toku`.

**Użytkownik prosi o inny moduł niż ten z listy:**
- Jeśli którakolwiek zależność wybranego modułu nie jest `zrobiony`: **odmów** prostymi słowami i nazwij brakujący
  moduł, np. „Klienci potrzebują działającego logowania, a Logowanie jest w połowie. Dokończmy je najpierw, zostały
  2 kroki.” Nie zaczynaj wybranego modułu.
- W przeciwnym razie wyjaśnij skutki („Klienci zostaną wstrzymani na etapie spec i wrócą jako pierwsi”) i **poproś
  o potwierdzenie**. Dopiero po „tak”: bieżący → `wstrzymany` (w kolumnie Etap miejsce powrotu), wybrany → `w toku`.

## 3. Etapy modułu

| Etap | Czytasz | Wynik | Użytkownik |
|---|---|---|---|
| makieta | `references/mockups.md`, skill `frontend-design` | ekrany w `mockups/src/modules/<folder>/` z panelem pytań na górze, `QUESTIONS.md` | ogląda http://localhost:5174 |
| pytania | `references/mockups.md` | odpowiedzi w `QUESTIONS.md`, poprawiona makieta | odpowiada |
| spec | `references/superpowers.md`, `references/code-conventions.md`, `references/document-templates.md` | `SPEC.md` | akceptuje |
| plan | jak wyżej | `PLAN.md` z testami w każdym kroku | akceptuje |
| implementacja | `references/superpowers.md`, `references/code-conventions.md` | kod; **najpierw test, potem kod**, po każdym kroku `npm run check` i odhaczenie w `PLAN.md`; na koniec przegląd kodu | — |
| testy | `references/browser.md` | Ty klikasz w przeglądarce, `npm run test:e2e`, potem użytkownik przechodzi `TESTS.md` | potwierdza „działa” |
| zamknięcie | `references/mockups.md` | `<Done labelKey=…>` w `mockups/src/screens.tsx`, `STATUS.md` (`zrobiony`, nowy „Następny krok”), zapis „Moduł <nazwa> gotowy” + `git push` | — |

Moduły specjalne: **E-mail** → najpierw `references/email-mailgun.md`; **Publikacja** → `references/deploy-ovh.md`
(bez makiety). Prośba „wgraj nową wersję” → procedura z sekcji „Wgraj nową wersję” w `STATUS.md`.

Moduł jest `zrobiony` **dopiero po potwierdzeniu użytkownika** na etapie testów.

**Ściągawka `README.md`** w projekcie to miejsce, gdzie użytkownik sprawdza, jak uruchomić aplikację i gdzie co
podejrzeć. Gdy zmieniasz port, dodajesz usługę z adresem (np. Mailpit) albo nowe polecenie `npm run`, popraw README
w tym samym zapisie. Na pytania „jak uruchomić”, „gdzie zobaczyć”, „jak się zalogować do bazy” odpowiadaj i wskaż
README.

## 4. Granice rozmów

Po każdym etapie zaktualizuj w `STATUS.md` kolumnę Etap i „Następny krok”. Jeśli za Tobą jest więcej niż jeden etap
w tej rozmowie albo ponad ok. 5 kroków implementacji, zakończ dokładnie:

> „Otwórz nową rozmowę i wpisz `/stepkit:dalej`.”

i jednym zdaniem dlaczego (krótsza rozmowa = mniej tokenów i mniej pomyłek). Postęp pokazuje
http://localhost:5174/progress.

## Zakazy

- Nie usuwasz makiety modułu, który nie jest zamknięty, nawet na prośbę (wyjaśnij, że makiety są osobno: 5174
  vs 5173).
- Nie zmieniasz stosu i nie dodajesz bibliotek spoza listy w `code-conventions.md`.
- Nie piszesz kodu bez testu, który najpierw nie przechodzi.
- Nie oznaczasz modułu jako zrobionego bez potwierdzenia użytkownika.
- Hasła i klucze nigdy w rozmowie ani w repo.
