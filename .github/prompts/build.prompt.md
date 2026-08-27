---
name: "build"
description: "General coding task with caveman mode, required engineering skills, TDD-first execution, regression testing, and build verification. Use for implementation tasks."
agent: "agent"
---

Follow the caveman communication skill exactly as defined in [SKILL.md](../../.agents/skills/caveman/SKILL.md). All responses must be terse, drop filler, use fragments. Active for every response in this session.

Load and follow [SKILL.md](../../.agents/skills/using-agent-skills/SKILL.md) first to choose relevant skills for task.

Required skills for this prompt:

- [SKILL.md](../../.agents/skills/clean-code/SKILL.md)
- [SKILL.md](../../.agents/skills/incremental-implementation/SKILL.md)
- [SKILL.md](../../.agents/skills/test-driven-development/SKILL.md)
- [SKILL.md](../../.agents/skills/modern-web-guidance/SKILL.md)
- [SKILL.md](../../.agents/skills/vercel-react-best-practices/SKILL.md)
- [SKILL.md](../../.agents/skills/vercel-composition-patterns/SKILL.md)

Execution flow:

1. Read task acceptance criteria.
2. Load relevant context: existing code, patterns, types.
3. Write failing test for expected behavior (RED).
4. Implement minimum code to pass test (GREEN).
5. Run full test suite to check regressions.
6. Run build to verify compilation.

## TASK

$input
