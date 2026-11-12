# Instalacja narzędzi na Windows

Czytasz ten plik w kroku 1 `/stepkit:start`, gdy użytkownik ma Windows. Prowadź **po jednym programie**:
sprawdź, a jeśli brakuje, podaj kroki i poczekaj, aż użytkownik napisze „gotowe”. Potem sprawdź ponownie.

Na początku powiedz:

> „Nie musisz pracować w Linuksie ani znać komend. Zainstalujemy kilka programów zwykłymi instalatorami Windows.
> Potrzebny jest Windows 10 lub 11 z aktualnymi poprawkami.”

Po każdej instalacji: **„Zamknij Claude Code (albo okno VS Code) i otwórz je ponownie, żeby zobaczył nowy program.
Potem wpisz /stepkit:start, a ja sprawdzę, gdzie jesteśmy.”** (Postęp jest zapisany w `docs/STATUS.md`, jeśli już
istnieje. Jeśli jeszcze nie, sprawdzanie po prostu zacznie się od nowa i szybko przejdzie przez to, co już jest.)

## 1. Node.js

- Sprawdź: `node --version`: wymagane **22.12 lub nowsze** (najlepiej 24 LTS). Starsza wersja = zainstaluj nową tak samo jak przy braku.
- Brak:
  1. Wejdź na https://nodejs.org i pobierz wersję oznaczoną **LTS** (plik `.msi`).
  2. Uruchom instalator, klikaj „Next” bez zmieniania ustawień.
  3. Gdy pojawi się pole „Automatically install the necessary tools”, zostaw je **niezaznaczone**.
  4. Zakończ instalację i otwórz Claude Code ponownie.

## 2. Git (razem z Git Bash)

- Sprawdź: `git --version`.
- Brak:
  1. Wejdź na https://git-scm.com/download/win i pobierz „64-bit Git for Windows Setup”.
  2. Uruchom instalator, klikaj „Next” bez zmieniania ustawień (Git Bash i „Git Credential Manager” instalują się same).
  3. Otwórz Claude Code ponownie.
- Po instalacji ustaw podpis zapisów, jeśli `git config --global user.name` jest pusty: zapytaj o imię i adres e-mail
  do GitHuba i wykonaj `git config --global user.name "…"` oraz `git config --global user.email "…"`.

## 3. Docker Desktop

Wyjaśnij jednym zdaniem: „Docker trzyma bazę danych w osobnym »pudełku«. Pod spodem używa funkcji Windows o nazwie
WSL2, ale Ty nie musisz z niej korzystać, instalator włączy ją sam.”

- Sprawdź: `docker --version` oraz `docker info` (to drugie działa tylko, gdy Docker Desktop jest uruchomiony).
- Brak:
  1. Wejdź na https://www.docker.com/products/docker-desktop i pobierz „Docker Desktop for Windows”.
  2. Uruchom instalator, zostaw zaznaczone „Use WSL 2 instead of Hyper-V”.
  3. Po instalacji uruchom ponownie komputer, jeśli instalator o to poprosi.
  4. Uruchom Docker Desktop z menu Start i poczekaj, aż w lewym dolnym rogu będzie zielony napis „Engine running”.
     Konto Dockera nie jest potrzebne (możesz kliknąć „Skip”).
  5. Otwórz Claude Code ponownie.
- `docker --version` działa, a `docker info` zwraca błąd: „Uruchom Docker Desktop z menu Start i poczekaj na zielony
  napis »Engine running«.”

**Częste problemy:**
- **„WSL 2 installation is incomplete”** albo „WSL needs updating”: niech użytkownik kliknie prawym przyciskiem na
  Start → „Terminal (Administrator)” lub „Windows PowerShell (Administrator)”, wpisze `wsl --install`, potem
  `wsl --update`, i uruchomi ponownie komputer.
- **„Virtualization support not detected”** albo Docker nie startuje: wirtualizacja jest wyłączona w BIOS-ie. Powiedz:
  „To ustawienie komputera, nie programu. Wpisz w wyszukiwarkę: »włączenie wirtualizacji BIOS« i nazwę producenta
  komputera (np. Lenovo, Dell). Jeśli nie czujesz się pewnie, poproś kogoś technicznego, to jednorazowa zmiana.”
  Nie zgaduj ustawień BIOS-u za użytkownika.

## 4. Pluginy Claude Code

Te wpisuje użytkownik **w Claude Code** (nie w terminalu systemu):

- **superpowers** (wymagany): `/plugin install superpowers@claude-plugins-official`
- **Playwright** (wymagany): `/plugin install playwright@claude-plugins-official`

Po instalacji: „Zamknij i otwórz Claude Code ponownie.” Sprawdzenie Playwright: czy masz narzędzia `browser_navigate`
(lub podobne `mcp__…playwright…`). Sprawdzenie superpowers: czy widzisz skill `superpowers:writing-plans`.

Gdy superpowers nie da się zainstalować: zapisz w `docs/STATUS.md` w „Ostatnie decyzje” „superpowers niedostępny:
pracujemy na wzorach stepkit” i idź dalej. Bez Playwright nie idź dalej.

## 5. GitHub CLI (opcjonalnie)

Ułatwia założenie repo, ale nie jest wymagany (zob. `github.md`).

- Sprawdź: `gh --version`.
- Brak i użytkownik chce: `winget install --id GitHub.cli` w terminalu (albo instalator z https://cli.github.com),
  potem ponowne otwarcie Claude Code.
