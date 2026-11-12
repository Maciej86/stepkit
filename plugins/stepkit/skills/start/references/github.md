# Repo na GitHubie

Czytasz ten plik w kroku 2 `/stepkit:start`, po skopiowaniu szkieletu. Wyjaśnij jednym zdaniem: „GitHub to sejf na
kod z historią zmian: po każdej działającej części robimy zapis, do którego zawsze można wrócić.”

## Zanim cokolwiek wyślesz

1. W folderze projektu musi istnieć repo: jeśli `git status` mówi „not a git repository”, wykonaj `git init -b main`.
2. **Sprawdź, czy hasła nie wyjdą na zewnątrz:** `git check-ignore .env` musi wypisać `.env`.
   Jeśli nic nie wypisze: **zatrzymaj się**, dopisz `.env` do `.gitignore` i sprawdź ponownie. Nigdy nie wysyłaj repo,
   w którym `.env` nie jest ignorowany.
3. Pierwszy zapis: `git add -A` i `git commit -m "Szkielet aplikacji"`.

Nazwa repo = nazwa projektu ustalona na początku kroku 2 (`project-skeleton.md`); nie pytaj o nią drugi raz. Gdy na
GitHubie jest już repo o tej nazwie, zaproponuj inną (np. z `-app`) i nigdy nie wysyłaj do istniejącego repo z cudzą
historią (`git push --force` jest zakazany).

## Ścieżka A: jest `gh`

1. `gh auth status`. Jeśli niezalogowany, **nie uruchamiaj logowania sam** (wymaga odpowiedzi w terminalu). Poproś:
   „Otwórz terminal (w VS Code: Terminal → New Terminal) i wpisz:
   `gh auth login --hostname github.com --git-protocol https --web`. Skopiuj pokazany kod, naciśnij Enter, w przeglądarce
   zaloguj się i wklej kod. Napisz »gotowe«.” Potem `gh auth setup-git` i ponownie `gh auth status`.
2. `gh repo create <nazwa> --private --source . --push`.
3. Pokaż adres repo z wyniku komendy.

## Ścieżka B: brak `gh` (tylko Windows)

Na **macOS** wysyłanie bez `gh` wymaga hasła w terminalu, którego GitHub nie przyjmuje. Na Macu zainstaluj `gh`
(`install-macos.md`, część 5) i użyj ścieżki A.

Na Windows prowadź klik po kliku:

1. „Wejdź na https://github.com i zaloguj się (albo załóż darmowe konto przyciskiem »Sign up«).”
2. „Kliknij **+** w prawym górnym rogu → **New repository**.”
3. „Wpisz nazwę: `<nazwa>`. Zaznacz **Private**. **Nie** zaznaczaj »Add a README«, ».gitignore« ani »license«.
   Kliknij **Create repository**.”
4. „Skopiuj adres, który zaczyna się od `https://github.com/` i kończy na `.git`, i wklej go tutaj.”
5. Wykonaj: `git remote add origin <adres>` i `git push -u origin main`.
6. Przy pierwszym wysłaniu otworzy się okno logowania GitHuba (Git Credential Manager):
   „Wybierz »Sign in with your browser« i zaloguj się.” Jeśli `git push` zatrzyma się na pytaniu o nazwę użytkownika
   w terminalu, przerwij i przejdź na ścieżkę A.

## Zapisy później

Po każdej działającej części (koniec kroku startu, zamknięcie modułu): `git add -A`, `git commit -m "<polski opis>"`,
`git push`. Opis prosty, np. „Plan aplikacji gotowy”, „Moduł Logowanie gotowy”.

Przed każdym `git push` jeszcze raz `git check-ignore .env`.
