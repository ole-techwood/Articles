# Playwright Test Plan: Mamma Pizza Menu Browser

## Scope & Objectives

### Sources and mapping

- Specification: `docs/specs/mamma-pizza-menu-browser.md`.
- Development plan: `docs/plans/mamma-pizza-menu-browser-plan.md`.
- User story substitute: `CONTEXT.md`, as requested. It defines the Reader, Menu Browser, Category, Story, Story Sequence, Story Frame, Story Circle, Progress Timer, Menu Item, Featured Dish, and Nutrition Facts vocabulary, but contains no formal acceptance-criteria list.
- Traceability uses the specification success criteria as executable acceptance criteria. `CONTEXT.md` controls domain terminology and browse-only boundaries.

All three selected sources describe the same system under test: the client-side Mamma Pizza Menu Browser. No source is mismatched. No selected source was ignored.

### Objectives

Verify that a fresh Reader can:

1. Open on Pizza, Story 1 of 3, with Margherita and its complete Menu Item details.
2. Select every Category through an accessible Story Circle and start at that Category's first Story.
3. Browse exactly three ordered Stories within each Category without crossing sequence boundaries.
4. Advance Stories only through explicit manual interaction.
5. Read dynamic per-serving Nutrition Facts for the active Menu Item.
6. Use keyboard, pointer, and touch-capable interactions on desktop and mobile layouts.
7. Confirm the experience remains browse-only, with no ordering, account, payment, staff, or backend workflow.

### Known Conflicts

No behavior conflict exists among the three selected source documents. The substitute user story is a glossary rather than an acceptance-criteria document, so the numbered specification success criteria are the authoritative traceability targets.

The current repository baseline has implementation gaps that must be resolved before these tests can pass:

- The live application requires manual Story navigation; no automatic transitions or playback controls are in scope.
- `usePlayback` should keep only Category and Story selection state plus boundary behavior.
- At either Story boundary, navigation must remain in the selected Category: Story 1 cannot move backward and Story 3 cannot move forward. Category changes occur only through explicit Story Circle selection.
- The current baseline progress segments expose selected Story position, not elapsed time.

These are execution blockers for the related scenarios, not changes to the approved requirements.

### Test environment and release gate

- Run from repository root with `pnpm`.
- Set `BASE_URL` to the running Vite origin, for example `BASE_URL=http://127.0.0.1:5173`.
- Use Playwright's configured Chromium, Firefox, and WebKit projects.
- Add or enable mobile projects for Pixel 5 and iPhone 12, or apply equivalent mobile viewport and touch context settings in the test suite.
- Use fresh browser context per test. Do not rely on cookies, storage, or prior Story state.
- Run `pnpm run build`, `pnpm run lint`, `pnpm test`, and the Playwright suite before approval.

## Acceptance Criteria Traceability

| ID  | Acceptance criterion                                                                                                                 | Primary scenarios           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| A1  | Initial state is Pizza, Story 1 of 3, Margherita, with all required content and Nutrition Facts.                                     | PW-01                       |
| A2  | Six labeled Story Circles select Categories and reset each sequence to Story 1.                                                      | PW-02                       |
| A3  | Each Category has exactly three ordered Stories; manual navigation respects both sequence boundaries.                                | PW-03                       |
| A4  | Stories advance only through explicit manual interaction and final Story remains visible until Reader navigates away.                | PW-04                       |
| A5  | Progress Timer exposes completed, current, and pending progress visually and semantically.                                           | PW-05                       |
| A6  | Story Frame is portrait on desktop and full-width/full-height within the mobile experience; content and controls stay within bounds. | PW-06                       |
| A7  | Automated coverage exists for initial state, selection, navigation, touch, keyboard, and content.                                    | All scenarios; release gate |
| A8  | Nutrition Facts update from the active Menu Item after Story and Category changes.                                                   | PW-02, PW-03, PW-07         |
| A9  | Approved static Menu Items and Nutrition Facts remain unchanged.                                                                     | PW-01, PW-02, PW-07         |
| A10 | Build, lint, unit tests, and browser tests pass.                                                                                     | Release gate                |
| A11 | No interaction exposes ordering, account, payment, staff, health, or remote-data workflows.                                          | PW-08                       |

