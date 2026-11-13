# Opis i wywiad

Czytasz ten plik w krokach 3–5 `/stepkit:start`.

## Krok 3: opis

Zapytaj dokładnie: **„Opisz własnymi słowami, co chcesz stworzyć. Kto będzie z tego korzystał i co ma się dziać?”**

Opis jest wystarczający, gdy wiesz z niego: **kto** używa aplikacji, **co robi krok po kroku** i **jakie dane** się
zbiera. To zwykle co najmniej ok. 200 znaków.

Gdy opis jest krótszy albo czegoś z trzech rzeczy brakuje: **nie odrzucaj go i nie przechodź dalej**. Zadaj jedno
pytanie o pierwszą brakującą rzecz, np.:
- „Kto będzie korzystał z aplikacji: tylko Ty, Twoi pracownicy, Twoi klienci?”
- „Opisz jedno zamówienie od początku do końca: kto je składa, co się z nim dzieje dalej?”
- „Jakie informacje chcesz zapisywać przy każdym zamówieniu?”

Powtarzaj, aż opis ma te trzy rzeczy. Potem jednym zdaniem streść, co zrozumiałeś, i przejdź do wywiadu.

### Zakres stepkit

stepkit buduje **aplikacje do pracy z danymi**: ludzie wpisują, przeglądają, zatwierdzają i zestawiają informacje
(panel firmy, konto klienta, strona dla odwiedzających). To każda działalność firmy, np. flota, magazyn, zamówienia,
faktury, zadania, klienci, urlopy i czas pracy. Do tego są wzorce, testy i wygląd w szablonie.

Poza zakresem (jako **cała** aplikacja): edytor grafiki, wideo albo dźwięku, gra, aplikacja do pobrania ze sklepu
albo instalowana na komputerze, sklep z setkami produktów i płatnościami (lepiej gotowa platforma), serwis
z milionami odwiedzających, komunikator jako główny produkt. Gdy opis wygląda na taki projekt, powiedz to uczciwie,
zanim zaczniesz wywiad:

> „To, co opisujesz, to głównie <edytor grafiki>. stepkit najlepiej buduje aplikacje do zbierania i porządkowania
> danych, a <edytor> potrzebuje innych narzędzi i innego sposobu pracy. Mogę zbudować część z danymi (np. konta,
> projekty klientów, zamówienia), a edytor zostawić jako osobny moduł z dodatkową biblioteką, albo możemy tu skończyć.
> Co wybierasz?”

Pojedynczy moduł spoza zakresu w aplikacji z danymi (np. przycinanie zdjęcia, czat pracowników, prosty edytor
grafiki) jest w porządku: zapisz go w podsumowaniu jako moduł z dodatkową biblioteką (`code-conventions.md`,
„Biblioteki”).

### „Na wzór …”

Gdy użytkownik pisze, że chce coś „jak Asana”, „na wzór Booksy”: zapytaj (albo zgadnij z opisu i potwierdź), co mu
się tam podoba (układ, sposób pracy, konkretna funkcja), i zapisz to w podsumowaniu jako inspirację. Budujemy
podobnie, nie identycznie: bez nazwy, logo, kolorów i tekstów tamtej aplikacji, tylko z tym, co pasuje do jego
potrzeb. Pozostałe funkcje tamtej aplikacji nie wchodzą same; najwyżej do `docs/IDEAS.md`.

## Krok 4: wywiad

Zasady (zawsze):
- **Jedno pytanie na raz**, prostym językiem, bez żargonu.
- **Najpierw zgadnij z opisu.** Gdy odpowiedź wynika z opisu, nie pytaj otwarcie, tylko poproś o potwierdzenie:
  „Z opisu rozumiem, że … Zgadza się?”
- **Pomiń obszar**, który nie dotyczy tej aplikacji (np. „Wiele firm” przy sklepie jednej firmy: potwierdź jednym
  zdaniem albo pomiń).
- Gdy coś jest niejasne, daj **warianty a/b/c**, przy jednym dopisz „(polecam)” i jednym zdaniem dlaczego.
- **Nie powołuj się na przepisy.** Żadnego „według Kodeksu pracy”, „prawo wymaga”, „zgodnie z RODO”: nie jesteś
  doradcą prawnym, przepisy się zmieniają, a firmy stosują je różnie. Uzasadniaj tym, jak działa aplikacja i co
  ułatwia („żeby od razu było widać, ile dni zostało”). Pytaj o to, jak firma robi to dziś. Gdy coś może mieć
  znaczenie prawne, powiedz tylko: „to warto potwierdzić z kadrami albo księgową”.
