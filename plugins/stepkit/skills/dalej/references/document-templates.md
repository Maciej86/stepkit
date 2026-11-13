# Wzory dokumentów

Czytasz ten plik, gdy tworzysz albo zmieniasz dokument w `docs/`. Dokumenty są po polsku, nazwy plików po angielsku.
Decyzje, których użytkownik nie podjął, oznaczaj **[decyzja AI]**.

## `docs/STATUS.md`

Czyta go każda rozmowa i strona „Postęp” w makietach. **Trzymaj się dokładnie tego formatu** (nagłówki, kolejność
kolumn, wartości statusów), bo strona „Postęp” go odczytuje. Maks. ok. 60 linii: starsze „Ostatnie decyzje” przenoś do
`SPEC-GENERAL.md`.

```markdown
# Stan projektu: Sklep z zamówieniami

**Wersja stepkit:** 0.1.21

**Następny krok:** Moduł Logowanie, implementacja: krok 3 z 7 (formularz logowania).

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
| 2 | Logowanie | login | w toku | implementacja (krok 3/7) | appearance |
| 3 | Zamówienia | orders | czeka | makieta | login |
| 4 | E-mail | email | czeka | makieta | login |
| 5 | Klienci | customers | czeka | makieta | login, orders |
| 6 | Publikacja | deploy | czeka | makieta | appearance, login, orders, email, customers |

## Ostatnie decyzje

- 2026-11-12: Klient z zamówieniami trafia do archiwum zamiast usunięcia (moduł Klienci, pytanie 3).
```

- **Wersja stepkit:** wersja, z której powstał albo do której zaktualizowano projekt (`upgrades.md`). Zmienia ją tylko
  aktualizacja projektu.
- **Status:** `zrobiony`, `w toku`, `wstrzymany`, `czeka`. W toku najwyżej jeden moduł.
- **Etap:** `makieta`, `pytania`, `spec`, `plan`, `implementacja`, `testy`, `zamknięcie`; w nawiasie dopisek, gdzie
  wrócić, np. `implementacja (krok 3/7)`. Wstrzymany moduł: etap, w którym przerwano, np. `spec (wstrzymany 2026-11-12)`.
- **Zależy od:** foldery modułów po przecinku albo `—`.
- Po publikacji dopisz sekcję `## Wgraj nową wersję` z procedurą z `deploy-ovh.md`.

## `docs/OVERVIEW.md`

Wzór w `../../start/references/interview.md` (krok 5).

## `docs/SPEC-GENERAL.md`

```markdown
# Spec ogólny: <nazwa>

**Data:** … · **Status:** zaakceptowany przez użytkownika …

## 1. Cel
Co aplikacja robi i po czym poznamy, że działa (2–4 zdania).

## 2. Słownik
| Pojęcie | Znaczenie |

## 3. Części aplikacji
Strona / konto / panel: które są i po co.

## 4. Role i uprawnienia
| Czynność | <rola 1> | <rola 2> | … |

## 5. Nawigacja
Pozycje każdej części (nazwa, folder, kto widzi).

### Mapa dostępu
Wszystko, czego tu nie ma jako publiczne, wymaga logowania (tak działa szablon). Każdy moduł dopisuje swoje adresy API.
| Adres (strona albo API) | Kto ma dostęp | Uwagi |
|---|---|---|
| `/`, `/cennik` | każdy | strona dla odwiedzających |
| `POST /api/auth/login` | każdy | limit prób logowania |
| `/admin/employees`, `/api/employees` | admin | `mountModule(api, 'employees', …)` |
| `DELETE /api/employees/:id` | admin | węższe niż moduł: `requireRole('admin')` |
| `/account/orders`, `/api/my-orders` | user | tylko własne dane (`req.user.id`) |

## 6. Dane
### Tabele (zarys)
| Tabela | Najważniejsze kolumny |
### Relacje
| Rodzic | Dziecko (kolumna) | Przy usunięciu rodzica | Dlaczego |
### Archiwum
Co trafia do archiwum, kto przywraca, czy można usunąć na stałe.
### Historia zmian
Włączona: tak/nie. Zakres. Kto widzi.

## 7. Moduły i kolejność
| # | Moduł | Folder | Zależy od | Dlaczego w tej kolejności |

## 8. Zasady wspólne
Wzorce opcjonalne (wiele firm, dostęp nadawany), dodatki wybrane dla wszystkich ekranów (np. filtry na listach,
wersja na telefon), wyjątki od `code-conventions.md` i od wzorców startowych w `DESIGN.md` (np. „bez dymków po
akcjach”).

### Biblioteki
Biblioteki spoza szablonu, które weszły do projektu (`code-conventions.md`, „Biblioteki”).
| Biblioteka | Do czego | Moduł | Zgoda |
|---|---|---|---|
| `@mantine/schedule` | kalendarz zespołu | absences | lista zatwierdzona |

## 9. Ostatnie decyzje (archiwum)
```

