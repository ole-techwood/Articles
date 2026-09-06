# Implementation Plan: Mamma Pizza Menu Browser

## Overview

Build the browse-only Menu Browser MVP for Mamma Pizza!, an imaginary Italian family trattoria, presented as an Instagram Stories-like browsing experience. The implementation builds on the existing React 19, TypeScript, Vite, and Tailwind CSS codebase. It provides static menu content across six categories (three stories per category), manual navigation, dynamic per-serving nutrition facts, and a mobile full-screen / desktop portrait Story Frame layout.

## Architecture Decisions

- **Package Manager**: `pnpm` (detected from `packageManager` in `package.json` and `pnpm-lock.yaml`).
- **Data Architecture**: Static typed menu dataset in `src/ui/lib/data.ts` containing six `Category` entries, each with three `Item` entries. Each `Item` defines explicit per-serving `Nutrition` data (calories, protein, carbohydrates, fat) rather than shared mock defaults.
- **State Engine**: Centralized in `usePlayback` custom hook. Manages active indices (`categoryIndex`, `storyIndex`) and per-Category boundary conditions.
- **Component Decomposition**: Presentation components (`CategoryNav`, `StoryFrame`, `StoryContent`, `PlaybackTimer`, `StoryControls`, `SiteHeader`) receive explicit props and callbacks without directly mutating state.
- **Visual & Layout Design**: CSS variables defined in `src/index.css` for the Mamma Pizza! palette (warm paper, deep olive, tomato red, charcoal text). Responsive layout in `src/App.css` enforces 9:16 portrait phone container on desktop and full-screen layout on mobile screens.

## Dependency Graph

```text
src/ui/lib/data.ts (Categories, Items, Nutrition data)
    │
    ├── src/ui/lib/usePlayback.ts (Story navigation state engine)
    │       │
    │       └── src/App.tsx (Main application container)
    │               │
    │               ├── src/ui/components/SiteHeader.tsx
    │               ├── src/ui/components/CategoryNav.tsx
    │               └── src/ui/components/StoryFrame.tsx
    │                       │
    │                       ├── src/ui/components/PlaybackTimer.tsx
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
- [ ] Completed stories show 100% filled segment bars; current story is marked active; pending stories show 0% filled.
- [ ] Accessible progress position semantics (`role="progressbar"`, `aria-valuenow`, `aria-valuemax`, `aria-label`) are preserved for screen readers.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Verify Progress Timer shows 3 distinct progress segments during manual navigation.

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

### Phase 2: Story Navigation & Interactive Controls

## Task 3: Refine usePlayback Hook and Story boundary behavior

**Description:** Ensure `src/ui/lib/usePlayback.ts` handles Category switches, manual Story navigation, and per-Category boundaries without advancing automatically or crossing into another Category.

**Acceptance criteria:**

- [ ] Category switching resets `storyIndex` to 0.
- [ ] Previous and next navigation remain within selected Category's three Stories.
- [ ] Boundary navigation preserves `categoryIndex`; reaching Story 1 or Story 3 never selects an adjacent Category.
- [ ] Story navigation never advances automatically or crosses into another Category.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Navigate through final Story, verify it remains visible until Reader navigates manually.

**Dependencies:** Task 2

**Files likely touched:**

- `src/ui/lib/usePlayback.ts`

**Estimated scope:** Small (2 files)

---

## Task 4: Complete StoryFrame touch zones, keyboard controls, and StoryControls

**Description:** Integrate left/right tap zone buttons, keyboard left/right arrow navigation, and explicit disabled states on `StoryControls` in `StoryFrame.tsx` and `StoryControls.tsx`.

**Acceptance criteria:**

- [ ] Clicking/tapping left or right zone navigates to previous or next story without exceeding boundaries or changing Category.
- [ ] Left/Right Arrow keys navigate stories when focusing story controls or zones.
- [ ] Previous button disabled on story 1; Next button disabled on story 3.

**Verification:**

- [ ] Tests pass: `pnpm run test`
- [ ] Build succeeds: `pnpm run build`
- [ ] Manual check: Test touch tap zones, keyboard arrow keys, and boundary button states.

**Dependencies:** Task 3

**Files likely touched:**

- `src/ui/components/StoryFrame.tsx`
- `src/ui/components/StoryControls.tsx`

**Estimated scope:** Small (2 files)

---

### Checkpoint: Story Navigation & Controls

- [ ] All tests pass: `pnpm run test`
- [ ] Application builds without errors: `pnpm run build`
- [ ] Manual Story navigation, boundary protection, and keyboard controls function correctly.

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

**Description:** Enhance `src/App.test.tsx` to verify all spec success criteria, including initial state, Category switching, manual boundaries, keyboard/touch navigation, and dynamic Nutrition Facts updating per active item.

**Acceptance criteria:**

- [ ] Tests cover initial render on Pizza Margherita with its specific nutrition facts (720 kcal, 28g protein, 82g carbs, 29g fat).
- [ ] Tests verify switching categories updates heading, price, ingredients, and nutrition facts dynamically.
- [ ] Tests verify multi-segment Progress Timer attributes and manual navigation updates.
- [ ] Tests verify tap-zone, keyboard, and boundary behavior.
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
- [ ] All 11 spec success criteria met.

---

## Risks and Mitigations

| Risk                                                                          | Impact | Mitigation                                                                                        |
| ----------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| Visual clipping of long ingredient lists or nutrition facts on narrow screens | Medium | Use responsive flex/grid layouts with scrollable/wrapping containers inside fixed portrait frame. |

## Open Questions

None. All product and technical requirements are fully specified in `docs/specs/mamma-pizza-menu-browser.md`.
