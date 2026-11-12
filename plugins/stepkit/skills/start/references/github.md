# Repo na GitHubie

Czytasz ten plik w kroku 2 `/stepkit:start`, po skopiowaniu szkieletu. Wyjaśnij jednym zdaniem: „GitHub to sejf na
kod z historią zmian: po każdej działającej części robimy zapis, do którego zawsze można wrócić.”

## Zanim cokolwiek wyślesz

1. W folderze projektu musi istnieć repo: jeśli `git status` mówi „not a git repository”, wykonaj `git init -b main`.
2. **Sprawdź, czy hasła nie wyjdą na zewnątrz:** `git check-ignore .env` musi wypisać `.env`.
   Jeśli nic nie wypisze: **zatrzymaj się**, dopisz `.env` do `.gitignore` i sprawdź ponownie. Nigdy nie wysyłaj repo,
   w którym `.env` nie jest ignorowany.
3. Pierwszy zapis: `git add -A` i `git commit -m "Szkielet aplikacji"`.

Zapytaj o nazwę repo (zaproponuj nazwę folderu projektu, małe litery i myślniki, np. `sklep-zamowienia`).

## Ścieżka A: jest `gh`

1. `gh auth status`. Jeśli niezalogowany: `gh auth login` i powiedz: „Otworzy się przeglądarka. Wybierz GitHub.com,
   zaloguj się i zatwierdź kod, który pokaże terminal.” Przy pytaniach w terminalu wybieraj: GitHub.com → HTTPS →
   „Login with a web browser”.
2. `gh repo create <nazwa> --private --source . --push`.
3. Pokaż adres repo z wyniku komendy.

## Ścieżka B: brak `gh`

Prowadź klik po kliku:

1. „Wejdź na https://github.com i zaloguj się (albo załóż darmowe konto przyciskiem »Sign up«).”
2. „Kliknij **+** w prawym górnym rogu → **New repository**.”
3. „Wpisz nazwę: `<nazwa>`. Zaznacz **Private**. **Nie** zaznaczaj »Add a README«, ».gitignore« ani »license«.
   Kliknij **Create repository**.”
4. „Skopiuj adres, który zaczyna się od `https://github.com/` i kończy na `.git`, i wklej go tutaj.”
5. Wykonaj: `git remote add origin <adres>` i `git push -u origin main`.
6. Przy pierwszym wysłaniu otworzy się okno logowania GitHuba (Git Credential Manager na Windows, pęk kluczy na Macu):
   „Wybierz »Sign in with your browser« i zaloguj się.”

## Zapisy później

Po każdej działającej części (koniec kroku startu, zamknięcie modułu): `git add -A`, `git commit -m "<polski opis>"`,
`git push`. Opis prosty, np. „Plan aplikacji gotowy”, „Moduł Logowanie gotowy”.

Przed każdym `git push` jeszcze raz `git check-ignore .env`.
