'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { SqueezePageProps } from '@/types/squeeze'
import { captureUtmFromUrl, getUtmQueryString } from '@/lib/utm'

function renderHeadline(
  headline: string,
  accent?: string,
  accentColor?: string,
  overrideColor?: string
) {
  if (!accent || !accentColor) return headline
  const color = overrideColor ?? accentColor
  const i = headline.indexOf(accent)
  if (i === -1) return headline
  return (
    <>
      {headline.slice(0, i)}
      <span style={{ color }}>{accent}</span>
      {headline.slice(i + accent.length)}
    </>
  )
}

export default function SqueezePage({ theme, hero, body, cta, trust, meta }: SqueezePageProps) {
  const ctaRef = useRef<HTMLDivElement>(null)
  const viewContentFired = useRef(false)

  useEffect(() => {
    captureUtmFromUrl(meta.path)
  }, [meta.path])

  useEffect(() => {
    const pathSlug = meta.path.replace(/\//g, '_')
    const handleScroll = () => {
      if (viewContentFired.current) return
      const el = ctaRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      if (rect.top < viewportHeight * 0.5) {
        viewContentFired.current = true
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'ViewContent', { content_name: `squeeze_${pathSlug}` })
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [meta.path])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero — desktop: larger text and spacing (lg/xl only) */}
      <section
        className="px-5 pt-10 pb-14 sm:pt-14 sm:pb-20 md:px-8 lg:pt-20 lg:pb-24 xl:pt-24 xl:pb-28 lg:px-12 xl:px-16"
        style={{
          background: `linear-gradient(180deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
        }}
      >
        <div className="max-w-[600px] mx-auto text-center lg:max-w-2xl xl:max-w-3xl">
          <p
            className="text-sm sm:text-base font-semibold uppercase tracking-wide mb-4 lg:text-lg lg:mb-6"
            style={{ color: theme.accent }}
          >
            {hero.eyebrow}
          </p>
          <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-bold text-white leading-tight mb-4 lg:text-4xl xl:text-5xl lg:mb-6 lg:leading-tight">
            {renderHeadline(hero.headline, hero.headlineAccent, theme.accent, hero.headlineAccentColor)}
          </h1>
          <p className="text-[15px] sm:text-base text-[#777] leading-relaxed lg:text-xl xl:text-2xl">
            {hero.subheadline}
          </p>
        </div>
      </section>

      {/* Body — desktop: larger text and spacing (lg/xl only) */}
      <section className="flex-1 bg-white px-5 py-10 sm:py-12 md:px-8 md:py-14 lg:py-20 lg:px-12 xl:py-24 xl:px-16">
        <div className="max-w-[600px] mx-auto text-[#333] space-y-5 text-[15px] sm:text-base leading-relaxed lg:max-w-2xl xl:max-w-3xl lg:text-lg xl:text-xl lg:space-y-7 xl:space-y-8">
          {body.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <hr className="my-8 border-t lg:my-12" style={{ borderColor: body.separatorColor }} />
          {body.postSeparatorParagraphs?.map((p, i) => (
            <p key={`post-${i}`} className={body.boldIndex === i ? 'font-bold text-[#333]' : ''}>{p}</p>
          ))}
          <ul className="space-y-2 mt-6 lg:space-y-3 lg:mt-8">
            {body.checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2 lg:text-lg">
                <span className="flex-shrink-0 mt-0.5" style={{ color: theme.accent }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA — desktop: larger button and spacing (lg/xl only) */}
      <section ref={ctaRef} className="bg-white px-5 pb-10 sm:pb-12 md:px-8 md:pb-14 lg:pb-20 xl:pb-24 lg:px-12 xl:px-16">
        <div className="max-w-[600px] mx-auto text-center lg:max-w-2xl xl:max-w-3xl">
          <Link
            href={cta.buttonHref + getUtmQueryString()}
            className="block w-full sm:w-[80%] sm:mx-auto md:w-auto md:inline-block md:px-12 py-4 rounded-lg font-bold text-white text-center text-lg transition-opacity hover:opacity-95 lg:text-xl lg:py-5 lg:px-14"
            style={{ backgroundColor: theme.accent }}
          >
            {cta.buttonText}
          </Link>
          {cta.secondaryLink && (
            <p className="mt-4 lg:mt-6">
              <Link
                href={cta.secondaryLink.href + getUtmQueryString()}
                className="text-lg font-medium underline lg:text-xl"
                style={{ color: theme.accent }}
              >
                {cta.secondaryLink.text}
              </Link>
            </p>
          )}
          <p className="mt-3 text-[#999] text-sm lg:text-base lg:mt-4">{cta.subtext}</p>
        </div>
      </section>

      {/* Trust bar — desktop: larger text and spacing (lg/xl only) */}
      <footer className="mt-auto py-5 px-5 bg-[#f8f8f8] border-t border-[#eee] lg:py-6 lg:px-12 xl:px-16">
        <p className="text-center text-[#999] text-sm max-w-[600px] mx-auto lg:max-w-2xl xl:max-w-3xl lg:text-base">
          {trust.items.join(' · ')}
        </p>
      </footer>
    </main>
  )
}