## Test Scenarios Mapped to Acceptance Criteria

All scenarios assume a fresh browser context and are independent. Reset to the application root before each scenario. A failure means one or more expected outcomes is false, an unexpected navigation/state change occurs, a console error is emitted, or a required control/content item is inaccessible.

### PW-01: Open on the Featured Dish with complete content

**Maps to:** A1, A7, A10, A11.

**Starting state:** Fresh context at the application root.

**Steps:**

1. Navigate to `/`.
2. Locate the Story Frame region by accessible name matching `Pizza story 1 of 3`.
3. Verify the active Menu Item heading is `Margherita`.
4. Verify description, ingredients, and euro price are visible. Expected price: `EUR 12.00` or the UI's localized euro-symbol equivalent.
5. Verify the Nutrition Facts region is named `Nutrition Facts per serving`.
6. Verify values are `720 kcal`, `28g`, `82g`, and `29g` for calories, protein, carbohydrates, and fat.
7. Verify exactly six Category Story Circles exist, Pizza is pressed, and exactly three progress segments exist.
8. Verify the first segment starts at zero active progress, with the other two segments pending.

**Expected outcomes:** Margherita is immediately readable as the Featured Dish. Required content and Nutrition Facts are present and associated with the first Story. No ordering control or unexpected navigation appears.

**Pass/fail:** Pass only if all content, accessible names, initial selection state, and initial progress semantics match. Fail on missing fields, shared/wrong Nutrition Facts, incorrect Category, or wrong Story position.

### PW-02: Select every Category and reset to its first Story

**Maps to:** A2, A10, A11.

**Starting state:** Fresh context at the application root.

**Steps:**

1. Record the six Story Circle buttons in order: Pizza, Antipasti, Pasta, Insalate, Dolci, Drinks.
2. For each Story Circle, click it from a fresh reset.
3. Verify that the clicked Circle has `aria-pressed="true"` and all other Circles have `aria-pressed="false"`.
4. Verify the Story Frame accessible name is `<Category> story 1 of 3`.
5. Verify the first expected Menu Item and its Nutrition Facts from the fixture matrix are visible.
6. Advance to Story 2, select the same Category again, and verify it resets to Story 1 with Story 1 Nutrition Facts.

**Expected outcomes:** Every Category is reachable through its labeled Story Circle. Selection always resets to Story 1 and renders that Category's first Menu Item without reload.

**Pass/fail:** Pass only if all six Categories reset correctly and display the expected first Menu Item and Nutrition Facts. Fail on wrong active state, stale Story content, or stale Nutrition Facts.

### PW-03: Browse Stories and enforce per-Category boundaries

**Maps to:** A3, A10.

**Starting state:** Fresh context, repeated once for each Category fixture.

**Steps:**

1. Select the target Category Story Circle.
2. Verify Story 1 of 3 and the fixture's first Menu Item.
3. Click the explicit `Next story` control once; verify Story 2 of 3 and the fixture's second Menu Item.
4. Click `Next story` once more; verify Story 3 of 3 and the fixture's third Menu Item.
5. Verify the next controls, including the right tap zone and explicit Story control, are disabled or otherwise inert at Story 3.
6. Attempt both next interactions again; verify Story 3, its content, and the selected Category remain unchanged.
7. Click the explicit `Previous story` control once; verify Story 2 of 3.
8. Click it again; verify Story 1 of 3.
9. Verify previous controls are disabled or inert at Story 1.
10. Attempt both previous interactions again; verify the application remains in Story 1, keeps the selected Category active, and does not move to another Category.
11. Verify Category selection remains unchanged throughout the boundary checks.

**Expected outcomes:** Each Category contains exactly three ordered Stories. Manual navigation remains inside the selected Category's Story Sequence, and boundary attempts do not underflow, overflow, or implicitly change Category.

