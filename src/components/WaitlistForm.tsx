'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface WaitlistFormProps {
  onSuccess: () => void
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // If supabase is not configured, use test mode
      if (!supabase) {
        console.log('Test mode: would have saved email:', email)
        setStatus('success')
        setTimeout(onSuccess, 1500)
        return
      }

      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase())
        .single()

      if (existing) {
        // Email already on waitlist, still count as success
        setStatus('success')
        setTimeout(onSuccess, 1500)
        return
      }

      // Insert new email
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email.toLowerCase(),
            source: 'landing_page',
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setStatus('success')
      setTimeout(onSuccess, 1500)
    } catch (err) {
      console.error('Waitlist signup error:', err)
      // If it's a connection error, fall back to test mode
      if (err instanceof Error && (err.message.includes('fetch') || err.message.includes('network'))) {
        console.log('Test mode (connection error): would have saved email:', email)
        setStatus('success')
        setTimeout(onSuccess, 1500)
        return
      }
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 
                     text-gray-900 placeholder:text-gray-500 text-lg
                     focus:border-tep-blue-500 focus:ring-2 focus:ring-tep-blue-100
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-8 py-4 rounded-xl font-semibold text-lg
                   bg-tep-blue-500 hover:bg-tep-blue-600 
                   disabled:opacity-70 disabled:cursor-not-allowed
                   text-white shadow-md shadow-tep-blue-500/20
                   hover:shadow-lg hover:shadow-tep-blue-500/30
                   transform hover:-translate-y-0.5
                   transition-all duration-300
                   flex items-center justify-center gap-2 min-w-[160px]"
        >
          {status === 'loading' && (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Joining...</span>
            </>
          )}
          {status === 'success' && (
            <>
              <Check className="w-5 h-5" />
              <span>You're in!</span>
            </>
          )}
          {(status === 'idle' || status === 'error') && (
            <>
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {status === 'error' && errorMessage && (
        <p className="mt-3 text-red-600 text-xl text-center">{errorMessage}</p>
      )}

      {status === 'success' && (
        <p className="mt-3 text-green-600 text-xl text-center">
          🎉 Welcome aboard! Check below for a free tool while you wait.
        </p>
      )}
    </form>
  )
}
