'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelCustomEvent } from '@/components/FacebookPixel'
import { stopOverpayingContent } from './content'

export default function StopOverpayingClient() {
  return (
    <>
      <FacebookPixelCustomEvent eventName="ACXPageView_V3" />
      <SqueezePage {...stopOverpayingContent} />
    </>
  )
}
