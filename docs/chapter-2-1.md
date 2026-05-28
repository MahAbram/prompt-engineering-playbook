# Chapter 2.1: The Anatomy of a Bad Prompt

You have learned the CRAFT framework. You understand, in theory, that vague instructions produce vague results. But theory has a way of dissolving under the pressure of a real deadline. You sit down, paste a document into the chat window, type something reasonable-sounding, and hit Enter — only to receive a response so generic it could have been written by a bored summer intern on their last day before vacation.

This is not a model failure. It is a prompt failure. And the only way to reliably avoid it is to understand, precisely, what makes a prompt collapse.

This chapter is a forensic examination of three real corporate prompts that fail — and a clear explanation of exactly why each one breaks down mechanically before showing the engineered alternative.

## The Three Failure Modes

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

## The Diagnostic Checklist

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
