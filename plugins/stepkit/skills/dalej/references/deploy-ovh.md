# Moduł „Publikacja”

Czytasz ten plik, gdy bieżący moduł to „Publikacja” (folder `deploy`). Domyślnie to ostatni moduł. Nie ma makiety;
etapy: **pytania** (dostawca, domena, godziny kopii zapasowych z sekcji 7, sposób wdrożeń z sekcji 9) → **plan**
(dziewięć kroków niżej w `PLAN.md`) → **wykonanie** → **testy** → **zamknięcie**.

Wyjaśnij na start: „Aplikacja trafi na wynajęty serwer w internecie. Będzie działać na tym samym Dockerze co u Ciebie.
Ty klikasz w panelu dostawcy i przysyłasz zrzuty ekranu, a ja robię resztę przez bezpieczne połączenie z serwerem.”

**Przed każdym zrzutem ekranu przypomnij:** „Zasłoń hasła i klucze.” Hasła produkcyjne generujesz na serwerze
**bez wypisywania** (wpisujesz je wprost do pliku), więc nie trafiają do rozmowy, a użytkownik ich nie przepisuje.

Wszystkie Twoje komendy `ssh` i `scp` mają `-o StrictHostKeyChecking=accept-new` (bez tego pierwsze połączenie zatrzyma
się na pytaniu „yes/no”, na które nie możesz odpowiedzieć). Komendy, które pytają o coś w terminalu (hasło
administratora, edycja pliku), wykonuje **użytkownik w terminalu VS Code**; podajesz mu je do skopiowania według
zasady „Polecenie w terminalu” z `SKILL.md`.

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

Najpierw, na komputerze: próby nadużyć dla całej aplikacji według `abuse.md` („W module »Publikacja«”), poprawki
z testem, `npm run check`, zapis i `git push`.

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

## 7. Kopie zapasowe poza serwerem

Kopia na tym samym serwerze ginie razem z nim (awaria, przejęcie, pomyłka). Kopie trafiają więc do OVH Object Storage
w innym regionie niż serwer, zaszyfrowane kluczem, który ma tylko użytkownik, z blokadą, której nikt nie zdejmie
przed terminem, także ktoś, kto przejmie serwer. Wyjaśnij to na start jednym akapitem.

**Pytanie (etap „pytania”):** „Ile pracy możesz stracić, gdy serwer padnie? Domyślnie kopia o 0:00, 11:00 i 16:30.
W najgorszym razie tracisz wtedy kilka godzin. Wystarczy raz na dobę?” Godziny zapisz w `SPEC.md` modułu. Kopia
o 0:00 jest chroniona 35 dni (pierwszego dnia miesiąca: 400 dni), pozostałe 7 dni.

### Część użytkownika (zrzuty ekranu)

1. **Public Cloud** w panelu OVH (włączenie, płatność). **Object Storage → Utwórz kontener:** S3 API, klasa Standard,
   region **inny niż serwer** i w EOG (serwer w Warszawie → Frankfurt `de` albo Gravelines `gra`), nazwa
   `<nazwa-projektu>-kopie`, **wersjonowanie i Object Lock włączone przy tworzeniu**, bez domyślnej retencji.
   Object Lock nie da się włączyć później: kontener bez niego usuń i załóż od nowa. Sprawdź to na zrzucie.
2. **Użytkownik S3** z dostępem tylko do tego kontenera. Klucz tajny pokazuje się raz, więc od razu do menedżera
   haseł. Ty dostajesz punkt końcowy, region i **klucz dostępu** (32 znaki szesnastkowe, nie nazwa użytkownika
   `user-…`). Klucza tajnego nie dostajesz.
3. **Klucz szyfrujący na komputerze użytkownika.** Tworzysz go Dockerem, bez instalowania programów, poza folderem
   projektu, i **nie wyświetlasz** go:
   ```bash
   docker run --rm alpine:3 sh -c 'apk add -q age > /dev/null && age-keygen 2> /dev/null' > ~/<nazwa-projektu>-kopie.key
   grep '^# public key:' ~/<nazwa-projektu>-kopie.key
   ```
   Do serwera trafia tylko linia `age1…`. Powiedz wprost: „Plik `<nazwa-projektu>-kopie.key` w Twoim folderze
   domowym to jedyny klucz do kopii. Zapisz go w **dwóch** miejscach: w menedżerze haseł i na pendrivie albo dysku
   poza komputerem. Bez niego żadnej kopii nie da się odczytać. Ja go nie widzę i nie trafi na serwer.” Poczekaj,
   aż potwierdzi, że go zapisał.

