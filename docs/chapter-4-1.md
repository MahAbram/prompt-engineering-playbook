# Chapter 4.1: Alternative Frameworks (COSTAR, RISEN, RTF)

You have spent the core of this playbook mastering the CRAFT framework. CRAFT is an exceptional, generalized architectural blueprint for corporate prompt engineering. However, as you encounter highly specialized workflows—such as coding autonomous agents, generating hyper-nuanced marketing copy, or executing strict multi-step procedural audits—you will find that a single framework cannot solve every problem optimally.

Advanced prompt engineers maintain a toolkit of various frameworks, deploying the specific architecture that best matches the cognitive load of the task. In this chapter, we will examine three powerful alternative frameworks, the exact enterprise scenarios where they outperform standard approaches, and a plug-and-play example for each.

## 1. The COSTAR Framework (For Nuanced Communications)

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

## 2. The RISEN Framework (For Procedural Execution)

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

## 3. The RTF Framework (For Rapid Utility)

Not every prompt requires a massive paragraph of instructions. For high-volume, low-complexity tasks—particularly when formatting data—prompt engineers use the RTF framework.

RTF stands for Role, Task, and Format. It strips away context and audience, focusing entirely on execution.

**The Architectural Advantage:** This minimalist approach is ideal for data formatting pipelines where context is completely irrelevant. The RTF structure reduces token consumption, saves processing time, and limits the model's ability to hallucinate by keeping the context window exceptionally small and devoid of conversational distractions.

**Plug-and-Play RTF Prompt (Scenario: Data Structuring):**

> **[Role]** Senior Data Engineer.
> **[Task]** Convert the following raw, comma-separated list of employee names, departments, and ID numbers into a nested JSON array of objects.
> **[Format]** Output ONLY valid JSON code. Do not include any markdown formatting blocks (like ```json), do not include any conversational text, and do not provide an explanation of your work.
> **[Data]** [Insert CSV text here]

## Synthesizing Frameworks with Best Practices

Regardless of which framework you deploy, advanced prompt engineering requires adhering to system-level best practices. For instance, Claude's best practices dictate utilizing XML tags (like `<instructions>`, `<input_data>`, and `<scratchpad>`) to physically separate your prompt components.

By wrapping your source data in `<data>` tags, you provide a mathematical boundary that prevents the LLM from confusing your instructions with the text it is supposed to be analyzing. This structural tagging can be applied to COSTAR, RISEN, or RTF workflows to further harden them against errors.

**Wrap-up**
A master carpenter does not use a sledgehammer for every task. By incorporating COSTAR for sensitive nuance, RISEN for strict procedures, and RTF for rapid formatting, you expand your engineering repertoire. You can now dynamically adapt your prompt architecture to the precise cognitive demands of the corporate problem in front of you.
