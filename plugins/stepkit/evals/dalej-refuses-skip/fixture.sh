mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Sklep

**Wersja stepkit:** 0.1.19

**Następny krok:** Logowanie, implementacja: krok 3 z 4.

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
| 1 | Logowanie | login | w toku | implementacja (krok 3/4) | — |
| 2 | Klienci | customers | czeka | makieta | login |

## Ostatnie decyzje

- 2026-11-12: plan gotowy
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Sklep
Role: admin (właściciel), user (klient). Części: strona, konto, panel.
MD
mkdir -p docs/modules/login
printf '# Plan: Logowanie\n\n- [x] 1. Migracja users\n- [x] 2. Schemat logowania\n- [ ] 3. Trasa POST /api/auth/login + testy\n- [ ] 4. Ekran /login\n' > docs/modules/login/PLAN.md