### Część Claude'a (przez SSH)

4. `sudo apt-get install -y age`. Obrazy `amazon/aws-cli`, `node:24-alpine` i `alpine:3` Docker pobierze sam przy
   pierwszym przebiegu.
5. `install -m 600 ~/app/scripts/backup/backup.env.example ~/backup.env` i uzupełnij (`sed`): `BACKUP_AGE_PUBLIC_KEY`,
   `BACKUP_S3_ENDPOINT`, `BACKUP_S3_REGION`, `BACKUP_S3_BUCKET`, `AWS_ACCESS_KEY_ID`. Plik leży poza katalogiem
   aplikacji i nie jest podpięty do żadnego kontenera aplikacji. **Klucz tajny S3 wpisuje użytkownik** w swoim
   terminalu: „Wpisz `ssh -i ~/.ssh/<nazwa-projektu> app@<IP>`, potem `nano ~/backup.env`. W linii
   `AWS_SECRET_ACCESS_KEY=` wklej klucz tajny po znaku `=`, zapisz: Ctrl+O, Enter, wyjdź: Ctrl+X. Napisz »gotowe«.”
6. Tabele: skopiuj `backend/src/db/sql/backup_runs.sql` i `system_alerts.sql` do `backend/migrations/` jako kolejne
   numery (na komputerze, z `npm run migrate` i `npm run check`, zapis, `git push`, na serwerze `git pull` i migracje
   jak w kroku 5). W `.env` serwera `BACKUP_SLOTS` z godzinami ze `SPEC.md`.
7. Timer (jako `ubuntu`, który ma `sudo`): godziny ze `SPEC.md` w `scripts/backup/app-backup.timer` (linie
   `OnCalendar`, te same co `BACKUP_SLOTS`; zmiana pliku = zapis w repo), potem
   `sudo cp /home/app/app/scripts/backup/app-backup.{service,timer} /etc/systemd/system/`, `sudo systemctl daemon-reload`,
   `sudo systemctl enable --now app-backup.timer`; `systemctl list-timers app-backup.timer` pokazuje najbliższe
   uruchomienia w czasie polskim.
8. **Pierwszy przebieg ręcznie:** `sudo systemctl start app-backup.service`, potem `tail -5 ~/backups/backup.log`.
   Musi być:
   - wiersz `success` w `backup_runs`;
   - dwa pliki w kontenerze: `docker run --rm --env-file ~/backup.env amazon/aws-cli --endpoint-url <punkt końcowy>
     --region <region> s3api list-object-versions --bucket <kontener>`;
   - próba usunięcia jednej z tych wersji (`s3api delete-object --key … --version-id …`) kończy się `AccessDenied`.
   Wysyłka odrzucona z powodu sumy kontrolnej (komunikat o `Content-MD5` albo `checksum`): dopisz do `~/backup.env`
   `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` i spróbuj ponownie; inny błąd z OVH popraw w skrypcie, nie obchodź.
9. **Alarm**, dopiero po udanym pierwszym przebiegu (wcześniej alarm zobaczyłby brak kopii i zużył dobowy limit
   maili na fałszywy alarm). Aplikacja wysyła e-maile: `BACKUP_ALERT_EMAIL` w `.env` serwera (adres użytkownika),
   szablon `backend/src/email/templates/backupAlert.ts` (teksty w `email.json`: co się stało, godzina ostatniej
   udanej kopii, komunikat błędu, bez danych klientów), w `server.ts`
   `if (env.BACKUP_ALERT_EMAIL) startBackupWatch(parseSlots(env.BACKUP_SLOTS), (health) => sendEmail(...))`.
   Bez modułu E-mail powiedz: „O awarii kopii dowiesz się tylko z pulpitu. Zaglądaj tam czasem.”
10. **Stan na pulpicie administratora:** trasa `GET /api/backups/health` (`mountModule` z rolą administratora,
    `loadBackupHealth` z `backend/src/backups/watch.ts`, testy 401 i 403) i boks `InfoCard` na pulpicie: „Ostatnia
    udana kopia: dziś 11:00. Następna: 16:30.” albo ostrzeżenie w kolorze `error` z rodzajem problemu.

