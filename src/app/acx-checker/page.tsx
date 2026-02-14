import AcxCheckerClient from './AcxCheckerClient'

export const metadata = {
  title: 'Free ACX Compliance Checker — Is Your Audiobook Ready?',
  description:
    'Find out in under 2 minutes if your audiobook will pass or fail ACX review. Free tool. No signup required.',
  openGraph: {
    title: 'Free ACX Compliance Checker — Is Your Audiobook Ready?',
    description:
      'Find out in under 2 minutes if your audiobook will pass or fail ACX review. Free tool. No signup required.',
    url: 'https://talkeditpro.com/acx-checker',
    siteName: 'Talk Edit Pro Studio',
    images: [{ url: 'https://talkeditpro.com/og-image.png', width: 1200, height: 630, alt: 'Talk Edit Pro Studio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ACX Compliance Checker — Is Your Audiobook Ready?',
    description: 'Find out in under 2 minutes if your audiobook will pass or fail ACX review.',
  },
}

export default function AcxCheckerPage() {
  return <AcxCheckerClient />
}
