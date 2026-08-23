# Mamma Pizza! Menu Browser

Triage: ready-for-agent

## Problem Statement

The article "Practical Spec Driven Development from Frontend Engineers" needs a small, concrete frontend demo that shows how a product idea can become a precise, testable user experience. The current project is still the default Vite starter, so readers and colleagues cannot explore the imagined Mamma Pizza! menu or observe the specified interaction states.

The demo is for the article author, a small number of readers, and colleagues from the author's organization. It is not a real restaurant product and does not need customers, ordering, payment, accounts, staff workflows, or a backend. The experience should make browsing a fictional rustic family trattoria menu feel immediate and recognizable through an Instagram Stories-like interaction.

## Solution

Build a static, English-only React Menu Browser for the imaginary Italian family trattoria Mamma Pizza!. The Menu Browser opens on the Pizza Category with Margherita as the Featured Dish and presents each Menu Item as a text-led Story.

Readers can choose a Category through circular emoji Story Circles, then browse its three-Story Story Sequence. On desktop, the Story Frame is a centered phone-like portrait frame. On mobile, it fills the viewport. Each Story has a Progress Timer across the top, a small circular Playback Control in the top-right corner, a prominent Menu Item title, description, ingredients, price, and per-serving Nutrition Facts.

The Story Sequence advances after six seconds by default, supports manual navigation, pauses for hover, keyboard focus, or touch hold, and stops at the final Story. Reduced-motion Readers receive instant state changes without animated transitions. The implementation uses React, Bun, Vite, and shadcn components with local data and no external service dependency.

## User Stories

