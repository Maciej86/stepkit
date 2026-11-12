# Aktualizacja projektu do nowej wersji stepkit

**Aktualna wersja stepkit:** 0.1.15

Szablon kopiuje się do projektu tylko raz, przy `/stepkit:start`. Gdy stepkit się zmienia, starsze projekty nie mają
nowych plików, a nowe zasady o nich mówią. Ten plik mówi, co przenieść.

## Kiedy

Wersję projektu podaje linia `**Wersja stepkit:** X.Y.Z` w `docs/STATUS.md`. Brak tej linii = projekt sprzed 0.1.4
(najstarszy). Aktualizacja jest potrzebna, gdy wersja projektu jest **niższa niż numer najnowszej sekcji** poniżej
(porównuj liczbowo: 0.1.11 > 0.1.9).

## Jak

1. Powiedz prostym językiem: „stepkit się zaktualizował, a Twój projekt powstał na starszej wersji. Żeby nowe zasady
   pasowały do projektu, trzeba w nim poprawić: …” (wypunktuj sekcje do zrobienia, po jednym zdaniu, bez nazw plików)
   „Zajmie to chwilę i nie zmieni tego, co już działa. Zrobić to teraz?” **Nic nie zmieniaj przed odpowiedzią.**
2. Po „tak”: sekcje po kolei, od najstarszej potrzebnej. Szablon jest w `<katalog bazowy tego skilla>/../../template/`.
   - **Nowy plik** (projekt go nie ma): skopiuj z szablonu.
   - **Plik, który projekt mógł zmienić** (oznaczony „połącz”): nie nadpisuj. Dopisz tylko opisaną zmianę, zachowując
     wszystko, co dodały moduły (pozycje menu, ekrany, teksty).
   - Po każdej sekcji: `npm run check` zielony, zapis na GitHubie („Aktualizacja stepkit: <sekcja>”).
3. Na końcu ustaw w `docs/STATUS.md` linię `**Wersja stepkit:** <aktualna wersja z góry tego pliku>` (zaraz pod
   tytułem; dopisz, jeśli jej nie ma) i wpis w „Ostatnie decyzje”. Potem wróć do zwykłej pracy.
4. Moduł w toku: aktualizację rób przed dalszą pracą nad nim; jego plików nie ruszaj poza tym, co opisuje sekcja.
5. „Nie teraz”: pracuj dalej, ale przy następnym `/stepkit:dalej` zapytaj ponownie. Przed etapem **makieta** aktualizacja
   jest konieczna (makiety korzystają z motywu i panelu pytań).

## 0.1.4: ściągawka w README

- **Połącz** `README.md` projektu z `template/README.md`: sekcje „Uruchomienie”, „Gdzie co podejrzeć” (porty z `.env`
  projektu), logowanie do phpMyAdmin, „Ważne pliki”, „Coś nie działa?”. Zachowaj to, co projekt już dopisał.
- `.env`: jeśli `FRONTEND_PORT` jest zmieniony, popraw port w `FRONTEND_URL`.

## 0.1.5: pomysły na później

- Nowy plik `docs/IDEAS.md` z szablonu (jeśli go nie ma) i wiersz o nim w tabeli „Ważne pliki” w `README.md`.

## 0.1.6: wspólny wygląd makiet i aplikacji, panel pytań

- Nowe pliki: `shared/src/theme.ts`, `shared/src/theme.css`, `frontend/src/test/theme.test.tsx`,
  `mockups/src/test/theme.test.tsx`, `mockups/src/common/Question.test.tsx`.
- **Połącz** `shared/package.json`: pole `exports` jak w szablonie.
- Jeśli projekt ma `frontend/src/core/theme.ts` ze zmianami (inne niż `primaryColor: 'blue', defaultRadius: 'md'`),
  przenieś je do `shared/src/theme.ts`; potem usuń `frontend/src/core/theme.ts`.
- **Połącz** `frontend/src/main.tsx` i `mockups/src/main.tsx`: motyw z `@app/shared/theme`, import
  `@app/shared/theme.css`, `<MantineProvider theme={theme}>`. To samo w `frontend/src/test/render.tsx`
  i `mockups/src/test/render.tsx`.
- `mockups/src/common/Question.tsx` z szablonu (`Questions` i `Question`), klucze `mockup.questions_*`
  i `mockup.question_about` w `shared/locales/pl/common.json`. Istniejące makiety: przenieś wszystkie `<Question>`
  ekranu do jednego `<Questions>` na górze ekranu (z `about`).

## 0.1.8: przełącznik jasny/ciemny, kolory tylko z motywu

- **Połącz** `shared/src/theme.ts`: `COLOR_SCHEME_TOGGLE` (domyślnie `false`) i `colorSchemeProps` jak w szablonie;
  nowy `shared/src/theme.test.ts`.
