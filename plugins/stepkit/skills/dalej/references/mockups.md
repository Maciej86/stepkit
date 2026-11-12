# Makiety

Czytasz ten plik na etapie **makieta** każdego modułu (i w kroku 6 `/stepkit:start` dla makiety ogólnej).

Makiety to osobna aplikacja w `mockups/` (adres `http://localhost:5174`, uruchamiana przez `npm run dev`). Pokazują,
jak ekran będzie wyglądał, **zanim** powstanie prawdziwy kod. Nie łączą się z bazą ani z backendem.

## Trzy części

Makieta ma te same części co aplikacja (`AREAS`), przełączane w pasku „MAKIETA”:

| Część | Wygląd ekranów |
|---|---|
| Strona | strona www: nagłówek, sekcje, realistyczne teksty oferty, formularze dla odwiedzających |
| Konto | proste ekrany „moje …” zalogowanego użytkownika (np. Moje zamówienia, Moje dane) |
| Panel | aplikacja do pracy: listy w tabelach, filtry, przyciski akcji, formularze w oknach |

W koncie i panelu działa przełącznik „Oglądam jako:”. Każdy ekran musi wyglądać sensownie dla **każdej roli**, która go
widzi. To, co rola może, a czego nie, pokazuj w makiecie (np. administrator widzi przycisk „Usuń”, pracownik nie)
przez `useMockupRole()` z `mockups/src/common/mockupRole.ts`:

```tsx
const role = useMockupRole();
{role === 'admin' && <Button color="red">{t('delete')}</Button>}
```

## Jak zrobić ekran modułu

1. Folder: `mockups/src/modules/<module>/` (ta sama nazwa folderu co w `frontend/` i `backend/`, po angielsku).
2. Plik ekranu, np. `OrdersMockup.tsx`, komponenty Mantine (`Table`, `Button`, `TextInput`, `Modal`, `Badge`, …).
3. Dane zmyślone, ale **realistyczne i polskie**: imiona, firmy, kwoty w zł, daty w formacie DD.MM.RRRR. Trzymaj je
   w `mockups/src/modules/<module>/data.ts`.
4. Teksty jako klucze w `shared/locales/pl/<module>.json` (ten sam plik, którego użyje prawdziwa aplikacja), plik
   dopisany w `shared/src/i18n.ts`. Teksty, które są tylko zmyślonymi danymi (imiona, kwoty), mogą zostać w `data.ts`.
5. Pozycja w nawigacji (`shared/src/navigation.config.ts`) i wpis w `mockups/src/screens.tsx`.
6. Pozostałe stany ekranu też pokaż: pusta lista (komunikat zachęcający, np. „Nie masz jeszcze zamówień. Dodaj
   pierwsze.”), błąd formularza, okno potwierdzenia usunięcia.

## Pytania na ekranach

Każdą niejasność, której nie rozstrzygnął spec ogólny, wpisz **na ekranie, w miejscu, którego dotyczy**:

```tsx
import { Question } from '../../common/Question';

<Question
  number={3}
  options={[
    { id: 'a', text: 'Usunięcie klienta przenosi go do archiwum' },
    { id: 'b', text: 'Klienta z zamówieniami nie da się usunąć' },
  ]}
  recommended="a"
>
  Co ma się stać z zamówieniami, gdy usuniesz klienta?
</Question>
```

- Numeracja pytań = numeracja w `docs/modules/<module>/QUESTIONS.md`. Wpisz je tam od razu (pytanie, warianty,
  rekomendacja, puste pole „Odpowiedź”).
- Pytaj o to, co zmienia ekran, dane albo uprawnienia. Pytania o kolory czy czcionki zostaw na koniec.
- Zawsze pytaj o regułę usuwania przy każdej relacji, której spec ogólny nie rozstrzygnął (zob. `code-conventions.md`,
  „Baza danych”).

Po zrobieniu ekranów: uruchom `npm run dev` (jeśli nie działa), podaj adres i poproś:
„Otwórz http://localhost:5174, przełącz się na <część> i obejrzyj ekrany modułu <nazwa>. Odpowiedz na pytania
w żółtych ramkach, możesz po kolei: »1a, 2b, …« albo własnymi słowami.”

Odpowiedzi zapisz w `QUESTIONS.md` z datą. Jeśli odpowiedź zmienia ekran, popraw makietę i usuń ramkę z tym pytaniem.

## Zamknięcie modułu

Gdy moduł jest **zrobiony** (użytkownik potwierdził testy), w `mockups/src/screens.tsx` zamień wpis na zaślepkę
z etykietą pozycji nawigacji modułu (ten sam klucz co w `navigation.config.ts`):

```tsx
import { Done } from './common/Done';
orders: () => <Done labelKey="common.nav.orders" />,
```

Pliki ekranu (`mockups/src/modules/orders/`) **zostają**. Nie usuwaj ich.

## Zasady

- **Nigdy nie usuwaj makiety modułu, który nie jest zamknięty**, nawet jeśli użytkownik prosi „usuń makiety, chcę
  widzieć, co jest zrobione”. Wyjaśnij: „Makiety są w osobnej aplikacji pod innym adresem, więc nie mieszają się
  z prawdziwą. Prawdziwą zobaczysz na http://localhost:5173. Makiety tego modułu przydadzą się do końca jego budowy.”
- Makieta nie importuje niczego z `frontend/` ani `backend/`.
- Makieta nigdy nie trafia na serwer.
- Strona „Postęp” (`/progress`) czyta `docs/STATUS.md` sama; nie edytuj jej przy modułach.
