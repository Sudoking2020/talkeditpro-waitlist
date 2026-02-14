import type { SqueezePageProps } from '@/types/squeeze'

export const stopOverpayingContent: SqueezePageProps = {
  theme: {
    accent: '#3B7BBF',
    gradientFrom: '#0a0a0a',
    gradientTo: '#111418',
  },
  hero: {
    eyebrow: 'For Indie Authors Who Refuse to Pay $5,000',
    headline: 'Audiobook Production Shouldn\'t Break the Bank',
    headlineAccent: 'Break the Bank',
    headlineAccentColor: '#5bb8ff',
    subheadline:
      'A browser-based studio is launching this spring. Start with a free audio check today.',
  },
  body: {
    paragraphs: [
      'Professional narrators charge $150 to $400 per finished hour.',
      'A typical book runs 9 to 11 finished hours. That\'s $2,000 to $5,000 before editing, mastering, and the inevitable re-records.',
      "One author recently shared how she spent $26,000 across a three-book series — between narrator fees, royalty share gone wrong, and a 7-year exclusive contract she couldn't escape.",
      "And even after all that money, 30% of audiobook submissions still get rejected by ACX for technical issues most authors didn't know existed.",
    ],
    separatorColor: '#3B7BBF',
    postSeparatorParagraphs: [
      "There's a better path now.",
      'Talk Edit Pro Studio is a browser-based audiobook production tool built for indie authors. Record, edit, and export your audiobook chapter by chapter. No DAW. No sound engineer. No $5,000 invoice.',
      'The full studio launches this spring. But you can use our free ACX compliance checker right now.',
      'Upload your audio file and get an instant report showing exactly what passed, what failed, and what to fix — so you never waste money producing files that get rejected.',
    ],
    boldIndex: 0,
    checklist: [
      'Free instant compliance check',
      'See exactly what needs fixing',
      'Waitlist members get first access',
      'No narrator. No studio. No $5K bill.',
    ],
  },
  cta: {
    buttonText: 'Check My Audio Files Free →',
    buttonHref: '/check',
    subtext: 'Already on the waitlist? You can still use the checker anytime.',
  },
  trust: {
    items: ['🎧 $0 to check your files', '$0 to join the waitlist', 'Full studio launching Spring 2026'],
  },
  meta: {
    title: 'Audiobook Production Shouldn\'t Break the Bank',
    description:
      'Skip the $5,000 invoice. Free ACX compliance checker and early access to a browser-based audiobook studio.',
    path: '/stop-overpaying',
  },
}