1. As a Reader, I want the Menu Browser to open directly on Mamma Pizza!, so that the demo feels like a finished restaurant experience rather than a development scaffold.
2. As a Reader, I want to see the Pizza Category first, so that I can begin with the restaurant's most recognizable menu category.
3. As a Reader, I want Margherita to be the first Story, so that the opening experience has a clear Featured Dish.
4. As a Reader, I want the restaurant name to remain visible while I browse, so that I always know which menu I am exploring.
5. As a Reader, I want the active Category to be visible near the Story Frame, so that I understand the context of the current Story Sequence.
6. As a Reader, I want to see the six Categories Pizza, Antipasti, Pasta, Insalate, Dolci, and Drinks, so that I can explore the complete fictional menu.
7. As a Reader, I want each Category represented by a circular emoji Story Circle, so that Category Navigation feels familiar to Instagram Stories.
8. As a Reader, I want each Story Circle to have a visible English Category label, so that emoji recognition is not required to understand the navigation.
9. As a Reader, I want the selected Story Circle to have a clear active state, so that I can identify the current Category immediately.
10. As a Reader, I want Category Navigation to appear above the Story Frame, so that it does not cover the Menu Item content.
11. As a Reader, I want to select any Story Circle with a pointer, so that I can move directly to a Category.
12. As a Reader, I want to select any Story Circle with a keyboard, so that Category Navigation does not depend on a pointer or touchscreen.
13. As a Reader, I want switching Categories to open that Category's first Story, so that each Category starts predictably.
14. As a Reader, I want switching Categories to reset the Progress Timer, so that the newly selected Story receives its full viewing time.
15. As a Reader, I want switching Categories to resume automatic progression, so that playback behaves consistently after navigation.
16. As a Reader, I want each Category to contain three Stories, so that every Category has enough content to demonstrate sequence behavior without becoming tedious.
17. As a Reader, I want each Story to represent one Menu Item, so that the Story content maps directly to a recognizable menu concept.
18. As a Reader, I want the Menu Item title to be the dominant text on a Story, so that I can identify the dish quickly.
19. As a Reader, I want to read a concise description of the Menu Item, so that I understand what makes the dish distinctive.
20. As a Reader, I want to see the ingredients for the Menu Item, so that I can understand its composition.
21. As a Reader, I want the ingredients to be presented in English, so that the whole interface remains consistent.
22. As a Reader, I want to see a euro price on every Menu Item Story, so that the fictional menu feels complete.
23. As a Reader, I want the price anchored near the Menu Item title, so that it is easy to scan.
24. As a Reader, I want to see Nutrition Facts for every Menu Item, so that the demo includes useful menu information beyond marketing copy.
25. As a Reader, I want Nutrition Facts shown per serving, so that the values have a consistent meaning.
26. As a Reader, I want to see calories, protein, carbohydrates, and fat, so that the Nutrition Facts remain useful but compact.
27. As a Reader, I want Nutrition Facts presented as informational menu data, so that they are not mistaken for ordering, medical, or dietary workflows.
28. As a Reader, I want the fictional menu data to include all six Categories, so that no navigation option leads to missing content.
29. As a Reader, I want fictional menu data to use plausible Italian dish names, so that the trattoria setting feels credible.
30. As a Reader, I want the menu copy to use a warm rustic Trattoria Voice, so that the experience feels like a family restaurant.
31. As a Reader, I want the Story Frame to look like a portrait phone experience on desktop, so that the Instagram Stories interaction is immediately recognizable.
32. As a Reader, I want the Story Frame to be centered and visually bounded on desktop, so that the content remains comfortable to read on a wide display.
33. As a Reader, I want the Story Frame to fill the available screen on mobile, so that the experience uses the device naturally.
34. As a Reader, I want the Story Frame content to remain readable on small screens, so that long dish names, ingredients, and Nutrition Facts do not overlap.
35. As a Reader, I want the Story Frame to preserve stable dimensions while Stories change, so that navigation does not cause layout shifts.
36. As a Reader, I want a Progress Timer at the top of the Story Frame, so that I can see both my position and automatic progression.
37. As a Reader, I want one timer segment per Story in the current Story Sequence, so that the sequence length is immediately visible.
38. As a Reader, I want the current timer segment to show elapsed progress, so that I know when automatic navigation will occur.
39. As a Reader, I want completed timer segments to remain visibly completed, so that I can understand where I am in the sequence.
40. As a Reader, I want future timer segments to remain visibly incomplete, so that I can distinguish them from completed Stories.
41. As a Reader, I want automatic progression to start after the first Story renders, so that the demo demonstrates the Stories behavior without requiring setup.
42. As a Reader, I want each Story to remain active for six seconds, so that I have enough time to read the text.
43. As a Reader, I want automatic progression to move to the next Story after six seconds, so that I can passively browse the Category.
44. As a Reader, I want the timer to pause when I hover over the Story Frame, so that I can read without racing the timer.
45. As a Reader, I want the timer to pause while a control has keyboard focus, so that keyboard interaction does not advance unexpectedly.
46. As a Reader, I want the timer to pause while I hold a touch interaction, so that mobile reading and gestures are not interrupted.
47. As a Reader, I want a small circular Playback Control in the top-right corner, so that I can pause or resume automatic progression without obscuring the Story.
48. As a Reader, I want the Playback Control to expose whether playback is active or paused, so that its state is understandable to assistive technology.
49. As a Reader, I want the Playback Control to be available on the final Story, so that I can replay the current Story Sequence.
50. As a Reader, I want automatic progression to stop at the final Story, so that reaching the end does not unexpectedly return me to the beginning.
51. As a Reader, I want to move to the previous Story with an explicit control, so that I can reread content.
52. As a Reader, I want to move to the next Story with an explicit control, so that I can browse at my own pace.
53. As a Reader, I want the left and right areas of the Story Frame to act as navigation zones, so that the interaction feels like familiar Stories browsing.
54. As a Reader, I want navigation zones to have accessible names or equivalent semantic controls, so that the interaction is available to non-pointer users.
55. As a Reader, I want keyboard arrow keys to move between Stories, so that I can browse efficiently without a pointer.
56. As a Reader, I want manual navigation to reset the Progress Timer, so that the newly selected Story receives a full reading interval.
57. As a Reader, I want the previous control disabled or clearly bounded at the first Story, so that navigation never produces an invalid state.
58. As a Reader, I want the next control to reflect that the sequence has ended at the final Story, so that I understand why automatic playback stopped.
59. As a Reader, I want to switch Categories after reaching the final Story, so that the end of one sequence does not end the entire Menu Browser.
60. As a Reader, I want reduced-motion preferences to remove animated transitions, so that the experience respects my system preference.
61. As a Reader, I want the Progress Timer to remain useful with reduced motion, so that playback behavior remains available without animated scene changes.
62. As a Reader, I want to browse manually even when automatic playback is paused, so that pausing does not remove access to the menu.
63. As a Reader, I want semantic buttons and clear focus indicators, so that I can understand and operate the Menu Browser with a keyboard or assistive technology.
64. As a Reader, I want meaningful accessible names for Category Navigation, playback, and Story navigation, so that controls remain understandable without visual context.
65. As a Reader, I want text and controls to maintain sufficient contrast, so that the rustic palette remains readable.
66. As a Reader, I want the app to work without a network connection after it loads, so that the demo does not depend on remote images or services.
67. As a Reader, I want no images required to understand a Menu Item Story, so that the text-led demo remains complete and intentional.
68. As a Reader, I want the interface to use only a restrained palette, so that the experience feels clean and professional.
69. As a Reader, I want warm paper to dominate the visual surface, so that the app has a tactile trattoria atmosphere.
70. As a Reader, I want deep olive to define structural areas, so that the interface has a stable secondary color.
71. As a Reader, I want tomato red used as an accent, so that important active states and actions are easy to notice.
72. As a Reader, I want charcoal used for readable text, so that the palette maintains strong contrast.
73. As a Reader, I want the visual proportions to follow the 60-30-10 color rule, so that the three-color palette stays balanced.
74. As a Reader, I want the app to feel like Mamma Pizza! rather than an article about software development, so that the demo communicates through the experience itself.
75. As a Reader, I want the experience to load into the Menu Browser directly, so that there is no unrelated landing page or explanatory detour.

