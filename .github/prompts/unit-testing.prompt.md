---
name: unit-testing
description: "Create unit tests with the configured framework, testing environment, patterns, and constraints"
agent: agent
argument-hint: "Function name to test"
---

# Unit Testing

> **Required**: At the start of this prompt, inspect the project configuration and invoke the project's configured unit-testing skill when one is available. Identify the test runner, assertion library, mocking APIs, and testing environment before writing tests. Do not assume or install a specific framework or environment.

## Communication Mode

Follow communication mode from [SKILL.md](../../.agents/skills/caveman/SKILL.md) for every response.

## Function to Test

**[PASTE FUNCTION NAME]**

---

## Testing Framework & Environment

- **Framework**: Identify the configured unit-test runner and assertion library from project manifests, test scripts, configuration files, and nearby tests. Use its native APIs and conventions, including whether test globals or explicit imports are configured.
- **Environment**: Identify the configured runtime for the target tests, such as server, browser, worker, or another configured environment. Use the existing configuration; do not assume, switch, or install an environment.
- **Test setup**: Locate and use existing setup, teardown, fixtures, and test-environment configuration. Do not duplicate or replace them.
- **Mocking strategy**: Use the configured APIs for module mocks, function spies, stubs, call assertions, and mock reset behavior. Translate the conceptual patterns below to the project's framework.
- **Path aliases**: Read aliases from project configuration and follow import conventions used by neighboring tests; do not assume alias names.
- **Test commands**: Use the project's existing scripts and configuration for focused and full test runs.

## Prompt Self-Update

After identifying the configured test framework, testing environment, and other relevant constraints, the agent may update this prompt to record those verified facts for future runs. Replace only the generic guidance that the identified facts resolve, such as the runner, assertion and mocking APIs, setup and teardown, environment, path aliases, commands, language, naming conventions, and relevant test patterns. Preserve unrelated coverage, safety, and behavioral guidance. Record confirmed facts only; do not turn assumptions into defaults. Apply the updated prompt for the remainder of the task.

---

## Test Coverage Plan

### 1. VALID SCENARIOS

- Standard valid inputs with expected outputs
- Typical use cases the function was designed for
- Multiple valid input combinations

### 2. BOUNDARY CONDITIONS

- Minimum/maximum acceptable values
- Empty inputs (null, undefined, empty strings/arrays)
- Single-element collections
- Large datasets (if applicable)

### 3. ERROR HANDLING

- Invalid data types
- Out-of-range values
- Malformed inputs
- Missing required parameters

### 4. EDGE CASES

- Zero values where applicable
- Negative numbers (if relevant)
- Special characters in strings
- Concurrent access scenarios (if applicable)

### 5. MOCKING & DEPENDENCIES

Follow these rules for realistic, maintainable tests:

**Mock complex/async dependencies:**

- External services, APIs, persistence layers, and other asynchronous boundaries
- Any dependency with side effects, such as I/O, notifications, or state updates

**Do NOT mock simple synchronous helpers:**

- Utility functions (formatters, validators, calculators)
- Type-only imports or constants
- Simple getters/setters unless testing their behavior specifically

**Setup mocks per pattern:**

The following is conceptual pseudocode. Replace each helper with the equivalent provided by the project's configured framework.

```text
moduleMock("external-module", () => ({
  fetchValue: mockFunction(),
  saveValue: mockFunction(),
}));

const mockDependency = { fetchValue: mockFunction(), saveValue: mockFunction() };

setupEach(() => {
  clearMocks();
  resetConfiguredTestState();
});
```

---

## Output Format

For each test, provide:

1. **Test name** — follows the project's established naming convention and precisely describes the behavior or scenario set
2. **Setup/Arrange phase** — mock setup, context creation, and test-environment preparation
3. **Function call(s)** — with specific inputs
4. **Assertions** — expected results, mock call verification, and observable state

### Example Structure

```text
testGroup("calculateTotal", () => {
  let result;

  setupEach(() => {
    clearMocks();
    resetConfiguredTestState();
  });

  testGroup("Valid input", () => {
    testCase("should return the total for provided items", () => {
      const items = [
        { price: 10, quantity: 2 },
      ];

      result = calculateTotal(items);

      assertEqual(result, 20);
    });
  });
});
```

### Test Consolidation Rules

#### When to Use

- Deciding whether multiple scenarios should be combined into one test
- Refactoring repetitive tests into a dataset-driven structure
- Auditing test plans for redundancy before implementation

#### Rules

Before writing tests, audit your plan for redundancy. **Consolidate when:**

- Multiple inputs trigger the same assertion pattern (same function call, same expectation structure, different data)
- Testing nullable/optional fields, format transformations, or state coercions across a set of fields
- Verifying different error types produced by the same function
- Checking boundary values (min, max, empty, single-item, etc.) that all follow the same assertion shape
- Validating behavior across different application states, permissions, or error conditions
- Testing the same handler logic across multiple inputs or subscription configurations

**DO NOT consolidate when:**

- Each scenario requires distinct setup, mocks, or incompatible state
- Scenarios test fundamentally different logic paths
- Complex async flows would become harder to debug if merged
- A failure would be ambiguous about which input caused it
- Readability would be meaningfully reduced

#### Procedure

1. List planned scenarios for the target function or handler.
2. Group scenarios by assertion shape.
3. Consolidate groups that share one assertion pattern into one dataset-driven test.
4. Keep scenarios separate when any do-not-consolidate condition applies.

---

## Additional Requirements

- **Descriptive variable names** — use full names (`mockDependency`, not `dep`)
- **Group related tests logically** — use the configured test-group construct (e.g., "Validation", "Error Handling")
- **Setup/teardown** — use the configured lifecycle hooks and reset APIs; reset environment state when needed
- **Independence** — each test must be repeatable without shared state
- **Context objects** — when testing state guards, use a dedicated context mock matching the function's expected interface
- **Naming conventions** — follow the conventions established by the target language and codebase

---

## Focus

Create tests that catch real-world bugs:

- State transitions that violate guards
- Missing error handling in external subscriptions or asynchronous dependencies
- Resource cleanup and memory leaks when the target manages resources or listeners
- Race conditions in asynchronous state changes
- Incorrect object initialization or property binding
