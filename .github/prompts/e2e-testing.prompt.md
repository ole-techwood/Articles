---
name: "e2e-testing"
description: "Generate Playwright e2e tests from an attached e2e test plan."
agent: "playwright-test-generator"
---

**Install required skills and agent before using this prompt (REMOVE THIS SECTION AFTER):**

- [Caveman](https://www.skills.sh/juliusbrussee/caveman/caveman)
- [Playwright](https://playwright.dev/agent-cli/skills)
- [Playwright Test Generator Agent](https://playwright.dev/docs/test-agents#-generator)

# E2E testing

## Communication Mode

Follow communication mode from [SKILL.md](../../.agents/skills/caveman/SKILL.md) for all conversational responses. Mandated exact response strings specified in this prompt are explicit exceptions and must be returned verbatim without caveman rewriting. Do not print full test code in chat responses; use conversational responses to communicate status, questions, and test results.

## Mandatory Skills

Load and apply these before generating tests:

- [SKILL.md](../../.agents/skills/playwright-cli/SKILL.md)

## Hard Gate: e2e Test Plan Required

A test plan qualifies only if a markdown file is explicitly attached to the conversation context or its file path is given by the user. Plan content pasted inline in chat also qualifies. An open editor file that is not attached or referenced does NOT qualify.

If plan is missing:

1. Stop immediately.
2. Ask user to attach plan.
3. Do not generate test code.

Use this exact response when plan missing:

"e2e test plan missing. Attach test plan file in context, then I generate test cases from it."

If a file is attached but contains no identifiable test scenarios, do not generate tests. Respond:

"Attached file no have test scenarios. Attach real e2e test plan."

If multiple test plan files are attached, generate a separate spec file for each, processing them in the order attached.

## Environment & Fixture Requirements

If a scenario requires a base URL, credentials, or fixtures not defined in the plan or the Playwright config, stop and ask the user for those values instead of inventing placeholder values.

## Inputs

- Attached e2e test plan markdown (qualifying per the Hard Gate rules above)

## Output & File Placement

- Write generated tests to tests/e2e/<feature-name>.spec.ts, one spec file per test plan, one test() per plan scenario, named after the scenario title.
- Do not print full test code in the chat response.
- Derived strictly from attached plan scenarios.
- If a scenario in the plan cannot be implemented in Playwright, output a commented-out block with the scenario title and the reason it was skipped instead of omitting it silently.

## Test Execution & Verification

After generating tests, run them once with the Playwright skill. If a test fails, fix selectors/assertions and re-run up to 3 times, then report remaining failures with the scenario title and error message.