## Implementation Decisions

- Use React 19 with TypeScript as the frontend framework.
- Use Bun as the runtime and package manager for local development and scripts.
- Use Vite as the development server and production bundler.
- Use shadcn/ui primitives where they provide a suitable accessible control, with local styling for the Story Frame and Story Circles.
- Keep the application as a single-page static experience with local in-memory menu data.
- Do not add routing, a backend, persistence, authentication, ordering, payment, customer, or staff modules.
- Model the domain around `Menu Browser`, `Category`, `Story Sequence`, `Story`, `Story Frame`, `Menu Item`, `Featured Dish`, `Progress Timer`, `Playback Control`, `Story Circle`, and `Nutrition Facts`.
- Represent six Categories in this order: Pizza, Antipasti, Pasta, Insalate, Dolci, and Drinks.
- Represent three Menu Items per Category, with each Menu Item rendered as one Story.
- Open the Menu Browser on the Pizza Category and Margherita as the Featured Dish.
- Use English for all visible interface labels, descriptions, ingredients, and nutrition labels. Italian dish names are allowed as proper menu names.
- Include fictional Menu Item names, descriptions, ingredients, euro prices, and illustrative per-serving Nutrition Facts.
- Keep each Story text-led: title, description, ingredients, price, and Nutrition Facts. Do not require images or remote media.
- Present Category Navigation as emoji-based circular Story Circles with English labels, above the Story Frame. Use a clear active state and make the navigation horizontally usable on narrow screens.
- Keep the Mamma Pizza! wordmark and active Category visible as persistent Story Frame context.
- Use a centered phone-like portrait Story Frame on desktop and a full-viewport Story Frame on mobile.
- Put the Progress Timer across the top edge of the Story Frame, with one segment per Story in the active Story Sequence.
- Put the small circular Playback Control in the top-right corner of the Story Frame.
- Start automatic progression on the first rendered Story with a six-second interval.
- Pause automatic progression on Story Frame hover, keyboard focus, and touch hold. Resume when those temporary pauses end unless the Reader explicitly paused playback.
- Make manual Story navigation available through left and right Story Frame zones, explicit previous and next controls, and keyboard arrow keys.
- Reset the Progress Timer after manual Story navigation and Category changes.
- Start a changed Category at its first Story and resume automatic progression.
- Stop automatic progression at the final Story instead of looping or changing Category automatically.
- Keep Playback Control available on the final Story so the Reader can replay that Story Sequence.
- Use instant state changes when the Reader prefers reduced motion, while retaining timer and manual browsing behavior.
- Use a 60-30-10 Palette: warm paper as the dominant background, deep olive as the secondary structural color, and tomato red as the accent; use charcoal for readable text.
- Ensure responsive text sizing and stable Story Frame dimensions prevent title, ingredients, prices, Nutrition Facts, and controls from overlapping.
- Ensure controls have semantic roles, accessible names, visible focus states, and state announcements appropriate to their behavior.

