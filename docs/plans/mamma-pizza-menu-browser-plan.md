# Implementation Plan: Mamma Pizza Menu Browser

## Overview

Build the browse-only Menu Browser MVP for Mamma Pizza!, an imaginary Italian family trattoria, presented as an Instagram Stories-like browsing experience. The implementation builds on the existing React 19, TypeScript, Vite, and Tailwind CSS codebase. It provides static menu content across six categories (three stories per category), automated six-second progression per story, manual navigation, playback controls (pause/resume/replay), touch-hold pausing, dynamic per-serving nutrition facts, and a mobile full-screen / desktop portrait Story Frame layout.

## Architecture Decisions

- **Package Manager**: `pnpm` (detected from `packageManager` in `package.json` and `pnpm-lock.yaml`).
- **Data Architecture**: Static typed menu dataset in `src/ui/lib/data.ts` containing six `Category` entries, each with three `Item` entries. Each `Item` defines explicit per-serving `Nutrition` data (calories, protein, carbohydrates, fat) rather than shared mock defaults.
- **State Engine**: Centralized in `usePlayback` custom hook. Manages active indices (`categoryIndex`, `storyIndex`), timer progression (`elapsed`), playback state (`playing`), touch pause state (`temporaryPause`), and boundary conditions (`atEnd`).
- **Component Decomposition**: Presentation components (`CategoryNav`, `StoryFrame`, `StoryContent`, `PlaybackTimer`, `PlaybackToggle`, `StoryControls`, `SiteHeader`) receive explicit props and callbacks without directly mutating state.
- **Visual & Layout Design**: CSS variables defined in `src/index.css` for the Mamma Pizza! palette (warm paper, deep olive, tomato red, charcoal text). Responsive layout in `src/App.css` enforces 9:16 portrait phone container on desktop and full-screen layout on mobile screens.

## Dependency Graph

```text
src/ui/lib/data.ts (Categories, Items, Nutrition data)
    │
    ├── src/ui/lib/usePlayback.ts (Playback state engine & timers)
    │       │
    │       └── src/App.tsx (Main application container)
    │               │
    │               ├── src/ui/components/SiteHeader.tsx
    │               ├── src/ui/components/CategoryNav.tsx
    │               └── src/ui/components/StoryFrame.tsx
    │                       │
    │                       ├── src/ui/components/PlaybackTimer.tsx
    │                       ├── src/ui/components/PlaybackToggle.tsx
    │                       ├── src/ui/components/StoryContent.tsx
    │                       └── src/ui/components/StoryControls.tsx
    │
    └── src/App.css / src/index.css (Styling & Palette variables)
```

## Task List

### Phase 1: Foundations & Data Model

## Task 1: Implement distinct static Nutrition Facts per Menu Item

**Description:** Update `src/ui/lib/data.ts` so every menu item across all six categories contains unique, accurate per-serving nutrition facts (calories, protein, carbohydrates, fat) instead of shared default values.

**Acceptance criteria:**

- [ ] Every menu item in `categories` has distinct, realistic `nutrition` facts.
- [ ] Margherita pizza initial state exposes 720 kcal, 28g protein, 82g carbs, 29g fat.
- [ ] All 18 menu items across 6 categories conform strictly to the `Category` and `Item` TypeScript types.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Inspect `data.ts` to ensure no menu item uses mock fallback data.

**Dependencies:** None

**Files likely touched:**

- `src/ui/lib/data.ts`

**Estimated scope:** Small (1 file)

---

## Task 2: Enhance PlaybackTimer to render individual Story progress segments

**Description:** Refactor `src/ui/components/PlaybackTimer.tsx` to render three distinct visual progress bar segments representing completed, active, and pending stories within the current category sequence, with appropriate ARIA accessibility attributes.

**Acceptance criteria:**

- [ ] Timer displays one segment bar for each story in the active category sequence (3 segments total).
- [ ] Completed stories show 100% filled segment bars; pending stories show 0% filled; active story segment fills according to `elapsed` time.
- [ ] Accessible progress bar semantics (`role="progressbar"`, `aria-valuenow`, `aria-valuemax`, `aria-label`) are preserved for screen readers.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Verify timer bar shows 3 distinct progress segments during playback.

**Dependencies:** Task 1

**Files likely touched:**

- `src/ui/components/PlaybackTimer.tsx`
- `src/App.css`

**Estimated scope:** Small (2 files)

---

### Checkpoint: Foundation

- [ ] All tests pass: `pnpm run test`
- [ ] Application builds without errors: `pnpm run build`
- [ ] Menu items carry distinct nutrition facts and progress timer renders story segments.

---

### Phase 2: Playback State & Interactive Controls

## Task 3: Refine usePlayback Hook and PlaybackToggle Replay behavior

**Description:** Ensure `src/ui/lib/usePlayback.ts` handles category switches, boundary boundaries, timer progress, touch hold pausing, and sequence replay. Update `src/ui/components/PlaybackToggle.tsx` to render a replay icon (`RotateCcw` or `RotateCw`) when playback reaches the end of a category sequence.

**Acceptance criteria:**

