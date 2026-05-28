# Part 2: High-Performance Prompting Techniques

## Chapter 2.1: The Anatomy of a Bad Prompt

You have learned the CRAFT framework. You understand, in theory, that vague instructions produce vague results. But theory has a way of dissolving under the pressure of a real deadline. You sit down, paste a document into the chat window, type something reasonable-sounding, and hit Enter — only to receive a response so generic it could have been written by a bored summer intern on their last day before vacation.

This is not a model failure. It is a prompt failure. And the only way to reliably avoid it is to understand, precisely, what makes a prompt collapse.

This chapter is a forensic examination of three real corporate prompts that fail — and a clear explanation of exactly why each one breaks down mechanically before showing the engineered alternative.

### The Three Failure Modes

Bad prompts almost always fail for one of three reasons: they are **too vague**, **too overloaded**, or **too assumption-dependent**. Each failure mode produces a different kind of useless output.

---

**Failure Mode 1: The Vague Command**

> *Bad Prompt:* "Summarize this report and make it professional."

At first glance, this seems reasonable. You have given the AI a task (summarize) and a quality bar (professional). But consider what the model actually has to work with. It does not know who the report is for. It does not know how long the summary should be. It does not know what "professional" means in your industry — the tone of a legal brief is "professional," and so is a casual LinkedIn post from a Fortune 500 CEO. It does not know which sections matter and which are boilerplate to discard.

Faced with this vacuum, the model defaults to its statistical average of "professional summaries it has seen online." The result is a five-paragraph essay, written in safe, anodyne corporate language, that summarizes the report chronologically rather than by importance. It will almost certainly include the phrase "in conclusion" and tell you nothing you could not have skimmed yourself in the same amount of time.

*What is missing:* Role, Format, Target, and any Constraints. The AI received a verb with no architecture around it.

**The Engineered Alternative:**

> *"You are a Senior Operations Analyst writing for a non-technical executive audience. Read the attached Q3 performance report. Extract only the three most significant operational risks and the two highest-priority recommended actions. Format the output as a bulleted list under two headers: 'Key Risks' and 'Recommended Actions.' Maximum 150 words total. Do not include background context, methodology, or any section summarizing what the report covers — only the risks and actions."*

---

**Failure Mode 2: The Overloaded Single Prompt**

> *Bad Prompt:* "Read this vendor contract and tell me if we should sign it, flag any legal risks, summarize the payment terms, check the SLAs against our internal policy, and write a recommendation email to the procurement team."

This prompt contains five distinct cognitive operations: legal risk analysis, payment term extraction, SLA comparison, procurement recommendation drafting, and a binary sign/don't-sign decision. Asking a single prompt to handle all five simultaneously is the equivalent of handing a new employee five conflicting memos and asking them to act on all of them at once.

The model will attempt to do everything and succeed at nothing. The output will typically be a long, loosely structured document that partially addresses each point but lacks the depth or precision required for any of them to be professionally usable. The SLA comparison will be shallow. The legal risk analysis will be generic. The email will sound like boilerplate. You will end up doing the majority of the work yourself anyway.

*What is missing:* Task isolation. This is a pipeline problem, not a single-prompt problem (covered fully in Chapter 2.4).

**The Engineered Alternative:** Break it into sequential prompts.

> *Prompt 1:* "Act as a Senior Procurement Analyst. Read the attached vendor contract. Extract only the payment terms: payment schedule, late penalty clauses, and any automatic renewal provisions. Present this as a structured list. Do not analyze anything else."

> *Prompt 2 (fed the output of Prompt 1):* "Based on the payment terms extracted above, flag any clauses that conflict with our standard 30-day net payment policy. If no conflicts exist, state that explicitly."

> *Prompt 3:* "Using the conflict analysis above, draft a two-paragraph summary email to the Procurement Director recommending whether to proceed with contract signing, citing the specific clause numbers identified."

---

**Failure Mode 3: The Assumption-Dependent Prompt**

> *Bad Prompt:* "Write interview questions for the new manager role."

This prompt assumes the AI knows what kind of manager you are hiring, what your industry is, what competencies matter to your organization, what level of seniority the role involves, and what your interview format looks like (structured, behavioral, panel, or informal). It knows none of these things.

The output will be a generic list of twelve questions that any HR textbook could have produced — "Where do you see yourself in five years?", "Tell me about a time you resolved a conflict" — questions that are technically valid but completely untailored to the actual role. A candidate could prepare for this interview without knowing anything about your company.

*What is missing:* Context. The AI received a task with zero grounding information.

**The Engineered Alternative:**

> *"You are a Senior HR Business Partner specializing in mid-market technology companies. We are hiring a Customer Success Manager who will own a portfolio of 40 enterprise accounts, manage a team of three, and report to the VP of Customer Experience. The role requires strong commercial instincts, the ability to handle executive-level client relationships, and experience with CRM platforms. Write eight structured behavioral interview questions. Each question must target one of the following competencies: commercial acumen, executive communication, team management, or technical adaptability. Format each question with the competency label in brackets before the question text."*

