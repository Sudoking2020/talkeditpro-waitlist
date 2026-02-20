'use client'

import { CheckCircle2, FileAudio, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function ThankYou() {
    return (
        <div className="w-full max-w-2xl mx-auto text-center">
            {/* Success Message */}
            <div className="mb-10 opacity-0 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                    You're on the list!
                </h2>
                <p className="text-2xl text-gray-600">
                    Thanks for joining the Talk Edit Pro Studio waitlist. We'll let you know as soon as we launch.
                </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10 opacity-0 animate-fade-in-up delay-100">
                <div className="flex-1 h-px bg-gray-200"></div>
                <Sparkles className="w-5 h-5 text-tep-blue-500" />
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Stay Connected — LinkedIn */}
            <div className="mb-10 opacity-0 animate-fade-in-up delay-200">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                    Stay Connected
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                    Follow our founder on LinkedIn for updates, audiobook tips, and behind-the-scenes content.
                </p>
                <a
                    href="https://www.linkedin.com/in/jm-alexandre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                       bg-[#0A66C2] hover:bg-[#004182]
                       text-white font-semibold
                       shadow-md shadow-[#0A66C2]/20
                       hover:shadow-lg hover:shadow-[#0A66C2]/30
                       transform hover:-translate-y-0.5
                       transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Connect on LinkedIn</span>
                </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10 opacity-0 animate-fade-in-up delay-300">
                <div className="flex-1 h-px bg-gray-200"></div>
                <Sparkles className="w-5 h-5 text-tep-blue-500" />
                <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* In The Meantime Section */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50
                      border border-tep-blue-100 text-left shadow-sm
                      opacity-0 animate-fade-in-up delay-[400ms]">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-tep-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <FileAudio className="w-7 h-7 text-tep-blue-600" />
                    </div>
                    <div>
                        <p className="text-tep-blue-600 text-sm font-medium uppercase tracking-wide mb-1">
                            In the meantime...
                        </p>
                        <h3 className="font-display text-2xl font-semibold text-gray-900">
                            Free ACX Compliance Checker
                        </h3>
                    </div>
                </div>

                <p className="text-gray-700 text-xl leading-relaxed mb-6">
                    Already working on your audiobook? We built a free tool to help you out while you wait for the full studio.
                </p>

                <p className="text-gray-700 text-xl leading-relaxed mb-6">
                    Upload your chapter files and instantly see if they meet ACX and Audible's technical requirements — peak levels,
                    loudness, noise floor, sample rate. No more guessing, no more rejected uploads.
                </p>

                <div className="bg-white rounded-xl p-4 mb-6 border border-tep-blue-100">
                    <p className="text-gray-600 text-lg">
                        <span className="text-gray-900 font-medium">How it works:</span> Upload up to 5 chapters (1GB max),
                        and we'll analyze each file against ACX specs. You'll get a pass/fail report for every chapter
                        with specific details on what needs fixing.
                    </p>
                </div>

                <div className="text-center">
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
            </div>

            {/* Bookmark reminder */}
            <p className="mt-6 text-gray-500 text-lg opacity-0 animate-fade-in delay-500">
                <button
                    type="button"
                    onClick={() => {
                        const isMac = navigator.platform.toUpperCase().includes('MAC')
                        const shortcut = isMac ? '⌘D' : 'Ctrl+D'
                        alert(`Press ${shortcut} to bookmark the checker page!`)
                    }}
                    className="cursor-pointer hover:scale-110 transition-transform duration-200 align-middle"
                    aria-label="Bookmark this page"
                >💡</button>
                {' '}Bookmark the checker page so you can come back anytime you need to verify your files.
            </p>
        </div>
    )
}
