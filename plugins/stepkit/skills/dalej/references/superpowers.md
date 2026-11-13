# superpowers na etapach modułu

Czytasz ten plik na etapach **spec**, **plan**, **implementacja** i po implementacji. superpowers to dodatek ze
sprawdzonymi sposobami pracy. stepkit używa czterech jego skilli, ale **z własnymi zasadami**, które mają
pierwszeństwo przed domyślnymi zasadami tych skilli:

| Etap | Skill | Nadpisania stepkit |
|---|---|---|
| Spec | `superpowers:brainstorming` | Pytania zadała już makieta i `QUESTIONS.md`: **nie** prowadź nowego wywiadu, nie proponuj „visual companion”, nie pytaj o sposób wykonania. Użyj tylko części o pisaniu dokumentu i jego sprawdzeniu. Zapis: `docs/modules/<module>/SPEC.md` według wzoru z `document-templates.md`. Bez commitowania osobno (commit przy zamknięciu modułu albo etapu). |
| Plan | `superpowers:writing-plans` | Zapis: `docs/modules/<module>/PLAN.md` (nie `docs/superpowers/plans/`). Kroki małe, z testami, zgodne z `code-conventions.md` i plikami z kolumny „Wzorce” modułu; pierwszy krok to szkielet testów `it.todo` z wymagań specu (`document-templates.md`, „PLAN.md”). **Nie pytaj** o „subagent-driven” ani „native”: zawsze wykonanie w tej rozmowie. |
| Implementacja | `superpowers:executing-plans` + `superpowers:test-driven-development` | **Bez worktree, bez subagentów, bez osobnego folderu `.superpowers/sdd`.** Pracujesz na gałęzi `main` projektu użytkownika (to jego prywatne repo). Postęp: odhaczone `- [x]` w `PLAN.md` i etap w `STATUS.md`. Każdy krok: test → kod → `npm run check`. |
| Po implementacji | `superpowers:requesting-code-review` | Przegląd całego modułu jednym recenzentem. Recenzent dostaje też listę kontrolną z `code-conventions.md` i listy z plików z kolumny „Wzorce” modułu. Poprawki z testem; potem etap **testy**. |

Wyjaśniaj użytkownikowi, co się dzieje, jednym zdaniem i bez nazw skilli, np. „Spisuję teraz specyfikację modułu,
czyli dokładny opis, co zbudujemy”.

## Gdy superpowers nie ma

(W `docs/STATUS.md` jest zapis „superpowers niedostępny”.) Pracuj według stepkit:
- Spec i plan: wzory z `document-templates.md`.
- Implementacja: krok po kroku z `PLAN.md`, zawsze najpierw test, który nie przechodzi, potem kod, potem
  `npm run check`.
- Przegląd: przejdź sam listę kontrolną z `code-conventions.md` (i z plików z kolumny „Wzorce” modułu) i napraw wszystko, co nie spełnia warunków.