---

### The Diagnostic Checklist

Before submitting any prompt, run it against this five-question diagnostic:

| Question | If "No," your prompt will likely fail |
|---|---|
| Have I defined a Role for the AI? | Without a role, the model defaults to a generic average voice |
| Have I provided the background Context? | Without context, the model invents assumptions |
| Is the Action a single, specific task? | Multiple tasks in one prompt dilutes accuracy across all of them |
| Have I specified the Format explicitly? | Without format constraints, the model defaults to paragraphs |
| Have I identified the Target audience? | Without an audience, the model writes for nobody in particular |

**Wrap-up**
A bad prompt is not a sign of ignorance — it is a sign of incomplete instruction. The model is not failing you; it is faithfully executing the vacuum you handed it. Every failure mode examined in this chapter has a structural solution: more specificity, better task isolation, or richer context. From this point forward, when a prompt produces a poor result, the first question to ask is not "what is wrong with the AI?" but "which element of the architecture is missing?"

---

## Chapter 2.2: Showing, Not Just Telling — Few-Shot Prompting

You have meticulously crafted a CRAFT prompt. You explicitly defined the Role as a "Senior Brand Manager," you set a precise Action, and you specified the Target audience as "Millennial consumers." Yet when the AI generates the marketing copy, it sounds like a generic robot attempting to use modern slang. It is technically correct, but the tone is completely wrong.

This happens because instructions, no matter how precise, are inherently abstract. When you tell a new colleague to "write in a warm but authoritative voice," they will interpret that instruction through the lens of every warm-but-authoritative piece of writing they have ever encountered — which may be entirely different from your mental model. The AI faces the exact same problem at a much larger scale.

When instructions alone fail to capture the nuance of your company's specific voice, complex internal logic, or highly particular formatting quirks, you must stop telling the AI what to do and start showing it.

### Zero-Shot, One-Shot, and Few-Shot: The Spectrum

Most casual users rely exclusively on **zero-shot prompting** — providing instructions but zero examples of the desired output. The model executes the task based entirely on its pre-existing training data. For standard, predictable tasks — summarizing a mainstream news article, drafting a generic out-of-office reply — zero-shot is often sufficient.

**One-shot prompting** provides a single example. This establishes a pattern but is often too thin to be reliable. One example is better than none, but a single data point gives the model only a 50% signal on what constitutes a correct output format. If your one example happens to have an unusual structural quirk, the model may treat that quirk as a rule rather than an anomaly.

**Few-shot prompting** provides two to five examples of perfect inputs mapped to perfect outputs. Why does this work mechanically? By providing these examples, you enable a process called *in-context learning*. You are not retraining the model — its underlying weights remain fixed. Instead, you are loading high-quality pattern data directly into the model's current context window, which strongly biases its next-token predictions toward the structure, tone, and logic you have demonstrated. The model studies your examples, identifies the underlying patterns, and applies those patterns to the new task.

Research consistently supports this approach. Studies on few-shot learning in large language models — including the foundational GPT-3 paper by Brown et al. (2020) — demonstrated that models provided with even two to five examples dramatically outperform zero-shot baselines on tasks requiring specific formatting or categorization. The gain is not marginal; for tasks with strict structural requirements, few-shot prompting can reduce formatting errors by over 60% compared to equivalent zero-shot instructions.

### The Architecture of a Production-Grade Few-Shot Prompt

A robust few-shot prompt operates like an automated assembly-line quality control system. It consists of three structural blocks:

1. **The Instructions:** Your standard CRAFT framework (Context, Role, Action, Format, Target).
2. **The Examples (The "Shots"):** A minimum of two perfect input-output pairs that demonstrate exactly what you want.
3. **The Target Task:** The new, unprocessed data you want the AI to handle using the established pattern.

**Plug-and-Play Example — IT Support Ticket Triage:**

> **[Instructions]**
> Act as a Level 2 IT Support Triage Specialist. Read each incoming employee support ticket. Categorize the urgency (Low, Medium, High, or Critical), assign it to the correct department (Hardware, Software, Network, or Access), and draft a one-sentence internal routing note. Use a clinical, highly concise tone.
>
> **[Examples]**
>
> *Input:* "I can't figure out how to reset my admin password for the Salesforce portal. It just keeps spinning."
> *Urgency:* Medium
> *Department:* Access
> *Routing Note:* "User requires manual Salesforce password reset; portal auto-reset is failing."
>
> *Input:* "The entire office WiFi is down on the 4th floor. Nobody can connect to anything."
> *Urgency:* Critical
> *Department:* Network
> *Routing Note:* "Widespread network outage reported on Floor 4; requires immediate AP investigation."
>
> *Input:* "My mouse is double-clicking on its own. Annoying but I can still work."
> *Urgency:* Low
> *Department:* Hardware
> *Routing Note:* "Hardware degradation (mouse); low-priority replacement request."
>
> **[Target Task]**
>
> *Input:* "I spilled coffee on my laptop. It shut off immediately and won't turn back on. All my local files for tomorrow's board meeting are on there."
> *Urgency:* [AI FILLS IN]
> *Department:* [AI FILLS IN]
> *Routing Note:* [AI FILLS IN]

