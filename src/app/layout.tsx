import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

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
      <body>

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '876698455357247');
                fbq('track', 'PageView');
              `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=876698455357247&ev=PageView&noscript=1"
          />
        </noscript>

        {children}

      </body>
    </html>
  )
}
