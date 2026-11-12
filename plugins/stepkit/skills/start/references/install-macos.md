# Instalacja narzędzi na macOS

Czytasz ten plik w kroku 1 `/stepkit:start`, gdy użytkownik ma Maca. Prowadź **po jednym programie**: sprawdź,
a jeśli brakuje, podaj kroki i poczekaj, aż użytkownik napisze „gotowe”. Potem sprawdź ponownie.

Po każdej instalacji: **„Zamknij Claude Code (albo okno VS Code) i otwórz je ponownie, żeby zobaczył nowy program.
Potem wpisz /stepkit:start.”**

## Jaki masz procesor?

Potrzebne do Dockera. Sprawdź sam: `uname -m`.
- `arm64` → procesor Apple (M1, M2, M3 i nowsze),
- `x86_64` → procesor Intel.

Jeśli komenda nie zadziała, poproś: „Kliknij jabłko w lewym górnym rogu → »Ten Mac«. Napisz, co jest w wierszu
»Układ« albo »Procesor«.”

## 1. Node.js

- Sprawdź: `node --version` (wymagane 20 lub nowsze).
- Brak:
  1. Wejdź na https://nodejs.org i pobierz wersję **LTS** dla macOS (plik `.pkg`).
  2. Otwórz pobrany plik i przejdź instalator bez zmieniania ustawień.
  3. Otwórz Claude Code ponownie.

## 2. Git

- Sprawdź: `git --version`. Jeśli macOS pokaże okno „The git command requires the command line developer tools”,
  niech użytkownik kliknie **„Zainstaluj”** i poczeka kilka minut.
- Brak okna i brak Gita: `xcode-select --install`, potem to samo okno.
- Ustaw podpis zapisów, jeśli `git config --global user.name` jest pusty (zapytaj o imię i e-mail do GitHuba).

## 3. Docker Desktop

Wyjaśnij jednym zdaniem: „Docker trzyma bazę danych w osobnym »pudełku«, które działa tak samo na każdym komputerze.”

- Sprawdź: `docker --version` oraz `docker info`.
- Brak:
  1. Wejdź na https://www.docker.com/products/docker-desktop i pobierz wersję **„Apple Silicon”** (dla `arm64`) albo
     **„Intel Chip”** (dla `x86_64`).
  2. Otwórz plik `.dmg` i przeciągnij Docker do folderu Aplikacje.
  3. Uruchom Docker z Aplikacji, zaakceptuj warunki, konto nie jest potrzebne („Skip”).
  4. Poczekaj, aż ikona wieloryba na górnym pasku przestanie się ruszać.
  5. Otwórz Claude Code ponownie.
- `docker info` zwraca błąd: „Uruchom Docker z folderu Aplikacje i poczekaj, aż wieloryb na górnym pasku się zatrzyma.”

## 4. Pluginy Claude Code

Te wpisuje użytkownik **w Claude Code**:

- **superpowers** (wymagany): `/plugin install superpowers@claude-plugins-official`
- **Playwright** (wymagany): `/plugin install playwright@claude-plugins-official`

Sprawdzenie i postępowanie przy braku: jak w `install-windows.md`, część 4.

## 5. GitHub CLI (opcjonalnie)

- Sprawdź: `gh --version`.
- Brak i użytkownik chce: instalator `.pkg` z https://cli.github.com (Homebrew nie jest potrzebny).