### The Critical Rule: Flawless Examples Only

Your examples must be internally consistent and structurally perfect. If two of your three examples use Title Case for the routing note and one does not, you will confuse the model's attention mechanism. It will not know whether to follow the written instructions or the inconsistent example. Treat your shots as the gold standard — they carry more weight than your written instructions because they are concrete rather than abstract.

**Wrap-up**
Instructions tell the AI what to do; examples show it exactly how. Few-shot prompting is your most powerful tool for enforcing brand voice, complex categorization logic, or any task where the quality bar cannot be fully captured in prose instructions alone. When your prompt keeps producing outputs that are technically correct but tonally or structurally wrong, stop rewriting the instructions and start building better examples.

---

## Chapter 2.3: Forcing the Logic — Chain-of-Thought & Constraints

Large Language Models are brilliant synthesizers with a significant architectural flaw: they are impatient.

If you hand an AI a complex logical problem — calculating a tiered commission structure, auditing a legal contract for internal contradictions, or analysing a multi-variable scheduling conflict — it will almost always jump straight to the final answer. Because it predicts the end result without working through the intermediate steps, it is highly prone to mathematical, logical, and sequential hallucinations. The output will look authoritative and read smoothly, but the underlying reasoning will be wrong in ways that are difficult to detect unless you check the work manually.

To solve this, prompt engineers use a technique that forces the model to slow down and show its working before it commits to a conclusion.

### Chain-of-Thought Prompting: The Mechanics

Chain-of-thought (CoT) prompting instructs the model to output its intermediate reasoning steps before reaching a final answer. The principle is straightforward: an LLM calculates each token based on all preceding tokens in the context window. If the model jumps directly to a conclusion, it has very few intermediate tokens to work from, and the probability of a logical error compounds at the final step.

When you force the model to generate reasoning steps first, those intermediate tokens become part of the context it uses to predict the next step. The chain does not guarantee correctness — a flawed early step can still corrupt the final answer — but it substantially raises the probability of a correct result on logic-heavy tasks. It also makes errors visible and correctable, which is the more important benefit in a corporate setting. A flawed reasoning chain you can read and correct is far preferable to a confidently wrong conclusion with no visible working.

A 2022 research paper by Wei et al. at Google Brain demonstrated that chain-of-thought prompting significantly improved performance on arithmetic, commonsense, and symbolic reasoning benchmarks across large language models, with accuracy gains of up to 40% on multi-step mathematical problems compared to standard prompting approaches.

### Two Ways to Implement CoT in Practice

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

### Negative Constraints: What Not to Do

Chain-of-thought handles complex logic. Negative constraints handle scope creep — the model's tendency to be helpfully unhelpful by adding unrequested content, softening conclusions, or padding the output with qualifications.

A negative constraint is an explicit instruction telling the model what to exclude, what not to do, and what categories of content to ignore entirely.

*Without a negative constraint:*
> *"Analyse these three vendor proposals and identify the best option."*
> The model will likely produce a balanced, diplomatic summary that avoids committing to a clear recommendation, hedges with "it depends on your priorities," and concludes that "all three vendors offer unique strengths." Technically accurate. Professionally useless.

*With a negative constraint:*
> *"Analyse these three vendor proposals. Identify the single best option based strictly on implementation speed and total cost of ownership. Do not provide a balanced summary of all three. Do not hedge with 'it depends on your priorities.' Output a single clear recommendation followed by the two data points that justify it."*

**Wrap-up**
The AI's default behavior is to be agreeable, comprehensive, and non-committal — qualities that produce excellent dinner party conversation and terrible corporate analysis. Chain-of-thought prompting forces the model to earn its conclusions by showing its working. Negative constraints force it to make real decisions instead of comfortable non-answers. Together, they transform the AI from a professional fence-sitter into a decisive analytical tool.

---

## Chapter 2.4: Building Pipelines — Prompt Chaining

You have a real task in front of you: take a 60-page supplier onboarding document, extract the compliance requirements relevant to your procurement team, translate them from legal language into plain English, prioritise them by implementation deadline, and format the final output as a briefing document ready to present to the department head.

A beginner pastes the entire document into the chat, writes a prompt asking the AI to do all five things at once, and waits. The model tries. The output is a meandering document that partially addresses each step but executes none of them with the depth or precision the task actually requires. The extraction is shallow. The translation is inconsistent. The prioritisation is arbitrary. The format is generic. Three hours of editing later, it would have been faster to start from scratch.

The problem is not the model's capability. The problem is cognitive overload. You asked one worker to simultaneously be a legal analyst, a plain-English editor, a project manager, and a document designer — at the same time, on the same output, with no ability to course-correct between steps.

### What Prompt Chaining Is

Prompt chaining is the practice of breaking a complex, multi-stage task into a sequence of discrete, single-purpose prompts, where the output of each prompt becomes the input for the next. Instead of asking the model to juggle five cognitive operations simultaneously, each prompt in the chain has one job and executes it fully before passing the result forward.