- Nowe pliki: `ColorSchemeToggle.tsx` i `ColorSchemeToggle.test.tsx` w `frontend/src/common/` i `mockups/src/common/`,
  `frontend/src/test/colors.test.ts`.
- **Połącz** `main.tsx` (oba): `{...colorSchemeProps()}` w `MantineProvider`. Nagłówki `AppLayout.tsx`,
  `AccountLayout.tsx` i pasek w `mockups/src/Shell.tsx`: `{COLOR_SCHEME_TOGGLE && <ColorSchemeToggle />}`.
- Klucze `color_scheme` w `shared/locales/pl/common.json`.
- Jeśli `colors.test.ts` znajdzie kolory wpisane na sztywno w modułach, zamień je na kolory Mantine.
- Zapytaj o przełącznik jasny/ciemny (pytanie z obszaru „Wygląd” w wywiadzie) i ustaw `COLOR_SCHEME_TOGGLE`.

## 0.1.11: ikony Lucide

- `npm uninstall -w @app/frontend -w @app/mockups @tabler/icons-react` i
  `npm install -w @app/frontend -w @app/mockups lucide-react@^1.72.0`.
- `icons.tsx` i `icons.test.tsx` z szablonu w `frontend/src/common/` i `mockups/src/common/`; menu makiet
  (`mockups/src/Shell.tsx`, **połącz**) dostaje `leftSection={<NavIcon name={item.icon} />}`.
- **Połącz** `shared/src/navigation.config.ts`: każde pole `icon` na nazwę z https://lucide.dev/icons/ (Tabler
  `home` → `house`, inne według podobieństwa) i dopisz te ikony do `NAV_ICONS` w obu `icons.tsx`.
- W modułach zamień importy z `@tabler/icons-react` na odpowiedniki z `lucide-react`
  (`IconCheck` → `Check`, `IconTrash` → `Trash2` …); `ColorSchemeToggle.tsx` z szablonu.

## 0.1.13: numer wersji w projekcie

- Linia `**Wersja stepkit:**` w `docs/STATUS.md` (krok 3 z „Jak”).

## 0.1.14: moduł „Wygląd” i księga wyglądu

- Nowe pliki: `docs/DESIGN.md`, cały folder `mockups/src/appearance/` (`ThemeVariants.tsx`, `ThemeVariants.test.tsx`,
  `variants.ts`, `variants.css`).
- **Połącz** `mockups/src/main.tsx`: `ThemeVariantProvider variants={THEME_VARIANTS}` zamiast `MantineProvider`, import
  `./appearance/variants.css`. `mockups/src/Shell.tsx`: `<VariantSwitch />` obok przełącznika motywu.
  `mockups/src/test/theme.test.tsx` z szablonu. Klucz `mockup.variant` w `shared/locales/pl/common.json`.
- **Połącz** `README.md`: wiersz `docs/DESIGN.md` w „Ważne pliki”.
- Tabela modułów w `STATUS.md` bez modułu `appearance`: zapytaj „Dodać moduł »Wygląd«, w którym dopracujemy kolory
  i styl całej aplikacji?” (polecam, jeśli żaden moduł nie jest jeszcze zrobiony). Tak → wiersz „Wygląd” (folder
  `appearance`, `czeka`, `makieta`, bez zależności) **zaraz za modułem w toku** (albo jako pierwszy, gdy nic nie jest
  w toku), przenumerowanie, `appearance` w „Zależy od” Publikacji. Nie → opisz obecny wygląd w `DESIGN.md`
  (z `shared/src/theme.ts` i ekranów) ze stanem „ustalony”.

## 0.1.15: API domyślnie zamknięte, uprawnienia z nawigacji

- Nowy plik `backend/src/middleware/mountModule.ts`; **połącz** `shared/src/navigation.ts` (funkcja `rolesFor`)
  i testy (`backend/src/app.test.ts`, `shared/src/navigation.test.ts`) z szablonem.
- **Połącz** `backend/src/app.ts`: trasy publiczne (health, logowanie, formularze strony) przed
  `api.use(requireAuth)`, wszystkie moduły po nim przez `mountModule`. Sprawdź każdy istniejący moduł: rola z
  nawigacji zgadza się z tym, co miał w `requireRole`? Różnica → zapytaj użytkownika, która jest dobra.
- Dopisz „Mapę dostępu” do `SPEC-GENERAL.md` (strony z nawigacji, trasy istniejących modułów); co do stron dla
  odwiedzających zaproponuj podział publiczne / po zalogowaniu i poproś o potwierdzenie.
- Moduł Logowanie zrobiony: `authenticate` z aktualną rolą z bazy (`code-conventions.md`, „Moduł Logowanie”) z testami.
