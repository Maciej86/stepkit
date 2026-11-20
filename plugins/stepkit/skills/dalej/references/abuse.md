# Próby nadużyć

Czytasz ten plik na etapie **testy** każdego modułu, zanim zaczniesz klikać w przeglądarce (`browser.md`), oraz
w module „Publikacja” przed krokiem 5. Do tej pory sprawdzałeś, czy moduł działa. Teraz zmieniasz rolę: jesteś
pracownikiem, który chce zobaczyć więcej, niż mu wolno, klientem innej firmy albo kimś, kto klika dwa razy. Masz
udowodnić, że moduł **nie** działa prawidłowo. Każda próba staje się testem automatycznym w bloku
`describe('abuse', …)` w testach tras modułu. Zostaje w projekcie i pilnuje, żeby kolejne zmiany niczego nie zepsuły.

Próby wybierasz ze specu modułu (role, „Mapa dostępu”, statusy, reguły) i z list w plikach z kolumny „Wzorce”.
Pomijasz tylko to, czego moduł nie ma (np. statusów).

## Co próbujesz

1. **Cudze dane.** Dwa konta tej samej roli (i dwie firmy, gdy jest ich wiele). Konto A odczytuje, edytuje,
   archiwizuje, usuwa i pobiera (pliki, PDF) każdy rodzaj rekordu konta B, podając jego identyfikator w adresie
   i w API → 404. Lista i wyszukiwarka konta A nie pokazują rekordów B, także przy filtrach i sortowaniu.
2. **Wyższa rola.** Każda trasa modułu wywołana przez rolę z najmniejszymi uprawnieniami → 403. Adres ekranu dla
   wyższej roli wpisany ręcznie w przeglądarce → przekierowanie albo komunikat, bez danych.
3. **Podrobione pola.** W treści żądania dopisz pola, których formularz nie wysyła: właściciel, firma, rola,
   status, kwoty wyliczane, daty utworzenia i zatwierdzenia. Zapisany rekord ma wartości z sesji i z wyliczeń
   serwera, nie z żądania.
4. **Przejścia statusów.** Każde przejście, którego nie ma w specu (np. zatwierdzenie odrzuconego, edycja
   zatwierdzonego, powrót z „zamknięty”) → 409 albo 400, rekord bez zmian.
5. **Dwa razy naraz.** Dwa równoczesne żądania (`Promise.all`) dla akcji, które coś zużywają albo nadają: numer
   dokumentu, stan magazynu, limit (dni, miejsc, kwoty), zatwierdzenie, zapisanie się na termin. Wynik: jeden
   zapis albo dwa poprawne, bez powtórzonego numeru, bez ujemnego stanu, bez przekroczonego limitu.
6. **Usuwanie a historia.** Usunięcie albo archiwizacja rekordu, z którego korzystają inne. Historia zmian zostaje,
   a powiązane rekordy zachowują się zgodnie ze specem (blokada, archiwum, komunikat). Nic nie znika po cichu.
7. **Złe dane.** W polach tekstowych `<script>alert(1)</script>` → na ekranie widać ten napis jako zwykły tekst.
   Tekst dłuższy niż limit, liczby ujemne i ogromne, data „do” wcześniejsza niż „od” → 400 z komunikatem przy polu.

## Co robisz z wynikiem

- Próba się udała (nadużycie przeszło): to błąd. Najpierw czerwony test, potem poprawka, potem `npm run check`.
- Powiedz użytkownikowi jednym akapitem, bez nazw technicznych, np. „Sprawdziłem 18 sposobów nadużycia modułu, m.in.
  podgląd cudzych wniosków i dwa kliknięcia naraz. Dwa się udały i oba naprawiłem: …”.
- Wynik zapisz w `TESTS.md` modułu, w sekcji „Próby nadużyć” (lista prób: przeszła / naprawiona).

## W module „Publikacja”

Przed wgraniem na serwer przejdź całą aplikację naraz. Każdy zrobiony moduł ma blok `abuse` (brakujący dopisz według
listy wyżej). Potem sprawdź punkty 1–3 **między modułami**: dane jednego modułu widziane z ekranów i list innego
(np. wnioski urlopowe w kalendarzu zadań, klienci w wyszukiwarce faktur).

### Przegląd tras

Zanim wgrasz aplikację na serwer, zrób spis wszystkich tras API z kodu: `backend/src/app.ts` (trasy przed
`api.use(requireAuth)` i każde `mountModule`) oraz każdy `*.routes.ts`. Porównaj spis z „Mapą dostępu”
w `SPEC-GENERAL.md` w obie strony:

1. **Każda trasa jest w Mapie.** Trasa, której tam nie ma, to błąd: dopisz ją do Mapy (publiczną tylko po zgodzie
   użytkownika) albo ją usuń.
2. **Każdy wiersz Mapy ma trasę.** Wiersz bez trasy usuń z Mapy.
3. **Trasy publiczne** (przed `requireAuth`): każda ma powód w Mapie, limit prób i `validateBody` przy zapisie. Nie
   zwraca danych, które wymagają logowania (np. listy użytkowników, adresów e-mail, rekordów innych firm).
4. **Trasy za logowaniem:** każda ma w testach 401 bez logowania i 403 dla złej roli. Trasa węższa niż moduł
   (`requireRole`) ma test 403 dla roli, która widzi moduł, ale nie tę trasę.
5. **Pliki i PDF** pobiera się tylko przez trasę z kontrolą dostępu. Folder z przesłanymi plikami nie jest dostępny
   pod bezpośrednim adresem.
6. **Wyjątki `rule-ok`:** wypisz wszystkie z całego projektu i przy każdym sprawdź, czy powód nadal jest prawdziwy.

Brak testu albo dziura to błąd: najpierw czerwony test, potem poprawka, na końcu `npm run check`.

Użytkownikowi pokaż zwykłymi słowami, co jest dostępne **bez logowania** (np. „Bez logowania można: otworzyć stronę
główną i cennik, zalogować się, wysłać formularz kontaktowy”), i poproś o potwierdzenie. Wynik zapisz w `TESTS.md`
modułu Publikacja, w sekcji „Przegląd tras” (liczba tras, publiczne, znalezione i naprawione).
