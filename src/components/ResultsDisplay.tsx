'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Info, ChevronDown } from 'lucide-react'
import type { ChapterResult } from '@/types/acx'

interface ResultsDisplayProps {
  results: ChapterResult[]
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set(results.map((_, i) => i)))

  const passedCount = results.filter((r) => r.passed).length
  const failedCount = results.length - passedCount
  const allPassed = failedCount === 0

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <div className="w-full">
      {/* Summary */}
      <div className={`p-6 rounded-2xl mb-6 shadow-sm ${allPassed ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center gap-4">
          {allPassed ? (
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          )}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {allPassed
                ? 'All chapters pass ACX requirements!'
                : `${failedCount} chapter${failedCount > 1 ? 's' : ''} need${failedCount === 1 ? 's' : ''} attention`}
            </h3>
            <p className="text-gray-700 text-xl">
              {passedCount} of {results.length} chapters passed all checks
            </p>
          </div>
        </div>
      </div>

      {/* Chapter Results */}
      <div className="space-y-4">
        {results.map((chapter, index) => {
          const isExpanded = expandedCards.has(index)

          return (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm"
            >
              {/* Chapter Header - Clickable */}
              <button
                onClick={() => toggleCard(index)}
                className={`w-full p-4 flex items-center gap-3 transition-colors ${chapter.passed ? 'bg-green-50 hover:bg-green-100' : 'bg-red-50 hover:bg-red-100'
                  }`}
              >
                {chapter.passed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <span className="text-gray-900 font-medium truncate text-lg flex-1 text-left">
                  {chapter.filename}
                </span>
                <span className={`text-lg font-medium ${chapter.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {chapter.passed ? 'PASS' : 'FAIL'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              {/* Specs - Expandable */}
              {isExpanded && (
                <div className="p-4 grid gap-3 border-t border-gray-200">
                  {chapter.specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        {spec.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <p className="text-gray-900 font-medium text-lg">{spec.name}</p>
                          <p className="text-gray-600 text-lg">Required: {spec.requirement}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-mono font-medium text-lg ${spec.passed ? 'text-green-600' : 'text-red-600'}`}>
                          {spec.value}
                        </p>
                        {spec.info && !spec.passed && (
                          <p className="text-gray-600 text-base mt-1">{spec.info}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 rounded-xl bg-tep-blue-50 border border-tep-blue-200">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-tep-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-lg text-gray-700">
            <p className="font-medium text-gray-900 mb-1">ACX Technical Requirements</p>
            <ul className="space-y-1">
              <li>• Peak level: -3dB or lower</li>
              <li>• RMS loudness: -23dB to -18dB</li>
              <li>• Noise floor: -60dB or lower</li>
              <li>• Sample rate: 44.1kHz</li>
              <li>• Format: MP3 (192kbps+) or WAV</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
