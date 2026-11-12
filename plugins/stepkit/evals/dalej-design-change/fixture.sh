mkdir -p docs/modules/customers shared/src mockups/src/modules/customers
cat > docs/STATUS.md <<'MD'
# Stan projektu: Kwiaciarnia

**Wersja stepkit:** 0.1.14

**Następny krok:** Klienci, pytania (użytkownik ogląda makietę).

## Start aplikacji

- [x] 1. Sprawdzenie komputera
- [x] 2. Szkielet i repo
- [x] 3. Opis
- [x] 4. Wywiad
- [x] 5. Podsumowanie
- [x] 6. Makieta ogólna
- [x] 7. Spec ogólny
- [x] 8. Plik stanu

## Moduły

| # | Moduł | Folder | Status | Etap | Zależy od |
|---|---|---|---|---|---|
| 1 | Wygląd | appearance | zrobiony | zamknięcie | — |
| 2 | Logowanie | login | zrobiony | zamknięcie | appearance |
| 3 | Klienci | customers | w toku | pytania | login |

## Ostatnie decyzje

- 2026-11-12: Logowanie gotowe
MD
cat > docs/DESIGN.md <<'MD'
# Księga wyglądu

**Stan:** ustalony (2026-11-10).

## Charakter
Spokojna, ciepła aplikacja dla kwiaciarni: dużo bieli, akcent w kolorze szałwii.

## Kolory
| Kolor | Do czego |
|---|---|
| sage | przyciski główne, aktywne menu |

## Odstępy, zaokrąglenia, cienie
Zaokrąglenia `sm` (delikatne), bez cieni.

## Wzorce
| Wzorzec | Jak wygląda | Gdzie pierwszy raz |
|---|---|---|
| przycisk główny | wypełniony, kolor sage, zaokrąglenie sm | login |
MD
printf '# Spec ogólny: Kwiaciarnia\nRole: admin, user. Moduł Klienci: lista stałych klientów.\n' > docs/SPEC-GENERAL.md
printf '# Pytania: Klienci\n\n## 1. Czy telefon jest obowiązkowy?\n- a) tak (polecam)\n- b) nie\n\n**Odpowiedź:** \n' > docs/modules/customers/QUESTIONS.md
printf "import type { MantineThemeOverride } from '@mantine/core';\nexport const theme: MantineThemeOverride = { primaryColor: 'sage', defaultRadius: 'sm' };\n" > shared/src/theme.ts
printf "export function CustomersMockup() { return null; }\n" > mockups/src/modules/customers/CustomersMockup.tsx