**Pass/fail:** Pass only if every Category meets both boundaries and all three expected Menu Items appear in order. Fail on cross-Category navigation, missing disabled/inert state, wrong order, or stale Nutrition Facts.

### PW-04: Advance Stories only through explicit manual interaction

**Maps to:** A4.

**Starting state:** Fresh context at Pizza Story 1.

**Steps:**

1. Navigate to `/` and verify Story 1 of 3.
2. Wait without input; verify Story 1 remains visible.
3. Click the explicit `Next story` control twice; verify Stories 2 and 3 appear in order.
4. Wait without input; verify Story 3 remains visible.
5. Click the explicit `Previous story` control; verify Story 2 appears.

**Expected outcomes:** Story changes happen only after explicit Reader interaction. No elapsed-time behavior advances or resets the Story Sequence.

**Pass/fail:** Pass only if Story position changes only after manual input and remains stable without input. Fail on any automatic transition or boundary overflow.

### PW-05: Expose Progress Timer semantics for pending, current, and completed Stories

**Maps to:** A5.

**Starting state:** Fresh context at Pizza Story 1.

**Steps:**

1. Navigate to `/` and verify three progressbar elements exist.
2. Read each segment's `aria-label`, `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
3. Verify labels are `Story 1 progress`, `Story 2 progress`, and `Story 3 progress`; min is `0`; max is `100`.
4. Verify Story 1 is current, Story 2 and Story 3 are pending.
5. Click `Next story`; verify Story 1 is completed, Story 2 is current, and Story 3 is pending.
6. Click `Next story`; verify all prior segments are completed and Story 3 is current.

**Expected outcomes:** Progress values communicate completed, current, and pending Stories through semantics and visual state. Manual navigation updates progress without elapsed-time behavior.

**Pass/fail:** Pass only if every segment has correct accessible semantics and values at each manually selected Story. Fail on missing roles/labels, incorrect completed/current/pending values, or out-of-range values.

### PW-06: Verify responsive Story Frame layout and reachable Category Navigation

**Maps to:** A8 and accessibility requirements.

**Starting state:** Fresh context, no stored viewport assumptions.

**Steps:**

1. Run at desktop viewport 1280 x 900.
2. Locate the Story Frame and measure its rendered width and height.
3. Verify its width-to-height ratio is approximately 9:16 within a small rendering tolerance, it is centered, and all content/control bounding boxes remain inside the frame.
4. Verify focus indicators are visible on Category Story Circles and Story navigation controls when reached with Tab.
5. Run at mobile viewport 375 x 812 with touch enabled.
6. Verify the Story Frame uses the available mobile width, preserves portrait presentation, and does not create horizontal document overflow.
7. Verify the Category Navigation is reachable by horizontal scrolling and every one of the six Story Circles can be focused and clicked.
8. Verify the active Menu Item heading, price, Nutrition Facts, progress segments, and controls do not overlap or clip at either viewport.

**Expected outcomes:** Desktop presents a stable portrait Story Frame. Mobile presents the full-width mobile experience, keeps controls usable, and allows access to all Categories without clipping or page-level horizontal overflow.

**Pass/fail:** Pass only if layout measurements, focus visibility, control reachability, and overflow checks pass at both viewports. Fail on ratio drift, clipped content, inaccessible off-screen Categories, hidden focus, or overlapping controls.

### PW-07: Verify Menu Item content and dynamic Nutrition Facts across all 18 Stories

**Maps to:** A1, A2, A3, A10, A11.

**Starting state:** Fresh context. Use the fixture matrix below as the expected oracle.

**Steps:**

1. For each Category, select its Story Circle.
2. For each of its three Stories, verify the Menu Item name, non-empty description, non-empty ingredients, euro-formatted price, and Nutrition Facts region.
3. Compare calories, protein, carbohydrates, and fat with the fixture matrix.
4. Verify changing Story updates all four Nutrition Facts values without full navigation or reload.
5. Select another Category and verify all four values update to that Category's first Menu Item.
6. Verify no two fixture rows share an identical four-value Nutrition Facts tuple.

