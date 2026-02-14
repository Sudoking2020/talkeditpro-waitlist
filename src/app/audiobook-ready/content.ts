import type { SqueezePageProps } from '@/types/squeeze'

export const audiobookReadyContent: SqueezePageProps = {
  theme: {
    accent: '#1DB954',
    gradientFrom: '#040d18',
    gradientTo: '#0a1628',
  },
  hero: {
    eyebrow: '751 Million Listeners Are Waiting',
    headline: 'Your Book Deserves to Be Heard — Not Just Read',
    headlineAccent: 'Heard',
    subheadline:
      'Audiobooks are the fastest-growing format in publishing. Start with a free production-readiness check.',
  },
  body: {
    paragraphs: [
      'Spotify just hit 751 million monthly users and over 500,000 audiobooks in their catalog.',
      "They launched a feature last week that lets readers switch between their physical book and the audiobook version with a single tap.",
      'Audiobook sales grew 13% last year. The market is worth over $8 billion and climbing fast.',
      "If your book doesn't have an audio version, you're invisible to the fastest-growing audience in publishing.",
    ],
    separatorColor: '#1DB954',
    postSeparatorParagraphs: [
      'The first step is simpler than you think.',
      "Whether you've already started recording or you're just exploring the idea, our free ACX compliance checker tells you exactly where you stand.",
      'Already have audio files? Upload them and get an instant pass/fail report against every major platform\'s requirements. Know exactly what needs fixing before you submit.',
      "Don't have audio files yet? Join the early access waitlist for Talk Edit Pro Studio — the browser-based tool that lets you record, edit, and export your audiobook chapter by chapter. No DAW. No studio. No narrator fees.",
    ],
    boldIndex: 0,
    checklist: [
      'Free instant audio compliance check',
      'Works for ACX, Findaway, Apple Books',
      'Early access to the full browser studio',
      'Be first in line when we launch',
    ],
  },
  cta: {
    buttonText: 'Check My Files Free →',
    buttonHref: '/check',
    subtext: 'Both options are free. Both get you closer to 751 million listeners.',
    secondaryLink: {
      text: 'No audio files yet? Join the waitlist →',
      href: '/waitlist',
    },
  },
  trust: {
    items: ['🎧 Launching Spring 2026', 'Browser-based', 'No credit card needed'],
  },
  meta: {
    title: 'Your Book Deserves to Be Heard — Not Just Read',
    description:
      '751M Spotify listeners are waiting. Get a free ACX compliance check or join the Talk Edit Pro Studio waitlist.',
    path: '/audiobook-ready',
  },
}
