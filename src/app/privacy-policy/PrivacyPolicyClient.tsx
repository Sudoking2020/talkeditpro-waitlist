'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function PrivacyPolicyClient() {
  return (
    <main className="min-h-screen bg-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tep-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-tep-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-20">
        {/* Header / Logo */}
        <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16 opacity-0 animate-fade-in">
          <Link href="/" className="inline-flex items-center justify-center mb-6 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="Talk Edit Pro Studio"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </Link>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        {/* Content */}
        <article className="max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-100">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Section title="Introduction">
              <p>
                Welcome to Talk Edit Pro Studio ("we," "our," or "us"). We are committed to protecting your 
                privacy and ensuring the security of your personal information. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our browser-based 
                audiobook production platform and related services.
              </p>
              <p>
                By using Talk Edit Pro Studio, you agree to the collection and use of information in 
                accordance with this policy.
              </p>
            </Section>

            {/* Information We Collect */}
            <Section title="Information We Collect">
              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Personal Information
              </h3>
              <p>When you sign up for our waitlist or create an account, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Audio Content
              </h3>
              <p>
                When you use our audiobook production tools, we process your audio recordings to provide 
                our services. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Audio files you record or upload</li>
                <li>Chapter and project metadata</li>
                <li>Editing history and project settings</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Usage Information
              </h3>
              <p>We automatically collect certain information when you use our service:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address and general location</li>
                <li>Pages visited and features used</li>
                <li>Time spent on the platform</li>
              </ul>
            </Section>

            {/* How We Use Your Information */}
            <Section title="How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide, maintain, and improve our audiobook production services</li>
                <li>Process your audio recordings for editing, noise removal, and mastering</li>
                <li>Ensure your exported files meet ACX and distributor specifications</li>
                <li>Send you updates about your waitlist status, new features, and service announcements</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns to improve user experience</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            {/* Audio Processing & Storage */}
            <Section title="Audio Processing & Storage">
              <p>
                Your audiobook content is important to us. Here's how we handle your audio files:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Browser-based processing:</strong> Most audio processing occurs directly in your 
                  browser using modern web technologies, minimizing data transfer.
                </li>
                <li>
                  <strong>Temporary storage:</strong> Audio files may be temporarily stored on our servers 
                  during processing operations like noise removal and mastering.
                </li>
                <li>
                  <strong>Your ownership:</strong> You retain all rights to your audio content. We do not 
                  claim ownership of any audiobooks or recordings you create.
                </li>
                <li>
                  <strong>Deletion:</strong> You can delete your audio files and projects at any time through 
                  your account settings.
                </li>
              </ul>
            </Section>

            {/* Data Sharing */}
            <Section title="Data Sharing & Disclosure">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Service providers:</strong> With trusted third-party companies that help us operate 
                  our platform (e.g., payment processors, cloud hosting, analytics).
                </li>
                <li>
                  <strong>Legal requirements:</strong> When required by law, court order, or governmental 
                  authority.
                </li>
                <li>
                  <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of 
                  assets, your information may be transferred as a business asset.
                </li>
                <li>
                  <strong>With your consent:</strong> When you explicitly authorize us to share your information.
                </li>
              </ul>
            </Section>

            {/* Cookies & Tracking */}
            <Section title="Cookies & Tracking Technologies">
              <p>
                We use cookies and similar tracking technologies to enhance your experience:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Essential cookies:</strong> Required for the platform to function properly 
                  (authentication, preferences).
                </li>
                <li>
                  <strong>Analytics cookies:</strong> Help us understand how users interact with our 
                  service to improve it.
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to deliver relevant advertisements and measure 
                  campaign effectiveness (e.g., Facebook Pixel).
                </li>
              </ul>
              <p>
                You can control cookie preferences through your browser settings. Note that disabling 
                certain cookies may limit functionality.
              </p>
            </Section>

            {/* Data Security */}
            <Section title="Data Security">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encryption of data in transit (HTTPS/TLS)</li>
                <li>Secure cloud infrastructure with regular security audits</li>
                <li>Access controls and authentication requirements</li>
                <li>Regular security monitoring and vulnerability assessments</li>
              </ul>
              <p>
                While we strive to protect your information, no method of transmission over the Internet 
                is 100% secure. We cannot guarantee absolute security but are committed to maintaining 
                the highest practical standards.
              </p>
            </Section>

            {/* Your Rights */}
            <Section title="Your Rights">
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Access:</strong> Request a copy of the personal information we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information, subject to 
                  legal requirements.
                </li>
                <li>
                  <strong>Portability:</strong> Request your data in a portable, machine-readable format.
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information below.
              </p>
            </Section>

            {/* Children's Privacy */}
            <Section title="Children's Privacy">
              <p>
                Talk Edit Pro Studio is not intended for users under the age of 13. We do not knowingly 
                collect personal information from children under 13. If you believe we have collected 
                information from a child under 13, please contact us immediately so we can delete it.
              </p>
            </Section>

            {/* Changes to This Policy */}
            <Section title="Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "Last updated" date. 
                We encourage you to review this policy periodically.
              </p>
            </Section>

            {/* Contact Us */}
            <Section title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100">
                <p className="text-gray-700 mb-2">
                  <strong>Talk Edit Pro Studio</strong>
                </p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a 
                    href="mailto:privacy@talkeditpro.com" 
                    className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors hover:underline"
                  >
                    privacy@talkeditpro.com
                  </a>
                </p>
              </div>
            </Section>

          </div>
        </article>

        {/* Back to Home Link */}
        <div className="max-w-3xl mx-auto mt-12 text-center opacity-0 animate-fade-in delay-200">
          <Link
            href="/"
            className="inline-flex items-center text-tep-blue-500 hover:text-tep-blue-600 transition-colors font-medium hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Footer */}
        <footer className="max-w-4xl mx-auto text-center pt-12 mt-12 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Talk Edit Pro Studio. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}

// Reusable section component for consistent styling
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="text-gray-700 text-lg leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  )
}
