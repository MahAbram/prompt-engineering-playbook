# Chapter 2.10: Contrastive Prompting

You have written a CRAFT prompt for a client proposal. The Role is defined, the Action is precise, the Format is specified. The output arrives and is technically correct — but something about it is still subtly wrong. The tone is close but not quite right. The level of formality is slightly off. The model has made a reasonable interpretation of your instructions, just not your interpretation.

The challenge is that when you read "professional and authoritative," you have a very specific mental image of what that looks like — shaped by years of working in your industry, with your clients, in your organisation's culture. The model has a statistical average of what "professional and authoritative" looks like across the entire internet. These two things are not the same.

Contrastive prompting gives you a way to close that gap.

## What Contrastive Prompting Is

Contrastive prompting involves showing the AI an example of what you explicitly do not want alongside — or instead of — an extended description of what you do want. Rather than trying to describe the positive target in more and more precise language, you show a negative example that illustrates the failure mode, and instruct the model to produce the opposite.

This technique works because contrast is a more efficient signal than description. Telling someone "I want writing that is confident and direct" is far less precise than showing them a sample of writing that is hedging and passive, and saying "Do not write like this." The negative example communicates not just a quality, but the specific manifestation of the quality you are trying to avoid.

## Three Ways to Use Contrastive Prompting

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
