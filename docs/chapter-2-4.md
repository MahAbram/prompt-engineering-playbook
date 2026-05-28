# Chapter 2.4: Building Pipelines — Prompt Chaining

You have a real task in front of you: take a 60-page supplier onboarding document, extract the compliance requirements relevant to your procurement team, translate them from legal language into plain English, prioritise them by implementation deadline, and format the final output as a briefing document ready to present to the department head.

A beginner pastes the entire document into the chat, writes a prompt asking the AI to do all five things at once, and waits. The model tries. The output is a meandering document that partially addresses each step but executes none of them with the depth or precision the task actually requires. The extraction is shallow. The translation is inconsistent. The prioritisation is arbitrary. The format is generic. Three hours of editing later, it would have been faster to start from scratch.

The problem is not the model's capability. The problem is cognitive overload. You asked one worker to simultaneously be a legal analyst, a plain-English editor, a project manager, and a document designer — at the same time, on the same output, with no ability to course-correct between steps.

## What Prompt Chaining Is

Prompt chaining is the practice of breaking a complex, multi-stage task into a sequence of discrete, single-purpose prompts, where the output of each prompt becomes the input for the next. Instead of asking the model to juggle five cognitive operations simultaneously, each prompt in the chain has one job and executes it fully before passing the result forward.

Think of it as a factory assembly line. The raw material — your 60-page document — enters at one end. At each station, a single operation is performed with precision. The finished product exits at the other end having been processed by specialists, not by a generalist trying to do everything at once.

The practical benefit is significant. Chaining improves output quality because each prompt operates within a narrow, well-defined scope. It also improves error management: if a step produces a flawed output, you can identify the failure at that specific station, correct it, and re-run only that step — rather than regenerating the entire workflow from the beginning.

## Designing the Four-Stage Pipeline

Using the supplier onboarding example above, here is how the task decomposes into a clean, production-grade chain.

**Stage 1 — The Extraction Prompt**

The sole purpose of this prompt is to find the data. No formatting. No translation. No analysis. Just extraction.

> *"Act as a Senior Procurement Compliance Specialist. Read the attached 60-page supplier onboarding document. Extract every clause that contains a compliance requirement our procurement team must action. Present the output as a numbered list using the exact legal language from the source document. Do not summarise, paraphrase, or reformat the clauses. Do not include background context, definitions, or introductory sections — only actionable compliance requirements. Output nothing else."*

**Stage 2 — The Translation Prompt**

You take the exact numbered list from Stage 1 and feed it into a new prompt. The model's entire attention is now focused on one operation: making legal language readable.

> *"Take the numbered compliance requirements listed above. Rewrite each one in plain English suitable for a procurement manager with no legal background. Preserve the full meaning and all specific deadlines or numerical thresholds. Maintain the same numbered list format. Do not add commentary or recommendations — only translate the language."*

**Stage 3 — The Prioritisation Prompt**

You feed Stage 2's output into a new prompt focused entirely on ranking.

> *"Take the plain-English compliance requirements above. Re-order them from highest to lowest priority based on the following criteria: (1) items with a deadline within 90 days rank highest; (2) items involving financial penalties rank above items with reputational risk only; (3) items with no stated deadline rank last. Add a priority label — High, Medium, or Low — to each item. Do not alter the plain-English wording from the previous step."*

**Stage 4 — The Formatting Prompt**

The final prompt takes the prioritised, translated list and assembles it into the deliverable.

> *"Using the prioritised compliance requirements above, format a briefing document for the Head of Procurement. Include: a two-sentence executive summary at the top, the full prioritised list grouped under three headers (High Priority, Medium Priority, Low Priority), and a one-sentence 'Recommended First Action' at the bottom identifying the single most urgent item. The document must be under 600 words. Do not include any introductory pleasantries or closing remarks."*

## When to Chain vs. When to Use a Single Prompt

Not every task requires a pipeline. The decision rule is straightforward:

| Use a single CRAFT prompt when... | Use a chain when... |
|---|---|
| The task has one clear cognitive operation | The task requires multiple distinct types of reasoning |
| The source material is short (under 5 pages) | The source material is long and dense |
| The output format is simple | The output requires multiple transformation stages |
| An error is easy to correct manually | An error at step one would corrupt everything downstream |

**Wrap-up**
Prompt chaining is the difference between asking a generalist to do everything and building a team of specialists who each do one thing well. The investment in designing a pipeline pays back immediately: each stage is auditable, each error is isolatable, and the final output is substantially more reliable than anything a single overloaded prompt can produce. As your workflows grow in complexity, your chains will become your most reusable corporate assets — a documented, repeatable production line for your department's most demanding AI tasks.
