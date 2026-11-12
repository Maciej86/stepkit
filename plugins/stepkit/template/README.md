# Moja aplikacja

Zbudowana z pluginem stepkit. Kolejne kroki: wpisz w Claude Code `/stepkit:dalej`.

## Uruchomienie

1. `npm run db`: baza danych (Docker Desktop musi być włączony)
2. `npm run migrate`: tabele w bazie
3. `npm run dev`: aplikacja

| Adres | Co to jest |
|---|---|
| http://localhost:5173 | aplikacja |
| http://localhost:5174 | makiety i strona „Postęp” |
| http://localhost:8080 | podgląd bazy (phpMyAdmin) |

Sprawdzenie: `npm run check` (testy kodu), `npm run test:e2e` (testy w przeglądarce).
