# Part 4: Advanced Prompt Engineering (Under the Hood)

## Chapter 4.1: Alternative Frameworks (COSTAR, RISEN, RTF)

You have spent the core of this playbook mastering the CRAFT framework. CRAFT is an exceptional, generalized architectural blueprint for corporate prompt engineering. However, as you encounter highly specialized workflows—such as coding autonomous agents, generating hyper-nuanced marketing copy, or executing strict multi-step procedural audits—you will find that a single framework cannot solve every problem optimally.

Advanced prompt engineers maintain a toolkit of various frameworks, deploying the specific architecture that best matches the cognitive load of the task. In this chapter, we will examine three powerful alternative frameworks, the exact enterprise scenarios where they outperform standard approaches, and a plug-and-play example for each.

### 1. The COSTAR Framework (For Nuanced Communications)

When the final output requires an extreme degree of stylistic precision—such as drafting sensitive corporate communications, brand-aligned marketing copy, or highly localized client emails—the COSTAR framework is superior.

COSTAR stands for Context, Objective, Style, Tone, Audience, and Response.

* **Context:** The background information.
* **Objective:** The core task the AI must accomplish.
* **Style:** The specific writing style (e.g., mimicking a specific author, a corporate brand guide, or a journalistic format).
* **Tone:** The emotional resonance (e.g., empathetic, urgent, authoritative).
* **Audience:** The target demographic.
* **Response:** The required output format (JSON, markdown, XML).

**The Architectural Advantage:** Notice how COSTAR splits the "Role" and "Target" from CRAFT into "Style," "Tone," and "Audience". In CRAFT, if you assign the role of "Marketing Director," the AI assumes a default tone. COSTAR forces you to explicitly engineer the emotional and stylistic parameters separately. This is vital when the *style* of the document (e.g., a formal legal brief) must contrast with the *tone* (e.g., collaborative and friendly).

**Plug-and-Play COSTAR Prompt (Scenario: Delicate Client Communication):**

> **[Context]** We are an enterprise software agency. The custom HR dashboard we are building for our client, Acme Corp, is delayed by two weeks due to unforeseen API integration issues with their legacy database.
> **[Objective]** Draft an update email informing the client of this delay while maintaining their absolute trust in our technical competence.
> **[Style]** Write in the style of a high-end, white-glove agency Account Executive. The writing must be crisp, highly professional, and solution-oriented.
> **[Tone]** Empathetic and reassuring, but never overly apologetic or desperate. Project calm authority.
> **[Audience]** The recipient is the Chief Operating Officer of Acme Corp. She is highly impatient, dislikes technical jargon, and cares exclusively about modified timelines and bottom-line impact.
> **[Response]** Provide a single email draft. Include a clear, non-alarming subject line. Format the updated timeline as a bulleted list. Do not include any placeholder text (like "[Insert Name Here]"); use the company names provided.

### 2. The RISEN Framework (For Procedural Execution)

When you need the AI to act as an operational machine executing a strict Standard Operating Procedure (SOP) on complex data, the RISEN framework is highly effective.

RISEN stands for Role, Instructions, Steps, End Goal, and Narrowing.

* **Role:** The persona the AI adopts.
* **Instructions:** The overarching directive.
* **Steps:** The explicit, numbered sequence of operations the AI must follow in order.
* **End Goal:** A clear statement of what the final success state looks like.
* **Narrowing (Constraints):** The negative constraints and boundaries.

**The Architectural Advantage:** RISEN is optimized for complex, multi-stage data processing. By explicitly hardcoding the "Steps," you are manually engineering a linear Chain-of-Thought pathway directly into the prompt's skeleton. If you are asking an AI to audit a 100-page financial disclosure, you do not want it guessing the methodology; you force it to follow your exact cognitive steps.

**Plug-and-Play RISEN Prompt (Scenario: Compliance Auditing):**

> **[Role]** Act as a Senior Information Security Auditor. You are rigorous, detail-oriented, and highly analytical.
> **[Instructions]** Audit the attached vendor IT security policy for gaps against our internal baseline requirements.
> **[Steps]** > 1. Scan the text specifically for mentions of "data encryption at rest."
> 2. Scan the text for "employee offboarding protocols" and timeline SLAs.
> 3. Scan the text for "incident response times" regarding data breaches.
> 4. Cross-reference what you found against standard SOC2 requirements and flag any missing elements from these three specific categories.
> **[End Goal]** A structured compliance audit report that immediately alerts procurement to critical security gaps before a contract is signed.
> **[Narrowing]** Do not evaluate or summarize any sections of the policy outside of encryption, offboarding, and incident response. Keep the final report under 300 words. Format the gaps as a numbered list.
> **[Source Data]** [Insert Vendor Policy Text Here]

### 3. The RTF Framework (For Rapid Utility)

Not every prompt requires a massive paragraph of instructions. For high-volume, low-complexity tasks—particularly when formatting data—prompt engineers use the RTF framework.

RTF stands for Role, Task, and Format. It strips away context and audience, focusing entirely on execution.

**The Architectural Advantage:** This minimalist approach is ideal for data formatting pipelines where context is completely irrelevant. The RTF structure reduces token consumption, saves processing time, and limits the model's ability to hallucinate by keeping the context window exceptionally small and devoid of conversational distractions.

**Plug-and-Play RTF Prompt (Scenario: Data Structuring):**

