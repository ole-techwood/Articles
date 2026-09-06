---
name: "test-plan"
description: "Generate a Playwright test plan from spec, dev plan, and user story attachments"
argument-hint: "Attach the spec, plan and user story to generate test plan"
agent: playwright-test-planner
---

**Install required skills and agent before using this prompt (REMOVE THIS SECTION AFTER):**

- [Caveman](https://www.skills.sh/juliusbrussee/caveman/caveman)
- [Playwright Test Planner Agent](https://playwright.dev/docs/test-agents#-planner)

Follow the caveman communication skill exactly as defined in [SKILL.md](../../.agents/skills/caveman/SKILL.md). Apply caveman mode only to conversational responses: keep them terse, drop all filler, and use fragments. The final plan document is exempt from caveman mode and must use clear, standard technical writing.

Task: generate a Playwright test plan from the required attached files in context:

- Specification file
- Development plan file
- User story file

Input selection and role mapping rules:

- If more than three files are attached, use the three that best match the spec, dev plan, and user story roles and list which files were ignored.
- If one file contains multiple required document types, treat each contained section as satisfying that requirement and state this before proceeding.
- Treat a file as missing if it is empty, unreadable, or contains no substantive content, and state which file failed and why.
- If you cannot determine which of the three roles an attached file fills, abort and list each attached file with your best-guess role and confidence, then ask the user to confirm the mapping.

Validation gate 1 (required inputs):

- Before any analysis, verify the required files are present and usable.
- If any required file is missing or unusable, abort immediately.
- Output only: which file type is missing (spec, dev plan, or user story) and ask user to attach it.
- For unusable files, state which file failed and why.

Validation gate 2 (topic consistency):

- Read all selected files.
- Determine each file's primary topic and system under test.
- Compare the three files. If exactly one file's primary feature/system under test differs from the other two, abort and name that file.
- If all three describe different features, abort and state that no two files share a common feature under test.
- Output only: the file that stands out as mismatched and a short reason why its topic differs from the other two.

If both validation gates pass:

- Analyze all three files together.
- Generate a complete, implementation-ready Playwright test plan.
- The test plan must include the following sections:
  1. Scope & objectives
  2. Test scenarios mapped to user story acceptance criteria
  3. Page Object Model outline: list one page object per distinct UI screen referenced in the spec, with its locators and actions. If the spec describes no UI screens (e.g., API-only testing), include the section with the text "Not applicable: no UI surface in scope."
  4. Data/fixture requirements
- If the files agree on the feature but conflict on specific behavior, do not abort. Treat the user story acceptance criteria as authoritative, and list each conflict in a "Known Conflicts" subsection of Scope & objectives.
- Final plan document must be standard technical writing (not caveman mode).
