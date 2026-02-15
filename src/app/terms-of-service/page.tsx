import type { Metadata } from 'next'
import TermsOfServiceClient from './TermsOfServiceClient'

export const metadata: Metadata = {
  title: 'Terms of Service | Talk Edit Pro Studio',
  description: 'Terms of Service for Talk Edit Pro Studio - Read our terms and conditions for using our audiobook production platform.',
}

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />
}
