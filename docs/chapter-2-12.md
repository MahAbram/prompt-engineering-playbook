# Chapter 2.12: The Prompting Techniques Catalogue

The chapters in Part 2 cover twelve distinct techniques. This catalogue is designed as a reference guide — a single page you can return to when you have a specific problem to solve and need to identify quickly which technique applies.

Each entry includes: what the technique does, when to use it, and the chapter to return to for the full explanation and worked example.

---

## Prompting Techniques: Quick Reference

| Technique | What It Does | Best Used When | Chapter |
|---|---|---|---|
| **CRAFT Framework** | Structures a complete prompt using five isolated variables: Context, Role, Action, Format, Target | Building any production-grade corporate prompt from scratch | Part 1, Chapters 1.1–1.4 |
| **Zero-Shot Prompting** | Provides instructions with no examples | The task is standard and the output format is predictable | Ch. 2.2 |
| **Few-Shot Prompting** | Provides two to five input-output examples to establish a precise pattern | The task requires specific tone, voice, or categorisation logic that instructions alone cannot capture | Ch. 2.2 |
| **Chain-of-Thought (CoT)** | Forces the model to output its reasoning steps before the final answer | Complex logic tasks: calculations, contract analysis, multi-variable decisions | Ch. 2.3 |
| **Zero-Shot CoT** | Appends "Let's think step by step" to trigger reasoning behavior with minimal setup | Quick analytical tasks where you need the model to show its working | Ch. 2.3 |
| **Negative Constraints** | Explicitly defines what the output must not include | Overriding default corporate jargon, unwanted format elements, or scope creep | Ch. 2.3, Ch. 2.8 |
| **Prompt Chaining** | Breaks a complex task into sequential single-purpose prompts | Multi-stage workflows where an error at one step would corrupt all downstream outputs | Ch. 2.4 |
| **Surgical Follow-Up** | Corrects or expands a specific section of an output without regenerating the whole | The output is mostly correct but needs targeted refinement in one area | Ch. 2.5 |
| **Self-Consistency Prompting** | Generates multiple independent reasoning paths to the same answer and compares them | High-stakes decisions where you need to stress-test the stability of a recommendation | Ch. 2.6 |
| **Role Stacking** | Assigns multiple complementary personas to the AI in a single prompt | Tasks that require depth across two or more professional domains simultaneously | Ch. 2.7 |
| **Negative Prompting** | Defines explicit vocabulary, content, and structural exclusions | Eliminating default corporate hedging, filler phrases, and unwanted format defaults | Ch. 2.8 |
| **Decomposition Prompting** | Maps a complex task into its smallest logical components before writing any prompt | Large, ambiguous tasks where it is unclear what the AI should actually do at each step | Ch. 2.9 |
| **Contrastive Prompting** | Shows a negative example of what you do not want alongside the positive target | Tone and voice calibration, where the gap is easier to show than describe | Ch. 2.10 |
| **Iterative Refinement** | Improves the prompt architecture systematically across multiple test runs | Building reusable prompts for team-wide deployment in a prompt library | Ch. 2.11 |

---

## Technique Selection Decision Tree

Use this decision tree when you are unsure which technique to reach for first.

```
Is the task complex and multi-stage?
├── Yes → Decomposition Prompting first, then Prompt Chaining
└── No → Is the output format or tone very specific?
          ├── Yes → Few-Shot Prompting
          └── No → Does the task involve logic, calculation, or multi-step analysis?
                    ├── Yes → Chain-of-Thought Prompting
                    └── No → Is the output from a single CRAFT prompt mostly correct but slightly off?
                              ├── Tone/voice problem → Contrastive Prompting or Role Stacking
                              ├── Specific section wrong → Surgical Follow-Up
                              ├── Too much filler/jargon → Negative Prompting
                              └── High-stakes decision → Self-Consistency Prompting
```

---

## A Note on Combining Techniques

These techniques are not mutually exclusive. The most powerful prompts in a professional library typically combine several simultaneously.

A production-grade vendor evaluation prompt, for example, might use: CRAFT as the structural skeleton, Role Stacking to combine commercial and legal expertise, Negative Constraints to prevent hedging, Chain-of-Thought to force explicit reasoning, and a Self-Consistency check to validate the recommendation. Each technique addresses a different failure mode. Together, they create a prompt that is reliable, precise, and professionally defensible.

Start with CRAFT as your foundation. Add techniques as you identify specific failure modes in your outputs. Build incrementally, test rigorously, and document what works.
