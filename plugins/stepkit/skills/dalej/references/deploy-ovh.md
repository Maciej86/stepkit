# Moduł „Publikacja”

Czytasz ten plik, gdy bieżący moduł to „Publikacja” (folder `deploy`). Domyślnie to ostatni moduł. Nie ma makiety;
etapy: **pytania** (dostawca, domena) → **plan** (osiem kroków niżej w `PLAN.md`) → **wykonanie** → **testy** →
**zamknięcie**.

Wyjaśnij na start: „Aplikacja trafi na wynajęty serwer w internecie. Będzie działać na tym samym Dockerze co u Ciebie.
Ty klikasz w panelu dostawcy i przysyłasz zrzuty ekranu, a ja robię resztę przez bezpieczne połączenie z serwerem.”

**Przed każdym zrzutem ekranu przypomnij:** „Zasłoń hasła i klucze.” Hasła produkcyjne generujesz na serwerze
**bez wypisywania** (wpisujesz je wprost do pliku), więc nie trafiają do rozmowy, a użytkownik ich nie przepisuje.

Wszystkie Twoje komendy `ssh` i `scp` mają `-o StrictHostKeyChecking=accept-new` (bez tego pierwsze połączenie zatrzyma
się na pytaniu „yes/no”, na które nie możesz odpowiedzieć). Komendy, które pytają o coś w terminalu (hasło
administratora, edycja pliku), wykonuje **użytkownik w swoim terminalu**; podajesz mu je do skopiowania.

Dostawca domyślny: **OVH**. Gdy użytkownik wybrał innego, kroki 3–8 są takie same (każdy VPS z Ubuntu), a w krokach
1 i 4 prowadzisz po jego panelu na podstawie zrzutów.

## 1. Zakup VPS i domeny (zrzuty ekranu)

- „Wejdź na https://www.ovhcloud.com/pl/vps/ i wybierz najmniejszy VPS. Ważne: **VPS, nie »hosting www«**. Zwykły
  hosting nie uruchomi tej aplikacji.” System: **Ubuntu** (najnowsze LTS), lokalizacja w Europie.
- „Domenę kupisz na https://www.ovhcloud.com/pl/domains/. Wybierz nazwę i dodaj do koszyka.”
- Po zakupie: „Pokaż zrzut ekranu panelu VPS z adresem IP (zasłoń hasło, jeśli jest widoczne).” Zapisz IP.

## 2. Klucz SSH (robisz sam)

```bash
ssh-keygen -t ed25519 -C "<nazwa-projektu>" -f ~/.ssh/<nazwa-projektu> -N ""
cat ~/.ssh/<nazwa-projektu>.pub
```

Pokaż użytkownikowi **tylko klucz publiczny** (`.pub`) i poproś: „W panelu OVH, przy VPS, znajdź »Klucze SSH« albo
»Reinstaluj z kluczem SSH« i wklej ten tekst. Pokaż zrzut.” Klucza prywatnego nie pokazuj i nie wysyłaj nigdzie.

## 3. Przygotowanie serwera (przez SSH)

Pierwsze logowanie: `ssh -o StrictHostKeyChecking=accept-new -i ~/.ssh/<nazwa-projektu> ubuntu@<IP>` (użytkownik `ubuntu` lub `root`, zależnie od obrazu).

```bash
sudo apt update && sudo DEBIAN_FRONTEND=noninteractive apt upgrade -y
sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw --force enable
curl -fsSL https://get.docker.com | sudo sh
sudo adduser --disabled-password --gecos "" app && sudo usermod -aG docker app
sudo mkdir -p /home/app/.ssh && sudo cp ~/.ssh/authorized_keys /home/app/.ssh/ && sudo chown -R app:app /home/app/.ssh
```

Dalej pracuj jako `app`: `ssh -o StrictHostKeyChecking=accept-new -i ~/.ssh/<nazwa-projektu> app@<IP>`.

## 4. Domena na serwer (zrzuty ekranu)

„W panelu OVH: **Web Cloud → Domeny → <domena> → Strefa DNS**. Dodaj (albo zmień) rekord **A** dla domeny bez
przedrostka i dla `www` z adresem IP serwera `<IP>`. Pokaż zrzut strefy.” Sprawdź na zrzucie oba rekordy.
Zmiana działa po kilku minutach do kilku godzin: `nslookup <domena>` musi zwrócić `<IP>`.

## 5. Aplikacja na serwerze

1. Kod: repo jest prywatne, więc na serwerze utwórz klucz tylko do odczytu:
   `ssh-keygen -t ed25519 -f ~/.ssh/github -N ""`, pokaż `~/.ssh/github.pub` i poproś: „Na GitHubie: repo →
   **Settings → Deploy keys → Add deploy key**, wklej, **bez** zaznaczania »Allow write access«. Pokaż zrzut.”
   Potem `ssh-keyscan github.com >> ~/.ssh/known_hosts` i `GIT_SSH_COMMAND="ssh -i ~/.ssh/github" git clone git@github.com:<login>/<repo>.git app`
   i `git -C app config core.sshCommand "ssh -i ~/.ssh/github"`.
