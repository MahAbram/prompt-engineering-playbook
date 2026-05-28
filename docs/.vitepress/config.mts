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
          { text: 'Part 1: The AI Application Landscape', link: '/chapter-1-1' },
          { text: 'Part 2: Getting Hands-On', link: '/chapter-2-1' },
          { text: 'Part 3: Adopting AI at Work', link: '/chapter-3-1' },
          { text: 'Part 4: Advanced AI Integration', link: '/chapter-4-1' },
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
        text: 'Part 1: The AI Application Landscape',
        collapsed: false,
        items: [
          { text: '1.1 The Multi-Modal Ecosystem', link: '/chapter-1-1' },
          { text: '1.2 Expanding the Canvas (Vision, Audio, Video, Research, Code)', link: '/chapter-1-2' },
          { text: '1.3 The "Right Tool" Decision Framework', link: '/chapter-1-3' },
        ]
      },
      {
        text: 'Part 2: Getting Hands-On',
        collapsed: true,
        items: [
          { text: '2.1 The Writing & Creative Partner', link: '/chapter-2-1' },
          { text: '2.2 The Research Assistant', link: '/chapter-2-2' },
          { text: '2.3 The Data & Analytics Copilot', link: '/chapter-2-3' },
          { text: '2.4 The Administrative Engine', link: '/chapter-2-4' },
          { text: '2.5 The Presentation & Visual Storyteller', link: '/chapter-2-5' },
          { text: '2.6 The Design & UX Partner', link: '/chapter-2-6' },
          { text: '2.7 The Documentation & Legal Copilot', link: '/chapter-2-7' },
          { text: '2.8 The Training & Development Copilot', link: '/chapter-2-8' },
          { text: '2.9 The Career & Behavioral Coach', link: '/chapter-2-9' },
          { text: '2.10 Productivity Hacks', link: '/chapter-2-10' },
          { text: '2.11 Building Your Use Case Library', link: '/chapter-2-11' },
        ]
      },
      {
        text: 'Part 3: Adopting AI at Work',
        collapsed: true,
        items: [
          { text: '3.1 The Trust Gap & The Psychology of AI Adoption', link: '/chapter-3-1' },
          { text: '3.2 Superagency and Reshaping the Workforce', link: '/chapter-3-2' },
          { text: '3.3 AI Burnout and The Rise of the AI Champion', link: '/chapter-3-3' },
          { text: '3.4 Capstone Kickoff - The Personal AI Application Portfolio', link: '/chapter-3-4' },
        ]
      },
      {
        text: 'Part 4: Advanced AI Integration',
        collapsed: true,
        items: [
          { text: '4.1 The Economics & Architecture of AI (Beyond Subscriptions)', link: '/chapter-4-1' },
          { text: '4.2 No-Code Orchestration & Automation', link: '/chapter-4-2' },
          { text: '4.3 Designing and Validating AI Systems', link: '/chapter-4-3' },
          { text: '4.4 Enterprise Alignment & Future-Proofing', link: '/chapter-4-4' },
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
      { icon: 'github', link: 'https://github.com/MahAbram/ai-integration-playbook' }
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
