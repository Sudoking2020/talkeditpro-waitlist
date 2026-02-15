'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function TermsOfServiceClient() {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </header>

        {/* Content */}
        <article className="max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-100">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <Section title="1. Agreement to Terms">
              <p>
                Welcome to Talk Edit Pro Studio. These Terms of Service ("Terms") govern your access to and 
                use of our browser-based audiobook production platform, website, and related services 
                (collectively, the "Service").
              </p>
              <p>
                By accessing or using Talk Edit Pro Studio, you agree to be bound by these Terms. If you 
                do not agree to these Terms, you may not access or use the Service.
              </p>
            </Section>

            {/* Description of Service */}
            <Section title="2. Description of Service">
              <p>
                Talk Edit Pro Studio is a browser-based audiobook production platform that enables users to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Record audiobook narration chapter-by-chapter directly in the browser</li>
                <li>Edit, process, and master audio recordings</li>
                <li>Apply noise removal and audio enhancement</li>
                <li>Export audio files that meet ACX and other distributor specifications</li>
                <li>Check audio files for compliance with platform requirements</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any 
                time without prior notice.
              </p>
            </Section>

            {/* Account Registration */}
            <Section title="3. Account Registration">
              <p>
                To access certain features of the Service, you may be required to create an account. 
                When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p>
                You must be at least 13 years old to create an account. If you are under 18, you must 
                have parental or guardian consent to use the Service.
              </p>
            </Section>

            {/* User Content */}
            <Section title="4. User Content & Ownership">
              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Your Content
              </h3>
              <p>
                "User Content" refers to any audio recordings, text, manuscripts, project files, or other 
                materials you upload, create, or process through the Service.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>You retain ownership:</strong> You retain all intellectual property rights to 
                  your User Content. We do not claim ownership of any audiobooks, recordings, or creative 
                  works you produce using the Service.
                </li>
                <li>
                  <strong>License to us:</strong> By using the Service, you grant us a limited, 
                  non-exclusive license to process, store, and transmit your User Content solely for the 
                  purpose of providing the Service to you.
                </li>
                <li>
                  <strong>Your responsibility:</strong> You are solely responsible for your User Content 
                  and must have all necessary rights to upload and process it through the Service.
                </li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Content Restrictions
              </h3>
              <p>You agree not to upload or create User Content that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Infringes on any third party's intellectual property rights</li>
                <li>Contains unlawful, defamatory, or harmful material</li>
                <li>Violates any applicable laws or regulations</li>
                <li>Contains malware, viruses, or other harmful code</li>
              </ul>
            </Section>

            {/* Acceptable Use */}
            <Section title="5. Acceptable Use">
              <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the Service in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to the Service or its related systems</li>
                <li>Interfere with or disrupt the Service or servers connected to it</li>
                <li>Use automated systems (bots, scrapers) to access the Service without permission</li>
                <li>Reverse engineer, decompile, or attempt to extract source code from the Service</li>
                <li>Use the Service to transmit spam, malware, or other harmful content</li>
                <li>Impersonate any person or entity, or falsely represent your affiliation</li>
                <li>Share your account credentials with others or allow unauthorized access</li>
              </ul>
            </Section>

            {/* Payment Terms */}
            <Section title="6. Payment Terms">
              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Subscription & Pricing
              </h3>
              <p>
                Certain features of the Service may require a paid subscription. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Pay all fees associated with your chosen plan</li>
                <li>Provide valid payment information</li>
                <li>Authorize us to charge your payment method on a recurring basis</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Refunds
              </h3>
              <p>
                Refund policies vary by subscription type and will be clearly communicated at the time 
                of purchase. Generally, we offer refunds within a specified period if you are not 
                satisfied with the Service.
              </p>

              <h3 className="font-display text-xl font-semibold text-gray-900 mt-6 mb-3">
                Price Changes
              </h3>
              <p>
                We reserve the right to change our pricing at any time. Price changes will be communicated 
                in advance and will not affect your current billing cycle.
              </p>
            </Section>

            {/* Free Tools */}
            <Section title="7. Free Tools & Features">
              <p>
                We offer certain free tools, such as our ACX Compliance Checker. These free tools are 
                provided "as is" without warranty. We reserve the right to modify, limit, or discontinue 
                free features at any time without notice.
              </p>
            </Section>

            {/* Intellectual Property */}
            <Section title="8. Intellectual Property">
              <p>
                The Service, including its design, features, code, documentation, and branding, is owned 
                by Talk Edit Pro Studio and protected by intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Copy, modify, or distribute the Service or its components</li>
                <li>Use our trademarks, logos, or branding without written permission</li>
                <li>Create derivative works based on the Service</li>
              </ul>
            </Section>

            {/* Third-Party Services */}
            <Section title="9. Third-Party Services">
              <p>
                The Service may integrate with or link to third-party services (e.g., ACX, Audible, 
                Findaway Voices, payment processors). Your use of such services is subject to their 
                respective terms and policies. We are not responsible for the content, privacy practices, 
                or availability of third-party services.
              </p>
            </Section>

            {/* Disclaimers */}
            <Section title="10. Disclaimers">
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>ACCURACY, RELIABILITY, OR COMPLETENESS OF THE SERVICE</li>
                <li>THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</li>
                <li>THAT EXPORTED FILES WILL BE ACCEPTED BY ANY SPECIFIC PLATFORM (INCLUDING ACX)</li>
              </ul>
              <p>
                While we strive to ensure audio exports meet platform specifications, acceptance by 
                distributors like ACX is ultimately at their discretion. We do not guarantee acceptance 
                of any audiobook submissions.
              </p>
            </Section>

            {/* Limitation of Liability */}
            <Section title="11. Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, TALK EDIT PRO STUDIO AND ITS OFFICERS, DIRECTORS, 
                EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Cost of substitute services</li>
                <li>Any damages arising from your use or inability to use the Service</li>
              </ul>
              <p>
                Our total liability for any claims arising from these Terms or the Service shall not 
                exceed the amount you paid us in the twelve (12) months preceding the claim.
              </p>
            </Section>

            {/* Indemnification */}
            <Section title="12. Indemnification">
              <p>
                You agree to indemnify, defend, and hold harmless Talk Edit Pro Studio and its officers, 
                directors, employees, and agents from any claims, damages, losses, or expenses (including 
                reasonable attorney's fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your use of the Service</li>
                <li>Your User Content</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
              </ul>
            </Section>

            {/* Termination */}
            <Section title="13. Termination">
              <p>
                We may suspend or terminate your access to the Service at any time, with or without cause 
                or notice, including if we believe you have violated these Terms.
              </p>
              <p>
                You may terminate your account at any time by contacting us. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your right to use the Service will immediately cease</li>
                <li>You must stop using the Service and delete any downloaded materials</li>
                <li>We may delete your account data after a reasonable period</li>
                <li>Provisions that should survive termination (e.g., ownership, liability) will remain in effect</li>
              </ul>
            </Section>

            {/* Changes to Terms */}
            <Section title="14. Changes to Terms">
              <p>
                We may update these Terms from time to time. We will notify you of material changes by 
                posting the updated Terms on this page and updating the "Last updated" date. Your continued 
                use of the Service after changes become effective constitutes acceptance of the revised Terms.
              </p>
            </Section>

            {/* Governing Law */}
            <Section title="15. Governing Law & Disputes">
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without 
                regard to conflict of law principles. Any disputes arising from these Terms or the Service 
                shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be 
                resolved through binding arbitration or in the courts of competent jurisdiction.
              </p>
            </Section>

            {/* Severability */}
            <Section title="16. Severability">
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision 
                shall be modified to the minimum extent necessary to make it enforceable, and the remaining 
                provisions shall continue in full force and effect.
              </p>
            </Section>

            {/* Contact */}
            <Section title="17. Contact Us">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-tep-blue-50 to-blue-50 border border-tep-blue-100">
                <p className="text-gray-700 mb-2">
                  <strong>Talk Edit Pro Studio</strong>
                </p>
                <p className="text-gray-700">
                  Email:{' '}
                  <a 
                    href="mailto:legal@talkeditpro.com" 
                    className="text-tep-blue-500 hover:text-tep-blue-600 transition-colors hover:underline"
                  >
                    legal@talkeditpro.com
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