### Próbne odtworzenie (na komputerze użytkownika)

11. Pobierz najnowszą parę plików: na serwerze `s3api get-object` z kontenera do `~/backups/restore/` (tym samym
    poleceniem Dockera co wyżej, z `-v ~/backups/restore:/out`), potem `scp` na komputer do `~/kopie-test/`
    (poza folderem projektu). Pliki są zaszyfrowane, więc przesyłanie ich jest bezpieczne.
12. `scripts/backup/restore-check.sh ~/kopie-test/<…>-db.sql.gz.age ~/kopie-test/<…>-files.tar.gz.age
    ~/<nazwa-projektu>-kopie.key`. Wczytuje bazę do chwilowego kontenera (bazy z `npm run db` nie dotyka).
    Porównaj z produkcją: te same tabele, w każdej tabeli z danymi więcej niż 0 wierszy, liczba plików jak
    w wolumenie `uploads_data`. Potem usuń `~/kopie-test/` i `~/backups/restore/`.
13. Data w `STATUS.md`: `**Ostatnie sprawdzenie kopii:** RRRR-MM-DD`. Moduł „Publikacja” nie jest `zrobiony` bez
    udanej próby.

## 8. Sprawdzenie

- Playwright: otwórz `https://<domena>`, przejdź ekrany startowe każdej części, zrób zrzuty.
- Testy e2e **tylko do odczytu** (bez dodawania i usuwania danych): uruchom te scenariusze z `e2e/`, które nic nie
  zapisują, z `baseURL` ustawionym na domenę.
- Poproś użytkownika, żeby sam zalogował się jako administrator.

## 9. Wdrożenia (nowe wersje)

Pierwsze wgranie zrobiłeś ręcznie w sekcji 5. Każda kolejna wersja idzie przez `scripts/deploy.sh` na serwerze, ten
sam skrypt w obu wariantach: kopia przed wdrożeniem, nowa wersja z gałęzi `main` na GitHubie, front, kontenery,
migracje, test dymny (`/api/health`, `/api/health/db`), a gdy test się nie uda, powrót do poprzedniej wersji.

**Czym jest wdrożenie (powiedz to użytkownikowi w etapie „pytania”, przed pytaniem):** „Wdrożenie to wgranie nowej
wersji aplikacji na serwer. Twój komputer to warsztat: tu budujemy, poprawiamy i testujemy, a ludzie w internecie
widzą tylko wersję z serwera. Dzięki temu możesz spokojnie pracować nad nowym modułem albo poprawką, a aplikacja
w internecie działa dalej na sprawdzonej wersji. Gdy coś jest gotowe i sprawdzone, wdrażamy to jednym poleceniem:
serwer robi kopię zapasową, wgrywa nową wersję i sprawdza, czy działa. Jeśli nie działa, zwykle sam wraca do
poprzedniej.”

**Pytanie (etap „pytania”):** „Jak chcesz wgrywać nowe wersje aplikacji na serwer?
- **Z GitHuba (polecane):** wgrywa przycisk w GitHubie albo ja na Twoją prośbę. Może to zrobić każdy, kto ma dostęp
  do repozytorium, nie tylko Ty, a GitHub zapisuje, kto i kiedy wgrał którą wersję. Najlepsze, gdy nad aplikacją
  pracuje kilka osób albo gdy pracujesz na kilku komputerach.
- **Z Twojego komputera:** wgrywam ja, na Twoją prośbę, z tego komputera. Prostsze na start, ale wgrywać może tylko
  ten komputer.
W obu przypadkach przed wgraniem przechodzą wszystkie testy, a serwer robi kopię zapasową.” Wybór zapisz w `SPEC.md`
modułu. Wdrożenie nigdy nie dzieje się samo po zapisie na GitHubie: stepkit zapisuje tam po każdym module i poprawce.

**Oba warianty:** `chmod +x ~/app/scripts/deploy.sh` i pierwsze uruchomienie przez ssh
(`ssh -i ~/.ssh/<nazwa-projektu> app@<IP> '~/app/scripts/deploy.sh'`) → „Na serwerze jest już najnowsza wersja”.

