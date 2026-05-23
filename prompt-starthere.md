## Start Here: The 30-Minute Path

You are here because you have written prompts that should have worked, and didn't. The AI gave you something close to what you wanted, but slightly off — wrong tone, wrong format, wrong focus — and you spent more time editing the output than you saved by generating it.

This playbook teaches you how to fix that, not by writing more, but by structuring better.

It is dense. You do not need to read all of it. Here is the shortest possible path to walk away with something useful today.

### The One Idea That Matters Most

Generative AI is probabilistic, not deterministic. Two identical prompts can produce two different outputs. This is not a bug — it is how the technology works.

Prompt engineering is the discipline of wrapping a non-deterministic system in enough constraints that you can predict, with high confidence, what it will return. You are not "asking" the AI a question. You are building a container the AI must fill.

That mental shift — from asking to architecting — is the difference between casual AI usage and reliable AI usage.

### The One Framework That Works

For any non-trivial task, use CRAFT:

* **C — Context:** The background reality of the task and the source data.
* **R — Role:** The persona the AI must adopt.
* **A — Action:** The precise verb and the cognitive operation required.
* **F — Format:** The exact structure of the output.
* **T — Target:** The audience who will consume the final product.

If you came from the AI Fluency Playbook, CRAFT is the architectural evolution of the 4Cs you already know. It separates the variables (Role vs. Target, Action vs. Format) that 4Cs intentionally simplified. Use 4Cs for casual prompts and CRAFT for production prompts.

### The One Technique That Will Save You Most Time

When a CRAFT prompt fails on a complex task — calculations, legal reviews, multi-step logic — add a Chain-of-Thought scratchpad to the Format pillar. It looks like this:

> **[Format]** Structure your response in two labeled sections:
> 1. **[Reasoning Scratchpad]:** Show your step-by-step logic for working through this problem. State your assumptions, walk through the calculations, and identify where you might be uncertain.
> 2. **[Final Answer]:** Only after completing the scratchpad, provide your final answer.

This forces the AI to "think out loud" before committing to an answer. It substantially reduces hallucinations on logic-heavy tasks because the model uses its own reasoning tokens as context for the next step, rather than guessing.

For tone, brand voice, or formatting precision, the highest-leverage technique is different: use Few-Shot Prompting. Provide two to five examples of perfect input-output pairs before your real task. The model will pattern-match the examples and apply them automatically. Examples beat instructions every time.

### The One Rule That Will Save You

Always engineer an Escape Hatch into prompts that involve factual extraction. Add this exact instruction:

> *"If the answer is not explicitly stated in the provided text, output 'Insufficient data provided.' Do not infer, guess, or use outside knowledge."*

Without this, the AI's default behavior is to fill gaps with plausible-sounding inventions. With it, the AI is mathematically given permission to admit ignorance — and most of the time, it will take that permission instead of hallucinating.

### Where to Go Next

* **If you want the deep version of CRAFT:** Read Chapter 1.2 and Chapter 1.3.
* **If your prompts produce inconsistent tone or formatting:** Read Chapter 2.1 (Few-Shot Prompting).
* **If your prompts hallucinate on complex tasks:** Read Chapter 2.2 (Chain-of-Thought).
* **If you are running prompts across a team and need them to be reliable:** Read Chapter 3 in full — defensive prompting is what separates a working prompt from a deployable one.
* **If you want frameworks beyond CRAFT for specialized tasks:** Read Chapter 4.1 (COSTAR for nuanced writing, RISEN for procedural tasks, RTF for rapid utility).

Everything else in this playbook is depth on these four ideas. If you only ever read this chapter and apply CRAFT plus the Escape Hatch to your daily prompts, your output quality will rise within a day.

---
