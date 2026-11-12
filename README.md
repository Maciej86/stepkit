# stepkit

**Zbuduj własną aplikację www z Claude, krok po kroku, bez programowania.**

stepkit to dodatek (plugin) do Claude Code. Prowadzi Cię od luźnego pomysłu („chcę zbierać zamówienia mojej firmy”)
do działającej aplikacji z logowaniem, rolami i kolejnymi częściami, a na końcu do jej publikacji w internecie.
Pracuje małymi krokami, w krótkich rozmowach, dzięki czemu zużywa dużo mniej tokenów niż jedna długa rozmowa.

## Dla kogo

Dla osób, które nie programują, a chcą zbudować własną aplikację lub usługę na abonament (SaaS). Nie musisz znać
żadnego języka programowania ani Linuksa.

## Czego potrzebujesz

- komputera z **Windows 10/11** albo **macOS**,
- **Claude Code** (w terminalu albo jako rozszerzenie w VS Code) i płatnego planu Claude,
- chwili na instalację kilku darmowych programów; stepkit przeprowadzi Cię przez nie krok po kroku.

### Po co te programy?

To głównie **narzędzia pracy Claude'a**. Instalujesz je raz i nie musisz się ich uczyć, a dzięki nim praca jest
szybsza, stabilniejsza i bezpieczniejsza:

| Program | Po co |
|---|---|
| **Node.js** | silnik, na którym działa aplikacja; Claude sam ją uruchamia i testuje, zamiast zgadywać |
| **Docker Desktop** | „pudełko” z bazą danych, które działa tak samo na każdym komputerze i na serwerze |
| **Git i GitHub** | punkty zapisu jak w grze: po każdej działającej części powstaje zapis, do którego zawsze wrócisz |
| **superpowers** | sprawdzone sposoby pracy dla Claude'a (specyfikacja, plan, przegląd kodu) |
| **Playwright** | Claude sam klika w Twojej aplikacji i sprawdza ją, zanim poprosi o to Ciebie |

## Instalacja

W Claude Code wpisz:

```
/plugin marketplace add <login-na-github>/skilsaas
/plugin install stepkit@stepkit
/plugin install superpowers@claude-plugins-official
/plugin install playwright@claude-plugins-official
```

Zamknij i otwórz Claude Code ponownie.

## Jak zacząć

1. Utwórz pusty folder na aplikację i otwórz go w Claude Code.
2. Wpisz **`/stepkit:start`**. Claude sprawdzi komputer, założy projekt, zapyta o Twój pomysł, pokaże makietę
   (podgląd ekranów) i rozpisze aplikację na części.
3. Potem zawsze: **otwórz nową rozmowę i wpisz `/stepkit:dalej`**. Claude wie z pliku stanu, na czym skończyliście.

## Dlaczego nowa rozmowa?

Każda wiadomość w rozmowie kosztuje tym więcej tokenów, im dłuższa jest cała rozmowa, a w bardzo długiej rozmowie AI
zaczyna gubić wcześniejsze ustalenia. stepkit zapisuje wszystko w plikach (`docs/STATUS.md`, specyfikacje, plany),
więc każda nowa rozmowa zaczyna od krótkiego pliku stanu, a nie od całej historii.

## Co stepkit robi na Twoim komputerze

- prowadzi przez instalację programów z tabeli wyżej,
- tworzy projekt w wybranym folderze i **prywatne** repo na Twoim koncie GitHub,
- uruchamia bazę danych w Dockerze i aplikację pod adresami `localhost`,
- hasła trzyma w pliku `.env`, który nigdy nie trafia na GitHub.

## Licencja

MIT