Think of it as a factory assembly line. The raw material — your 60-page document — enters at one end. At each station, a single operation is performed with precision. The finished product exits at the other end having been processed by specialists, not by a generalist trying to do everything at once.

The practical benefit is significant. Chaining improves output quality because each prompt operates within a narrow, well-defined scope. It also improves error management: if a step produces a flawed output, you can identify the failure at that specific station, correct it, and re-run only that step — rather than regenerating the entire workflow from the beginning.

### Designing the Four-Stage Pipeline

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

### When to Chain vs. When to Use a Single Prompt

Not every task requires a pipeline. The decision rule is straightforward:

| Use a single CRAFT prompt when... | Use a chain when... |
|---|---|
| The task has one clear cognitive operation | The task requires multiple distinct types of reasoning |
| The source material is short (under 5 pages) | The source material is long and dense |
| The output format is simple | The output requires multiple transformation stages |
| An error is easy to correct manually | An error at step one would corrupt everything downstream |

**Wrap-up**
Prompt chaining is the difference between asking a generalist to do everything and building a team of specialists who each do one thing well. The investment in designing a pipeline pays back immediately: each stage is auditable, each error is isolatable, and the final output is substantially more reliable than anything a single overloaded prompt can produce. As your workflows grow in complexity, your chains will become your most reusable corporate assets — a documented, repeatable production line for your department's most demanding AI tasks.

---

## Chapter 2.5: The Art of the Follow-Up

You have built a chained workflow, provided few-shot examples, and forced the model to reason step by step. The output is a 500-word executive summary that is ninety percent correct. The structure is clean, the data is accurate, but the tone in the third paragraph is too aggressive for an internal memo, and the conclusion is missing a specific financial metric you need for the board presentation.

A beginner copies the entire original prompt, pastes in additional instructions at the bottom, and regenerates the entire document from scratch — hoping the new version fixes the two problem areas without breaking the ten things that were already working. It usually does not. You gain the corrected tone in paragraph three and lose the precise structure you spent three iterations building.

A prompt engineer issues a surgical follow-up.

### How Conversational Memory Works

Modern LLMs retain the context of your current session. Every message you send, and every response the model generates, accumulates in the context window — the model's working memory for the duration of the conversation. This means you do not need to re-explain the task, re-state the CRAFT architecture, or re-upload the source document. The model already holds all of it.

Conversational memory allows you to treat the AI like a collaborator you can redirect with precision, rather than a vending machine you have to reset every time you want a different result.

One important boundary: context windows are finite. If a conversation runs for dozens of exchanges, the model will eventually begin to lose the earliest instructions as new content pushes them out of the window. For most standard corporate tasks, this limit is far beyond what a single working session requires. But for very long or complex workflows, it is worth periodically restating the core constraints to keep them active.

### Four High-Impact Follow-Up Techniques

**1. The Surgical Pivot — Correcting Tone in One Section**

> *Bad follow-up:* "Make this less aggressive."

This instruction is too broad. The model will likely rewrite the entire document to be less aggressive — softening not just the problematic paragraph but every assertion in the piece, turning a confident brief into a tentative one.

> *Engineered follow-up:* "The output is strong overall. However, the tone in paragraph three is too confrontational for an internal memo addressing the finance team. Rewrite only paragraph three. Soften the language so it reads as collaborative rather than demanding, but keep the core message, the specific figures cited, and the word count exactly the same."

**2. The Deepening Request — Expanding a Thin Section**

> *Bad follow-up:* "Add more detail about the budget cuts."

> *Engineered follow-up:* "In bullet point two, you referenced 'Q3 budget constraints' without specifics. Expand only that bullet into a full paragraph that breaks down the cuts across three categories: travel (down 20%), software licensing (frozen), and external catering (eliminated). Do not alter any other section of the document."

**3. The Post-Generation Format Shift**

Sometimes the content generated is factually correct but formatted wrong for the stakeholder who will receive it. Do not regenerate — reformat.

> *Engineered follow-up:* "The data in this response is exactly what I need. Now convert the entire response into a two-column markdown table: column one labelled 'Department', column two labelled 'Action Item.' Retain all the facts and dates. Remove all conversational text, headers, and explanatory sentences."

**4. The Self-Critique — Automated Quality Auditing**

The most powerful follow-up technique is asking the model to become its own editor. Because the AI holds the full conversation in memory, you can ask it to shift roles and review what it just produced with a critical lens.

> *Engineered follow-up:* "Before I accept this as a final draft, shift your role to a harsh senior copy editor reviewing this document for the first time. Identify every sentence that sounds like generic corporate filler — phrases like 'it is important to note,' 'in order to,' or 'going forward.' List each offending sentence, explain why it weakens the document, and propose a sharper, more direct replacement for each one."

This technique converts the AI from a producer into a quality control function, and it costs you nothing beyond one additional prompt.

