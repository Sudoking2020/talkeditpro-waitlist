'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelPageView } from '@/components/FacebookPixel'
import { stopOverpayingContent } from './content'

export default function StopOverpayingClient() {
  return (
    <>
      <FacebookPixelPageView page="/stop-overpaying" />
      <SqueezePage {...stopOverpayingContent} />
    </>
  )
}
