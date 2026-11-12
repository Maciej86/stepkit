# Moduł „E-mail”

Czytasz ten plik, gdy bieżący moduł to „E-mail” (folder `email`). Moduł przechodzi zwykłe etapy, ale jego makieta to
podgląd treści e-maili, a nie ekran aplikacji.

## Najpierw lokalnie: Mailpit

Wyjaśnij: „Najpierw zbudujemy e-maile tak, żeby nikt ich naprawdę nie dostał. Program Mailpit łapie wszystko, co
aplikacja wyśle, i pokazuje to w przeglądarce. Prawdziwą wysyłkę przez Mailgun włączymy na końcu.”

1. Dopisz do `docker-compose.yml`:
   ```yaml
     # Skrzynka testowa: wszystkie e-maile z aplikacji, http://localhost:8025
     mailpit:
       image: axllent/mailpit
       restart: unless-stopped
       ports:
         - "1025:1025"
         - "8025:8025"
   ```
2. Dopisz do `.env` i `.env.example`:
   ```
   EMAIL_TRANSPORT=mailpit
   SMTP_HOST=127.0.0.1
   SMTP_PORT=1025
   SMTP_USER=
   SMTP_PASSWORD=
   EMAIL_FROM=no-reply@localhost
   ```
3. `npm install -w @app/backend nodemailer` i `npm install -w @app/backend -D @types/nodemailer`, potem `npm run db`.
4. Dopisz do tabeli „Gdzie co podejrzeć” w `README.md` wiersz:
   `| http://localhost:8025 | skrzynka testowa (Mailpit): e-maile wysłane przez aplikację | npm run db |`.

## Kod

- `backend/src/config/constants.ts`: `EMAIL_FROM_NAME` (nazwa nadawcy).
- `backend/src/email/sendEmail.ts`:
  ```ts
  export interface EmailMessage { to: string; subject: string; html: string; text: string }
  export async function sendEmail(message: EmailMessage): Promise<void>
  ```
  Transport `nodemailer.createTransport({ host, port, secure: port === 465, auth: user ? { user, pass } : undefined })`
  z danymi z `.env`. Tak samo dla Mailpit i Mailgun: różnią się tylko `.env`.
- `backend/src/email/templates/<name>.ts`: funkcje zwracające `{ subject, html, text }`. Treść z kluczy
  `email.<name>.*` w `shared/locales/pl/email.json`, przez `createI18n()` z `@app/shared`. Prosty HTML (nagłówek,
  akapit, przycisk-link), zawsze także wersja `text`.
- Wysyłka po zapisie w bazie, poza transakcją. Błąd wysyłki nie cofa zapisu: zapisz go w logu i pokaż administratorowi
  komunikat (`server.email_failed`).
- Test: `sendEmail` z `nodemailer.createTransport({ jsonTransport: true })` (wstrzyknięty transport) sprawdza adresata,
  temat i to, że `text` nie jest pusty. Test szablonu: polskie teksty, brak niepodmienionych `{{…}}`.

Sprawdzenie: wywołaj czynność, która wysyła e-mail, i poproś: „Otwórz http://localhost:8025. Widzisz e-mail
»<temat>«? Jak wygląda?”

## Prawdziwa wysyłka: Mailgun

Robisz to w module „Publikacja” (własna domena, zob. `deploy-ovh.md`) albo wcześniej, gdy użytkownik chce dostać
prawdziwy e-mail na swoją skrzynkę. Prowadź krok po kroku. **Przed każdym zrzutem ekranu przypomnij:** „Zanim zrobisz
zrzut, zasłoń hasła i klucze (np. zamaluj je w programie do zrzutów). Hasła wpiszesz sam do pliku .env, nie tutaj.”
Zrzut wkleja się do Claude Code przez przeciągnięcie pliku albo wklejenie ze schowka.

1. „Wejdź na https://signup.mailgun.com i załóż darmowe konto. Przy rejestracji wybierz region **EU**. Pokaż zrzut
   ekranu po zalogowaniu.” Sprawdź na zrzucie, że w adresie lub ustawieniach jest region EU.
2. „W menu **Send → Sending → Domains** jest domena testowa zaczynająca się od `sandbox…`. Pokaż zrzut.”
3. Wyjaśnij ograniczenie: „Domena testowa wysyła e-maile **tylko do adresów, które sam zatwierdzisz** (do 5). Klienci
   nie dostaną jeszcze nic. Do wysyłki do wszystkich potrzebna jest własna domena, ustawimy ją przy publikacji.”
4. „Kliknij domenę sandbox → **Authorized Recipients** → dodaj swój adres e-mail. Potem otwórz skrzynkę i kliknij link
   potwierdzający od Mailgun. Pokaż zrzut z zielonym statusem przy adresie.”
5. „W tej samej domenie otwórz **SMTP credentials** i utwórz login (np. `app@…`). Mailgun pokaże hasło tylko raz:
   skopiuj je.” Poproś o zrzut **z zasłoniętym hasłem**, sprawdź login i serwer.
6. Poproś użytkownika, żeby sam wpisał do `.env`:
   ```
   EMAIL_TRANSPORT=mailgun
   SMTP_HOST=smtp.eu.mailgun.org
   SMTP_PORT=587
   SMTP_USER=<login z kroku 5>
   SMTP_PASSWORD=<hasło z kroku 5>
   EMAIL_FROM=no-reply@<domena sandbox>
   ```
7. Wyślij e-mail testowy na zatwierdzony adres i zapytaj, czy doszedł (sprawdź też folder „Spam”).

Nigdy nie proś o wklejenie hasła ani klucza do rozmowy. Jeśli użytkownik je wklei, powiedz: „Wolałbym tego nie
widzieć. Najbezpieczniej będzie utworzyć nowe hasło w Mailgun i wpisać je od razu do .env.”
