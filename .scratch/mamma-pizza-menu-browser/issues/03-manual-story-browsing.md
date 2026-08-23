# 03: Manual Story browsing

**What to build:** Let Readers browse each Category's three-Story Story Sequence manually. Support explicit previous and next controls, left and right Story Frame navigation zones, and keyboard arrow keys while keeping sequence boundaries valid.

**Blocked by:** 01: Menu Browser foundation.

**Status:** ready-for-agent

- [ ] Each Category exposes three Menu Item Stories in stable order.
- [ ] Next control advances to the next Story.
- [ ] Previous control returns to the previous Story.
- [ ] Left and right Story Frame navigation zones provide equivalent navigation.
- [ ] Arrow keys provide equivalent navigation.
- [ ] Previous navigation cannot move before the first Story.
- [ ] Next navigation cannot move beyond the final Story.
- [ ] Manual navigation resets the Progress Timer for the selected Story.
- [ ] Navigation controls have semantic roles, accessible names, and visible focus states.
- [ ] User-facing tests verify forward navigation, backward navigation, boundaries, timer reset, and keyboard access.