- **Listy rodzajów to propozycja, nie całość.** Gdy proponujesz rodzaje (urlopów, nieobecności, kategorii), powiedz,
  że to kilka najczęstszych na start, a pełną listę użytkownik uzupełni w panelu; każdy rodzaj ma swoje ustawienia
  (np. czy odejmuje dni z puli). Nie zakładaj, że wszystkie działają tak samo.
- Zapisuj odpowiedzi na bieżąco (do podsumowania w kroku 5).

Obszary, dokładnie w tej kolejności. Przykład pod każdym to wzór, nie tekst do odczytania.

1. **Części aplikacji.** „Aplikacja może mieć trzy części: stronę dla odwiedzających (bez logowania, np. oferta,
   formularz), konto użytkownika (np. klient widzi swoje zamówienia) i panel administracyjny (Ty i pracownicy
   obsługujecie wszystko). Które są potrzebne?”
2. **Kto używa.** Grupy ludzi → z nich powstają role. „Kto będzie się logował: Ty, pracownicy, klienci?”
3. **Logowanie.** Kto się loguje, a kto korzysta bez konta. Potem **czym się logują**; nie zakładaj, że każdy ma
   e-mail (produkcja, magazyn, sklep, kierowcy często go nie mają): „Czy każda osoba, która będzie się logować, ma
   własny adres e-mail (firmowy albo prywatny)?”
   a) tak, każdy: logowanie e-mailem i hasłem (polecam, gdy to prawda),
   b) nie wszyscy: logowanie loginem (np. `jan.kowalski`, może też wyglądać jak e-mail) i hasłem, a osobne pole
      „e-mail do powiadomień” wypełniane, gdy ktoś ma adres (polecam przy pracownikach bez firmowej poczty),
   c) nie wszyscy, ale mogą podać prywatny: logowanie e-mailem, a przy zakładaniu konta pole na adres prywatny.
   Przy b): osoby bez e-maila nie dostaną powiadomień ani linku do zmiany hasła; powiadomienia widzą w aplikacji,
   a hasło zmienia im administrator. Powiedz to jednym zdaniem i zapisz w ustaleniach (wpływa na moduły Logowanie,
   E-mail i Powiadomienia).
   *Dla Ciebie:* gdy jest logowanie, zapisz w ustaleniach, że **wszystko poza wyraźnie publicznym wymaga logowania**,
   a każda część danych jest dostępna tylko dla ról, które ją widzą (tak działa szablon; nie pytaj o to użytkownika).
   Gdy jest **strona dla odwiedzających z kilkoma podstronami**, ustal, co jest publiczne, a co tylko po zalogowaniu:
   zaproponuj podział (np. „Oferta, Cennik i Kontakt widzi każdy; Moje zamówienia i Faktury tylko zalogowany klient”)
   i poproś o potwierdzenie albo poprawki. Wynik trafia do „Mapy dostępu” w specu ogólnym (krok 7).
4. **Rejestracja.** a) konta zakłada administrator (polecam przy pracownikach), b) każdy zakłada konto sam (polecam
   przy klientach), c) oba.
5. **Role i uprawnienia.** Co każda grupa widzi i może zmieniać. Przy kilku rolach zrób w głowie tabelkę rola × czynność
   i zapytaj tylko o niejasne pola.
6. **Dostęp do części aplikacji.** „Czy administrator ma włączać lub wyłączać konkretnym osobom dostęp do wybranych
   części (np. pracownik A widzi magazyn, a B nie)?”
7. **Wiele firm.** „Czy z aplikacji będzie korzystać tylko Twoja firma, czy wiele firm, każda ze swoimi danymi (jak
   w usłudze na abonament)?”
8. **Dane.** Co aplikacja zapisuje: dla każdej głównej rzeczy (zamówienie, klient, produkt) jej pola i to, jak rzeczy
   się łączą (zamówienie ma klienta i pozycje).
   Gdy opis wspomina o magazynie: „Czy firma ma jeden magazyn, czy kilka? Czy trzeba wiedzieć, na której półce leży
   towar?” Odpowiedź zapisz w podsumowaniu; zmienia budowę bazy we wszystkich modułach magazynowych
   (`../../dalej/references/domains/warehouse.md`), więc nie czekaj z nią do makiety.