**Wrap-up**
Prompt engineering does not end when you press Enter on the initial prompt. The initial output is a draft, not a deliverable. By mastering the surgical follow-up — fixing isolated sections, deepening thin analysis, reformatting for different audiences, and auditing for quality — you stop treating the AI like a one-shot oracle and start treating it like the capable, directable collaborator it actually is.

---

## Chapter 2.6: Self-Consistency Prompting

You have asked the AI to analyse three competing vendor proposals and recommend which one to select for a critical infrastructure contract. The model produces a confident, well-structured recommendation in favour of Vendor B. The analysis looks thorough and the reasoning seems sound.

But should you trust a single answer to a decision this significant?

In high-stakes analytical tasks — financial evaluations, legal risk assessments, strategic recommendations — a single AI response carries an inherent risk. The model's probabilistic nature means that the same prompt, run at a slightly different moment or with a marginally different phrasing, may produce a different answer. If you only ever see one answer, you have no way of knowing how stable that answer actually is.

Self-consistency prompting is the technique that addresses this directly.

### What Self-Consistency Prompting Is

Self-consistency prompting involves asking the model to approach the same problem multiple times using different reasoning paths, then comparing the outputs to identify the most reliably supported answer.

The technique was formally introduced by Wang et al. in a 2022 paper from Google Brain, which demonstrated that sampling multiple reasoning paths and selecting the answer that appears most frequently across them — a process called majority voting — significantly outperforms single-path chain-of-thought on complex reasoning tasks. In their benchmarks across arithmetic, commonsense, and symbolic reasoning datasets, self-consistency improved accuracy by an average of 17% over standard chain-of-thought prompting.

The intuition behind this is straightforward. If you ask five experienced colleagues to independently analyse the same vendor proposal and four of them reach the same conclusion, you have substantially more confidence in that conclusion than if only one person reviewed it. The AI is the same: multiple independent reasoning paths converging on the same answer is a meaningful signal that the answer is robust.

### How to Implement Self-Consistency in a Corporate Setting

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

### When to Use Self-Consistency

This technique is not necessary for every task. Drafting a meeting summary, reformatting a spreadsheet, or translating a policy document into plain English does not require multiple reasoning paths. Self-consistency is worth the additional time investment when:

- The decision has significant financial or contractual consequences
- The source material is ambiguous or contains conflicting data
- You need to present a recommendation to a senior stakeholder and want to stress-test your reasoning first
- A previous single-path analysis produced an answer that surprised you or felt unstable

**Wrap-up**
A single AI response to a complex question is a starting point, not a verdict. Self-consistency prompting gives you a mechanism to pressure-test that starting point by forcing the model to arrive at the same destination via multiple routes. Where the routes converge, you have a defensible conclusion. Where they diverge, you have a map of the genuine complexity in the problem — which is itself valuable intelligence before a high-stakes decision.

---

## Chapter 2.7: Role Stacking

You are preparing a market entry brief for a new product launch. You need the analysis to be commercially rigorous, legally cautious, and written in a tone your marketing team will actually read rather than file and forget. The problem is that a commercially rigorous analyst writes very differently from a legally cautious compliance officer, and both of them write very differently from a marketing-savvy communicator.

Assigning one role — "Act as a Senior Business Analyst" — gets you one perspective. But the brief you actually need draws from all three simultaneously.

Role stacking is the technique that makes this possible.

### What Role Stacking Is

Role stacking involves assigning the AI multiple complementary personas within a single prompt, each responsible for a distinct aspect of the output. Rather than flattening all requirements into one generic professional archetype, you layer specific expertise on top of specific expertise, giving the model a composite identity that draws from multiple knowledge domains at once.

This works because of how role prompting affects the model's internal probability weights. When you assign the role of "Senior Corporate Risk Lawyer," you shift the statistical likelihood of the model reaching for legal vocabulary, cautious phrasing, and risk-first framing. When you layer a second role — "experienced in translating legal analysis for non-legal executive audiences" — you simultaneously apply a translation filter to that legal vocabulary. The model is not choosing between the two roles; it is synthesising them.

### Designing a Stacked Role

A well-constructed stacked role has three components:

1. **The Primary Expertise:** The core professional domain the analysis must come from.
2. **The Secondary Filter:** A modifier that shapes how the primary expertise is expressed.
3. **The Audience Lens:** An explicit note on who the output is for, which constrains vocabulary and assumed knowledge.

> *Weak single role:* "Act as a business analyst."
>
> *Stacked role:* "Act as a Senior Commercial Strategy Director with deep expertise in market entry analysis, combined with the communication style of an experienced management consultant who writes board-level briefings for non-technical executives."

The stacked version gives the model three simultaneous constraints: the depth of a strategy expert, the structure of a consultant's deliverable, and the accessibility of board-level writing. These three layers produce a fundamentally different output than any one of them applied alone.

### Plug-and-Play Example — Market Entry Brief