**Expected outcomes:** Every Story renders the approved static Menu Item fields and the Nutrition Facts belonging to its active Menu Item. Values do not remain shared or stale after navigation.

**Pass/fail:** Pass only if all 18 rows match exactly and each navigation update is observable without reload. Fail on missing field, incorrect price format, stale/shared Nutrition Facts, wrong Story order, or data mutation.

### PW-08: Preserve browse-only scope and client-side operation

**Maps to:** A11.

**Starting state:** Fresh context with request logging enabled.

**Steps:**

1. Navigate to `/` and exercise Category selection, Story navigation, and touch/keyboard navigation.
2. Assert no visible link or button exposes ordering, cart, checkout, payment, reservation, account, sign-in, staff, inventory, search, favorites, sharing, reviews, analytics, notification, dietary, medical, or allergen workflow.
3. Record network requests during the flow.
4. Verify no request targets an API, database, CMS, authentication service, or remote menu endpoint. Local document, script, style, and font requests are allowed.
5. Verify no URL navigation leaves the Menu Browser.

**Expected outcomes:** Reader can browse the static Menu Browser only. No out-of-scope workflow, remote data dependency, persistence, or unexpected navigation is exposed.

**Pass/fail:** Pass only if interaction remains local and browse-only. Fail on any prohibited control, unexpected remote data request, external navigation, or persistence requirement.

## Page Object Model Outline

The specification describes one UI screen: the single-page Menu Browser. The Story Frame, Category Navigation, Progress Timer, Story Content, and Story Controls are component regions within that screen, so they are represented as locators and actions on one page object rather than separate page objects.

### `MenuBrowserPage`

#### Root and regions

- `root`: `main.menu-browser`.
- `header`: `getByRole('heading', { name: 'Una tavola, tante storie.' })` and the Mamma Pizza identity text.
- `categoryNavigation`: `getByRole('navigation', { name: 'Menu Categories' })`.
- `categoryCircle(name)`: `categoryNavigation.getByRole('button', { name: \`View ${name} menu\` })`.
- `storyFrame`: `getByRole('region', { name: /.+ story [1-3] of 3/ })`.
- `storyArticle`: `storyFrame.locator('article')`.
- `nutritionRegion`: `storyFrame.getByRole('region', { name: 'Nutrition Facts per serving' })`.
- `progressSegments`: `storyFrame.getByRole('progressbar')`.
- `storyNavigation`: `storyFrame.locator('[aria-label="Story navigation"]')`.

#### Story content locators

- `storyHeading`: `storyArticle.getByRole('heading', { level: 2 })`.
- `description`: `storyArticle.locator('.story-description')`.
- `ingredients`: `storyArticle.locator('.ingredients')`.
- `price`: `storyArticle.locator('.price')`.
- `nutritionValue(label)`: locate the `dt` matching the label and its paired `dd`; prefer accessible definition-list relationships over positional selectors.
- `storyPosition`: `storyNavigation.locator('span')` or an explicit accessible position element.

#### Navigation locators

- `tapPrevious`: `storyFrame.getByRole('button', { name: 'Previous story' }).first()`.
- `tapNext`: `storyFrame.getByRole('button', { name: 'Next story' }).first()`.
- `previousControl`: `storyNavigation.getByRole('button', { name: 'Previous story' })`.
- `nextControl`: `storyNavigation.getByRole('button', { name: 'Next story' })`.

If duplicate accessible names make `first()`/`last()` necessary, keep the distinction documented in the POM. Prefer adding stable semantic hooks or test IDs only when accessible locators cannot distinguish the tap zone and explicit Story Controls.

#### Actions

- `goto()`: navigate to `/` and wait for the initial Story Frame region.
- `selectCategory(name)`: click the named Story Circle and wait for `<Category> story 1 of 3`.
- `nextStory()` and `previousStory()`: click the explicit Story Controls.
- `tapNextStory()` and `tapPreviousStory()`: click the Story Frame tap zones.
- `tapStoryFrame(direction)`: perform a touch or pointer interaction on the selected Story Frame tap zone.
- `storyFrameAccessibleName()`: read the Story Frame region accessible name.
- `progressValues()`: return each progressbar's `aria-valuenow` as numbers.
- `menuItemDetails()`: return heading, description, ingredients, price, and all four Nutrition Facts values.
- `assertNoHorizontalOverflow()`: compare document scroll width with viewport width.

