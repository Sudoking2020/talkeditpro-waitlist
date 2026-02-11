'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ContentA from './wl-a'
import ContentB from './wl-b'

function SplitTestLogic() {
  const [variant, setVariant] = useState<'A' | 'B' | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for query param override (?v=A or ?v=B)
    const override = searchParams.get('v')?.toUpperCase()

    if (override === 'A' || override === 'B') {
      setVariant(override as 'A' | 'B')
      // Optional: persist override
      localStorage.setItem('tep_split_test_variant', override)
      return
    }

    // Check for existing assignment
    const savedVariant = localStorage.getItem('tep_split_test_variant')

    if (savedVariant === 'A' || savedVariant === 'B') {
      setVariant(savedVariant as 'A' | 'B')
    } else {
      // Assign new variant (50/50 split)
      const newVariant = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem('tep_split_test_variant', newVariant)
      setVariant(newVariant)
    }
  }, [searchParams])

  // Prevent flash by returning null or a loading state until variant is decided
  if (!variant) return null

  return variant === 'A' ? <ContentA /> : <ContentB />
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <SplitTestLogic />
    </Suspense>
  )
}
