# Specification: Mamma Pizza Menu Browser

## Agreements

1. This is a client-side web experience built in the existing React and Vite repository.
2. The current repository is the implementation baseline: React 19, TypeScript, Vite, Vitest, Testing Library, Oxlint, Tailwind CSS, and the existing component structure remain in use.
3. Menu content is static and bundled with the application. No API, database, CMS, authentication, or server-side state is required.
4. Each Category contains exactly three ordered Stories. Each Story presents one Menu Item.
5. Automatic playback lasts six seconds per Story. Playback stops on the final Story rather than looping automatically.
6. Prices are displayed in euros, and the approved Nutrition Facts are informational values per serving. Displayed Nutrition Facts update dynamically from the active Menu Item.
7. Modern desktop and mobile browsers are the supported targets. No native mobile application or legacy-browser compatibility is required.
8. The visual direction is defined by the Palette and Trattoria Voice in `CONTEXT.md`; no external brand assets are required for the MVP.

## Objective

Build a browse-only Menu Browser for the article **Practical Spec Driven Development from Frontend Engineers**. The experience presents Mamma Pizza!, an imaginary Italian family trattoria, through an Instagram Stories-like browsing flow.

The primary user is a Reader who wants to explore the menu quickly and enjoyably. The experience succeeds when a Reader can open the demo, understand the featured dish immediately, browse every Category and Menu Item, control Story playback, and use the experience comfortably on desktop and mobile without entering an ordering workflow.

### User outcomes

- A Reader opens directly on Pizza and sees Margherita as the Featured Dish.
- A Reader chooses a Category through a labeled Story Circle.
- A Reader moves backward and forward through a Category's Story Sequence.
- A Reader lets Stories advance automatically or pauses and resumes playback.
- A Reader can replay a completed Story Sequence.
- A Reader can inspect each Menu Item's name, description, ingredients, price, and Nutrition Facts.

## Scope

### In scope

- Single-page Menu Browser.
- Six Categories: Pizza, Antipasti, Pasta, Insalate, Dolci, and Drinks.
- Category Navigation displayed as circular Story Circles with an emoji and Category label.
- One Story Sequence per Category, with three ordered Stories per sequence.
- Story Frame presented as a portrait, phone-like frame on desktop and a full-screen experience on mobile.
- Featured Dish initial state: Pizza Category, first Story, Margherita.
- Manual previous and next Story navigation.
- Automatic progression through the current Story Sequence.
- Six-second Progress Timer duration for each Story.
- Playback Control in the upper-right corner of the Story Frame.
- Temporary playback pause while touch is held on the Story Frame.
- Replay from the final Story.
- Menu Item presentation with name, description, ingredients, euro price, and dynamically rendered per-serving Nutrition Facts for calories, protein, carbohydrates, and fat.
- Approved static sample Menu Items and Nutrition Facts as final article-demo content.
- Warm paper, deep olive, tomato red, and charcoal Palette.
- Rustic, warm, family-oriented Trattoria Voice.
- Keyboard-accessible controls and meaningful accessible names.
- Automated component or application tests for core browsing and playback behavior.

### Out of scope

- Customer accounts, sign-in, or profiles.
- Ordering, cart, checkout, payment, reservations, or delivery.
- Staff workflows, menu administration, inventory, or reporting.
- Backend services, database persistence, or remote menu loading.
- Dietary, medical, allergen, or health workflows beyond displaying the defined Nutrition Facts.
- Search, filtering, favorites, reviews, sharing, analytics, or notifications.
- Automatic looping from the final Story.
- A separate marketing landing page or promotional offer system.

### Delivery phase

This specification defines the complete MVP. Implementation should preserve the existing repository structure and can be delivered as one vertical slice: data model, playback state, Story Frame, Category Navigation, responsive styling, and tests.

## Architecture and Design

### Technology

- React 19 with TypeScript.
- Vite for development and production builds.
- Vitest with Testing Library and `jsdom` for automated tests.
- Oxlint for linting.
- Existing Tailwind and shadcn-compatible setup may remain available, but components should follow the repository's existing local patterns.
- `lucide-react` should provide familiar interface icons where an icon is needed.
- Static menu data remains local to the application.

### Component responsibilities

- `App`: Composes the Menu Browser and connects playback state to navigation and presentation.
- `SiteHeader`: Presents the Mamma Pizza! identity and concise introductory framing.
- `CategoryNav`: Renders all Category Story Circles, exposes the active Category, and selects a Category.
- `StoryFrame`: Owns the portrait presentation area and composes timer, playback, Story content, and navigation controls.
- `StoryContent`: Displays the current Menu Item and dynamically reads its Nutrition Facts for presentation.
- `PlaybackTimer`: Displays one progress segment per Story and exposes progress semantics to assistive technology.
- `PlaybackToggle`: Pauses, resumes, or replays automatic progression through one circular control.
- `StoryControls`: Provides explicit previous and next Story controls and current position.
- `usePlayback`: Owns Category and Story indices, elapsed playback time, playing state, temporary touch pause state, boundary behavior, Category selection, and replay behavior.
- `data`: Defines the typed Nutrition, Menu Item, and Category data model and the six static Categories.

