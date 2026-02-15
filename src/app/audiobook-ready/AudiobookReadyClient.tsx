'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelCustomEvent } from '@/components/FacebookPixel'
import { audiobookReadyContent } from './content'

export default function AudiobookReadyClient() {
  return (
    <>
      <FacebookPixelCustomEvent eventName="ACXPageView_V2" />
      <SqueezePage {...audiobookReadyContent} />
    </>
  )
}