- [ ] Category switching resets `storyIndex` to 0, resets `elapsed` to 0, and resumes playback.
- [ ] Timer stops at 6000ms on story 3 without underflow/overflow or auto-looping.
- [ ] `PlaybackToggle` displays play icon when paused, pause icon when playing, and replay icon when at final story (`atEnd` & not `playing`).
- [ ] Replay action resets to story 0, resets elapsed time, and resumes automatic playback.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Play through to final story, verify icon switches to replay, and click replays sequence.

**Dependencies:** Task 2

**Files likely touched:**

- `src/ui/lib/usePlayback.ts`
- `src/ui/components/PlaybackToggle.tsx`

**Estimated scope:** Small (2 files)

---

## Task 4: Complete StoryFrame touch zones, keyboard controls, and StoryControls

**Description:** Integrate touch hold listeners, left/right tap zone buttons, keyboard left/right arrow navigation, and explicit disabled states on `StoryControls` in `StoryFrame.tsx` and `StoryControls.tsx`.

**Acceptance criteria:**

- [ ] Holding touch on `StoryFrame` pauses playback; releasing touch resumes playback if previously active.
- [ ] Clicking/tapping left or right zone navigates to previous or next story without exceeding boundaries.
- [ ] Left/Right Arrow keys navigate stories when focusing story controls or zones.
- [ ] Previous button disabled on story 1; Next button disabled on story 3.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Test touch hold pause, keyboard arrow keys, and boundary button states.

**Dependencies:** Task 3

**Files likely touched:**

- `src/ui/components/StoryFrame.tsx`
- `src/ui/components/StoryControls.tsx`

**Estimated scope:** Small (2 files)

---

### Checkpoint: Playback & Controls

- [ ] All tests pass: `pnpm run test`
- [ ] Application builds without errors: `pnpm run build`
- [ ] Manual & automatic story progression, touch pause, replay, and keyboard controls function correctly.

---

### Phase 3: Visual Styling, Responsive Layout & Accessibility

## Task 5: Apply Mamma Pizza! Palette and responsive Story Frame layout

**Description:** Refine `src/index.css` and `src/App.css` to match the exact palette variables (warm paper, deep olive, tomato red, charcoal text), portrait 9:16 frame proportions on desktop, horizontal scrollable category navigation bar, and full-screen layout on mobile viewports.

**Acceptance criteria:**

- [ ] CSS palette variables in `src/index.css` reflect warm paper background, deep olive structural elements, tomato red accents, and charcoal text.
- [ ] Story Frame maintains phone-like portrait aspect ratio on desktop and expands to fill mobile viewports without overflowing text or controls.
- [ ] Category navigation bar (`CategoryNav`) scrolls horizontally on narrow mobile screens without clipping category circles.
- [ ] Visible focus outlines appear on all interactive buttons for keyboard navigation.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Resize browser window from mobile width (375px) to desktop (1280px) and check visual layout & palette.

**Dependencies:** Task 4

**Files likely touched:**

- `src/index.css`
- `src/App.css`
- `src/ui/components/CategoryNav.tsx`

**Estimated scope:** Medium (3 files)

---

## Task 6: Expand Vitest test suite for full specification coverage

**Description:** Enhance `src/App.test.tsx` to verify all spec success criteria, including initial state, category switching, manual boundaries, timed 6s progression, playback pause/resume, touch hold pause, replay, and dynamic nutrition facts updating per active item.

**Acceptance criteria:**

- [ ] Tests cover initial render on Pizza Margherita with its specific nutrition facts (720 kcal, 28g protein, 82g carbs, 29g fat).
- [ ] Tests verify switching categories updates heading, price, ingredients, and nutrition facts dynamically.
- [ ] Tests verify multi-segment progress timer attributes and timed 6-second advances.
- [ ] Tests verify touch start/end pause behavior and replay button behavior on completion.
- [ ] Test execution runs cleanly with `pnpm run test` and `pnpm run lint`.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Linter passes: `pnpm run lint`

**Dependencies:** Task 5

**Files likely touched:**

- `src/App.test.tsx`

**Estimated scope:** Small (1 file)

---

### Checkpoint: Final Completion

- [ ] All tests pass: `pnpm run test`
- [ ] Linter clean: `pnpm run lint`
- [ ] Application builds without errors: `pnpm run build`
- [ ] All 13 spec success criteria met.

---

## Risks and Mitigations

| Risk                                                                          | Impact | Mitigation                                                                                                     |
| ----------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| Timer drift with `setInterval` during fake timer testing                      | Medium | Use 100ms interval step in `usePlayback` with explicit `elapsedRef` synchronization and fake timers in tests.  |
| Touch event listeners conflicting with click zone buttons on touch devices    | Low    | Use standard `onTouchStart`/`onTouchEnd` on container while preserving explicit `type="button"` zone overlays. |
| Visual clipping of long ingredient lists or nutrition facts on narrow screens | Medium | Use responsive flex/grid layouts with scrollable/wrapping containers inside fixed portrait frame.              |

## Open Questions

None. All product and technical requirements are fully specified in `docs/specs/mamma-pizza-menu-browser.md`.