### Domain model

- `Category` has a name, emoji, and ordered list of Menu Items.
- `Menu Item` has a name, description, ingredients, euro price, and Nutrition Facts.
- `Nutrition Facts` has calories, protein, carbohydrates, and fat values per serving.
- Nutrition Facts remain bundled in local data but are selected from the active Menu Item at render time; they must not be hardcoded as one shared display value.
- Story order is the order of Menu Items in its Category's list.
- The active state consists of `categoryIndex`, `storyIndex`, `elapsed`, `playing`, and temporary touch-pause state.

### State transitions

- Initial state: first Category, first Story, elapsed time zero, playback active.
- Selecting a Category: activate selected Category, reset to its first Story, reset elapsed time, resume playback.
- Next or previous navigation: move one Story within bounds, reset elapsed time, resume playback.
- Previous at first Story: remain on first Story and do not underflow.
- Next at final Story: remain on final Story; when automatic playback reaches its duration, stop playback.
- Playback pause: freeze elapsed time and current Story.
- Playback resume: continue current Story from its existing elapsed time.
- Touch hold: temporarily freeze automatic playback; release resumes it if playback was active.
- Replay at final Story: reset to first Story, reset elapsed time, and resume playback.
- The Progress Timer must reflect the active Story, completed Stories, and current elapsed progress.

### Layout and visual design

- Desktop Story Frame: centered portrait frame with stable 9:16 proportions, phone-like dimensions, and a restrained border treatment.
- Mobile Story Frame: fills the available screen width and height while preserving the portrait browsing experience.
- Category Navigation remains discoverable above the Story Frame and supports horizontal overflow on narrow screens.
- Controls must remain visible, stable, and usable across supported viewport sizes.
- Use the Palette as defined in `CONTEXT.md`: warm paper as dominant, deep olive as structural, tomato red as accent, and charcoal for readable text.
- Use typography with a clear editorial/trattoria character while preserving readable body text and accessible contrast.
- Do not introduce cards, ordering affordances, or decorative UI that changes the browse-only nature of the product.

### Accessibility and interaction

- Category Story Circles and all playback/navigation controls are native buttons with visible focus states.
- Every Story Frame exposes its Category and current position through an accessible region name.
- The Playback Control exposes pause, play, and replay labels that match its current action.
- Progress Timer exposes progress semantics without relying on visual color or animation alone.
- Manual navigation is possible with pointer, keyboard, and touch interactions.
- Touch interactions must not permanently pause playback after touch release.
- Text must remain readable and controls must not overlap content at supported viewport sizes.

## Commands and Operations

Run commands from repository root with `pnpm`.

```text
Install dependencies: pnpm install
Start development server: pnpm run dev
Build production bundle: pnpm run build
Run linter: pnpm run lint
Preview production build: pnpm run preview
Run tests: pnpm test
```

A completed change must pass `pnpm run build`, `pnpm run lint`, and `pnpm test`. The development server is used for responsive and interaction checks in a browser.

## Project Structure

```text
src/
  App.tsx                         Application composition
  App.css                         Menu Browser layout and visual styles
  index.css                       Global styles and Palette variables
  ui/
    components/                   Menu Browser presentation components
      CategoryNav.tsx
      PlaybackTimer.tsx
      PlaybackToggle.tsx
      SiteHeader.tsx
      StoryContent.tsx
      StoryControls.tsx
      StoryFrame.tsx
    lib/
      data.ts                     Static Categories and typed Menu Items
      usePlayback.ts               Playback state and transitions
      utils.ts                     Shared UI utilities
  App.test.tsx                    Application behavior tests

docs/
  specs/                          Reviewable product and technical specifications
```

## Code Style and Conventions

- Use TypeScript types for domain data and component props.
- Use PascalCase for React component files and component names.
- Use camelCase for state, functions, and local values.
- Keep domain state transitions in `usePlayback`; presentation components receive explicit props and callbacks.
- Prefer native semantic HTML and existing UI primitives over custom interaction implementations.
- Preserve readonly prop contracts where the existing code uses them.
- Use double quotes, trailing commas, and repository formatter conventions.
- Keep comments rare and limited to non-obvious behavior.
- Avoid one-letter variable names and avoid terminology excluded by `CONTEXT.md` when referring to domain concepts. Use `Story`, `Story Sequence`, `Story Frame`, `Story Circle`, `Category`, and `Menu Item` consistently.
- Keep static menu content separate from rendering logic.
- Do not add dependencies unless the need is documented and approved.

