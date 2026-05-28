# Chapter 4.5: Tool-Specific Syntax — Engineering for the Big Four Platforms

The CRAFT framework is deliberately tool-agnostic. The principles of Context, Role, Action, Format, and Target apply equally whether you are working in ChatGPT, Claude, Microsoft Copilot, or Google Gemini. The architecture does not change.

The interface does.

Each of the Big Four platforms has developed distinct conventions — syntax patterns, structural triggers, file-referencing methods, and persistent memory systems — that affect how your prompts are received, interpreted, and executed. Ignoring these conventions means leaving significant performance on the table. A CRAFT prompt that is structurally sound will produce better results if it is also adapted to the specific platform it runs on.

This chapter covers each platform in depth: what makes it architecturally distinct, why that distinction exists, how to adapt your prompts to exploit it, and the specific conventions to use in practice.

One important caveat applies to everything in this chapter: these are platform-level features, not underlying model properties. They are maintained by product teams, updated with each release cycle, and subject to change. Treat the specifics here as a reliable current snapshot rather than permanent specifications, and verify against each platform's official documentation when building production-grade workflows.

---

## 1. Claude (Anthropic) — XML Structural Tagging

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

## 2. Microsoft Copilot (M365) — Graph-Grounded File References

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

## 3. Google Gemini — Workspace Integration and the `@` Operator

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

## 4. ChatGPT (OpenAI) — Markdown Structure and Custom GPTs

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

## The Big Four at a Glance

| Platform | Primary Convention | Best Used For | Key Setup Feature |
|---|---|---|---|
| **Claude** | XML structural tags | Long document analysis, complex multi-part prompts | Projects + Custom Instructions for persistent CRAFT |
| **Microsoft 365 Copilot** | `/` Graph file references | Cross-document analysis using live organisational data | Works within existing M365 security and permissions |
| **Google Gemini** | `@` Workspace references | Analysis of live Google Drive, Docs, and Sheets data | Gems for persistent role and format configuration |
| **ChatGPT** | Markdown headers and `---` separators | Structured multi-section prompts; high-volume content workflows | Custom GPTs for persistent system prompts and knowledge files |

---

## The Practical Recommendation: Test the Same Prompt on Two Platforms

The most efficient way to understand platform differences is to run an identical CRAFT prompt — unadapted — through two different tools and compare the outputs. The variance in tone, structure, and completeness will tell you more about each platform's defaults than any specification table.

Then adapt the same prompt to each platform's native conventions and run it again. The improvement from adaptation versus the unadapted baseline is your evidence for why platform-specific syntax matters.

Use the conventions in this chapter as your starting point for adaptation. Use your own task results as the benchmark for whether they are working.

**Wrap-up**
The CRAFT framework gives you a universal architecture. Platform conventions give you the fine-tuning that extracts maximum performance from each tool. Claude rewards structural clarity through XML tagging. Copilot rewards data grounding through Graph references. Gemini rewards Workspace integration through `@` operators. ChatGPT rewards visual prompt organisation through Markdown. None of these conventions require technical expertise to apply — they are interface adaptations, not engineering skills. But the professionals who know them will consistently outperform those who do not, on the same models, with the same underlying prompts.
