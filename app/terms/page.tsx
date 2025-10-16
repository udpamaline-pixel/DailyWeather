'use client';

import { Card, CardContent } from "@/components/ui/card";



export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Terms of Use
          </h1>
          
          <Card className="shadow-sm mb-6">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Introduction */}
              <section>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Last Updated: October 16, 2025
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Welcome to Daily Weather. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              {/* Use of Service */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  1. Use of Service
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Daily Weather provides weather information and forecasting services. You may use our service for personal, non-commercial purposes only. You agree not to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to any portion of the service</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Reproduce, duplicate, copy, sell, resell or exploit any portion of the service without express written permission</li>
                    <li>Use automated means to access the service or collect data</li>
                  </ul>
                </div>
              </section>

              {/* Weather Information Disclaimer */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  2. Weather Information Disclaimer
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Weather forecasts and information are provided for informational purposes only. While we strive to provide accurate and up-to-date weather information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Weather forecasts are predictions and may not always be accurate</li>
                    <li>We do not guarantee the accuracy, completeness, or timeliness of any weather information</li>
                    <li>You should not rely solely on our forecasts for critical decisions</li>
                    <li>Always consult official weather services for severe weather warnings and alerts</li>
                    <li>We are not responsible for any damages or losses resulting from reliance on our weather information</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  3. Intellectual Property Rights
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  The service and its original content, features, and functionality are owned by Daily Weather and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. All weather data is provided by third-party weather APIs and remains the property of their respective owners.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  4. Third-Party Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Our service integrates with third-party weather APIs and services. We are not responsible for the content, accuracy, or practices of these third-party services. Your use of third-party services is subject to their respective terms and conditions.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  5. Limitation of Liability
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  In no event shall Daily Weather, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                </p>
              </section>

              {/* User Conduct */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  6. User Conduct
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    You agree to use the service responsibly and in compliance with all applicable laws. You are responsible for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintaining the security of your device and internet connection</li>
                    <li>All activities that occur under your access to the service</li>
                    <li>Ensuring your use does not violate any laws or regulations</li>
                  </ul>
                </div>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  7. Privacy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Your use of the service is also governed by our Privacy Policy. We collect minimal personal information and use location data solely to provide weather forecasts for your selected locations. We do not sell or share your personal information with third parties for marketing purposes.
                </p>
              </section>

              {/* Service Availability */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  8. Service Availability
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We strive to provide continuous service, but we do not guarantee that the service will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue the service at any time without notice.
                </p>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  9. Changes to Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. Your continued use of the service after any changes constitutes acceptance of those changes.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  10. Governing Law
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  These terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.
                </p>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  11. Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  If you have any questions about these Terms of Use, please contact us at:
                </p>
                <div className="mt-3 text-gray-700 dark:text-gray-300">
                  <p>Email: support@Daily Weather.com</p>
                  <p>Website: www.Daily Weather.com</p>
                </div>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  12. Severability
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
                </p>
              </section>

              {/* Acknowledgment */}
              <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  By using Daily Weather, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
