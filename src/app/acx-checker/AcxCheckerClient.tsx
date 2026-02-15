'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelCustomEvent } from '@/components/FacebookPixel'
import { acxCheckerContent } from './content'

export default function AcxCheckerClient() {
  return (
    <>
      <FacebookPixelCustomEvent eventName="ACXPageView_V1" />
      <SqueezePage {...acxCheckerContent} />
    </>
  )
}
