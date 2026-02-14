'use client'

import { useState } from 'react'
import { Loader2, Play } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ResultsDisplay from '@/components/ResultsDisplay'
import { analyzeAudioFile } from '@/lib/acx-analyzer'
import type { ChapterResult } from '@/types/acx'

interface AudioFile {
  id: string
  file: File
  name: string
  size: string
  status: 'pending' | 'analyzing' | 'complete' | 'error'
}

interface AcxCheckerToolProps {
  /** Optional pitch copy shown above the tool */
  pitchCopy?: React.ReactNode
}

export default function AcxCheckerTool({ pitchCopy }: AcxCheckerToolProps) {
  const [files, setFiles] = useState<AudioFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ChapterResult[] | null>(null)
  const [analyzeError, setAnalyzeError] = useState('')

  const handleAnalyze = async () => {
    if (files.length === 0) return

    setIsAnalyzing(true)
    setAnalyzeError('')
    setResults(null)

    try {
      const analysisResults: ChapterResult[] = []

      for (const audioFile of files) {
        try {
          const result = await analyzeAudioFile(audioFile.file)
          analysisResults.push({
            filename: audioFile.name,
            passed: result.passed,
            specs: result.specs,
          })
        } catch (err) {
          analysisResults.push({
            filename: audioFile.name,
            passed: false,
            specs: [{
              name: 'Analysis',
              value: 'Error',
              requirement: 'Readable file',
              passed: false,
              info: 'Could not analyze this file',
            }],
          })
        }
      }

      setResults(analysisResults)
    } catch (err) {
      setAnalyzeError('Failed to analyze files. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      {pitchCopy && (
        <div className="p-4 rounded-xl bg-tep-blue-50 border border-tep-blue-100">
          {pitchCopy}
        </div>
      )}

      {!results && (
        <>
          <FileUpload
            files={files}
            setFiles={setFiles}
            maxFiles={5}
            maxSizeMB={1024}
          />

          {files.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-4 rounded-xl font-semibold text-lg
                         bg-tep-blue-500 hover:bg-tep-blue-600 
                         disabled:opacity-70 disabled:cursor-not-allowed
                         text-white shadow-md shadow-tep-blue-500/20
                         hover:shadow-lg hover:shadow-tep-blue-500/30
                         transform hover:-translate-y-0.5
                         transition-all duration-300
                         flex items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing {files.length} file{files.length > 1 ? 's' : ''}...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Analyze {files.length} file{files.length > 1 ? 's' : ''}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {analyzeError && (
            <p className="text-center text-red-600 text-xl">{analyzeError}</p>
          )}
        </>
      )}

      {results && (
        <>
          <ResultsDisplay results={results} />

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setResults(null)
                setFiles([])
              }}
              className="px-6 py-3 rounded-xl font-semibold
                       bg-white hover:bg-gray-50
                       text-gray-900 border border-gray-300
                       transition-all duration-300 shadow-sm"
            >
              Check More Files
            </button>
          </div>
        </>
      )}
    </div>
  )
}