**Wariant z GitHuba** (potrzebny `gh`; bez niego zaproponuj instalację jak w `/stepkit:start`):
1. Na komputerze osobny klucz tylko do wdrożeń: `ssh-keygen -t ed25519 -f ~/.ssh/<nazwa-projektu>-deploy -N "" -C github-deploy`.
2. Na serwerze dopisz do `~/.ssh/authorized_keys` konta `app` jedną linię:
   `command="/home/app/app/scripts/deploy.sh",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty <treść pliku .pub>`.
   Tym kluczem da się tylko uruchomić wdrożenie, nic więcej na serwerze.
3. Sekrety repozytorium z komputera, bez wyświetlania klucza:
   `gh secret set DEPLOY_SSH_KEY < ~/.ssh/<nazwa-projektu>-deploy`, `gh secret set DEPLOY_HOST --body <IP>`,
   `ssh-keyscan -t ed25519 <IP> 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS`. Potem usuń klucz prywatny
   z komputera (`rm ~/.ssh/<nazwa-projektu>-deploy`): ma go tylko GitHub. Powiedz użytkownikowi jednym zdaniem, że
   GitHub przechowuje teraz klucz, który pozwala wyłącznie wgrać nową wersję.
4. `mkdir -p .github/workflows && cp scripts/github-deploy.yml .github/workflows/deploy.yml`, zapis, `git push`.
5. Próba: `gh workflow run deploy.yml --ref main`, potem `gh run watch`: oba etapy zielone, w logu „Na serwerze jest
   już najnowsza wersja”.
6. Pokaż użytkownikowi przycisk: „W GitHubie otwórz repozytorium → zakładka **Actions** → **Wdróż** → **Run
   workflow** → zielony przycisk. Po kilku minutach zielony znaczek oznacza, że nowa wersja działa.”

**Wariant z komputera:** nic więcej do ustawienia.

**Wynik `deploy.sh`** (kod wyjścia; w wariancie z GitHuba `gh run view --log-failed`): `0` nowa wersja działa
(albo nic nowego); `1` nic się nie zmieniło albo wróciła poprzednia wersja (nieudana kopia, zmiany na serwerze,
nieudany test dymny): powiedz prosto, co się stało, popraw z testem i wdróż ponownie; `2` stop, bo wersja zmienia
bazę: aplikacja może nie działać. Powiedz to wprost, sprawdź logi (`docker compose -f docker-compose.prod.yml logs
backend`) i napraw kolejną wersją, gdy się da. Odtworzenie bazy z kopii sprzed wdrożenia (sekcja „Serwer padł”,
krok 4) tylko za zgodą użytkownika: znikną zmiany wprowadzone od wdrożenia.

## Zamknięcie

Dopisz do `docs/STATUS.md`:

```markdown
**Ostatnie sprawdzenie kopii:** <data próbnego odtworzenia>

## Wgraj nową wersję

**Wdrożenie:** <z GitHuba | z komputera>. Napisz do Claude'a „wgraj nową wersję” (z GitHuba możesz też sam:
Actions → Wdróż → Run workflow). Claude wykona:
# z komputera: npm run check, npm audit --omit=dev (łatki: npm audit fix, check, zapis), git push, potem
ssh -i ~/.ssh/<nazwa-projektu> app@<IP> '~/app/scripts/deploy.sh'
# z GitHuba: git push, potem (testy i audyt robi GitHub)
gh workflow run deploy.yml --ref main && gh run watch
# po wdrożeniu: ostatnia kopia „OK” w ~/backups/backup.log; ponad 30 dni od sprawdzenia kopii → próbne odtworzenie
```

Dopisz do `README.md` sekcję (bez haseł):

```markdown
## Aplikacja w internecie

| Co | Gdzie |
|---|---|
| aplikacja | https://<domena> |
| serwer (VPS) | panel OVH: https://www.ovh.com/manager/ |
| e-maile (jeśli są) | panel Mailgun: https://app.mailgun.com/ |
| kopie zapasowe bazy i plików | OVH Object Storage, kontener `<kontener>` (region `<region>`), o <godziny>; chronione przed usunięciem 7 dni, nocne 35, z 1. dnia miesiąca 400 |
| klucz do kopii | plik `<nazwa-projektu>-kopie.key`: menedżer haseł i <drugie miejsce>. Bez niego kopii nie da się odczytać |

Nowa wersja (wdrożenie, czyli wgranie na serwer tego, co działa u Ciebie): napisz do Claude'a „wgraj nową wersję”<,
albo sam: GitHub → Actions → Wdróż → Run workflow>. Serwer robi kopię, wgrywa nową wersję i sprawdza, czy działa.

### Serwer padł

Napisz do Claude'a „serwer padł”. Poprowadzi: nowy serwer, najnowsza kopia z OVH odszyfrowana Twoim kluczem, baza
i pliki wczytane, aplikacja i kopie uruchomione od nowa.
```

