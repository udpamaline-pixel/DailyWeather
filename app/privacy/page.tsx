'use client';

import { Card, CardContent } from "@/components/ui/card";


export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Privacy Policy
          </h1>
          
          <Card className="shadow-sm mb-6">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Introduction */}
              <section>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Last Updated: October 16, 2025
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  At Daily Weather, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our weather services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold mb-2">1.1 Personal Information</h3>
                    <p className="mb-2">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Search for weather information for specific locations</li>
                      <li>Contact us with inquiries or feedback</li>
                      <li>Subscribe to our newsletters or alerts (if applicable)</li>
                      <li>Participate in surveys or promotions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">1.2 Location Information</h3>
                    <p>
                      We collect location data to provide you with accurate, localized weather forecasts. This may include:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>City, region, and country you search for</li>
                      <li>IP address-based location (approximate)</li>
                      <li>GPS coordinates (if you grant permission)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">1.3 Usage Data</h3>
                    <p>
                      We automatically collect certain information when you visit our website, including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>IP address</li>
                      <li>Pages visited and time spent on pages</li>
                      <li>Referring website</li>
                      <li>Device information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">1.4 Cookies and Tracking Technologies</h3>
                    <p>
                      We use cookies, web beacons, and similar tracking technologies to enhance your experience. These help us:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Remember your preferences (e.g., theme settings)</li>
                      <li>Analyze site traffic and usage patterns</li>
                      <li>Provide personalized content</li>
                      <li>Improve our services</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To provide accurate weather forecasts for your selected locations</li>
                    <li>To improve and optimize our website and services</li>
                    <li>To analyze usage trends and user preferences</li>
                    <li>To respond to your inquiries and provide customer support</li>
                    <li>To send you updates, alerts, or notifications (with your consent)</li>
                    <li>To prevent fraud and ensure security</li>
                    <li>To comply with legal obligations</li>
                    <li>To display relevant advertisements (if applicable)</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  3. Third-Party Services and Data Sharing
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    We use third-party weather APIs to provide weather data and forecasts. These services may collect and process certain information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Weather API Providers:</strong> We use WeatherAPI.com to fetch weather data. Your location queries are sent to their servers to retrieve forecasts.</li>
                    <li><strong>Analytics Services:</strong> We may use analytics tools to understand how users interact with our site.</li>
                    <li><strong>Advertising Partners:</strong> If we display ads, advertising networks may collect information through cookies.</li>
                  </ul>
                  <p className="mt-3">
                    We do not sell your personal information to third parties. We only share information as necessary to provide our services or as required by law.
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  4. Data Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* Data Retention */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  5. Data Retention
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Location searches and preferences are typically stored locally in your browser and can be cleared at any time.
                </p>
              </section>

              {/* Your Privacy Rights */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  6. Your Privacy Rights
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>Depending on your location, you may have the following rights:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                    <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                    <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                  </p>
                </div>
              </section>

              {/* Cookies Management */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  7. Managing Cookies and Tracking
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our services. You can manage your cookie preferences through your browser settings.
                </p>
              </section>

              {/* Children's Privacy */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  8. Children's Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems.
                </p>
              </section>

              {/* International Data Transfers */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  9. International Data Transfers
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws. By using our service, you consent to the transfer of your information to countries outside of your country of residence, which may have different data protection rules.
                </p>
              </section>

              {/* Do Not Track */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  10. Do Not Track Signals
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Some web browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. We currently do not respond to Do Not Track signals. You can manage tracking preferences through your browser settings and cookie management tools.
                </p>
              </section>

              {/* Changes to Privacy Policy */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  11. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our service after any modifications indicates your acceptance of the updated Privacy Policy.
                </p>
              </section>

              {/* Legal Basis for Processing */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  12. Legal Basis for Processing (GDPR)
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>If you are from the European Economic Area (EEA), our legal basis for collecting and using your information depends on the data and context:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Consent:</strong> You have given us permission to process your information</li>
                    <li><strong>Contract:</strong> Processing is necessary to provide our services</li>
                    <li><strong>Legitimate Interests:</strong> Processing is in our legitimate interests (e.g., improving our services)</li>
                    <li><strong>Legal Obligation:</strong> Processing is necessary to comply with the law</li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  13. Contact Us
                </h2>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                  </p>
                
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  By using Daily Weather, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
