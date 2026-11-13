mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Sklep

**Wersja stepkit:** 0.1.22

**Następny krok:** Klienci: spec.

## Start aplikacji

- [x] 1. Sprawdzenie komputera
- [x] 2. Szkielet i repo
- [x] 3. Opis
- [x] 4. Wywiad
- [x] 5. Podsumowanie
- [x] 6. Makieta ogólna
- [x] 7. Spec ogólny
- [x] 8. Plik stanu

## Moduły

| # | Moduł | Folder | Status | Etap | Zależy od |
|---|---|---|---|---|---|
| 1 | Logowanie | login | zrobiony | zamknięcie | — |
| 2 | Klienci | customers | w toku | spec | login |
| 3 | Raporty | reports | czeka | makieta | login |

## Ostatnie decyzje

- 2026-11-12: plan gotowy
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Sklep
Role: admin (właściciel), user (klient). Części: strona, konto, panel.
MD
