import type { Metadata } from 'next'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | Talk Edit Pro Studio',
  description: 'Privacy Policy for Talk Edit Pro Studio - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
