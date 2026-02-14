import StopOverpayingClient from './StopOverpayingClient'

export const metadata = {
  title: "Audiobook Production Shouldn't Break the Bank",
  description:
    'Skip the $5,000 invoice. Free ACX compliance checker and early access to a browser-based audiobook studio.',
  openGraph: {
    title: "Audiobook Production Shouldn't Break the Bank",
    description:
      'Skip the $5,000 invoice. Free ACX compliance checker and early access to a browser-based audiobook studio.',
    url: 'https://talkeditpro.com/stop-overpaying',
    siteName: 'Talk Edit Pro Studio',
    images: [{ url: 'https://talkeditpro.com/og-image.png', width: 1200, height: 630, alt: 'Talk Edit Pro Studio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Audiobook Production Shouldn't Break the Bank",
    description: 'Skip the $5,000 invoice. Free checker and browser-based studio.',
  },
}

export default function StopOverpayingPage() {
  return <StopOverpayingClient />
}