2. `.env` **tworzysz na serwerze** z `.env.production.example`, z nowymi hasłami wpisanymi **bez wypisywania**:
   ```bash
   cd ~/app && cp .env.production.example .env
   sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=$(openssl rand -hex 24)/; s/^MYSQL_ROOT_PASSWORD=.*/MYSQL_ROOT_PASSWORD=$(openssl rand -hex 24)/; s/^JWT_SECRET=.*/JWT_SECRET=$(openssl rand -hex 48)/" .env
   sed -i "s/twoja-domena.pl/<domena>/g" .env
   ```
   **Nigdy** nie używaj haseł z lokalnego `.env` i nie wyświetlaj `.env` (`cat .env`).
3. Front: na serwerze nie ma Node.js poza Dockerem, więc buduj w kontenerze:
   `docker run --rm -v "$PWD":/app -w /app node:24-alpine sh -c "npm ci && npm run build"`.
4. `docker compose -f docker-compose.prod.yml up -d --build`.
5. Migracje: `docker compose -f docker-compose.prod.yml exec backend npm run migrate -w @app/backend`.
6. Pierwszy administrator: komendę wykonuje **użytkownik w swoim terminalu** (pyta o hasło). Podaj mu do skopiowania:
   `ssh -i ~/.ssh/<nazwa-projektu> app@<IP>`, potem
   `cd app && docker compose -f docker-compose.prod.yml exec -it backend npm run admin -w @app/backend`
   i poproś, żeby hasło zapisał w menedżerze haseł.
7. `curl -s https://<domena>/api/health` → `{"ok":true}`. Certyfikat HTTPS Caddy pobiera sam w ciągu minuty.

## 6. Mailgun z własną domeną (zrzuty ekranu)

Jeśli aplikacja wysyła e-maile:
1. „W Mailgun: **Send → Sending → Domains → Add new domain**. Wpisz `mg.<domena>`, region **EU**. Pokaż zrzut z listą
   rekordów DNS.”
2. Przepisz z tego zrzutu rekordy (TXT dla SPF i DKIM, MX, CNAME) i poprowadź: „W OVH, w tej samej **Strefie DNS**,
   dodaj kolejno rekordy: …” (podaj typ, nazwę i wartość każdego). Zrzut po dodaniu.
3. „W Mailgun kliknij **Verify DNS settings**. Pokaż zrzut.” Zielone statusy mogą pojawić się po kilku godzinach.
4. Nowe dane SMTP dla `mg.<domena>` (jak w `email-mailgun.md`, krok 5). Login i `EMAIL_FROM=no-reply@mg.<domena>`
   wpisz sam (`sed`). **Hasło wpisuje użytkownik** w swoim terminalu: „Otwórz terminal, wpisz
   `ssh -i ~/.ssh/<nazwa-projektu> app@<IP>`, potem `nano app/.env`. Strzałkami przejdź do linii `SMTP_PASSWORD=`, wklej
   hasło po znaku `=`, zapisz: Ctrl+O, Enter, wyjdź: Ctrl+X. Napisz »gotowe«.”
5. `docker compose -f docker-compose.prod.yml up -d backend` i e-mail testowy.

## 7. Kopia zapasowa bazy

```bash
chmod +x ~/app/scripts/backup-db.sh && ~/app/scripts/backup-db.sh
(crontab -l 2>/dev/null; echo "0 3 * * * /home/app/app/scripts/backup-db.sh >> /home/app/backup.log 2>&1") | crontab -
```

Codziennie o 3:00, 7 ostatnich kopii bazy (`db-…`) i plików od użytkowników (`files-…`) w `~/backups`. Powiedz, jak pobrać kopię na swój komputer:
`scp -i ~/.ssh/<nazwa-projektu> app@<IP>:backups/<plik> .`

## 8. Sprawdzenie

- Playwright: otwórz `https://<domena>`, przejdź ekrany startowe każdej części, zrób zrzuty.
- Testy e2e **tylko do odczytu** (bez dodawania i usuwania danych): uruchom te scenariusze z `e2e/`, które nic nie
  zapisują, z `baseURL` ustawionym na domenę.
- Poproś użytkownika, żeby sam zalogował się jako administrator.

## Zamknięcie

Dopisz do `docs/STATUS.md`:

```markdown
## Wgraj nową wersję

Na swoim komputerze: zapis na GitHubie (`git push`). Potem napisz do Claude'a: „wgraj nową wersję”. Claude wykona:
# na komputerze: npm run check, npm audit --omit=dev (łatki bezpieczeństwa: npm audit fix, check, zapis, push)
ssh -i ~/.ssh/<nazwa-projektu> app@<IP>
cd app && git pull
docker run --rm -v "$PWD":/app -w /app node:24-alpine sh -c "npm ci && npm run build"
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec backend npm run migrate -w @app/backend
```

Dopisz do `README.md` sekcję (bez haseł):

```markdown
## Aplikacja w internecie

| Co | Gdzie |
|---|---|
| aplikacja | https://<domena> |
| serwer (VPS) | panel OVH: https://www.ovh.com/manager/ |
| e-maile (jeśli są) | panel Mailgun: https://app.mailgun.com/ |
| kopie zapasowe bazy i plików | na serwerze w `~/backups`, codziennie o 3:00 |

Nowa wersja: zapisz zmiany (`git push`) i napisz do Claude'a „wgraj nową wersję”.
```

Makiety **nigdy** nie są uruchamiane na serwerze (`docker-compose.prod.yml` ich nie zawiera).
