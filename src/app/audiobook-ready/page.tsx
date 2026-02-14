import AudiobookReadyClient from './AudiobookReadyClient'

export const metadata = {
  title: 'Your Book Deserves to Be Heard — Not Just Read',
  description:
    '751M Spotify listeners are waiting. Get a free ACX compliance check or join the Talk Edit Pro Studio waitlist.',
  openGraph: {
    title: 'Your Book Deserves to Be Heard — Not Just Read',
    description:
      '751M Spotify listeners are waiting. Get a free ACX compliance check or join the Talk Edit Pro Studio waitlist.',
    url: 'https://talkeditpro.com/audiobook-ready',
    siteName: 'Talk Edit Pro Studio',
    images: [{ url: 'https://talkeditpro.com/og-image.png', width: 1200, height: 630, alt: 'Talk Edit Pro Studio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Book Deserves to Be Heard — Not Just Read',
    description: '751M Spotify listeners are waiting. Free ACX check and early access waitlist.',
  },
}

export default function AudiobookReadyPage() {
  return <AudiobookReadyClient />
}
