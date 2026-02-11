export interface AcxSpec {
  name: string
  value: string
  requirement: string
  passed: boolean
  info?: string
}

export interface ChapterResult {
  filename: string
  passed: boolean
  specs: AcxSpec[]
}
