# Page patterns

These are outlines to adapt, not mandatory headings or executable product examples. Remove inapplicable sections. Use verified product names, paths, inputs and outputs.

## Quickstart

```text
Title: Do one first task
Description: One sentence naming the result.

Outcome: What you will have after completing this guide.
Before you begin: Check platform/version, account, access and tools.
1. Prepare: Name the exact working directory or origin and inputs.
2. Act: Show the smallest supported action and describe its effect.
3. Verify: Show the expected observable result and what it proves.
If this step fails: Name the likely symptom, safe check and recovery.
Finish: State the achieved result, optional cleanup and useful next step.
```

Lead with one recommended route. Put alternative languages or tools in supported tabs only when they reach the same result. Keep deployment optional when the first task is local. E01/E02/E20 demonstrate concrete first-result checks; E04 demonstrates platform constraints.

## How-to

```text
Title: Complete a named task
Scope: When to use this guide and the required starting state.
Before changing anything: Required inputs and relevant consequences.
Steps: One action per step, with the context and output to inspect.
Verification: Check the intended persistent state or observable result.
Recovery: Preserve input and operation identity when success is uncertain.
Undo or cleanup: Remove only resources created for this task.
Next step: Link to the relevant continuation or reference.
```

Do not replay the entire onboarding tutorial in every how-to. Link to prerequisites with enough context to explain the dependency. Deployment journeys must distinguish source build, local response and hosted response, as illustrated by E08/E24/E25.

## API reference

```text
Title: Resource or operation
Purpose: What this operation does and does not establish.
Contract: Method, path, authorization, required capability and side effects.
Inputs: Name, type, location, required/default behavior and constraints.
Example request: Execution environment and clearly replaceable inputs.
Success: Status, response shape, significant headers and meaning.
Failures: Relevant statuses/codes and safe recovery.
Operational behavior: Pagination, streaming, timeout, retry and idempotency
where these are supported by this operation's actual implementation.
Related: One task guide and adjacent operations.
```

Keep illustrative outputs labeled. Do not assert retry safety from a generic HTTP status; trace the product's write and identity contract. E07 separates request construction from response use; E16/E19 expose error and client behavior.

## Explanation

```text
Title: Concept the reader needs to understand
Scope: Why this model matters to a named task.
Definitions: Stable terms, relationships and boundaries.
Example: A small input/action/result illustrating the model.
Consequences: What changes for the reader's decisions.
Limitations: What the explanation cannot guarantee.
Continue: Link to the corresponding task guide or reference.
```

Keep concepts separate from long operational procedures. E05 distinguishes images, containers, clients and daemons; E12 explains the difference between input data and validated output.

## Troubleshooting

```text
Title: Recover from a named symptom
Symptom: What the reader sees, including status or exact message if stable.
Scope: Account, platform, route, version or service involved.
First safe check: A read-only observation and how to interpret it.
Likely causes: Connect each cause to evidence, not an unsupported diagnosis.
Recovery: Concrete next action, then a recheck of the intended result.
If unresolved: What nonsecret evidence to retain and where to get help.
```

Separate sign-in failure, authorization denial, unavailable service and pending reconciliation. Avoid advising a repeated payment or write when submission is uncertain. E03 ties concrete connection, role and permission messages to different causes; E14/E16 show structured exceptions.

## Mintlify page shell

```mdx
---
title: "Task title"
description: "The observable result this guide helps you reach."
---

State the outcome and required starting state.

## Before you begin

List only prerequisites verified for this task.

## Complete the task

Provide the supported steps, execution context and expected result.

## Verify the result

Explain what to inspect and what it proves.

## Continue

Link to the next useful task or the relevant reference.
```

Use `Steps`, `CodeGroup`, `Tabs`, `Note` or `Warning` only where existing platform support and the reader's task justify them. Essential instructions must remain easy to find; do not hide them in optional accordions. Escape syntax deliberately and compile the resulting MDX.