9. **Główna czynność.** „Opisz krok po kroku najważniejszą rzecz, którą robi aplikacja, od początku do końca.”
10. **Statusy.** „Czy zamówienie przechodzi przez etapy, np. nowe → w realizacji → wysłane?”
11. **Historia zmian.** „Czy aplikacja ma zapisywać i pokazywać, kto, co i kiedy zmienił?” Jeśli tak: zakres (zmiany
    danych, usunięcia, statusy, logowania; których części dotyczy) i **kto widzi historię** (polecam: tylko
    administrator).
12. **Usuwanie i archiwum.** **Sam zaproponuj**, które rzeczy zamiast usuwania trafiają do archiwum (polecam: ludzie,
    czyli pracownicy i klienci, oraz główne rekordy, np. zamówienia). „Proponuję, żeby »Usuń« przy pracownikach,
    klientach i zamówieniach przenosiło do archiwum, z możliwością przywrócenia. Zgadzasz się?” Dopytaj: kto może
    przywracać i czy z archiwum da się usunąć na stałe (polecam: tylko administrator).
13. **Powiadomienia w aplikacji.** Czy ktoś ma widzieć informacje o zdarzeniach po zalogowaniu.
14. **E-maile.** „Czy aplikacja ma wysyłać e-maile, do kogo i kiedy (np. potwierdzenie zamówienia, reset hasła)?”
15. **Pliki.** Zdjęcia, dokumenty, załączniki: do czego są dołączane (np. do wniosku, do pracownika), jakie rodzaje
    (polecam na start: PDF i zdjęcia), kto je widzi. Limity i sposób przechowywania ustala szablon
    (`code-conventions.md`, „Pliki”), nie pytaj o nie.
16. **Raporty i eksporty.** Podsumowania, pobieranie do Excela.
17. **Wygląd.** Dwa pytania, po kolei:
    - Kolory: „W jakich kolorach ma być aplikacja? a) w kolorach mojej firmy (podaj je, wklej logo albo adres swojej
      strony, odczytam z nich kolory); b) opiszę nastrój, np. spokojna i elegancka, energiczna, naturalna; c) wybierz
      sam, dobiorę kolory do branży i pokażę je w makiecie (polecam, jeśli nie masz kolorów firmowych).”
    - Ciemny motyw: „Czy aplikacja ma mieć przełącznik jasny/ciemny motyw? a) tak, w koncie i panelu (polecam, jeśli
      ludzie będą w niej pracować długo, np. wieczorem); b) tylko jasny (prościej; przełącznik można dodać później).”
18. **Języki.** „Na start aplikacja jest po polsku. Czy kiedyś mają być inne języki?” (Teksty i tak są w plikach
    językowych; chodzi o to, czy zaplanować przełącznik języka.)
19. **Publikacja.** „Czy masz już domenę albo serwer? Jeśli nie, na końcu budowy przeprowadzę Cię przez OVH.”
20. **Najważniejsze na start.** „Gdyby aplikacja miała umieć tylko jedną rzecz, to którą?”

## Krok 5: podsumowanie

Pokaż podsumowanie w punktach (części aplikacji, role i co mogą, główne dane, główna czynność, archiwum, historia,
e-maile, wygląd, najważniejsze na start). Zapytaj: **„Czy wszystko się zgadza? Co poprawić?”** Poprawiaj, aż użytkownik
zaakceptuje. Zapisz do `docs/OVERVIEW.md`:

```markdown
# Opis aplikacji: <nazwa>

## Opis własnymi słowami
<tekst użytkownika>

## Ustalenia z wywiadu (<data>)
- Części aplikacji: …
- Role: … (kto co może)
- Dostęp: co jest publiczne (podstrony strony, formularze), co tylko po zalogowaniu, co tylko dla wybranych ról
- Dane: …
- Główna czynność: …
- Statusy: …
- Historia zmian: tak/nie, zakres, kto widzi
- Archiwum: co, kto przywraca, usuwanie na stałe
- Powiadomienia / e-maile / pliki / raporty: …
- Wygląd: kolory (firmowe: … / nastrój: … / wybiera Claude), przełącznik jasny/ciemny: tak/nie
- Języki: …
- Publikacja: …
- Najważniejsze na start: …
- Dodatki: … (wybrane w kroku „Dodatki”)
```

## Dodatki (koniec kroku 5, po akceptacji podsumowania)