> **[Context]** We are a mid-sized UK-based SaaS company considering entry into the Southeast Asian enterprise market, starting with Singapore and Malaysia. The attached document contains our current product specifications, pricing model, and a competitive landscape overview prepared by our sales team.
>
> **[Role]** Act as a Senior Commercial Strategy Director with fifteen years of experience in Asia-Pacific market entry, combined with the analytical rigour of a management consultant and the communication clarity of an executive communications specialist who writes for C-suite audiences with limited time.
>
> **[Action]** Analyse the attached document and produce a market entry risk and opportunity assessment.
>
> **[Format]** Structure the output as: (1) a three-sentence executive summary; (2) three key market opportunities with a one-sentence commercial rationale for each; (3) three primary risks with a one-sentence mitigation recommendation for each; (4) a single recommended first action. Maximum 400 words total.
>
> **[Target]** The primary reader is the CEO. She has ten minutes to review this before the board strategy session. She will not read anything longer than the format specified above.

### Where Role Stacking Adds the Most Value

| Task | Recommended Stack |
|---|---|
| Legal contract review for non-lawyers | Senior Commercial Lawyer + Executive Communications Specialist |
| Technical specification writing for clients | Senior Engineer + Client-Facing Account Director |
| Financial analysis for operational teams | Senior Financial Analyst + Plain-Language Business Writer |
| HR policy drafting | Senior HR Director + Employment Law Specialist |
| Marketing copy for regulated industries | Senior Copywriter + Compliance and Risk Adviser |

**Wrap-up**
Most corporate tasks require more than one type of expertise expressed simultaneously. A single role gives you depth in one dimension; a stacked role gives you depth across several. By deliberately layering complementary personas, you stop forcing the model to choose between being technically accurate and being readable — and start receiving outputs that are both.

---

## Chapter 2.8: Negative Prompting

You ask the AI to write a project status update for the executive team. The output arrives: four paragraphs, polished, confident — and dense with phrases like "it is important to note," "going forward," "at this point in time," and "synergies across the business." Every sentence is technically accurate. Every sentence sounds like it was written by a committee. The executive team will read the first line and stop.

You did not tell the AI what to exclude. So it included everything in its statistical vocabulary for "professional project updates" — which, having been trained on millions of corporate documents, is heavily weighted toward exactly this kind of hollow boardroom language.

Negative prompting is the discipline of defining what the output must not contain, in addition to what it must.

### Why Negative Prompting Is a Distinct Skill

Most prompting instruction focuses on telling the model what to do: extract this, format that, write in this tone. Negative prompting inverts the lens entirely. Rather than sculpting the positive space of the output, you are carving out the negative space — the patterns, vocabulary, formats, and behaviors you explicitly do not want.

This matters because LLMs are trained to be helpful and comprehensive. Left without explicit exclusion constraints, the model defaults to including every type of content it associates with the requested output category. Ask for a professional email and you will receive a professional email — complete with an opening pleasantry, a closing offer to answer questions, three layers of hedging on any assertion, and a signature block placeholder you will have to delete manually every single time.

These defaults are not errors. They are the model doing exactly what it was trained to do. Negative prompting overrides them.

### The Three Categories of Negative Constraints

**1. Vocabulary Exclusions**
Direct the model to avoid specific words, phrases, or linguistic patterns that weaken the output.

> *"Do not use the following phrases anywhere in the output: 'it is important to note,' 'going forward,' 'at the end of the day,' 'synergies,' 'leverage,' 'deep dive,' 'circle back,' or 'touch base.' If you find yourself about to use any of these phrases, replace them with a direct, specific statement."*

**2. Content Exclusions**
Prevent the model from including categories of content that are irrelevant to your task.

> *"Do not include any background context explaining what a vendor contract is or why SLAs matter. Do not include an introduction summarising what you are about to do. Do not include a closing paragraph offering to answer follow-up questions. Output only the analysis."*

**3. Structural Exclusions**
Prevent unwanted formatting defaults.

> *"Do not format the output as a bulleted list. Do not use headers or subheadings. Write in concise, flowing paragraphs only."*

### Plug-and-Play Example — Executive Status Update

Without negative constraints, ask the AI for a project status update and it will produce something generically professional. With them:

> **[Context]** Our new ERP implementation is two weeks behind schedule due to a data migration issue in the finance module. The vendor has committed to a revised go-live date of March 15th.
>
> **[Role]** Act as a Senior Project Director writing an internal update for executive leadership.
>
> **[Action]** Write a project status update communicating the delay, the cause, and the revised timeline.
>
> **[Format]** Three short paragraphs: (1) current status, (2) root cause, (3) revised plan. Maximum 150 words.
>
> **[Target]** Executive leadership team. They are time-poor and expect directness.
>
> **[Negative Constraints]** Do not use the following phrases: "going forward," "it is important to note," "at this stage," "we are working hard to," "synergies," or "touch base." Do not open with a pleasantry. Do not close with an offer to answer questions. Do not hedge the revised timeline with qualifiers — state the date as a firm commitment. Do not include more than three paragraphs.

### The "Boundary Box" Mental Model

Think of a well-engineered prompt as a boundary box. Your positive instructions (CRAFT) define the interior — what the output must contain and how it must be structured. Your negative constraints define the walls — what cannot enter the box regardless of the model's default tendencies.

