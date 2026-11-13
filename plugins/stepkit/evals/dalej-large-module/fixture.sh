mkdir -p docs
cat > docs/STATUS.md <<'MD'
# Stan projektu: Urlopy

**Wersja stepkit:** 0.1.22

**Następny krok:** Moduł Wnioski: spec (odpowiedzi na pytania makiety są w QUESTIONS.md).

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
| 1 | Wygląd | appearance | zrobiony | zamknięcie | — |
| 2 | Logowanie | login | zrobiony | zamknięcie | appearance |
| 3 | Pracownicy | employees | zrobiony | zamknięcie | login |
| 4 | Złóż wniosek | new-request | zrobiony | zamknięcie | employees |
| 5 | Wnioski | leave-requests | w toku | spec | new-request |
| 6 | Publikacja | deploy | czeka | makieta | appearance, login, employees, new-request, leave-requests |

## Ostatnie decyzje

- 2026-11-12: Makieta modułu Wnioski zaakceptowana, odpowiedzi na 9 pytań zapisane.
MD
cat > docs/SPEC-GENERAL.md <<'MD'
# Spec ogólny: Urlopy

Jedna firma. Role: admin (właściciel, rozpatruje wnioski), employee (składa wnioski).
Tabele: users, leave_types (uses_pool, yearly_limit), leave_pools (yearly_days, carried_over), leave_requests
(user_id, leave_type_id, date_from, date_to, days, status, employee_note, admin_comment, decided_by, decided_at).
Statusy: pending, approved, rejected, withdrawn, cancel_requested, cancelled.
E-maile: moduł E-mail jest zrobiony (sendMail). Historia zmian włączona.
MD
mkdir -p docs/modules/leave-requests
cat > docs/modules/leave-requests/QUESTIONS.md <<'MD'
# Pytania: Wnioski

## 1. Co widać na liście wniosków?
**Odpowiedź:** pracownik ze stanowiskiem, typ, termin, liczba dni, status, przy braku dni „brakuje X dni”.

## 2. Filtry listy?
**Odpowiedź:** zakładki: do decyzji, zatwierdzone, odrzucone, wszystkie; wyszukiwanie po pracowniku, typ, rok.

## 3. Zatwierdzanie i odrzucanie?
**Odpowiedź:** zatwierdzenie jednym przyciskiem; odrzucenie wymaga komentarza. Po zatwierdzeniu dni schodzą z puli
(najpierw zaległe). E-mail i powiadomienie do pracownika.

## 4. Szczegóły wniosku?
**Odpowiedź:** okno ze szczegółami, pulą pracownika i listą osób, które w tym terminie są na urlopie.

## 5. Prośba o anulowanie zatwierdzonego urlopu?
**Odpowiedź:** pracownik prosi, admin decyduje; przy zgodzie dni wracają do puli. E-mail w obie strony.

## 6. Komentarze do wniosku?
**Odpowiedź:** tak, admin i pracownik mogą dopisywać komentarze pod wnioskiem, z powiadomieniem.

## 7. Wydruk?
**Odpowiedź:** wydruk zatwierdzonego wniosku do podpisu (strona do druku w przeglądarce).

## 8. Eksport?
**Odpowiedź:** eksport listy do Excela z bieżącymi filtrami.

## 9. Zatwierdzanie kilku naraz?
**Odpowiedź:** tak, zaznaczenie kilku wniosków i „Zatwierdź zaznaczone”.
MD
mkdir -p shared/src/constants backend/src/modules frontend/src/modules mockups/src/modules/leave-requests
printf '{"name":"urlopy","private":true,"workspaces":["shared","backend","frontend","mockups"]}\n' > package.json
printf 'export const ROLES = ["admin", "employee"] as const;\n' > shared/src/constants/index.ts
printf 'export function LeaveRequestsMockup() { return null; }\n' > mockups/src/modules/leave-requests/LeaveRequestsMockup.tsx