Pokaż **ponumerowaną listę 5–7 dodatków** wybranych z katalogu poniżej, tylko tych, które pasują do tej aplikacji
(np. bez SEO, gdy nie ma strony dla odwiedzających; bez zdjęć profilowych w małym narzędziu). Przy każdym jedno zdanie
po co, przy 2–3 najważniejszych „(polecam)”. Zapytaj: „Które dodatki dołączamy? Napisz numery, np. »1, 3, 4«, albo
»żadne«. Pozostałe zapiszę w pomysłach na później.” Nie przechodź do makiety przed odpowiedzią.

Wybrane: dopisz do `docs/OVERVIEW.md` („Dodatki”) i uwzględnij w specu ogólnym (krok 7): dodatki dotyczące wszystkich
ekranów do „Zasady wspólne”, pozostałe do modułu, którego dotyczą, albo jako osobny moduł. Niewybrane: wiersze
w `docs/IDEAS.md` ze statusem `pomysł`.

| Dodatek | Proponuj, gdy | Po co (dla użytkownika) | Gdzie trafia |
|---|---|---|---|
| Wyszukiwarka, filtry, sortowanie list | są listy, które urosną | szybko znajdziesz osobę, wniosek, klienta | zasady wspólne |
| Stronicowanie list | setki wierszy | długie listy nie zwalniają | zasady wspólne |
| Wygodna wersja na telefon | ktoś będzie używał głównie telefonu | ekrany projektowane pod kciuk | zasady wspólne (wpływa na makiety) |
| Import z Excela | dużo danych na start (ludzie, produkty, klienci) | nie wpisujesz ręcznie 50 pozycji | moduł tych danych |
| Eksport do Excela / PDF, wydruk | dokumenty do podpisu, zestawienia | wniosek do podpisu, zestawienie dla księgowej | moduł tych danych |
| Pulpit z liczbami i wykresami | kilka ról z codziennymi zadaniami | po zalogowaniu widać, co czeka | moduł „Pulpit” |
| Zaproszenie e-mailem | konta zakłada administrator | osoba sama ustawia hasło | Logowanie + E-mail |
| Reset hasła przez e-mail | logowanie hasłem | zapomniane hasło bez telefonu do szefa | Logowanie + E-mail |
| Ustawienia własnego konta, zdjęcie | wielu użytkowników | każdy zmienia swoje dane i hasło | konto |
| Logo i nazwa firmy w aplikacji | wiele firm albo aplikacja dla klientów | aplikacja wygląda jak „Twoja” | ustawienia |
| Polityka prywatności, regulamin, cookies | strona dla odwiedzających, rejestracja, dane osobowe | odwiedzający wiedzą, co dzieje się z ich danymi (treść przygotowuje firma) | strona |
| Formularz kontaktowy | strona dla odwiedzających | klienci piszą bez szukania adresu | strona |
| Podstawy SEO | strona dla odwiedzających | Google dobrze pokazuje stronę | strona |
| Statystyki odwiedzin | strona dla odwiedzających | wiesz, ilu ludzi wchodzi | strona |
| Strona „nie znaleziono” i przerwa techniczna | zawsze przy publikacji | czytelny komunikat zamiast błędu | zasady wspólne |
| Wylogowanie po bezczynności | wspólne komputery (biuro, produkcja) | nikt nie zostanie zalogowany na cudzym koncie | Logowanie |

## Jak odpowiedzi zmieniają szkielet

| Obszar | Co zmieniasz |
|---|---|
| 1 | `AREAS` w `shared/src/navigation.config.ts`; usuń pozycje i ekrany startowe wyłączonych części |
| 2–5 | `ROLES` i `ROLE_LABELS` (`shared/src/constants/roles.ts`, etykiety w `shared/locales/pl/common.json`), `ROLE_HOME`, trzy nawigacje |
| 6–7 | wzorce opcjonalne z `../../dalej/references/code-conventions.md` (dostęp nadawany, wiele firm) |
| 8 | model danych w `SPEC-GENERAL.md` z regułą usuwania przy każdej relacji |
| 11 | historia zmian: zapisz w `SPEC-GENERAL.md`; tabelę `activity_log` dodaje moduł Logowanie, jako migrację zaraz po `users` |
| 12 | lista danych z archiwum w `SPEC-GENERAL.md` |
| 14 | moduł „E-mail” w kolejności modułów |
| 17 | kolory zapisz w `OVERVIEW.md` (ustawiasz je w kroku 6 w `shared/src/theme.ts`); przełącznik „tak” → `COLOR_SCHEME_TOGGLE = true` w `shared/src/theme.ts` |
| 19 | moduł „Publikacja” (zawsze ostatni) |
| 20 | moduł zaraz po „Logowanie” |
