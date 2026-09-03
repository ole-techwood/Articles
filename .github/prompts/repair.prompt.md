---
name: "repair"
description: "Debug and fix failing tests, incorrect logic behavior, and browser/runtime bugs with evidence-first workflow and regression safety checks."
argument-hint: "Describe issue, failing test, error logs, and relevant files"
agent: "agent"
---

**Install required skills before using this prompt (REMOVE THIS SECTION AFTER):**

- [Browser Testing with DevTools](https://www.skills.sh/addyosmani/agent-skills/browser-testing-with-devtools/)

# Repair

Follow communication mode in [SKILL.md](../../.agents/skills/caveman/SKILL.md) for every response.

Before any diagnosis or fix, load and follow these skills in order:

1. [SKILL.md](../../.agents/skills/browser-testing-with-devtools/SKILL.md)
2. [SKILL.md](../../.agents/skills/debugging-and-error-recovery/SKILL.md)

Use this prompt for:

- Failing unit/integration/e2e tests
- Logic not working as expected
- Browser UI/runtime bugs (DOM, console, network, rendering, interaction)
- Regressions introduced by recent changes

## Inputs

Use available context from:

- `$input`
- Current errors from editor/test output
- Relevant files and recent diffs
- Browser/runtime evidence when issue is UI/client-side

If any of the following are missing and cannot be inferred — error message, reproduction steps, or affected file paths — ask for them before proceeding. Do not ask for anything else.

## Execution Contract

Follow this process exactly.

First, classify the task:

- If `$input` describes new functionality with no existing code, use TDD.
- If `$input` describes a bug in working code, use Prove-It.
- If `$input` describes a failing test where the code behavior is correct, use the test-fix workflow.

State your classification before proceeding. If the input could fit more than one category, use this precedence: test-fix workflow only when the code behavior is confirmed correct; otherwise use Prove-It for existing code, and TDD only for new functionality with no existing code.

### For new features (TDD)

1. Write tests that describe expected behavior (must fail first).
2. Implement code to make tests pass.
3. Refactor while keeping tests green.

### For bug fixes (Prove-It pattern)

1. Write test that reproduces bug (must fail).
2. Confirm test fails.
3. Implement fix.
4. Confirm test passes.
5. Run full relevant test suite for regressions.

### For unit/integration/e2e test fixes

1. Fix the tests; do not modify business logic in this workflow by default.
2. If the root cause appears to be in business logic, STOP and ask the user for explicit permission before changing it.
3. Do not modify business logic for a test-fix task without that explicit approval.

## Browser Bug Requirements

When issue involves browser behavior:

- Reproduce in integrated browser/devtools.
- Capture evidence: console errors, network failures, DOM state, and interaction steps.
- Confirm fix in browser after code/test updates.

## Output Requirements

For each debug task, provide:

1. Root cause summary.
2. Proof of failure before fix (test/browser evidence).
3. Exact changes made.
4. Proof after fix (passing repro test + regression run).
5. Any remaining risks or follow-up checks.

## Guardrails

- Prefer smallest safe fix.
- Avoid speculative changes without reproduction.
- Keep behavior unchanged outside targeted bug/scope.
- If destructive/irreversible action needed, ask first.

## Task

$input
