import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Talk Edit Pro Studio | Record, Edit & Publish Your Audiobook',
  description: 'Browser-based audiobook production for self-published authors. Record, edit, and export ACX-ready files.',
  keywords: ['audiobook', 'audiobook production', 'ACX', 'Audible', 'self-publishing', 'audiobook recording'],
  authors: [{ name: 'Jeanmarc Alexandre' }],
  openGraph: {
    title: 'Talk Edit Pro Studio',
    description: 'Browser-based audiobook production for self-published authors. Record, edit, and export ACX-ready files.',
    type: 'website',
    url: 'https://talkeditpro.com',
    images: [
      {
        url: 'https://talkeditpro.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Talk Edit Pro Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talk Edit Pro Studio',
    description: 'Browser-based audiobook production for self-published authors. Record, edit, and export ACX-ready files.',
    images: ['https://talkeditpro.com/og-image.png'],
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
