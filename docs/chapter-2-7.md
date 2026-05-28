# Chapter 2.7: Role Stacking

You are preparing a market entry brief for a new product launch. You need the analysis to be commercially rigorous, legally cautious, and written in a tone your marketing team will actually read rather than file and forget. The problem is that a commercially rigorous analyst writes very differently from a legally cautious compliance officer, and both of them write very differently from a marketing-savvy communicator.

Assigning one role — "Act as a Senior Business Analyst" — gets you one perspective. But the brief you actually need draws from all three simultaneously.

Role stacking is the technique that makes this possible.

## What Role Stacking Is

Role stacking involves assigning the AI multiple complementary personas within a single prompt, each responsible for a distinct aspect of the output. Rather than flattening all requirements into one generic professional archetype, you layer specific expertise on top of specific expertise, giving the model a composite identity that draws from multiple knowledge domains at once.

This works because of how role prompting affects the model's internal probability weights. When you assign the role of "Senior Corporate Risk Lawyer," you shift the statistical likelihood of the model reaching for legal vocabulary, cautious phrasing, and risk-first framing. When you layer a second role — "experienced in translating legal analysis for non-legal executive audiences" — you simultaneously apply a translation filter to that legal vocabulary. The model is not choosing between the two roles; it is synthesising them.

## Designing a Stacked Role

A well-constructed stacked role has three components:

1. **The Primary Expertise:** The core professional domain the analysis must come from.
2. **The Secondary Filter:** A modifier that shapes how the primary expertise is expressed.
3. **The Audience Lens:** An explicit note on who the output is for, which constrains vocabulary and assumed knowledge.

> *Weak single role:* "Act as a business analyst."
>
> *Stacked role:* "Act as a Senior Commercial Strategy Director with deep expertise in market entry analysis, combined with the communication style of an experienced management consultant who writes board-level briefings for non-technical executives."

The stacked version gives the model three simultaneous constraints: the depth of a strategy expert, the structure of a consultant's deliverable, and the accessibility of board-level writing. These three layers produce a fundamentally different output than any one of them applied alone.

## Plug-and-Play Example — Market Entry Brief

> **[Context]** We are a mid-sized UK-based SaaS company considering entry into the Southeast Asian enterprise market, starting with Singapore and Malaysia. The attached document contains our current product specifications, pricing model, and a competitive landscape overview prepared by our sales team.
>
> **[Role]** Act as a Senior Commercial Strategy Director with fifteen years of experience in Asia-Pacific market entry, combined with the analytical rigour of a management consultant and the communication clarity of an executive communications specialist who writes for C-suite audiences with limited time.
>
> **[Action]** Analyse the attached document and produce a market entry risk and opportunity assessment.
>
> **[Format]** Structure the output as: (1) a three-sentence executive summary; (2) three key market opportunities with a one-sentence commercial rationale for each; (3) three primary risks with a one-sentence mitigation recommendation for each; (4) a single recommended first action. Maximum 400 words total.
>
> **[Target]** The primary reader is the CEO. She has ten minutes to review this before the board strategy session. She will not read anything longer than the format specified above.

## Where Role Stacking Adds the Most Value

| Task | Recommended Stack |
|---|---|
| Legal contract review for non-lawyers | Senior Commercial Lawyer + Executive Communications Specialist |
| Technical specification writing for clients | Senior Engineer + Client-Facing Account Director |
| Financial analysis for operational teams | Senior Financial Analyst + Plain-Language Business Writer |
| HR policy drafting | Senior HR Director + Employment Law Specialist |
| Marketing copy for regulated industries | Senior Copywriter + Compliance and Risk Adviser |

**Wrap-up**
Most corporate tasks require more than one type of expertise expressed simultaneously. A single role gives you depth in one dimension; a stacked role gives you depth across several. By deliberately layering complementary personas, you stop forcing the model to choose between being technically accurate and being readable — and start receiving outputs that are both.
