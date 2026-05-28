# Chapter 1.3: The Execution & The Audience (Action, Format, & Target)

With the scene set and the persona established, you must now execute the work. The final three pillars of the CRAFT framework—Action, Format, and Target—are where you control the exact logic, structural boundaries, and cognitive load of the final output.

## A - Action (What Do You Want?)

The Action is the engine of the prompt. The most common error professionals make here is using passive, ambiguous verbs. You must provide clear, unambiguous instructions to prevent the model from guessing your intent.

If you tell the AI to "look at," "review," or "analyze" a document, you are leaving too much room for interpretation. What does "analyze" mean? Does it mean find grammar mistakes? Does it mean check the math? Does it mean evaluate the tone?

You must define the precise cognitive operation you want the model to perform.

**Engineered Action looks like this:**

> *Bad Action:* "Review these three vendor proposals and tell me what you think."
> *Engineered Action:* "Compare these three vendor proposals. Extract the specific data privacy protocols for each. Identify any conflicting service level agreements (SLAs). Finally, highlight which vendor offers the fastest implementation timeline based strictly on the text provided."

Notice the use of strong imperative verbs: *Compare, Extract, Identify, Highlight*. The model is no longer guessing what "review" means; it is executing four distinct logical steps.

## F - Format (How Should It Look?)

Generative AI will default to outputting standard, conversational paragraphs. In a corporate setting, paragraphs are often the least efficient way to consume data. To make the output usable, you must explicitly constrain the output format.

Forcing the LLM into structured outputs—such as markdown tables, specific JSON structures, or strict bulleted lists—transforms raw text into immediately actionable business intelligence. Furthermore, strict formatting acts as a guardrail against hallucinations. If you limit the AI to exactly 15 words per bullet point, it does not have the "room" to invent long-winded, fabricated explanations.

**Engineered Format looks like this:**

> *"Format your response exactly as a Markdown table. The columns must be: Vendor Name, Implementation Time, Privacy Protocol, and SLA Conflicts. Do not output any introductory or concluding paragraphs, pleasantries, or warnings outside of this table. Limit the table contents to a maximum of 30 words per cell."*

## T - Target (Who Is This For?)

Finally, you must define the audience. A frequent organizational complaint is that AI outputs are either too dense for executives or too simplistic for engineers. This happens because the model does not know who will be reading the text, so it defaults to an average reading level.

Defining the Target audience allows you to instantly adjust the cognitive load, tone, and assumed knowledge base of the output.

**Engineered Target looks like this:**

> *"The target audience for this comparison table is the Chief Financial Officer. They have five minutes to read this before a board meeting and care strictly about bottom-line financial impact and corporate risk mitigation. Do not include technical IT integration jargon; translate all technical timeline concepts into financial and operational implications."*

**Wrap-up**
By defining a precise Action, a strict Format, and a highly specific Target audience, you build a rigid container for the AI's reasoning. The model is no longer generating a generic essay; it is synthesizing targeted business intelligence, structured exactly how your stakeholders need to consume it, with zero conversational fluff.
