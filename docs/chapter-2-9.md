# Chapter 2.9: Decomposition Prompting

A common mistake even experienced prompt engineers make is sitting down to write a prompt for a complex task without first thinking clearly about what the task actually requires. The prompt ends up as an ambitious paragraph that asks the AI to do too much, defines the goal loosely, and hopes the model can infer the rest. It cannot.

Decomposition prompting addresses the problem one step before you write the prompt at all. It is a planning discipline applied to the task itself — breaking the problem down into its constituent parts before deciding how to instruct the AI. The quality of the output depends not just on how well you write the prompt, but on how well you understand the task you are prompting for.

## What Decomposition Prompting Is

Decomposition prompting is the practice of systematically mapping a complex task into its smallest independent logical components before designing the prompt architecture. Rather than describing the end goal and hoping the model figures out the path, you work backwards from the final deliverable to identify every distinct step the task requires — and then decide, for each step, whether it needs its own prompt, can be handled by a constraint within a single prompt, or does not require AI involvement at all.

The distinction between decomposition and prompt chaining (Chapter 2.4) is important. Prompt chaining is the execution method: running a sequence of prompts where each output feeds the next. Decomposition is the planning method that tells you how many prompts you need, what each one should do, and in what order. You decompose first, then chain.

## The Decomposition Process

When you receive a complex task, apply the following four-step planning process before writing a single word of prompt.

**Step 1 — State the Final Deliverable**
Write one sentence describing exactly what the finished output must be. Not the process — the product.
*Example: "A two-page procurement brief summarising three vendor proposals against cost, risk, and implementation speed criteria, formatted for the CFO."*

**Step 2 — List Every Distinct Operation Required**
Work backwards. What would a human analyst have to do, step by step, to produce that deliverable from the raw inputs available?
*Example: Read and extract key data from each proposal → standardise the data into comparable categories → evaluate each vendor against the three criteria → rank the vendors → write the brief in the required format.*

**Step 3 — Identify Where AI Adds Value vs. Where Human Judgment Is Required**
Not every step should be delegated to the model. Mark each operation as AI-suitable (data extraction, comparison, formatting) or human-required (final contractual judgment, stakeholder relationship context, sign-off).

**Step 4 — Assign Each AI Step to a Prompt**
Each distinct AI-suitable operation from Step 3 becomes either a standalone prompt in a chain or a clearly labelled section in a single structured prompt, depending on complexity.

## Plug-and-Play Example — Procurement Brief

*Final deliverable:* A two-page comparative brief on three vendors for the CFO.

*Decomposed operations:*

| Step | Operation | AI or Human? |
|---|---|---|
| 1 | Extract pricing, implementation timelines, and support terms from each proposal | AI |
| 2 | Standardise into a comparison table | AI |
| 3 | Flag any contractual red flags (auto-renewal, penalty clauses) | AI |
| 4 | Apply organisational risk preference (context only the human knows) | Human input required |
| 5 | Draft the brief narrative using the above data | AI |
| 6 | Final review and CFO-level framing | Human |

Steps 1, 2, 3, and 5 are AI-suitable and become the four prompts in the chain. Steps 4 and 6 are human checkpoints inserted between prompts.

**Wrap-up**
The most expensive prompt mistakes happen before the prompt is written — when the task is poorly understood and the AI is handed ambiguity at scale. Decomposition prompting is the ten-minute planning investment that prevents an hour of regeneration. Before you type the first word of any complex prompt, map the task. Understand what you are actually asking for. Then engineer the architecture to get there.
