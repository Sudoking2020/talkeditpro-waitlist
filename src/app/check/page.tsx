'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Loader2, Play } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ResultsDisplay from '@/components/ResultsDisplay'
import { supabase } from '@/lib/supabase'

interface AudioFile {
  id: string
  file: File
  name: string
  size: string
  status: 'pending' | 'analyzing' | 'complete' | 'error'
}

interface AcxSpec {
  name: string
  value: string
  requirement: string
  passed: boolean
  info?: string
}

interface ChapterResult {
  filename: string
  passed: boolean
  specs: AcxSpec[]
}

export default function AcxCheckerPage() {
  const [email, setEmail] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState('')

  const [files, setFiles] = useState<AudioFile[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<ChapterResult[] | null>(null)
  const [analyzeError, setAnalyzeError] = useState('')

  // Check localStorage for previously verified email
  useEffect(() => {
    const savedEmail = localStorage.getItem('tep_verified_email')
    if (savedEmail) {
      setEmail(savedEmail)
      setIsVerified(true)
    }
  }, [])

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setVerifyError('')

    try {
      // Check if email exists in waitlist
      const { data, error } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single()

      if (error || !data) {
        setVerifyError('Email not found on waitlist. Please join the waitlist first.')
        setIsVerifying(false)
        return
      }

      // Email verified
      localStorage.setItem('tep_verified_email', email.toLowerCase())
      setIsVerified(true)
    } catch (err) {
      setVerifyError('Something went wrong. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

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
    <main className="min-h-screen bg-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to waitlist</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo.png"
              alt="Talk Edit Pro Studio"
              width={60}
              height={60}
              className="rounded-xl shadow-md"
            />
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-gray-900">
                ACX Compliance Checker
              </h1>
              <p className="text-gray-600 text-xl">
                Check if your audiobook files meet ACX/Audible requirements
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Email Verification Gate */}
          {!isVerified ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100 shadow-sm">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                Verify your email to continue
              </h2>
              <p className="text-gray-700 text-xl mb-6">
                This tool is available to waitlist members. Enter the email you used to join the waitlist.
              </p>

              <form onSubmit={handleVerifyEmail} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl bg-white border border-gray-300 
                           text-gray-900 placeholder:text-gray-500 text-lg
                           focus:border-tep-blue-500 focus:ring-2 focus:ring-tep-blue-100
                           transition-all duration-300 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-8 py-4 rounded-xl font-semibold text-lg
                           bg-tep-blue-500 hover:bg-tep-blue-600 
                           disabled:opacity-70 disabled:cursor-not-allowed
                           text-white shadow-md shadow-tep-blue-500/20
                           transition-all duration-300
                           flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Verify'
                  )}
                </button>
              </form>

              {verifyError && (
                <p className="mt-4 text-red-600 text-xl">{verifyError}</p>
              )}

              <p className="mt-6 text-gray-600 text-lg">
                Not on the waitlist yet?{' '}
                <Link href="/" className="text-tep-blue-600 hover:underline font-medium">
                  Join here
                </Link>
              </p>
            </div>
          ) : (
            /* ACX Checker Interface */
            <div className="space-y-8">
              {/* File Upload */}
              {!results && (
                <>
                  <FileUpload
                    files={files}
                    setFiles={setFiles}
                    maxFiles={5}
                    maxSizeMB={1024}
                  />

                  {/* Analyze Button */}
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

              {/* Results */}
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
          )}
        </div>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center mt-20 pt-12 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Talk Edit Pro Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}

// Client-side audio analysis using Web Audio API
async function analyzeAudioFile(file: File): Promise<{ passed: boolean; specs: AcxSpec[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer

        // Get actual sample rate from file header BEFORE AudioContext resamples it
        const actualSampleRate = await getActualSampleRate(arrayBuffer, file.name)

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0))

        // Get audio data from first channel
        const channelData = audioBuffer.getChannelData(0)

        // Calculate peak level
        let maxSample = 0
        for (let i = 0; i < channelData.length; i++) {
          const abs = Math.abs(channelData[i])
          if (abs > maxSample) maxSample = abs
        }
        const peakDb = 20 * Math.log10(maxSample)
        const peakPassed = peakDb <= -3

        // Calculate RMS (approximate loudness)
        let sumSquares = 0
        for (let i = 0; i < channelData.length; i++) {
          sumSquares += channelData[i] * channelData[i]
        }
        const rms = Math.sqrt(sumSquares / channelData.length)
        const rmsDb = 20 * Math.log10(rms)
        const rmsPassed = rmsDb >= -23 && rmsDb <= -18

        // Estimate noise floor
        const sortedSamples = Array.from(channelData)
          .map(Math.abs)
          .sort((a, b) => a - b)
        const quietSamples = sortedSamples.slice(0, Math.floor(sortedSamples.length * 0.1))
        const noiseRms = Math.sqrt(quietSamples.reduce((a, b) => a + b * b, 0) / quietSamples.length)
        const noiseFloorDb = noiseRms > 0 ? 20 * Math.log10(noiseRms) : -96
        const noiseFloorPassed = noiseFloorDb <= -60

        // Use actual sample rate from file header (not AudioContext's resampled rate)
        const sampleRatePassed = actualSampleRate === 44100

        const specs: AcxSpec[] = [
          {
            name: 'Peak Level',
            value: `${peakDb.toFixed(1)} dB`,
            requirement: '≤ -3 dB',
            passed: peakPassed,
            info: !peakPassed ? 'Reduce overall volume or use a limiter' : undefined,
          },
          {
            name: 'RMS Loudness',
            value: `${rmsDb.toFixed(1)} dB`,
            requirement: '-23 to -18 dB',
            passed: rmsPassed,
            info: !rmsPassed
              ? rmsDb < -23
                ? 'Audio is too quiet - increase volume'
                : 'Audio is too loud - reduce volume'
              : undefined,
          },
          {
            name: 'Noise Floor',
            value: `${noiseFloorDb.toFixed(1)} dB`,
            requirement: '≤ -60 dB',
            passed: noiseFloorPassed,
            info: !noiseFloorPassed ? 'Too much background noise - apply noise reduction' : undefined,
          },
          {
            name: 'Sample Rate',
            value: `${(actualSampleRate / 1000).toFixed(1)} kHz`,
            requirement: '44.1 kHz',
            passed: sampleRatePassed,
            info: !sampleRatePassed ? 'Resample to 44.1 kHz' : undefined,
          },
        ]

        const allPassed = specs.every((s) => s.passed)

        resolve({ passed: allPassed, specs })
      } catch (err) {
        reject(err)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}

