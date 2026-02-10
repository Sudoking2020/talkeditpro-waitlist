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

            {/* In The Meantime Section */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-tep-blue-50 to-blue-50
                      border border-tep-blue-100 text-left shadow-sm
                      opacity-0 animate-fade-in-up delay-200">
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

            {/* Bookmark reminder */}
            <p className="mt-6 text-gray-500 text-lg opacity-0 animate-fade-in delay-300">
                💡 Bookmark the checker page so you can come back anytime you need to verify your files.
            </p>
        </div>
    )
}