> **[Role]** Senior Data Engineer.
> **[Task]** Convert the following raw, comma-separated list of employee names, departments, and ID numbers into a nested JSON array of objects.
> **[Format]** Output ONLY valid JSON code. Do not include any markdown formatting blocks (like ```json), do not include any conversational text, and do not provide an explanation of your work.
> **[Data]** [Insert CSV text here]

### Synthesizing Frameworks with Best Practices

Regardless of which framework you deploy, advanced prompt engineering requires adhering to system-level best practices. For instance, Claude's best practices dictate utilizing XML tags (like `<instructions>`, `<input_data>`, and `<scratchpad>`) to physically separate your prompt components.

By wrapping your source data in `<data>` tags, you provide a mathematical boundary that prevents the LLM from confusing your instructions with the text it is supposed to be analyzing. This structural tagging can be applied to COSTAR, RISEN, or RTF workflows to further harden them against errors.

**Wrap-up**
A master carpenter does not use a sledgehammer for every task. By incorporating COSTAR for sensitive nuance, RISEN for strict procedures, and RTF for rapid formatting, you expand your engineering repertoire. You can now dynamically adapt your prompt architecture to the precise cognitive demands of the corporate problem in front of you.

---

## Chapter 4.2: Advanced Reasoning — Beyond the Straight Line
 
In Part 2, you learned Chain-of-Thought prompting: forcing the model to document its logic step by step before committing to a conclusion. CoT is linear. The model starts at Step 1, works through to Step N, and arrives at an answer. For most corporate tasks — calculating a commission structure, auditing a clause against a standard, summarising a document — linear reasoning is sufficient.
 
But some problems are not linear. Strategic decisions involve competing priorities with no objectively correct answer. Novel legal or regulatory situations have no direct precedent to reason from. High-stakes recommendations carry the risk of groupthink — the model latching onto the first statistically probable conclusion and dressing it up as rigorous analysis.
 
This chapter covers three reasoning architectures that go beyond the straight line: branching, analogical, and adversarial. Each addresses a different type of problem that linear CoT cannot solve reliably.
 
---
 
### 1. Tree-of-Thought (Branching Reasoning)
 
Tree of Thoughts (ToT) generalises Chain-of-Thought by instructing the model to explore multiple reasoning paths simultaneously rather than committing to a single line of logic.
 
The architectural problem ToT solves is error compounding. In a standard CoT prompt, if the model makes a flawed assumption at Step 2 of a ten-step reasoning chain, that error propagates through every subsequent step. The final answer is wrong, but it is wrapped in ten steps of confident-sounding logic that makes the error difficult to spot.
 
ToT forces the model to branch at each decision point — generating several distinct hypotheses, evaluating each against the evidence, eliminating weak paths, and converging on the answer that survives scrutiny from multiple angles. It is the difference between one analyst working a problem in isolation and three analysts working it independently before comparing conclusions.
 
**When to use it:** Complex strategic or operational decisions where the problem has multiple plausible interpretations and a single line of reasoning is insufficient — revenue decline analysis, supplier risk assessment, market entry evaluation.
 
**Plug-and-Play Example — Revenue Decline Analysis:**
 
> *"Three independent analysts — a Chief Financial Officer, a Chief Marketing Officer, and a Chief Operations Officer — are each examining the attached Q3 revenue data.*
>
> *Step 1: Each analyst writes their independent hypothesis for the revenue decline, drawing only on the data provided. Do not allow the analysts to consult each other at this stage.*
>
> *Step 2: Each analyst reviews the other two hypotheses and identifies the single strongest flaw in each, citing a specific data point from the report that contradicts it.*
>
> *Step 3: Each analyst revises their hypothesis to account for the critiques received. Where all three revised hypotheses converge on the same root cause, state that as the consensus finding. Where they diverge, identify the specific data gap that would need to be resolved to reach consensus.*
>
> *Output each step in clearly labelled sections."*
 
The multi-step structure forces genuine branching rather than the model simply generating three slight variations of the same answer. The critique step in particular — asking each persona to find a flaw using specific data — prevents the model from producing agreeable-sounding hypotheses that do not actually hold up under scrutiny.
 
---
 
### 2. Analogical Reasoning Prompting
 
Analogical reasoning prompting instructs the model to solve a novel problem by first identifying a structurally similar problem it has strong precedent for, solving that analogue explicitly, and then mapping the solution logic across to the original problem.
 
Research from Google DeepMind (2022) demonstrated that analogical prompting consistently outperforms standard zero-shot Chain-of-Thought on abstract and novel reasoning tasks — precisely because it anchors the model's reasoning in a well-understood structural parallel rather than asking it to reason from scratch in unfamiliar territory.
 
The practical insight is straightforward. LLMs have seen millions of solved problems in their training data. When you present a problem that closely resembles one of those solved cases, the model can reason with high confidence. When you present a genuinely novel problem, it is working without that scaffolding. Analogical prompting bridges the gap by explicitly instructing the model to find and use the scaffolding it already has.
 
**When to use it:** Novel regulatory situations with no direct precedent, unusual contractual structures, new market conditions that resemble historical patterns, or any strategic problem where the professional instinct is "this reminds me of..." — analogical prompting formalises that instinct and makes it rigorous.
 
**Plug-and-Play Example — Novel Regulatory Compliance:**
 
> *"Our company operates in a jurisdiction that has just introduced a new data localisation law requiring all customer data to be stored on servers physically located within the country. We have no prior experience with this specific regulation.*
>
> *Before advising on a compliance approach, identify the three most structurally similar regulatory challenges that enterprises have navigated successfully in other jurisdictions — regulations that imposed comparable data sovereignty, localisation, or residency requirements on multinational operations.*
>
> *For each analogue: briefly describe the regulation, state how organisations typically achieved compliance, and identify the core compliance principle that made that approach effective.*
>
> *Then map those principles to our current situation and recommend a compliance approach based on what has demonstrably worked in structurally similar cases. Flag any aspect of our situation that has no clear analogue and therefore carries higher uncertainty."*
 
The final instruction — flagging the aspects with no clear analogue — is important. It prevents the model from forcing a parallel that does not hold, and it surfaces exactly the areas where human judgment and specialist legal advice are genuinely required.
 
---
 
### 3. Prompt-Based Debate (Adversarial Reasoning)
 
Where Tree-of-Thought encourages multiple perspectives to converge toward consensus, Prompt-Based Debate deliberately engineers disagreement. Two or more personas are instructed to argue opposing positions on the same problem, with a neutral arbiter — also the model — evaluating the arguments and issuing a verdict.
 
The technique is directly analogous to the corporate practices of red-teaming, devil's advocate reviews, and pre-mortem analysis: structured processes designed to surface the strongest possible objection to a proposed decision before it is implemented. The risk it addresses is not hallucination or logical error — it is premature convergence. A model given a question and no adversarial constraint will almost always produce a balanced-sounding response that leans toward whatever position has more supporting evidence in the context provided. Debate prompting forces the model to argue the other side with equal rigour, which consistently surfaces objections the straightforward analysis would have smoothed over.
 
**When to use it:** Strategic recommendations before board presentation, vendor selection where there is a clear frontrunner you want to pressure-test, policy proposals that will face opposition, or any decision where the professional instinct is "I think I know the answer, but I want to make sure I am not missing something."
 
**Plug-and-Play Example — Vendor Selection Pre-Mortem:**
 
> *"We are preparing to recommend Vendor B for our new HR platform implementation. Before finalising the recommendation, run a structured debate.*
>
> *Advocate: You are a Senior Procurement Manager who has reviewed all three vendor proposals and is convinced Vendor B is the correct choice. Build the strongest possible case for Vendor B, drawing on the attached proposal documents. Do not hedge or qualify your position.*
>
> *Critic: You are a Senior IT Risk Manager who believes the committee is making a mistake by selecting Vendor B. Identify the three most serious risks or weaknesses in the Vendor B proposal that the Advocate has overlooked or underweighted. Support each objection with specific evidence from the proposal documents. Do not simply argue for a competing vendor — argue against this specific selection.*
>
> *Arbiter: Having heard both positions, identify which of the Critic's objections are genuinely material to the decision and which can be adequately mitigated. Issue a final verdict: proceed with Vendor B, proceed with conditions (specifying them), or reopen the evaluation. Justify the verdict in two sentences.*"
 
The Arbiter instruction is critical. Without it, the model produces a debate transcript and leaves the work of synthesis to the human reader. The Arbiter step converts adversarial output into a decision-relevant conclusion.
 
**The Self-Critique Paradox — A Caution**
 
A related technique — asking the model to critique its own output — is worth flagging as a limited tool rather than a reliable one. Research shows that when a model's underlying reasoning is flawed, asking the same model to evaluate that reasoning typically produces agreement rather than correction. The model "hallucinates" that its previous hallucination was correct.
 
The techniques in this chapter address this structurally: ToT forces independent paths before convergence, Analogical Reasoning anchors conclusions in proven precedent, and Debate forces genuine adversarial engagement rather than self-review. If you do use self-critique, always prompt the critique phase with an explicitly adversarial persona ("Act as a hostile auditor whose job is to find reasons to reject this") or cross-model validation (use Claude to critique a ChatGPT output). A neutral self-review is rarely more than a confirmation of the original answer.
 
**Wrap-up**
Advanced reasoning is the discipline of choosing the right cognitive architecture for the problem, not just the right prompt. Chain-of-Thought handles linear logic. Tree-of-Thought handles complex problems with multiple plausible interpretations. Analogical Reasoning handles novelty by finding structural precedent. Debate handles the risk of premature convergence by engineering genuine opposition. Together, these four architectures cover the full range of reasoning challenges a professional encounters in a corporate environment — from the routine to the genuinely novel to the politically contested.

---

## Chapter 4.3: Autonomous Patterns & Agentic Architecture
 
Up to this point, the playbook has treated AI as an isolated reasoning engine. You give it text, it processes that text, and it returns text. However, the true frontier of enterprise AI is agentic functionality: building systems where the AI does not just reason about the world but acts on it — searching the internet, querying databases, writing and executing code, and orchestrating sequences of tasks with minimal human intervention between steps.
 
To build and manage these systems, prompt engineers rely on two foundational concepts: the ReAct pattern, which governs how an agent reasons and acts in sequence, and Constitutional constraints, which govern what an agent is permitted to do regardless of what it is asked.
 
---
 
### 1. The ReAct Pattern (Reasoning + Acting)
 
Standard LLMs are bounded by their training data. They cannot retrieve live information, execute calculations against a live spreadsheet, or confirm whether a file exists on your server. The ReAct framework (Reason + Act) addresses this by combining the model's reasoning capability with the ability to invoke external tools — web search APIs, database queries, code execution environments, calendar integrations — and incorporate the results of those actions back into the reasoning loop.
 
In a ReAct architecture, the model does not simply generate an answer. It moves through an interleaved loop:
 
1. **Thought:** The model reasons about what it needs to do and what information it currently lacks.
2. **Action:** The model invokes a tool to retrieve or produce that information.
3. **Observation:** The model receives the tool's output.
4. **Thought:** The model reasons about the observation and decides what to do next.
This loop continues until the model has sufficient information to produce a final answer.
 
**A practical example of the ReAct loop in operation:**
 
> 1. **Thought:** *"The user has asked me to compare last quarter's actuals against the approved budget. I do not have this data in my context."*
> 2. **Action:** *Queries the connected financial database for Q3 actuals and the approved Q3 budget figures.*
> 3. **Observation:** *Returns: Actuals — £4.2M revenue, £3.1M costs. Budget — £4.5M revenue, £2.9M costs.*
> 4. **Thought:** *"I now have both datasets. Revenue missed budget by £300K (6.7% shortfall). Costs exceeded budget by £200K (6.9% overage). I can now produce the variance analysis."*
> 5. **Final Output:** Structured variance report delivered to the user.
 
**Why this matters for non-technical professionals:**
You do not need to build a ReAct agent to benefit from understanding how they work. When an AI agent available in your enterprise environment — a Copilot agent, a Claude integration, a custom GPT with connected tools — produces a wrong or unexpected answer, the failure almost always occurs at one of three points: the Thought step (the model misjudges what information it needs), the Action step (the tool is called with incorrect parameters), or the Observation step (the model misinterprets the tool's output). Knowing which loop stage failed tells you how to correct the prompt or the tool configuration.
 
**Engineering guardrails for ReAct prompts:**
When configuring or prompting an agentic system, always define the boundary of permitted actions explicitly.
 
> *"You have access to the following tools: web search, the internal SharePoint file index, and the financial reporting database. You may not execute any write operations, send any communications, or modify any files without explicit human confirmation of the specific action you intend to take. Before taking any action that is irreversible, state what you are about to do and wait for confirmation."*
 
The irreversibility constraint is the most important guardrail in agentic architecture. A model that can read is recoverable. A model that can write, send, or delete without a confirmation checkpoint is not.
 
---
 
### 2. Constitutional Constraints (Governing Agentic Behaviour)
 
When you grant an AI the autonomy to reason and act across multiple steps, the stakes of a misaligned output increase significantly. A single wrong sentence in a chat response is a minor problem. A wrong action taken by an autonomous agent — an email sent to the wrong recipient, a database record modified incorrectly, a financial figure misreported — can have serious operational consequences.
 
Anthropic pioneered the concept of Constitutional AI: training models against a fixed set of principles (a "constitution") that governs their behaviour at a fundamental level. The model is trained not just to follow instructions but to critique and revise its own outputs against these constitutional principles before producing a final response.
 
As an enterprise prompt engineer, you cannot change the underlying model's constitution — that is set by the model provider. What you can do is build a localised operational constitution into your system prompt: a set of non-negotiable rules that your agentic workflow must adhere to regardless of what the user requests.
 
**Engineered Operational Constitution:**
 
> *"You are bound by the following operational rules. These rules take precedence over all other instructions.*
>
> *Rule 1 — Data Privacy:* Never output, reproduce, or reference any personally identifiable information (PII) including names, email addresses, employee IDs, or salary figures. If source data contains PII, anonymise it before including it in any output.*
>
> *Rule 2 — Legal Disclaimer:* Any output that contains a legal interpretation, contractual recommendation, or compliance assessment must include the following statement at the end: 'This analysis is generated by AI and must be reviewed by a qualified legal professional before being relied upon.'*
>
> *Rule 3 — Irreversibility Gate:* Before taking any action that modifies, sends, or deletes data, state the exact action you intend to take and the specific data it will affect. Do not proceed until you receive explicit confirmation.*
>
> *Rule 4 — Scope Boundary:* If a user request falls outside the defined scope of this workflow, state that the request is outside scope and decline to proceed. Do not attempt to handle out-of-scope requests by improvising.*"
 
The value of an explicit operational constitution is not just compliance — it is also auditability. When a workflow produces an unexpected output, a well-documented constitution gives you a clear framework for diagnosing whether the model violated a rule, the rule was insufficiently specific, or the problem originated in the user's input.
 
**The relationship between constitutional constraints and negative prompting:**
Constitutional constraints are the enterprise-level application of the negative prompting principles covered in Part 2, Chapter 2.8. Individual negative prompts define what a single output must not contain. A constitutional constraint defines what an entire agentic system must never do, across all interactions, regardless of how the request is framed. The architecture is the same; the scope is organisation-wide rather than task-specific.
 
**Wrap-up**
Agentic AI represents a qualitative shift from AI as a reasoning tool to AI as an operational participant. The ReAct pattern governs how agents move between thinking and acting in a controlled loop. Constitutional constraints govern what agents are permitted to do within that loop. Together, they form the architectural foundation for enterprise AI systems that are both powerful and governable. For most professionals, the immediate value of understanding these patterns is not in building agents from scratch — it is in knowing how to configure, constrain, and diagnose the agentic tools that are increasingly embedded in the platforms they already use.

---

## Chapter 4.4: The Engineer's Control Panel
 
You have mastered alternative frameworks, advanced reasoning architectures, and agentic patterns. Yet you may still encounter moments where a structurally sound prompt yields a robotic response — or a carefully engineered workflow collapses when the source document is longer than expected.
 
When the architecture is correct but the output still fails, the problem is usually environmental. Advanced prompt engineers do not only manipulate the text of a prompt; they manipulate the conditions under which the model processes it — the creativity dial, the persistent memory environment, and the spatial architecture of the context window itself.
 
---
 
### 1. The Temperature Dial (Creativity vs. Determinism)
 
LLMs do not retrieve fixed answers; they calculate the statistical probability of the next word at every step. Temperature is the parameter that controls how the model selects from its probability distribution — effectively, the model's creativity dial.
 
- **Low temperature (0.0–0.2):** The model becomes deterministic. It almost always selects the highest-probability word, producing outputs that are predictable, precise, and consistent across repeated runs. Errors are reduced; novelty is eliminated.
- **High temperature (0.7–1.0+):** The probability distribution flattens. The model is willing to select lower-probability words, producing outputs that are more creative, varied, and occasionally surprising — but also more prone to structural drift and hallucination on factual tasks.
**Adjusting temperature in practice:**
 
In enterprise API environments and developer playgrounds, temperature is a literal numeric parameter you set before each call. In standard consumer chat interfaces — the ChatGPT, Claude, and Gemini web applications — the temperature is fixed by the platform and cannot be directly adjusted. What you can do is instruct the model to *behave* as if temperature were higher or lower, which influences word selection and creative range without altering the underlying sampling parameter.
 
| Task Type | Target Behavior | Prompt Instruction |
|---|---|---|
| Data extraction, JSON formatting, CSV conversion | Maximum determinism | *"Respond with strict precision. Do not vary your phrasing. Prioritise consistency over creativity."* |
| Compliance auditing, contract review | Low creativity | *"Be literal and conservative. Do not infer meaning beyond what the text explicitly states."* |
| Executive summary, internal communications | Balanced | No temperature instruction needed — platform default is typically appropriate |
| Marketing copy, brainstorming, hook generation | High creativity | *"Favour unconventional phrasing. Avoid standard corporate language. Prioritise originality over safety."* |
 
Note: these are behavioural instructions, not actual parameter changes. They influence the model's word selection tendencies without technically altering the sampling mechanism. For production workflows requiring guaranteed consistency — particularly those involving numerical data or structured outputs — API access with explicit temperature control is the more reliable approach.
 
---
 
### 2. System Prompts vs. User Prompts (Persistent Architecture)
 
A beginner pastes their full CRAFT prompt into the chat window every time they begin a new task. This wastes time, consumes context window space on repetitive instructions, and requires every team member to carry the full prompt in their head or in a separate document.
 
An engineer separates the **System Prompt** from the **User Prompt**.
 
At an architectural level, an LLM conversation consists of distinct message layers. The System Prompt operates in the background — it contains the persistent instructions, persona, and constraints that apply to the entire session. The User Prompt is the specific task or data submitted in each individual interaction.
 
The practical implication is significant. Once your CRAFT Role, Context, standing Format constraints, and any constitutional rules are embedded in a System Prompt, your daily interaction is reduced to the Action and the Source Data. The architecture runs invisibly in the background; you interact only with the variable parts of the task.
 
**How to implement this across the Big Four:**
 
- **ChatGPT — Custom GPTs:** Navigate to the GPT Builder and paste your persistent CRAFT architecture into the Instructions field. Upload any relevant knowledge files (brand guidelines, internal policies, product documentation). Once built, every conversation with that Custom GPT operates under those standing instructions automatically.
- **Claude — Projects:** Create a Project and paste your persistent Role, Context, and Format constraints into the Custom Instructions field. Upload reference documents as Project Knowledge. All conversations within the Project inherit the system architecture.
- **Gemini — Gems:** Create a Gem with your persistent instructions embedded. Gemini Gems function equivalently to Custom GPTs — a customised assistant with a fixed system prompt that applies across all sessions.
- **Microsoft 365 Copilot:** Persistent system-level configuration in M365 Copilot is primarily managed at the administrative level through Copilot Studio, rather than by individual users through a chat interface. For personal workflow automation, the most accessible option is building a detailed prompt template stored in a shared document that team members copy into each session.
**The workflow upgrade in practice:**
 
Before persistent architecture: a team member opens ChatGPT, pastes a 400-word CRAFT prompt, appends the source document, and submits.
 
After persistent architecture: a team member opens the department's Custom GPT, pastes the source document, and types a single Action instruction. The 400-word CRAFT context is already there.
 
For teams deploying shared prompt libraries, this architecture reduces the skill threshold required to use a well-engineered prompt correctly. The engineering is done once; the benefit is distributed across every person who uses the tool.
 
---
 
### 3. Context Window Management as an Engineering Tool
 
The context window is the model's working memory — the total amount of text it can hold and reason across in a single session, including your instructions, the source data, the conversation history, and the output it is generating. Modern frontier models have large context windows — measured in hundreds of thousands of tokens — but in practice, context management remains one of the most common sources of prompt failure for professionals working with long documents.
 
Understanding why requires a brief clarification. The issue is not usually that the document exceeds the context limit. It is that as the context window fills, the model's attention becomes unevenly distributed. Research on long-context LLM behaviour — including work by Liu et al. (2023), colloquially known as the "Lost in the Middle" paper — demonstrated that models reliably perform better on information placed at the beginning or end of a long context than on information buried in the middle. A model processing a 100-page document does not give equal attention to all 100 pages; it attends most strongly to the opening and closing content.
 
For a professional who pastes instructions at the top, appends a long document in the middle, and expects the model to follow the instructions precisely while processing the full document — this is a meaningful failure risk.
 
**Three techniques to engineer around it:**
 
**Technique 1 — Instruction Anchoring**
 
Place your most critical instructions both at the beginning and at the end of the prompt. The model is most attentive to these positions, so anchoring your key constraints at both ends maximises the probability that they remain active throughout the processing of a long document.
 
> *[CRAFT instructions at the top — Role, Action, Format, Target, Constraints]*
>
> *[Source document in the middle]*
>
> *[Single-sentence restatement of the most critical constraint at the bottom]:*
> *"Reminder: output only flagged compliance gaps. Do not summarise sections that contain no gaps."*
 
**Technique 2 — Document Chunking**
 
For very long documents, do not process the entire document in a single prompt. Divide the source material into logical sections and process each section independently, then combine the outputs in a final synthesis prompt.
 
> *Prompt 1:* "Process Sections 1–5 of the attached contract only. Extract every clause that creates financial liability. Output as a numbered list."
>
> *Prompt 2:* "Process Sections 6–10 only. Same task."
>
> *Synthesis Prompt:* "The two lists below are extracted liability clauses from the first and second halves of the same contract. Merge them into a single numbered list, remove any duplicates, and sort by risk rating from High to Low."
 
Chunking sacrifices some cross-document context — the model cannot see the connection between Section 2 and Section 9 in a single pass — but for extraction and categorisation tasks, it reliably outperforms a single overloaded prompt because each chunk receives the model's full attention at its position in the context window.
 
**Technique 3 — Rolling Summary**
 
For multi-turn workflows where the conversation history itself becomes long enough to degrade performance, use a rolling summary instruction to compress prior context before it accumulates.
 
> *"Before we continue, summarise everything we have established in this conversation so far into a structured briefing of under 200 words. I will use this summary as the starting context for the next session."*
 
This technique is particularly useful when a complex analysis spans multiple sessions. Rather than re-uploading the full previous conversation, you re-inject the compressed summary — preserving the essential context while keeping the new session's context window clean.
 
**The practical rule of thumb:**
 
If your source document plus your CRAFT instructions exceed roughly 20% of the model's stated context limit, apply at least one of the three techniques above. Below that threshold, standard single-prompt architecture is typically reliable.
 
**Wrap-up**
Environmental control is the difference between an engineer and a user. Temperature management ensures the model's creative disposition matches the task's requirements. System Prompts transform one-off CRAFT prompts into durable, team-wide infrastructure. Context Window Management prevents the silent degradation of output quality that occurs when long documents dilute the model's attention. None of these require technical access or API credentials to apply. They require only the understanding that the conditions surrounding a prompt matter as much as the prompt itself.

---

## Chapter 4.5: Tool-Specific Syntax — Engineering for the Big Four Platforms

The CRAFT framework is deliberately tool-agnostic. The principles of Context, Role, Action, Format, and Target apply equally whether you are working in ChatGPT, Claude, Microsoft Copilot, or Google Gemini. The architecture does not change.

The interface does.

Each of the Big Four platforms has developed distinct conventions — syntax patterns, structural triggers, file-referencing methods, and persistent memory systems — that affect how your prompts are received, interpreted, and executed. Ignoring these conventions means leaving significant performance on the table. A CRAFT prompt that is structurally sound will produce better results if it is also adapted to the specific platform it runs on.

This chapter covers each platform in depth: what makes it architecturally distinct, why that distinction exists, how to adapt your prompts to exploit it, and the specific conventions to use in practice.

One important caveat applies to everything in this chapter: these are platform-level features, not underlying model properties. They are maintained by product teams, updated with each release cycle, and subject to change. Treat the specifics here as a reliable current snapshot rather than permanent specifications, and verify against each platform's official documentation when building production-grade workflows.

---

### 1. Claude (Anthropic) — XML Structural Tagging

**The Distinctive Convention**

Claude was trained with explicit recognition of XML-style tags as structural delimiters within a prompt. Tags such as `<instructions>`, `<context>`, `<source_data>`, `<scratchpad>`, and `<output>` function as architectural boundaries — they tell the model where one type of content ends and another begins.

This is documented in Anthropic's official prompt engineering guidance and is not a quirk or an undocumented hack. It is a deliberate design choice made during training, and it meaningfully affects how the model allocates its attention across a long, complex prompt.

**Why This Exists**

Claude is particularly well-suited to long-document analysis — processing lengthy contracts, detailed reports, and multi-source research materials. When you paste a 30-page document into a prompt alongside your instructions, the model needs a reliable way to distinguish "the instructions I must follow" from "the document I must analyse." Without structural delimiters, the model treats the entire prompt as a continuous stream of text and must infer the boundary between instruction and source material from context. XML tags eliminate this ambiguity entirely.

**How to Apply It**

Wrap each CRAFT component in its corresponding tag. The names you use do not need to be from a fixed vocabulary — the model responds to any clearly labelled XML-style structure — but consistent naming across your prompt library makes your prompts readable and maintainable.

**Without XML tags (standard CRAFT):**

> *"Act as a Senior Compliance Analyst. Read the attached vendor agreement and identify every clause that creates financial liability for our organisation. Format the output as a numbered list with a risk rating for each item. The audience is the CFO.*
>
> *[Vendor Agreement Text — 28 pages of dense contract language follows here]"*

In this format, the model must infer where the instructions end and the source document begins. For short prompts, this works. For a prompt where the instructions and a 28-page document occupy the same context window, the model's attention can drift and the instruction fidelity weakens.

**With XML tags (Claude-optimised):**

```
<instructions>
Act as a Senior Compliance Analyst with expertise in commercial contract risk.
Read the vendor agreement in the <source_data> tags below.
Identify every clause that creates financial liability for our organisation.
For each clause: state the clause number, summarise the liability in plain English (one sentence), and assign a risk rating of High, Medium, or Low.
Do not summarise non-liability clauses. Output only the structured list.
The audience is the CFO — translate all legal terminology into financial and operational terms.
</instructions>

<source_data>
[Insert full vendor agreement text here]
</source_data>

<output_format>
Numbered list. Each entry: Clause Number | Plain-English Summary | Risk Rating.
No introductory or closing text.
</output_format>
```

The structural separation is now explicit. The model knows precisely what to follow, what to analyse, and what format to produce. For long documents, this architecture consistently produces more complete and precisely formatted outputs.

**Additional high-value tags for Claude prompts:**

| Tag | Use Case |
|---|---|
| `<scratchpad>` | Designate a reasoning section for chain-of-thought analysis before the final output |
| `<examples>` | Wrap few-shot examples to separate them cleanly from the target task |
| `<constraints>` | Isolate negative constraints and guardrails from the main instructions |
| `<source_data>` | Wrap any raw document, transcript, or data the model must analyse |
| `<output>` | Define the exact format and structure of the required response |

**Practical tip:** When using Claude for document-heavy tasks through the Claude Projects feature, paste your CRAFT Role, Format, and Constraints into the Project's Custom Instructions field. These become a persistent system prompt. Your daily interaction is then reduced to pasting new source data into a `<source_data>` tag and stating the specific Action — the rest of the architecture runs invisibly in the background.

---

### 2. Microsoft Copilot (M365) — Graph-Grounded File References

**The Distinctive Convention**

Microsoft 365 Copilot is architecturally different from the other three tools in one fundamental way: it operates inside your organisation's existing data ecosystem rather than as a standalone chat interface. Through Microsoft Graph — Microsoft's unified API that connects your email, calendar, Teams conversations, SharePoint files, and OneDrive documents — Copilot can reference real organisational data directly within a prompt.

The primary syntax for this is the `/` reference operator. Typing `/` in the Copilot prompt field opens a picker that surfaces files, meetings, people, and documents from your Microsoft 365 environment. You can reference them directly rather than copying and pasting their contents.

**Why This Exists**

The defining challenge of AI in an enterprise context is data grounding: getting the model to work with your specific organisational information rather than generating generic outputs from its training data. Microsoft's architectural solution is to close the gap between the AI and the data at the infrastructure level. Rather than asking employees to manually export documents and paste them into a chat window, Copilot pulls the data directly from the source.

This approach also maintains Microsoft's enterprise security model. Data referenced via Graph stays within your organisation's permission and compliance boundaries. A file you reference in a Copilot prompt is governed by the same access controls as the file itself.

**How to Apply It**

Use the `/` operator to reference documents, meetings, and data sources instead of copy-pasting. Combine it with your CRAFT architecture for maximum precision.

**Without Graph references (generic approach):**

> *"Summarise the key decisions from yesterday's project steering meeting and identify any action items assigned to the procurement team."*

This prompt requires you to either paste the meeting transcript manually or rely on the model's general knowledge — neither of which is reliable for a specific internal meeting.

**With Graph references (Copilot-optimised):**

> *"Act as a Senior Project Manager reviewing meeting outputs.*
>
> *Reference: /Yesterday's Project Steering Committee Meeting (Teams recording/transcript)*
>
> *Extract all decisions made and all action items explicitly assigned to the Procurement team. For each action item: state the task, the assigned owner, and the agreed deadline. Format as a table with three columns: Task | Owner | Deadline.*
>
> *Do not include discussion points or agenda items that did not result in a decision or action. The output will be pasted directly into a follow-up email to the Procurement team.*"

**Important distinctions across the Copilot product family:**

Copilot is not a single product. The `/` reference behaviour described above is specific to Microsoft 365 Copilot (the enterprise productivity assistant integrated into Word, Excel, Outlook, and Teams). The following Copilot products have different interfaces and conventions:

| Product | Primary Use | Key Distinction |
|---|---|---|
| Microsoft 365 Copilot | Productivity within Office apps | Graph-grounded, uses `/` file references |
| Copilot in Edge | Web browsing and research | References the current webpage; no Graph access |
| GitHub Copilot | Software development | Code-context aware; operates in IDE environments |
| Copilot Studio | Building custom AI agents | Low-code workflow builder; not a chat interface |

Confirm which Copilot product you are working with before applying the syntax conventions above — behaviour varies significantly between them.

**Practical tip:** In Microsoft 365 Copilot, the most powerful workflow pattern is the cross-document synthesis. Reference multiple files in a single prompt to generate comparative analysis your team would otherwise spend hours compiling manually.

> *"Compare the project scope in /ProjectAlpha_Scope_v1.docx against the current deliverable list in /ProjectAlpha_Scope_v3.docx. Identify every item that was removed, added, or modified between the two versions. Format the output as a three-column table: Item | Status (Added/Removed/Modified) | Impact on Timeline."*

---

### 3. Google Gemini — Workspace Integration and the `@` Operator

**The Distinctive Convention**

Gemini's primary integration advantage is its native connection to Google Workspace. In the Gemini web application, the `@` operator references files, documents, contacts, and applications from your Google account — pulling live data from Google Drive, Docs, Sheets, Gmail, and Calendar directly into your prompt context.

**Why This Exists**

Google's strategic positioning for Gemini is as the intelligence layer across Google Workspace — the same philosophy as Microsoft's Copilot, applied to the Google ecosystem. For organisations whose workflows are built on Docs, Sheets, and Drive, Gemini's `@` operator eliminates the manual export step between where data lives and where AI can act on it.

**How to Apply It**

Use the `@` operator to reference specific files and combine it with CRAFT architecture for structured outputs.

**Without Workspace integration (generic approach):**

> *"Analyse our Q3 sales performance and draft a summary for the board."*

The model has no access to your actual Q3 data and will either ask for it or generate a generic template.

**With `@` references (Gemini-optimised):**

> *"Act as a Senior Financial Analyst preparing a board summary.*
>
> *Source data: @Q3_Sales_Dashboard (Google Sheet), @Q3_Board_Narrative_Draft (Google Doc)*
>
> *Review the sales figures in the Sheet and the narrative draft in the Doc. Identify any factual discrepancies between the two — specifically any instance where the narrative states a figure that does not match the Sheet data. List each discrepancy as: Narrative Claim | Actual Sheet Figure | Variance.*
>
> *Then write a corrected two-paragraph executive summary using only figures that are verified in the Sheet. Maximum 150 words. Audience: non-finance board members who need the commercial story, not the accounting detail."*

**The Gems System — Persistent Prompting in Gemini**

Gemini's equivalent of ChatGPT's Custom GPTs is called Gems. A Gem is a customised version of Gemini with a persistent system prompt — a set of instructions, a defined persona, and optionally uploaded knowledge files that apply to every conversation within that Gem.

For a prompt engineer, the practical application is the same as Claude Projects and ChatGPT Custom GPTs: hardcode your CRAFT Role, Context, and Format constraints into the Gem's system instructions. The daily interaction then becomes the Action and the Source Data only.

A Finance team, for example, might maintain a single Gem called "Financial Report Analyser" with the following persistent instructions already embedded:

> *"You are a Senior Financial Analyst who writes for non-finance executive audiences. All outputs must be in plain English with no accounting jargon. All numerical claims must reference a specific cell or row from the source data provided. Maximum output length is 250 words unless explicitly instructed otherwise. Always end with a one-sentence recommended action."*

Every new financial document the team needs analysed is dropped into this Gem with only the specific Action — the rest of the architecture is already in place.

**Important note on feature availability:** Gemini's Workspace integrations are actively developed and the available extensions change with product updates. The `@` operator behaviour described here reflects standard Gemini availability as of this writing, but confirm current extension support — particularly for Google Calendar and Gmail references — against Google's official Gemini documentation before building production workflows.

---

### 4. ChatGPT (OpenAI) — Markdown Structure and Custom GPTs

**The Distinctive Convention**

ChatGPT does not have a single proprietary syntax trigger equivalent to Claude's XML tags or Copilot's `/` operator. Its primary structural convention is well-formatted Markdown — using headers, separators, and labelled sections to organise complex prompts visually. This is not exclusive to ChatGPT (Claude and Gemini also render Markdown), but ChatGPT's training and user base have made structured Markdown the dominant prompt organisation convention on that platform.

The more significant engineering feature is the Custom GPT system — OpenAI's mechanism for creating a persistent, customised AI assistant with a fixed system prompt, uploaded knowledge files, and optionally connected tools or APIs.

**Why Markdown Structure Matters**

In a standard ChatGPT conversation, the prompt is a single block of text. For a short, simple task, this is fine. For a complex CRAFT prompt with five labelled sections, attached source data, and multi-step action instructions, an unformatted block of text forces the model to parse structure from prose — introducing ambiguity at exactly the point where precision matters most.

Using Markdown headers (`##`) and horizontal rules (`---`) to separate CRAFT sections creates visual and semantic structure that helps both the model and the human engineer read and maintain the prompt.

**Without Markdown structure:**

> *"Act as a senior HR manager. Draft a performance review template for a mid-level marketing manager. It should cover goal achievement, communication skills, and team collaboration. Keep it under 500 words. Make it suitable for a manager reading it, not HR."*

Functional, but all five CRAFT variables are blended into one paragraph with no clear delineation.

**With Markdown structure (ChatGPT-optimised):**

```markdown
## Role
Act as a Senior HR Business Partner with fifteen years of experience
designing performance management frameworks.

## Context
We are a 200-person B2B SaaS company. This template is for annual
performance reviews of mid-level marketing managers (team size: 3-5 direct
reports). We use a 1-5 rating scale. The review is conducted by the
marketing director, not HR.

## Action
Draft a structured performance review template covering three competency
areas: (1) goal achievement against OKRs, (2) cross-functional communication,
and (3) team leadership. For each competency: include a rating field, two
guiding questions for the reviewer, and a free-text comments section.

## Format
A formatted template ready to copy into a Word document.
Use bold headers for each section.
Include clear field labels.
Maximum 500 words total.

---

## Target
The primary user is a Marketing Director conducting the review.
They are not an HR specialist. Avoid HR jargon.
Write guiding questions in plain, conversational language.
```

The structural separation makes each CRAFT element immediately identifiable. If the output is wrong, the relevant section of the prompt to revise is obvious.

**The Custom GPT System — Persistent Architecture**

Custom GPTs are the most powerful productivity feature in the ChatGPT ecosystem for professional prompt engineers. A Custom GPT is a version of ChatGPT with:

- A persistent system prompt (your CRAFT Role, Context, and standing Format constraints)
- Uploaded knowledge files (your brand guidelines, internal policies, product documentation)
- Optionally, connected tools (web browsing, code execution, or third-party APIs)

Once built, a Custom GPT runs your CRAFT architecture in the background for every conversation. Your daily interaction is reduced to pasting the Action and Source Data — the rest executes automatically.

A Marketing team might build a Custom GPT called "Brand Voice Editor" with the following system prompt permanently embedded:

> *"You are a Senior Brand Content Editor for [Company]. Our brand voice is: direct, conversational, and never uses corporate jargon. You always write in the second person. Maximum sentence length is 20 words. You never use the words 'leverage,' 'synergy,' 'going forward,' or 'deep dive.' When editing submitted content, produce two outputs: (1) the edited version with tracked changes indicated in [brackets], and (2) a bullet list of the three most significant changes made and why."*

Every piece of content the team submits to this GPT is automatically edited against this standard — no prompt required beyond pasting the draft.

---

### The Big Four at a Glance

| Platform | Primary Convention | Best Used For | Key Setup Feature |
|---|---|---|---|
| **Claude** | XML structural tags | Long document analysis, complex multi-part prompts | Projects + Custom Instructions for persistent CRAFT |
| **Microsoft 365 Copilot** | `/` Graph file references | Cross-document analysis using live organisational data | Works within existing M365 security and permissions |
| **Google Gemini** | `@` Workspace references | Analysis of live Google Drive, Docs, and Sheets data | Gems for persistent role and format configuration |
| **ChatGPT** | Markdown headers and `---` separators | Structured multi-section prompts; high-volume content workflows | Custom GPTs for persistent system prompts and knowledge files |

---

### The Practical Recommendation: Test the Same Prompt on Two Platforms

The most efficient way to understand platform differences is to run an identical CRAFT prompt — unadapted — through two different tools and compare the outputs. The variance in tone, structure, and completeness will tell you more about each platform's defaults than any specification table.

Then adapt the same prompt to each platform's native conventions and run it again. The improvement from adaptation versus the unadapted baseline is your evidence for why platform-specific syntax matters.

Use the conventions in this chapter as your starting point for adaptation. Use your own task results as the benchmark for whether they are working.

**Wrap-up**
The CRAFT framework gives you a universal architecture. Platform conventions give you the fine-tuning that extracts maximum performance from each tool. Claude rewards structural clarity through XML tagging. Copilot rewards data grounding through Graph references. Gemini rewards Workspace integration through `@` operators. ChatGPT rewards visual prompt organisation through Markdown. None of these conventions require technical expertise to apply — they are interface adaptations, not engineering skills. But the professionals who know them will consistently outperform those who do not, on the same models, with the same underlying prompts.

---

## Chapter 4.6: QA, Integrity, and Governance

An engineered prompt is a piece of corporate software. Just like traditional software, you cannot simply write a prompt, test it once, and deploy it to a hundred employees. Advanced prompt engineering requires rigorous quality assurance (QA), systematic model evaluation, and strict adherence to enterprise governance and professional integrity standards.

In this final chapter, we elevate prompt engineering from an individual skill to a department-wide strategic operation.

### 1. Model Evaluation and QA (Evals)

How do you mathematically prove that your prompt is effective? You cannot rely on a "vibe check." In the enterprise, prompt engineers run Model Evaluations (commonly called "Evals").

Model evaluation is the systematic process of assessing the performance, reliability, and accuracy of an AI model against specific benchmarks. To run an eval, you must create a "Golden Dataset"—a large set of real-world inputs mapped to perfectly human-verified outputs.

If you build a RISEN prompt designed to classify customer complaints, you do not test it with one complaint. You run a programmatic eval where the prompt processes 1,000 historical complaints. You then calculate the precision (how many it got right) and the recall (how many it missed) against the Golden Dataset. If you tweak the prompt's Context or Role, you run the exact same eval again. If the precision score drops, your tweak broke the prompt. This systematic evaluation is the only way to safely deploy a prompt library across a massive organization.

### 2. Accessibility and Inclusive Technology

A production-grade prompt must generate outputs that are usable by every stakeholder, including those with disabilities. AI accessibility demands that engineers proactively design prompts that adhere to inclusive technology frameworks.

Failing to prompt for accessibility creates digital barriers for neurodivergent users or those relying on screen readers. As discussed in Part 3, you must hardcode format constraints that demand semantic HTML, high-contrast descriptions, and plain-language summaries to ensure universal accessibility. Never allow an AI to generate ASCII art tables or use complex emojis in place of standard bullet points when sharing professional documentation.

### 3. Professional and Academic Integrity

As AI assumes a larger role in drafting communications, generating code, and analyzing data, the lines of accountability can blur. However, the consensus among governance experts is absolute: artificial intelligence acts as an accelerator, but human judgment drives innovation and accountability.

The impact of AI on professionalism mandates a zero-tolerance policy for "AI laundering"—the act of passing off AI-generated work as original human thought without verification. Professional integrity dictates that if an AI hallucinates a legal precedent or fabricates a financial metric, the human operator who deployed the prompt is entirely responsible for the failure. Professional integrity in AI requires maintaining transparency about when AI is used and ensuring rigorous human oversight.

### 4. AI Governance and Trust

Ultimately, the prompts you build and compile into your Personal Prompt Library must exist within an overarching framework of AI governance. AI governance is the set of rules, practices, and processes that ensure an organization's AI technologies are used responsibly, ethically, and securely.

Establishing global governance and localized corporate policies builds trust in AI systems. A robust governance framework dictates which models are approved for use, what data is classified as too sensitive for LLM ingestion, and how prompt libraries must be version-controlled, audited, and evaluated before they are distributed to non-technical teams.

**Wrap-up**
True prompt engineering extends far beyond the text box. It is a comprehensive discipline that encompasses architectural design, environmental controls, rigorous statistical evaluation, and unwavering professional integrity. By mastering these advanced frameworks and adhering to strict governance, you transition from someone who merely *uses* AI to a true architect who safely and efficiently scales AI operations across the modern enterprise.
