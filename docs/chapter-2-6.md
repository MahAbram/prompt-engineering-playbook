# Chapter 2.6: Self-Consistency Prompting

You have asked the AI to analyse three competing vendor proposals and recommend which one to select for a critical infrastructure contract. The model produces a confident, well-structured recommendation in favour of Vendor B. The analysis looks thorough and the reasoning seems sound.

But should you trust a single answer to a decision this significant?

In high-stakes analytical tasks — financial evaluations, legal risk assessments, strategic recommendations — a single AI response carries an inherent risk. The model's probabilistic nature means that the same prompt, run at a slightly different moment or with a marginally different phrasing, may produce a different answer. If you only ever see one answer, you have no way of knowing how stable that answer actually is.

Self-consistency prompting is the technique that addresses this directly.

## What Self-Consistency Prompting Is

Self-consistency prompting involves asking the model to approach the same problem multiple times using different reasoning paths, then comparing the outputs to identify the most reliably supported answer.

The technique was formally introduced by Wang et al. in a 2022 paper from Google Brain, which demonstrated that sampling multiple reasoning paths and selecting the answer that appears most frequently across them — a process called majority voting — significantly outperforms single-path chain-of-thought on complex reasoning tasks. In their benchmarks across arithmetic, commonsense, and symbolic reasoning datasets, self-consistency improved accuracy by an average of 17% over standard chain-of-thought prompting.

The intuition behind this is straightforward. If you ask five experienced colleagues to independently analyse the same vendor proposal and four of them reach the same conclusion, you have substantially more confidence in that conclusion than if only one person reviewed it. The AI is the same: multiple independent reasoning paths converging on the same answer is a meaningful signal that the answer is robust.

## How to Implement Self-Consistency in a Corporate Setting

You do not need access to the model's API or any technical configuration. Self-consistency can be implemented entirely within a standard chat session using structured prompt design.

**Method 1 — Multiple Reasoning Angles in a Single Prompt**

Ask the model to explicitly approach the problem from three distinct analytical frameworks before reaching a conclusion.

> **[Plug-and-Play Example — Vendor Evaluation]**
>
> *"Act as a Senior Procurement Strategist. Evaluate the three vendor proposals attached. You must analyse them three separate times, each time using a different evaluative lens:*
>
> *Analysis 1 — Financial Lens: Evaluate based purely on total cost of ownership over 24 months, including implementation, licensing, and projected support costs.*
>
> *Analysis 2 — Risk Lens: Evaluate based purely on contractual risk — SLA penalties, data ownership clauses, and exit conditions.*
>
> *Analysis 3 — Operational Lens: Evaluate based purely on implementation speed and integration complexity with our existing Microsoft 365 environment.*
>
> *After completing all three analyses in separate, labelled sections, write a final paragraph identifying which vendor appeared strongest most frequently across all three lenses. If no vendor dominated, state that explicitly and identify the specific trade-off driving the split."*

**Method 2 — Sequential Regeneration with Comparison**

For decisions where you want to test the stability of a single recommendation, run the same prompt three times in separate sessions and compare the outputs.

> *Follow-up prompt after receiving all three outputs:* "I have run the same vendor analysis three times. The outputs are pasted below. Identify where all three analyses agree, where they diverge, and what the divergence reveals about the genuine trade-offs in this decision."

## When to Use Self-Consistency

This technique is not necessary for every task. Drafting a meeting summary, reformatting a spreadsheet, or translating a policy document into plain English does not require multiple reasoning paths. Self-consistency is worth the additional time investment when:

- The decision has significant financial or contractual consequences
- The source material is ambiguous or contains conflicting data
- You need to present a recommendation to a senior stakeholder and want to stress-test your reasoning first
- A previous single-path analysis produced an answer that surprised you or felt unstable

**Wrap-up**
A single AI response to a complex question is a starting point, not a verdict. Self-consistency prompting gives you a mechanism to pressure-test that starting point by forcing the model to arrive at the same destination via multiple routes. Where the routes converge, you have a defensible conclusion. Where they diverge, you have a map of the genuine complexity in the problem — which is itself valuable intelligence before a high-stakes decision.
