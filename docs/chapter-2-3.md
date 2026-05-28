# Chapter 2.3: Forcing the Logic — Chain-of-Thought & Constraints

Large Language Models are brilliant synthesizers with a significant architectural flaw: they are impatient.

If you hand an AI a complex logical problem — calculating a tiered commission structure, auditing a legal contract for internal contradictions, or analysing a multi-variable scheduling conflict — it will almost always jump straight to the final answer. Because it predicts the end result without working through the intermediate steps, it is highly prone to mathematical, logical, and sequential hallucinations. The output will look authoritative and read smoothly, but the underlying reasoning will be wrong in ways that are difficult to detect unless you check the work manually.

To solve this, prompt engineers use a technique that forces the model to slow down and show its working before it commits to a conclusion.

## Chain-of-Thought Prompting: The Mechanics

Chain-of-thought (CoT) prompting instructs the model to output its intermediate reasoning steps before reaching a final answer. The principle is straightforward: an LLM calculates each token based on all preceding tokens in the context window. If the model jumps directly to a conclusion, it has very few intermediate tokens to work from, and the probability of a logical error compounds at the final step.

When you force the model to generate reasoning steps first, those intermediate tokens become part of the context it uses to predict the next step. The chain does not guarantee correctness — a flawed early step can still corrupt the final answer — but it substantially raises the probability of a correct result on logic-heavy tasks. It also makes errors visible and correctable, which is the more important benefit in a corporate setting. A flawed reasoning chain you can read and correct is far preferable to a confidently wrong conclusion with no visible working.

A 2022 research paper by Wei et al. at Google Brain demonstrated that chain-of-thought prompting significantly improved performance on arithmetic, commonsense, and symbolic reasoning benchmarks across large language models, with accuracy gains of up to 40% on multi-step mathematical problems compared to standard prompting approaches.

## Two Ways to Implement CoT in Practice

**Method 1 — Zero-Shot CoT (The Quick Trigger)**

The simplest way to activate reasoning behavior is to append a specific phrase to the end of your prompt:

> *"Let's think step by step."*

This single phrase has been demonstrated to reliably trigger chain-of-thought behavior across most major models without requiring you to engineer the reasoning structure yourself.

*Example:*
> *"A field sales rep sold $155,000 in software this quarter. The commission structure is 5% on the first $100,000 and 8% on any revenue above that threshold. Calculate the total commission owed. Let's think step by step."*

This is effective for quick, ad-hoc calculations. It is, however, too fragile for production-grade enterprise workflows where you need a guaranteed output format alongside the reasoning.

**Method 2 — Engineered CoT (The Scratchpad)**

For repeatable corporate workflows, you should engineer the reasoning structure directly into your Format constraint. This forces the model to document its logic in a clearly labelled section before generating the final deliverable — making the reasoning auditable.

> **[Engineered CoT Format — Contract Review]**
>
> Format your response in two labeled sections:
>
> **[Reasoning Scratchpad]:** First, outline your step-by-step analysis of the vendor agreement. Identify the service level agreements in Section A. Compare them to the penalty clauses in Section D. Explicitly state whether the timelines in each section are consistent or contradictory. Show all logical working before reaching any conclusion.
>
> **[Final Recommendation]:** Only after completing the scratchpad, write a single paragraph recommending whether to proceed with contract signature, citing the specific clause numbers that drove your recommendation.

The scratchpad also serves a second critical function: it gives the human reviewer a window into the model's reasoning. If the model reaches a correct conclusion via flawed logic, the scratchpad reveals it. If the logic is sound but the conclusion is wrong, the scratchpad narrows down exactly where the error occurred.

## Negative Constraints: What Not to Do

Chain-of-thought handles complex logic. Negative constraints handle scope creep — the model's tendency to be helpfully unhelpful by adding unrequested content, softening conclusions, or padding the output with qualifications.

A negative constraint is an explicit instruction telling the model what to exclude, what not to do, and what categories of content to ignore entirely.

*Without a negative constraint:*
> *"Analyse these three vendor proposals and identify the best option."*
> The model will likely produce a balanced, diplomatic summary that avoids committing to a clear recommendation, hedges with "it depends on your priorities," and concludes that "all three vendors offer unique strengths." Technically accurate. Professionally useless.

*With a negative constraint:*
> *"Analyse these three vendor proposals. Identify the single best option based strictly on implementation speed and total cost of ownership. Do not provide a balanced summary of all three. Do not hedge with 'it depends on your priorities.' Output a single clear recommendation followed by the two data points that justify it."*

**Wrap-up**
The AI's default behavior is to be agreeable, comprehensive, and non-committal — qualities that produce excellent dinner party conversation and terrible corporate analysis. Chain-of-thought prompting forces the model to earn its conclusions by showing its working. Negative constraints force it to make real decisions instead of comfortable non-answers. Together, they transform the AI from a professional fence-sitter into a decisive analytical tool.