## Data and Fixture Requirements

### Approved static fixture matrix

Use this matrix as read-only expected data. Keep values in the test fixture separate from application imports so the browser suite can detect accidental coupling or shared display defaults.

| Category  | Story | Menu Item             | Price | Calories | Protein | Carbohydrates | Fat |
| --------- | ----: | --------------------- | ----: | -------: | ------: | ------------: | --: |
| Pizza     |     1 | Margherita            |    12 |      720 |      28 |            82 |  29 |
| Pizza     |     2 | Piccante              |    15 |      880 |      37 |            79 |  45 |
| Pizza     |     3 | Ortolana              |    14 |      690 |      25 |            84 |  25 |
| Antipasti |     1 | Focaccia al Rosmarino |     7 |      310 |       9 |            43 |  12 |
| Antipasti |     2 | Burrata e Pomodori    |    11 |      410 |      19 |            17 |  29 |
| Antipasti |     3 | Polpette della Mamma  |    10 |      520 |      31 |            24 |  31 |
| Pasta     |     1 | Cacio e Pepe          |    13 |      640 |      24 |            76 |  26 |
| Pasta     |     2 | Tagliatelle al Ragù   |    16 |      780 |      39 |            88 |  29 |
| Pasta     |     3 | Pesto Genovese        |    14 |      610 |      18 |            81 |  24 |
| Insalate  |     1 | Panzanella            |    10 |      350 |      10 |            52 |  11 |
| Insalate  |     2 | Rucola e Parmigiano   |     9 |      190 |       5 |            16 |  12 |
| Insalate  |     3 | Caprese               |    11 |      380 |      21 |            14 |  27 |
| Dolci     |     1 | Tiramisù              |     8 |      470 |       8 |            46 |  28 |
| Dolci     |     2 | Panna Cotta           |     7 |      330 |       5 |            30 |  21 |
| Dolci     |     3 | Affogato              |     6 |      240 |       6 |            28 |  11 |
| Drinks    |     1 | House Red             |     7 |      125 |       0 |             4 |   0 |
| Drinks    |     2 | Aranciata             |     5 |      140 |       0 |            35 |   0 |
| Drinks    |     3 | Espresso              |     3 |       25 |       1 |             2 |   1 |

The application currently renders accented item names such as `Tagliatelle al Ragù` and `Tiramisù`. Use exact source strings in fixtures and locators; do not normalize visible Menu Item text in the test.

### Shared fixtures

- `categoryFixture`: six ordered Category names and expected first/second/third Menu Item names.
- `menuItemFixture`: the 18 rows above, including exact Nutrition Facts and prices.
- `viewportFixture`: desktop 1280 x 900; narrow mobile 375 x 812; optionally mobile 390 x 844.
- `browserFixture`: Chromium, Firefox, WebKit; mobile touch context for PW-06.
- `freshContextFixture`: no storage state, cookies, or permissions beyond touch emulation required by the scenario.
- `networkFixture`: request collector that allows local Vite assets and fails on unexpected API, CMS, authentication, or external menu requests.

### Touch setup

- For touch tests, configure `hasTouch: true` and a mobile viewport. Use real touch APIs when available; otherwise dispatch `touchstart` and `touchend` on the Story Frame locator.
- Assert public behavior through accessible Story Frame names, visible content, button labels, and progressbar values. Do not inspect React hook state or private variables.

### Non-functional checks

- Collect console errors and warnings for every scenario; fail on unexpected application errors.
- Check all required controls have meaningful accessible names and native button semantics.
- Check visible focus indicators for keyboard navigation.
- Check Story Frame and content bounding boxes at both viewport classes.
- Check no document-level horizontal overflow on mobile.
- Keep screenshots or traces only for failed runs or responsive investigations; snapshots and accessible locators are the primary assertions.