## Testing Decisions

- Tests should verify external Reader-visible behavior rather than component internals, CSS selectors, timer implementation details, or specific state-management mechanisms.
- Use the highest available seam: render the Menu Browser with its local menu data and interact with it as a Reader.
- The primary test surface should cover initial rendering, Category Navigation, Story navigation, Progress Timer behavior, Playback Control behavior, sequence boundaries, responsive rendering assumptions, reduced-motion behavior, and accessible control semantics.
- Verify that the initial Category is Pizza and the initial Featured Dish is Margherita.
- Verify that every Category exposes exactly three Stories and that switching Categories starts at the selected Category's first Story.
- Verify that manual navigation advances and reverses Stories, resets progression for the selected Story, and does not move beyond sequence boundaries.
- Verify that automatic progression advances after six seconds, pauses for explicit playback pause, resumes when requested, and stops on the final Story.
- Verify that temporary hover, focus, and touch pauses do not override the Reader's explicit pause state.
- Verify that the Progress Timer represents completed, current, and future Stories from observable accessibility or rendered state.
- Verify that keyboard navigation and semantic control names provide equivalent access to pointer interactions.
- Verify that reduced-motion preferences remove animated transitions while preserving navigation and playback behavior.
- Verify that all Menu Items expose title, description, ingredients, euro price, and the four Nutrition Facts values.
- Verify that the Story Frame and controls remain usable at desktop and mobile viewport sizes without content overlap.
- Verify sufficient color contrast for primary text, active controls, inactive controls, and the Progress Timer.
- No prior test suite or comparable test seam exists in this repository, so tests should establish a focused user-facing pattern for this feature rather than copy prior art.

## Out of Scope

- Real restaurant operations or branding.
- Customer accounts, authentication, profiles, or personalization.
- Ordering, basket, checkout, payment, delivery, reservations, or staff workflows.
- Backend services, databases, APIs, CMS integration, or remote menu data.
- Image uploads, food photography, remote images, video, or audio.
- Search, filtering, dietary preference configuration, allergen workflows, or medical nutrition advice.
- Multiple languages or translation controls.
- Routing, deep links, browser history for Categories, or shareable Story URLs.
- Analytics, telemetry, social posting, comments, reactions, likes, or follows.
- Persisting playback position or user preferences between sessions.
- An article explanation, product tour, marketing landing page, or visible spec-driven-development commentary inside the app.
- Automatic movement from the final Story of one Category to another Category.
- Infinite looping of Story Sequences.
- Custom admin tools for editing Categories or Menu Items.

## Further Notes

- The source glossary is maintained in `CONTEXT.md`; new implementation language should follow its canonical terms.
- Menu data is fictional and illustrative. Nutrition Facts are presented as menu information for the demo, not as verified health or dietary guidance.
- The single highest test seam keeps the feature spec focused on what a Reader can observe while leaving component boundaries and timer mechanics changeable.
- The demo should remain visually intentional without relying on images: typography, spacing, color balance, emojis, and text hierarchy carry the restaurant identity.
