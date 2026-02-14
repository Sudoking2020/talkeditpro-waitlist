import WaitlistSqueezeClient from './WaitlistSqueezeClient'

export const metadata = {
  title: 'Join the Waitlist — Talk Edit Pro Studio',
  description: 'Join the early access waitlist for Talk Edit Pro Studio. Browser-based audiobook production.',
  openGraph: {
    title: 'Join the Waitlist — Talk Edit Pro Studio',
    description: 'Join the early access waitlist for Talk Edit Pro Studio.',
    url: 'https://talkeditpro.com/waitlist',
    siteName: 'Talk Edit Pro Studio',
    images: [{ url: 'https://talkeditpro.com/og-image.png', width: 1200, height: 630, alt: 'Talk Edit Pro Studio' }],
    type: 'website',
  },
}

export default function WaitlistPage() {
  return <WaitlistSqueezeClient />
}
