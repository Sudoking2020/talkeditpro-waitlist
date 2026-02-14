'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelPageView } from '@/components/FacebookPixel'
import { audiobookReadyContent } from './content'

export default function AudiobookReadyClient() {
  return (
    <>
      <FacebookPixelPageView page="/audiobook-ready" />
      <SqueezePage {...audiobookReadyContent} />
    </>
  )
}
