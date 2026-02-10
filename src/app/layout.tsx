import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Talk Edit Pro Studio | Record, Edit & Publish Your Audiobook',
  description: 'Record, edit, and publish your audiobook — all in your browser. No expensive software. No hiring editors. No confusing workflows.',
  keywords: ['audiobook', 'audiobook production', 'ACX', 'Audible', 'self-publishing', 'audiobook recording'],
  authors: [{ name: 'Jeanmarc Alexandre' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Talk Edit Pro Studio',
    description: 'Record, edit, and publish your audiobook — all in your browser.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
