# Test Antalo: wejście i oczekiwany wynik

Test odbiorczy pluginu (spec §10.1). W pustym folderze uruchom `/stepkit:start`, a na pytanie o opis wklej tekst
z sekcji „Opis wejściowy”. W wywiadzie odpowiadaj tak, jak odpowiedziałby właściciel Antalo (sekcja „Odpowiedzi”).
Po kroku 7 porównaj `docs/SPEC-GENERAL.md` z sekcją „Oczekiwane”.

Źródło: `/home/maciej/www/register/dokumentacja/działanie-aplikacji/` (stan na 2026-11-12).

## Opis wejściowy

> Chcę zrobić aplikację dla małych firm do pilnowania czasu pracy i urlopów pracowników. Pracownik loguje się
> i widzi swój kalendarz, swoje godziny pracy i składa wnioski urlopowe. Kierownik (menadżer) akceptuje albo
> odrzuca wnioski swoich ludzi i widzi kalendarz zespołu: kto kiedy jest w pracy, kto na urlopie. Właściciel firmy
> (administrator) dodaje pracowników, dzieli ich na grupy, ustawia harmonogramy godzin pracy i widzi wszystko.
> Księgowa ma widzieć rozliczenie czasu pracy za miesiąc, żeby policzyć wypłaty. Do tego terminy badań lekarskich
> pracowników z przypomnieniem. Z aplikacji ma korzystać wiele firm, każda płaci abonament i widzi tylko swoich
> ludzi. Na stronie głównej chcę opis aplikacji, cennik i rejestrację firmy.

## Odpowiedzi w wywiadzie (skrót)

- Części: strona dla odwiedzających + panel. Pracownik ma swoje „moje” ekrany (kalendarz, wnioski, ustawienia).
- Rejestracja: firma rejestruje się sama na stronie; pracowników zakłada administrator.
- Wiele firm: tak.
- Historia zmian: tak, kto dodał / zmienił / usunął / zatwierdził; widzi administrator.
- Archiwum: tak, pracownicy (zwolniony pracownik nie znika z historii godzin i urlopów).
- E-maile: tak, decyzje we wnioskach, przypomnienia o badaniach, weryfikacja adresu, reset hasła.
- Wygląd: kolory wybiera Claude; przełącznik jasny/ciemny: tak.
- Najważniejsze na start: czas pracy i wnioski urlopowe.

## Oczekiwane

**Role** (nazwy mogą się różnić, liczy się zakres): administrator (właściciel firmy), menadżer (zakres: swoja grupa),
księgowa, pracownik. Dopuszczalne: osobna rola właściciela całej aplikacji (w Antalo „panel systemowy”), także jako
propozycja na później.

**Części:** strona dla odwiedzających (opis, cennik, rejestracja firmy) i panel. Ekrany „moje” pracownika uznajemy za
poprawne zarówno jako część **konto**, jak i jako pozycje panelu widoczne dla roli pracownika.

**Główne obszary nawigacji panelu** (każdy musi się pojawić, nazwy dowolne):
- pulpit,
- pracownicy i grupy,
- czas pracy i harmonogramy,
- kalendarz (zespołu i własny),
- wnioski urlopowe,
- rozliczenia (dla księgowej),
- badania lekarskie,
- ustawienia (firmy i własne),
- historia zmian.

**Główne tabele** (zarys): firmy, użytkownicy (z rolą i firmą), grupy (z menadżerem), harmonogramy, wpisy czasu pracy,
wnioski urlopowe (typ, daty, status), badania lekarskie, historia zmian. Każda z `company_id` (wzorzec „wiele firm”).

**Wzorce:** wiele firm włączone; archiwum pracowników zaproponowane przez plugin (jak archiwizacja w Antalo); historia
zmian włączona (jak `activity_log` w Antalo); e-maile → moduł „E-mail” przed pierwszym modułem, który go potrzebuje.

**Kolejność modułów:** 1. Logowanie (z rejestracją firmy albo zaraz po nim), potem pracownicy i grupy, czas pracy,
wnioski urlopowe (obszar 20), …, na końcu Publikacja.

## Kryterium zaliczenia

„Porównywalne” = te same role (co do zakresu), wszystkie główne obszary nawigacji, Logowanie jako pierwszy moduł,
wiele firm + archiwum + historia zaproponowane lub ustalone. Brak któregoś punktu → poprawka w `interview.md` albo
`start/SKILL.md` i powtórka testu.