A box with only an interior and no walls is not a container. It is just a suggestion.

**Wrap-up**
Every AI output is shaped as much by what you did not say as by what you did. The model's defaults — comprehensive, polished, pleasantry-rich, hedge-laden — are the residue of its training data, not a deliberate editorial choice. Negative prompting gives you the tool to override those defaults surgically, producing outputs that are sharper, more direct, and immediately usable rather than endlessly editable.

---

## Chapter 2.9: Decomposition Prompting

A common mistake even experienced prompt engineers make is sitting down to write a prompt for a complex task without first thinking clearly about what the task actually requires. The prompt ends up as an ambitious paragraph that asks the AI to do too much, defines the goal loosely, and hopes the model can infer the rest. It cannot.

Decomposition prompting addresses the problem one step before you write the prompt at all. It is a planning discipline applied to the task itself — breaking the problem down into its constituent parts before deciding how to instruct the AI. The quality of the output depends not just on how well you write the prompt, but on how well you understand the task you are prompting for.

### What Decomposition Prompting Is

Decomposition prompting is the practice of systematically mapping a complex task into its smallest independent logical components before designing the prompt architecture. Rather than describing the end goal and hoping the model figures out the path, you work backwards from the final deliverable to identify every distinct step the task requires — and then decide, for each step, whether it needs its own prompt, can be handled by a constraint within a single prompt, or does not require AI involvement at all.

The distinction between decomposition and prompt chaining (Chapter 2.4) is important. Prompt chaining is the execution method: running a sequence of prompts where each output feeds the next. Decomposition is the planning method that tells you how many prompts you need, what each one should do, and in what order. You decompose first, then chain.

### The Decomposition Process

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

### Plug-and-Play Example — Procurement Brief

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

---

## Chapter 2.10: Contrastive Prompting

You have written a CRAFT prompt for a client proposal. The Role is defined, the Action is precise, the Format is specified. The output arrives and is technically correct — but something about it is still subtly wrong. The tone is close but not quite right. The level of formality is slightly off. The model has made a reasonable interpretation of your instructions, just not your interpretation.

The challenge is that when you read "professional and authoritative," you have a very specific mental image of what that looks like — shaped by years of working in your industry, with your clients, in your organisation's culture. The model has a statistical average of what "professional and authoritative" looks like across the entire internet. These two things are not the same.

Contrastive prompting gives you a way to close that gap.

### What Contrastive Prompting Is

Contrastive prompting involves showing the AI an example of what you explicitly do not want alongside — or instead of — an extended description of what you do want. Rather than trying to describe the positive target in more and more precise language, you show a negative example that illustrates the failure mode, and instruct the model to produce the opposite.

This technique works because contrast is a more efficient signal than description. Telling someone "I want writing that is confident and direct" is far less precise than showing them a sample of writing that is hedging and passive, and saying "Do not write like this." The negative example communicates not just a quality, but the specific manifestation of the quality you are trying to avoid.

### Three Ways to Use Contrastive Prompting

**Method 1 — The Negative Example in the Prompt**

Provide an example of a poor output directly within the prompt and instruct the model to avoid it.

> **[Plug-and-Play Example — Client Email]**
>
> *"Draft a client update email informing them that their project deadline has been extended by two weeks.*
>
> *Do NOT write it like this:*
>
> 'We wanted to reach out and touch base regarding the project timeline. We are working extremely hard to ensure the best possible outcome, and at this stage, it is important to note that we are experiencing some unforeseen challenges that may potentially impact the delivery schedule going forward. We hope this does not cause too much inconvenience and remain available to discuss further at your convenience.'*
>
> *That example fails because it is vague, passive, hedge-laden, and lacks a specific revised date or a concrete plan.*
>
> *Instead, write an email that: states the new deadline in the first sentence, explains the cause in one sentence, states the mitigation plan in one sentence, and ends with a specific next step. Total length: under 100 words. Tone: direct, calm, and solution-focused."*

**Method 2 — Side-by-Side Contrast**

When training the AI on a specific output standard, provide one example of the wrong approach and one example of the right approach, labelled explicitly.

> *"Here are two examples of project status updates. Learn the difference between them.*
>
> *[WRONG]* 'We are currently assessing the situation and are working diligently to identify potential synergies that will allow us to address this challenge going forward.'*
>
> *[RIGHT]* 'The data migration issue has been isolated to the finance module. The vendor has committed to a fix by March 12th, which keeps the March 15th go-live date intact.'*
>
> *Write all project updates in the style of the RIGHT example."*

**Method 3 — Self-Contrastive Review**

Ask the model to generate two versions of the same output — one representing its default approach and one representing your target standard — and then identify what it changed.

> *"Draft the executive summary twice. Version A: write it as you normally would, following typical corporate communication conventions. Version B: rewrite it eliminating all hedging language, passive constructions, and generalisations — make every sentence specific and assertive. Then write one sentence explaining the key structural difference between the two versions."*

