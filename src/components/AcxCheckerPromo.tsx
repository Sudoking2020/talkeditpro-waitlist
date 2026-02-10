'use client'

import { FileAudio, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function AcxCheckerPromo() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 p-8 rounded-3xl 
                    bg-gradient-to-br from-tep-blue-50 to-blue-50
                    border border-tep-blue-100 shadow-sm
                    opacity-0 animate-fade-in-up"
      style={{ animationDelay: '200ms' }}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-tep-blue-500/10 flex items-center justify-center flex-shrink-0">
          <FileAudio className="w-7 h-7 text-tep-blue-600" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-gray-900 mb-2">
            Free ACX Compliance Checker
          </h3>
          <p className="text-gray-700 text-xl leading-relaxed">
            Working on your audiobook? Check if your audio files meet ACX/Audible requirements
            before you submit. Upload your chapters and get instant feedback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-600 text-lg">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Peak levels</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>RMS loudness</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Noise floor</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span>Sample rate</span>
        </div>
      </div>

      <Link
        href="/check"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                 bg-tep-blue-500 hover:bg-tep-blue-600 
                 text-white font-semibold
                 shadow-md shadow-tep-blue-500/20
                 hover:shadow-lg hover:shadow-tep-blue-500/30
                 transform hover:-translate-y-0.5
                 transition-all duration-300"
      >
        <span>Check Your Audio Files</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
