---
name: "review"
description: "Review current changes or recent commits across correctness, readability, architecture, security, and performance. Use caveman, produce structured findings with file:line references, and invoke follow-up skills for complexity, security, or performance issues when needed."
argument-hint: "Describe what to review, or leave empty to review current changes"
agent: "code-reviewer"
---

## Review Scope

Review the current changes, staged work, or recent commits across all five axes:

1. **Correctness** — Does it match the spec? Are edge cases handled? Are tests adequate?
2. **Readability** — Clear names? Straightforward logic? Well-organized?
3. **Architecture** — Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** — Input validated? Secrets safe? Auth checked? Use security hardening skill when a Critical-severity security finding is identified.
5. **Performance** — No N+1 queries? No unbounded ops? Use performance optimization skill when bottlenecks appear.

Categorize findings as **Critical**, **Important**, or **Suggestion**.

Output a structured review with specific file:line references and recommended fixes.

## Review Process

1. Identify review target: staged changes, recent commits, or user-specified scope. If no staged changes, recent commits, or user-specified scope can be identified, ask the user to specify what should be reviewed before proceeding.
2. Gather only enough context to evaluate behavior, patterns, tests, and boundaries.
3. Run [SKILL.md](../../.agents/skills/code-review-and-quality/SKILL.md).
4. After the review completes:
   - If cyclomatic complexity is high, such as a function with more than 10 branches or deeply nested logic spanning more than 3 levels, invoke [SKILL.md](../../.agents/skills/code-simplification/SKILL.md).
   - If a Critical-severity security finding is identified, such as an injection vulnerability, exposed secret, or missing authentication check, invoke [SKILL.md](../../.agents/skills/security-and-hardening/SKILL.md) to fix it.
   - If a performance bottleneck is detected, invoke [SKILL.md](../../.agents/skills/performance-optimization/SKILL.md) to fix it.
5. Report findings first, ordered by severity.
6. Keep summary brief. Include residual risks or testing gaps when no findings exist.

## TASK

$input
