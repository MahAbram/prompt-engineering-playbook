import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "AI Integration Playbook",
  description: "A Playbook for the Modern Professional",
  base: '/ai-integration-playbook/',
  appearance: 'dark',

  themeConfig: {

    // ── TOP NAV ──────────────────────────────────────────────────
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Start Here', link: '/start-here' },
      {
        text: 'Parts',
        items: [
          { text: 'Part 1: The Architectural Foundation (The CRAFT Framework)', link: '/chapter-1-1' },
          { text: 'Part 2: High-Performance Prompting Techniques', link: '/chapter-2-1' },
          { text: 'Part 3: Defensive Prompting', link: '/chapter-3-1' },
          { text: 'Part 4: Advanced Prompt Engineering', link: '/chapter-4-1' },
        ]
      },
      { text: 'About', link: '/about' },
    ],

    // ── SIDEBAR ──────────────────────────────────────────────────
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Start Here', link: '/start-here' },
        ]
      },
      {
        text: 'Part 1: The Architectural Foundation (The CRAFT Framework)',
        collapsed: false,
        items: [
          { text: '1.1 The Engineering Mindset', link: '/chapter-1-1' },
          { text: '1.2 Setting the Scene & The Persona (Context & Role)', link: '/chapter-1-2' },
          { text: '1.3 The Execution & The Audience (Action, Format, & Target)', link: '/chapter-1-3' },
          { text: '1.4 CRAFT in Action (The Master Prompt)', link: '/chapter-1-4' },
        ]
      },
      {
        text: 'Part 2: High-Performance Prompting Techniques',
        collapsed: true,
        items: [
          { text: '2.1 The Anatomy of a Bad Prompt', link: '/chapter-2-1' },
          { text: '2.2 Showing, Not Just Telling — Few-Shot Prompting', link: '/chapter-2-2' },
          { text: '2.3 Forcing the Logic — Chain-of-Thought & Constraints', link: '/chapter-2-3' },
          { text: '2.4 Building Pipelines — Prompt Chaining', link: '/chapter-2-4' },
          { text: '2.5 The Art of the Follow-Up', link: '/chapter-2-5' },
          { text: '2.6 Self-Consistency Prompting', link: '/chapter-2-6' },
          { text: '2.7 Role Stacking', link: '/chapter-2-7' },
          { text: '2.8 Negative Prompting', link: '/chapter-2-8' },
          { text: '2.9 Decomposition Prompting', link: '/chapter-2-9' },
          { text: '2.10 Contrastive Prompting', link: '/chapter-2-10' },
          { text: '2.11 Iterative Refinement as a Formal Methodology', link: '/chapter-2-11' },
          { text: '2.12 The Prompting Techniques Catalogue', link: '/chapter-2-12' },
        ]
      },
      {
        text: 'Part 3: Defensive Prompting',
        collapsed: true,
        items: [
          { text: '3.1 Fact-Checking & Taming Hallucinations', link: '/chapter-3-1' },
          { text: '3.2 Auditing Bias & Ensuring Accessibility', link: '/chapter-3-2' },
          { text: '3.3 Security, Privacy & The Human Copilot', link: '/chapter-3-3' },
          { text: '3.4 Capstone Kickoff - The Personal Prompt Library', link: '/chapter-3-4' },
        ]
      },
      {
        text: 'Part 4: Advanced Prompt Engineering',
        collapsed: true,
        items: [
          { text: '4.1 Alternative Frameworks (COSTAR, RISEN, RTF)', link: '/chapter-4-1' },
          { text: '4.2 Advanced Reasoning — Beyond the Straight Line', link: '/chapter-4-2' },
          { text: '4.3 Autonomous Patterns & Agentic Architecture', link: '/chapter-4-3' },
          { text: '4.4 The Engineer's Control Panel', link: '/chapter-4-4' },
          { text: '4.5 Tool-Specific Syntax — Engineering for the Big Four Platforms', link: '/chapter-4-5' },
          { text: '4.6 QA, Integrity, and Governance', link: '/chapter-4-6' },
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'About', link: '/about' },
        ]
      },
    ],

    // ── SOCIAL + SEARCH + FOOTER ─────────────────────────────────
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MahAbram/prompt-engineering-playbook' }
    ],

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    footer: {
      message: 'Released under CC BY 4.0.',
      copyright: 'Copyright © 2025 MahAbram'
    }
  }
})
