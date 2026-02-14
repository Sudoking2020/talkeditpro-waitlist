export interface SqueezeTheme {
  accent: string
  gradientFrom: string
  gradientTo: string
}

export interface SqueezeHero {
  eyebrow: string
  headline: string
  /** Optional substring of headline to render in accent color */
  headlineAccent?: string
  /** Override theme.accent for headline only (e.g. #5bb8ff) */
  headlineAccentColor?: string
  subheadline: string
}

export interface SqueezeBody {
  /** Paragraphs before the separator line */
  paragraphs: string[]
  separatorColor: string
  /** Optional paragraph(s) after separator (e.g. bold lead-in) */
  postSeparatorParagraphs?: string[]
  /** Bold index in postSeparatorParagraphs (0-based), or -1 for none */
  boldIndex?: number
  checklist: string[]
}

export interface SqueezeCta {
  buttonText: string
  buttonHref: string
  subtext: string
  secondaryLink?: { text: string; href: string }
}

export interface SqueezeTrust {
  items: string[]
}

export interface SqueezeMeta {
  title: string
  description: string
  path: string
}

export interface SqueezePageProps {
  theme: SqueezeTheme
  hero: SqueezeHero
  body: SqueezeBody
  cta: SqueezeCta
  trust: SqueezeTrust
  meta: SqueezeMeta
}