## Co sprawdziliśmy, a czego nie

Przed zamknięciem powiedz użytkownikowi wprost, na jakim poziomie jest aplikacja, i dopisz tę tabelę do `README.md`
(sekcja „Aplikacja w internecie”). Nie pisz „aplikacja jest bezpieczna” ani „gotowa dla klientów” bez tej tabeli.

| Poziom | Co to znaczy | Stan |
|---|---|---|
| 1. Działa | Ty przeklikałeś każdy moduł i potwierdziłeś | ✔ |
| 2. Przetestowana | testy automatyczne każdej trasy i formularza, próby nadużyć, sprawdzenie w przeglądarce | ✔ |
| 3. Gotowa do pracy w internecie | HTTPS, hasła tylko na serwerze, zapora, łatki bezpieczeństwa, kopie poza serwerem z próbnym odtworzeniem | ✔ |
| 4. Zweryfikowana przez specjalistę | niezależny audyt bezpieczeństwa (test penetracyjny) wykonany przez człowieka | ✘ stepkit tego nie robi |

Dodaj jedno zdanie, kiedy poziom 4 jest potrzebny: gdy z aplikacji korzystają klienci spoza Twojej firmy, gdy za nią
płacą, gdy dane jednej firmy oddziela od danych innej tylko aplikacja albo gdy są w niej dane wrażliwe (zdrowie,
finanse, dane dzieci). I drugie: dane osobowe klientów i pracowników to także obowiązki z RODO (np. umowa powierzenia
z dostawcą serwera; dane usunięte z aplikacji zostają w kopiach do 400 dni, co trzeba wpisać do rejestru czynności).
stepkit ich nie sprawdza.

Makiety **nigdy** nie są uruchamiane na serwerze (`docker-compose.prod.yml` ich nie zawiera).

## Serwer padł

Prośba „serwer padł” (serwer nie działa, został przejęty albo usunięty). Uspokój jednym zdaniem: kopie leżą w OVH
poza serwerem i nikt ich nie usunął. Kolejno:
1. Nowy VPS i klucz SSH (sekcje 1–3), domena na nowy adres IP (sekcja 4).
2. Aplikacja bez danych (sekcja 5, kroki 1–5; bez pierwszego administratora, przyjdzie z kopią).
3. Najnowsza udana kopia: lista w kontenerze OVH (z komputera użytkownika: `amazon/aws-cli` w Dockerze; klucz tajny
   S3 użytkownik wpisuje sam, `-e AWS_SECRET_ACCESS_KEY` z jego terminala), pobranie na komputer do `~/kopie-test/`.
4. Baza: odszyfrowanie na komputerze użytkownika i przesłanie rurą, bez odszyfrowanego pliku na serwerze:
   `docker run --rm -i -e AGE_KEY alpine:3 sh -c '… age -d …' < <…>-db.sql.gz.age | gzip -dc | ssh … "cd app &&
   docker compose -f docker-compose.prod.yml exec -T mysql sh -c 'MYSQL_PWD=\"\$MYSQL_ROOT_PASSWORD\" mysql -uroot
   \"\$MYSQL_DATABASE\"'"` (klucz przez zmienną, jak w `restore-check.sh`), potem migracje (kopia może być sprzed
   ostatniej migracji).
5. Pliki: tak samo `<…>-files.tar.gz.age` → `tar -xzf - -C /u` w `docker run --rm -i -v <projekt>_uploads_data:/u alpine:3`.
6. Kopie od nowa (sekcja 7, kroki 4–10: nowy `~/backup.env`, ten sam klucz publiczny), wdrożenia (sekcja 9; z GitHuba:
   linia klucza wdrożeń w `authorized_keys` nowego serwera, nowe `DEPLOY_HOST` i `DEPLOY_KNOWN_HOSTS`), sprawdzenie (sekcja 8),
   użytkownik loguje się swoim kontem. Na koniec usuń `~/kopie-test/`.
