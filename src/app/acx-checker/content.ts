import type { SqueezePageProps } from '@/types/squeeze'

export const acxCheckerContent: SqueezePageProps = {
  theme: {
    accent: '#cc3333',
    gradientFrom: '#0a0000',
    gradientTo: '#1a0808',
  },
  hero: {
    eyebrow: 'Free Tool — No Signup Required',
    headline: 'Is Your Audiobook Going to Pass or Fail ACX Review?',
    headlineAccent: 'Pass or Fail',
    subheadline:
      'Find out in under 2 minutes — before you waste weeks waiting for a rejection email.',
  },
  body: {
    paragraphs: [
      'ACX rejects roughly 30% of audiobook submissions.',
      'Not because the narration is bad. Because of technical specs most authors have never heard of.',
      'Wrong RMS levels. Noise floor too high. Peaks clipping past the limit. Inconsistent volume between chapters.',
      "Authors find out the hard way — after weeks of production and a 10 to 30 day review process that ends with an 'Audio QC Failed' email.",
    ],
    separatorColor: '#cc3333',
    postSeparatorParagraphs: [
      'We built a free tool that checks everything in under 2 minutes.',
      'Upload your audio file. Get an instant report showing exactly what passed, what failed, and what to fix.',
      'No downloads. No software to install. Just open your browser.',
    ],
    boldIndex: 0,
    checklist: [
      'RMS levels (-23dB to -18dB)',
      'Peak level (must be ≤ -3dB)',
      'Noise floor (must be ≤ -60dB)',
      'Sample rate and format compliance',
    ],
  },
  cta: {
    buttonText: 'Check My Audio Files Free →',
    buttonHref: '/check',
    subtext: 'No credit card. No account needed. Takes 2 minutes.',
  },
  trust: {
    items: ['🎧 4,200+ files checked', '100% free', 'Works in any browser'],
  },
  meta: {
    title: 'Free ACX Compliance Checker — Is Your Audiobook Ready?',
    description:
      'Find out in under 2 minutes if your audiobook will pass or fail ACX review. Free tool. No signup required.',
    path: '/acx-checker',
  },
}