## `docs/modules/<module>/QUESTIONS.md`

```markdown
# Pytania: <moduł>

## 1. <pytanie>
- a) …
- b) … **(polecam: <dlaczego>)**

**Odpowiedź (<data>):** b
```

## `docs/modules/<module>/SPEC.md`

```markdown
# Spec: <moduł>

**Data:** … · **Status:** zaakceptowany …
**Podstawa:** `QUESTIONS.md`, `SPEC-GENERAL.md`

## Cel
## Ekrany
Każdy ekran: co widać, kto widzi (rola), akcje, pusta lista, błędy.
## Dane
Nowe tabele i kolumny (migracje), relacje z regułą przy usunięciu, archiwum, wpisy historii zmian.
## API
| Metoda i adres | Kto | Dane wejściowe (schemat) | Odpowiedź | Błędy |
Wartości liczone przez serwer (nie brane z żądania): …
## Powiązania
| Z modułem | Co ten moduł pokazuje stamtąd / co tamten pokazuje stąd | Funkcja | Pola widoczne dla roli |
|---|---|---|---|
| absences | zadanie przypisane osobie na urlopie ma znacznik „nieobecny 12–16.11” | `getAbsences(userIds, from, to)` | tylko daty, bez rodzaju i powodu |
| dashboard | boks „Moje zadania na dziś” | `countTodayTasks(userId)` | liczba |
## Teksty
Plik `shared/locales/pl/<module>.json`: najważniejsze klucze.
## Części (tylko duży moduł, `SKILL.md` „Duży moduł dzielisz na części”)
| # | Część | Zakres | Dlaczego osobno |
|---|---|---|---|
| 1 | Rozpatrywanie | lista wniosków, filtry, zatwierdzenie, odrzucenie z komentarzem, odjęcie dni | bez tego moduł nie działa; sama część 1 jest już używalna |
| 2 | Anulowanie i wydruk | prośba o anulowanie, decyzja, zwrot dni, wydruk wniosku | rzadsze czynności, mogą dojść później |
Każda część: `SPEC-<n>.md`, `PLAN-<n>.md`, `TESTS-<n>.md` (wzory jak niżej). Ten plik zostaje specem ogólnym modułu.
## Poza zakresem
```

## `docs/modules/<module>/PLAN.md`

Kroki małe, każdy kończy się czymś do sprawdzenia. Odhaczaj `- [x]` po `npm run check`.

```markdown
# Plan: <moduł>

- [ ] 1. Migracja `003_orders.sql` + test: … → `npm run migrate`, `npm run check`
- [ ] 2. Schemat `shared/src/schemas/orders.ts` + testy
- [ ] 3. Trasa `GET /api/orders` + testy (dane, 401, 403)
- [ ] …
- [ ] N. Test e2e `e2e/orders.spec.ts` ze scenariuszy `TESTS.md`
```

## `docs/modules/<module>/TESTS.md`

Scenariusze „kliknij i sprawdź” dla użytkownika, po jednym bloku na rolę. Z nich powstaje `e2e/<module>.spec.ts`.

```markdown
# Testy: <moduł>

Przed testem: `npm run db`, `npm run dev`, otwórz http://localhost:5173.

## Jako administrator
1. Zaloguj się jako … → widzisz …
2. Kliknij „Dodaj zamówienie”, zostaw puste pole „Klient”, kliknij „Zapisz” → pod polem napis „To pole jest wymagane.”
3. …

## Jako użytkownik
1. …
```
