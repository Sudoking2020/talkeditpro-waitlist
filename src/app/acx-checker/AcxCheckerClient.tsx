'use client'

import SqueezePage from '@/components/SqueezePage'
import { FacebookPixelPageView } from '@/components/FacebookPixel'
import { acxCheckerContent } from './content'

export default function AcxCheckerClient() {
  return (
    <>
      <FacebookPixelPageView page="/acx-checker" />
      <SqueezePage {...acxCheckerContent} />
    </>
  )
}