// Extract actual sample rate from file header (WAV or MP3)
async function getActualSampleRate(arrayBuffer: ArrayBuffer, filename: string): Promise<number> {
  const view = new DataView(arrayBuffer)

  // Check if it's a WAV file
  if (view.getUint32(0, false) === 0x52494646 && // "RIFF"
    view.getUint32(8, false) === 0x57415645) { // "WAVE"
    // WAV file - sample rate is at byte offset 24 (little-endian)
    return view.getUint32(24, true)
  }

  // Check if it's an MP3 file
  // Look for MP3 frame sync (11 bits set) in first 4KB
  const maxSearch = Math.min(4096, arrayBuffer.byteLength)
  for (let i = 0; i < maxSearch - 3; i++) {
    // Check for frame sync: 11 bits set (0xFF 0xE0 or higher)
    if (view.getUint8(i) === 0xFF && (view.getUint8(i + 1) & 0xE0) === 0xE0) {
      // Found potential MP3 frame header
      const header = view.getUint32(i, false)

      // Extract MPEG version (bits 19-20)
      const version = (header >> 19) & 0x03

      // Extract sample rate index (bits 10-11)
      const sampleRateIndex = (header >> 10) & 0x03

      // Sample rate table for MPEG 1, 2, and 2.5
      const sampleRates = [
        [44100, 48000, 32000], // MPEG 1
        [22050, 24000, 16000], // MPEG 2
        [11025, 12000, 8000],  // MPEG 2.5
      ]

      let versionIndex = 0
      if (version === 3) versionIndex = 0      // MPEG 1
      else if (version === 2) versionIndex = 1 // MPEG 2
      else if (version === 0) versionIndex = 2 // MPEG 2.5

      if (sampleRateIndex < 3) {
        return sampleRates[versionIndex][sampleRateIndex]
      }
    }
  }

  // Fallback: if we can't determine from header, return a default
  console.warn('Could not determine sample rate from file header')
  return 44100 // Assume 44.1kHz as default
}