## Testing Strategy

### Unit and application behavior tests

Use Vitest, Testing Library, and `jsdom` for behavior visible to the Reader. Tests should verify:

- Initial render opens on Pizza with Margherita as Featured Dish.
- All six Category Story Circles are available and selecting one starts its first Story.
- Manual next and previous navigation changes Stories and respects both sequence boundaries.
- Automatic playback advances exactly after six seconds per Story.
- Automatic playback stops on the final Story and exposes completed progress.
- Playback Control pauses and resumes without resetting current progress.
- Replay from the final Story starts the sequence at its first Story.
- Touch hold pauses automatic progression and touch release allows active playback to continue.
- Required Menu Item fields and the active Menu Item's Nutrition Facts are rendered for the active Story.
- Changing Story or Category updates the displayed Nutrition Facts to match the newly active Menu Item without requiring a page reload.

Use fake timers for time-based behavior. Prefer accessible queries by role and name. Tests should assert observable behavior rather than implementation details such as internal hook state.

### Manual responsive and accessibility checks

Before approval, verify in a modern browser at desktop and narrow mobile viewport sizes:

- Story Frame proportions and mobile full-screen behavior remain stable.
- Category Navigation can reach every Category on narrow screens.
- Text, price, Nutrition Facts, and controls do not overlap or overflow.
- Focus indicators are visible for keyboard users.
- Playback and navigation controls have clear accessible names.
- Touch hold and release behavior works on a touch-capable device or browser emulation.

## Boundaries

### Always do

- Preserve browse-only behavior.
- Keep Margherita as initial Featured Dish.
- Keep six named Categories and three ordered Stories per Category.
- Keep the approved static sample Menu Items and Nutrition Facts as final article-demo content while rendering Nutrition Facts dynamically from the active Menu Item.
- Use typed static data and explicit playback transitions.
- Keep playback controls and Category Navigation accessible.
- Run build, lint, and tests before approval.
- Use Mamma Pizza! terminology and Trattoria Voice consistently.

### Ask first

- Adding a backend, API, database, CMS, authentication, or persistence.
- Adding ordering, payment, reservation, account, staff, or analytics workflows.
- Changing the six-second playback duration or final-Story stopping behavior.
- Changing Category names, Story count, Menu Item fields, or Nutrition Facts shape.
- Adding a dependency, changing the build tool, or changing CI configuration.
- Introducing external images, fonts, brand assets, or licensing obligations.
- Changing the Palette or the mobile/desktop Story Frame interaction model.

### Never do

- Turn the Menu Browser into an ordering app or restaurant management system.
- Add customer accounts, payment collection, checkout, or staff workflows.
- Present Nutrition Facts as medical advice, dietary certification, or allergen guarantees.
- Automatically loop the Story Sequence after its final Story.
- Remove or weaken keyboard, screen-reader, or touch accessibility to simplify the UI.
- Commit secrets or unrelated generated files.
- Remove failing tests without approval.
- Use excluded domain terms such as `post`, `slide`, `page`, `feed`, `carousel`, or `playlist` for the defined concepts.

## Success Criteria

The specification is fulfilled when all conditions below are true:

1. The application opens on Pizza, Story 1 of 3, showing Margherita, its description, ingredients, euro price, and Margherita's per-serving Nutrition Facts.
2. Reader can select each of six Categories through labeled Story Circles; each selection starts that Category's first Story.
3. Every Category exposes exactly three ordered Stories, and manual navigation cannot move before Story 1 or after Story 3.
4. With playback active, each Story remains active for six seconds before advancing; final Story remains visible and playback stops at completion.
5. Playback Control pauses and resumes automatic progression, preserving current Story and elapsed progress; on the final Story it replays from Story 1.
6. Holding touch on Story Frame pauses automatic progression for duration of hold and releasing touch restores the prior active playback behavior.
7. Progress Timer communicates completed, active, and pending Story positions visually and semantically.
8. Story Frame is portrait and phone-like on desktop, fills the mobile experience, and keeps content and controls within bounds.
9. Automated tests cover initial state, Category selection, manual boundaries, timed progression, pause/resume, replay, touch pause, and required content.
10. Changing the active Story or Category updates calories, protein, carbohydrates, and fat from the newly active Menu Item's Nutrition Facts.
11. The approved static sample Menu Items and Nutrition Facts remain unchanged as article-demo content.
12. `pnpm run build`, `pnpm run lint`, and `pnpm test` pass.
13. No in-scope interaction exposes ordering, payment, account, staff, or health workflows.

## Open Questions

No product-blocking questions remain. The approved sample content is final for the article demo; Nutrition Facts must be rendered dynamically from whichever Menu Item is active.
