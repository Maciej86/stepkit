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

## Krok 4: wywiad

Zasady (zawsze):
- **Jedno pytanie na raz**, prostym językiem, bez żargonu.
- **Najpierw zgadnij z opisu.** Gdy odpowiedź wynika z opisu, nie pytaj otwarcie, tylko poproś o potwierdzenie:
  „Z opisu rozumiem, że … Zgadza się?”
- **Pomiń obszar**, który nie dotyczy tej aplikacji (np. „Wiele firm” przy sklepie jednej firmy: potwierdź jednym
  zdaniem albo pomiń).
- Gdy coś jest niejasne, daj **warianty a/b/c**, przy jednym dopisz „(polecam)” i jednym zdaniem dlaczego.
- Zapisuj odpowiedzi na bieżąco (do podsumowania w kroku 5).

Obszary, dokładnie w tej kolejności. Przykład pod każdym to wzór, nie tekst do odczytania.

1. **Części aplikacji.** „Aplikacja może mieć trzy części: stronę dla odwiedzających (bez logowania, np. oferta,
   formularz), konto użytkownika (np. klient widzi swoje zamówienia) i panel administracyjny (Ty i pracownicy
   obsługujecie wszystko). Które są potrzebne?”
2. **Kto używa.** Grupy ludzi → z nich powstają role. „Kto będzie się logował: Ty, pracownicy, klienci?”
3. **Logowanie.** Kto się loguje, a kto korzysta bez konta.
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
15. **Pliki.** Zdjęcia, dokumenty, załączniki.
16. **Raporty i eksporty.** Podsumowania, pobieranie do Excela.
17. **Języki.** „Na start aplikacja jest po polsku. Czy kiedyś mają być inne języki?” (Teksty i tak są w plikach
    językowych; chodzi o to, czy zaplanować przełącznik języka.)
18. **Publikacja.** „Czy masz już domenę albo serwer? Jeśli nie, na końcu budowy przeprowadzę Cię przez OVH.”
19. **Najważniejsze na start.** „Gdyby aplikacja miała umieć tylko jedną rzecz, to którą?”

## Krok 5: podsumowanie

Pokaż podsumowanie w punktach (części aplikacji, role i co mogą, główne dane, główna czynność, archiwum, historia,
e-maile, najważniejsze na start). Zapytaj: **„Czy wszystko się zgadza? Co poprawić?”** Poprawiaj, aż użytkownik
zaakceptuje. Zapisz do `docs/OVERVIEW.md`:

```markdown
# Opis aplikacji: <nazwa>

## Opis własnymi słowami
<tekst użytkownika>

## Ustalenia z wywiadu (<data>)
- Części aplikacji: …
- Role: … (kto co może)
- Dane: …
- Główna czynność: …
- Statusy: …
- Historia zmian: tak/nie, zakres, kto widzi
- Archiwum: co, kto przywraca, usuwanie na stałe
- Powiadomienia / e-maile / pliki / raporty: …
- Języki: …
- Publikacja: …
- Najważniejsze na start: …
```

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
| 18 | moduł „Publikacja” (zawsze ostatni) |
| 19 | moduł zaraz po „Logowanie” |
