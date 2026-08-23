# 04: Timed Story playback

**What to build:** Add Instagram Stories-like automatic playback. Each Story has a six-second Progress Timer, advances automatically, pauses through temporary and explicit controls, and stops at the final Story while allowing replay.

**Blocked by:** 03: Manual Story browsing.

**Status:** ready-for-agent

- [ ] Progress Timer appears across the top of the Story Frame.
- [ ] Timer has one segment for each Story in the active Story Sequence.
- [ ] Completed, current, and future segments are visually distinguishable.
- [ ] Automatic progression begins on the first rendered Story.
- [ ] Story advances after six seconds when playback is active.
- [ ] Hovering over the Story Frame pauses temporary playback.
- [ ] Keyboard focus pauses temporary playback.
- [ ] Touch hold pauses temporary playback.
- [ ] Top-right circular Playback Control explicitly pauses and resumes playback.
- [ ] Temporary pauses do not override explicit pause state.
- [ ] Playback stops at the final Story instead of looping or changing Category.
- [ ] Playback Control remains available on the final Story and can replay the sequence.
- [ ] User-facing tests verify timer progression, temporary pauses, explicit pause/resume, final Story behavior, and replay.
