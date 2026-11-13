mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Urlopy

**Wersja stepkit:** 0.1.22

**Następny krok:** Podsumowanie wywiadu (akceptacja), potem makieta ogólna.

## Start aplikacji

- [x] 1. Sprawdzenie komputera
- [x] 2. Szkielet i repo
- [x] 3. Opis
- [x] 4. Wywiad
- [ ] 5. Podsumowanie
- [ ] 6. Makieta ogólna
- [ ] 7. Spec ogólny
- [ ] 8. Plik stanu

## Ostatnie decyzje

- (jeszcze brak)
MD
cat > docs/OVERVIEW.md <<'MD'
# Opis aplikacji: Urlopy

## Opis własnymi słowami
Aplikacja dla mojej firmy produkcyjnej (40 osób) do wniosków urlopowych. Pracownik składa wniosek, kierownik zmiany
akceptuje albo odrzuca, ja (właściciel) widzę wszystko i dodaję pracowników. Część pracowników na produkcji nie ma
komputera, korzystają z telefonu.

## Ustalenia z wywiadu (2026-11-12)
- Części aplikacji: konto (pracownik) i panel (kierownik, właściciel). Bez strony dla odwiedzających.
- Role: właściciel (wszystko), kierownik zmiany (wnioski swojej zmiany), pracownik (swoje wnioski).
- Dane: pracownicy, zmiany, wnioski urlopowe (typ, daty, status, powód odrzucenia), pula dni.
- Główna czynność: wniosek → akceptacja kierownika → informacja dla pracownika.
- Statusy: oczekuje, zaakceptowany, odrzucony, wycofany.
- Historia zmian: tak, decyzje we wnioskach; widzi właściciel.
- Archiwum: pracownicy.
- Powiadomienia / e-maile / pliki / raporty: e-mail o decyzji; raport wykorzystania urlopu dla księgowej.
- Wygląd: kolory wybiera Claude; przełącznik jasny/ciemny: nie.
- Języki: tylko polski.
- Publikacja: brak serwera, OVH na końcu.
- Najważniejsze na start: wnioski urlopowe.
MD