**Wrap-up**
When you find yourself struggling to describe exactly what you want in positive terms, stop trying to describe it and start showing what you do not want. A concrete negative example communicates nuance that paragraphs of positive instruction cannot. Contrastive prompting is particularly powerful for tone, voice, and style calibration — the qualities that are hardest to define abstractly and easiest to recognise when they are wrong.

---

## Chapter 2.11: Iterative Refinement as a Formal Methodology

There is an assumption embedded in how most people use generative AI — that the goal is to write one perfect prompt that produces one perfect output. This assumption is not just wrong; it is actively counterproductive. It leads to increasingly long, complicated prompts that try to anticipate every variable upfront, and to frustration when the inevitable first draft still requires editing.

Professional prompt engineers do not try to write the perfect prompt. They engineer a structured refinement process.

### The Shift from Single-Shot to Iterative Thinking

In a traditional software development context, the practice of iterative development — building a minimum viable product, testing it, gathering feedback, and refining in cycles — is standard methodology. No professional developer ships the first version of a system without testing it against real conditions.

Iterative refinement applies the same discipline to prompt engineering. You design an initial prompt that is architecturally sound, deploy it, evaluate the output against specific quality criteria, identify the gap between the output and the target, and make one targeted change. Then you run it again. The goal is not a perfect first draft; it is a progressively improving prompt that converges on a reliable output across multiple test inputs.

This is not the same as the follow-up techniques covered in Chapter 2.5. Follow-up prompting addresses output refinement within a single conversation. Iterative refinement is a methodology for improving the prompt itself across multiple independent test runs — refining the architecture rather than patching individual outputs.

### The Four-Stage Refinement Loop

**Stage 1 — Define the Success Criteria Before You Write the Prompt**

Before engineering the prompt, write down in precise terms what a successful output looks like. Not "it should be professional" but: "The output must be under 200 words, reference no more than three data points, use no jargon, and include a specific recommended action in the final sentence."

Success criteria are your evaluation rubric. Without them, refinement is guesswork.

**Stage 2 — Run the Prompt Against Multiple Test Inputs**

A prompt that works on one test case may fail on a slightly different input. Run your prompt against at least three to five real examples from your actual workflow before considering it production-ready.

> *Example: If you are building a prompt to classify customer complaint emails, test it on five actual emails — including at least one ambiguous case, one very short case, and one that contains unusual phrasing.*

**Stage 3 — Diagnose the Gap Systematically**

When an output fails to meet your criteria, categorise the failure before adjusting the prompt. The most common failure categories are:

| Failure Type | Likely Cause | Prompt Adjustment |
|---|---|---|
| Wrong tone or voice | Role is underspecified | Add more detail to the Role |
| Missing key content | Action is too broad | Break the Action into explicit sub-steps |
| Incorrect format | Format constraint is ambiguous | Add a structural example or template |
| Hallucinated data | No Escape Hatch constraint | Add an explicit "if data not present, state N/A" instruction |
| Output too long | No word or item limit | Add an explicit maximum length constraint |

**Stage 4 — Change One Variable at a Time**

This is the rule that separates systematic refinement from trial and error. If an output fails and you simultaneously change the Role, the Format, and the Action, you will not know which change fixed the problem — and you will not be able to replicate the fix reliably or explain it to a colleague.

Change one element. Retest. If the output improves, lock that change and move to the next variable. If it does not, revert and try a different adjustment. This is the same methodology used in A/B testing, applied to prompt architecture.

### Building a Prompt Version Log

For any prompt that will be used repeatedly across a team, maintain a simple version log: the prompt text, the date it was tested, the input used for testing, the failure observed, and the change made. This log transforms your prompt library from a static document into a living system that improves over time and can be handed to a new team member with full context.

**Wrap-up**
The goal of prompt engineering is not to produce one perfect response; it is to build a prompt architecture that reliably produces excellent responses across a wide range of real inputs. Iterative refinement is the methodology that gets you there — not through intuition or lucky rewrites, but through a structured, testable, and documentable improvement cycle. The professionals who build the most reliable AI workflows are not the ones who write the best first drafts; they are the ones who test the most rigorously.

---

## Chapter 2.12: The Prompting Techniques Catalogue

The chapters in Part 2 cover twelve distinct techniques. This catalogue is designed as a reference guide — a single page you can return to when you have a specific problem to solve and need to identify quickly which technique applies.

Each entry includes: what the technique does, when to use it, and the chapter to return to for the full explanation and worked example.

---

### Prompting Techniques: Quick Reference

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

### Technique Selection Decision Tree

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

### A Note on Combining Techniques

These techniques are not mutually exclusive. The most powerful prompts in a professional library typically combine several simultaneously.

A production-grade vendor evaluation prompt, for example, might use: CRAFT as the structural skeleton, Role Stacking to combine commercial and legal expertise, Negative Constraints to prevent hedging, Chain-of-Thought to force explicit reasoning, and a Self-Consistency check to validate the recommendation. Each technique addresses a different failure mode. Together, they create a prompt that is reliable, precise, and professionally defensible.

Start with CRAFT as your foundation. Add techniques as you identify specific failure modes in your outputs. Build incrementally, test rigorously, and document what works.