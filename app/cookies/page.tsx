'use client';

import { Card, CardContent } from "@/components/ui/card";

// Metadata for SEO


export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Cookie Policy
          </h1>
          
          <Card className="shadow-sm mb-6">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Introduction */}
              <section>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Last Updated: October 16, 2025
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  This Cookie Policy explains how Daily Weather ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website. This policy explains what these technologies are, why we use them, and your rights to control our use of them.
                </p>
              </section>

              {/* What Are Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  1. What Are Cookies?
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                  </p>
                  <p>
                    Cookies set by the website owner (in this case, Daily Weather) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
                  </p>
                </div>
              </section>

              {/* Why We Use Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  2. Why We Use Cookies
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>We use cookies for several reasons:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Functionality:</strong> To enable basic website features and ensure the site works properly</li>
                    <li><strong>Performance & Analytics:</strong> To understand how visitors interact with our website</li>
                    <li><strong>Personalization:</strong> To remember your preferences and settings (e.g., theme, location)</li>
                    <li><strong>Security:</strong> To protect against fraudulent activity and improve security</li>
                    <li><strong>Advertising:</strong> To deliver relevant advertisements (if applicable)</li>
                  </ul>
                </div>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  3. Types of Cookies We Use
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  
                  {/* Strictly Necessary Cookies */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                      3.1 Strictly Necessary Cookies
                    </h3>
                    <p className="mb-2">
                      These cookies are essential for the website to function properly. They cannot be disabled in our systems.
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 dark:border-gray-600">
                            <th className="text-left py-2 pr-4">Cookie Name</th>
                            <th className="text-left py-2 pr-4">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">session_id</td>
                            <td className="py-2 pr-4">Maintains user session</td>
                            <td className="py-2">Session</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">security_token</td>
                            <td className="py-2 pr-4">Security and fraud prevention</td>
                            <td className="py-2">1 hour</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                      3.2 Functional Cookies
                    </h3>
                    <p className="mb-2">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 dark:border-gray-600">
                            <th className="text-left py-2 pr-4">Cookie Name</th>
                            <th className="text-left py-2 pr-4">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">theme_preference</td>
                            <td className="py-2 pr-4">Remembers dark/light mode preference</td>
                            <td className="py-2">1 year</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">location_data</td>
                            <td className="py-2 pr-4">Stores selected weather locations</td>
                            <td className="py-2">30 days</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">user_preferences</td>
                            <td className="py-2 pr-4">Stores user settings (units, language)</td>
                            <td className="py-2">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Performance Cookies */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                      3.3 Performance and Analytics Cookies
                    </h3>
                    <p className="mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 dark:border-gray-600">
                            <th className="text-left py-2 pr-4">Cookie Name</th>
                            <th className="text-left py-2 pr-4">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                            <td className="py-2 pr-4">Google Analytics - visitor tracking</td>
                            <td className="py-2">2 years</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                            <td className="py-2 pr-4">Google Analytics - session tracking</td>
                            <td className="py-2">24 hours</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">analytics_session</td>
                            <td className="py-2 pr-4">Track page views and user behavior</td>
                            <td className="py-2">30 minutes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Advertising Cookies */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                      3.4 Advertising and Targeting Cookies
                    </h3>
                    <p className="mb-2">
                      These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300 dark:border-gray-600">
                            <th className="text-left py-2 pr-4">Cookie Name</th>
                            <th className="text-left py-2 pr-4">Purpose</th>
                            <th className="text-left py-2">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">ad_id</td>
                            <td className="py-2 pr-4">Track ad impressions and clicks</td>
                            <td className="py-2">90 days</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 pr-4 font-mono text-xs">targeting_cookie</td>
                            <td className="py-2 pr-4">Deliver personalized advertisements</td>
                            <td className="py-2">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* Third-Party Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  4. Third-Party Cookies
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements. These include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Weather API Services:</strong> WeatherAPI.com may set cookies when fetching weather data</li>
                    <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                    <li><strong>Advertising Networks:</strong> For displaying and measuring ad effectiveness</li>
                    <li><strong>Social Media Platforms:</strong> If you interact with social sharing features</li>
                  </ul>
                  <p className="mt-3">
                    Please note that third-party cookies are subject to the privacy policies of those third parties, not this Cookie Policy.
                  </p>
                </div>
              </section>

              {/* Local Storage */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  5. Local Storage and Session Storage
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    In addition to cookies, we may use browser local storage and session storage technologies to store preferences and improve performance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Selected Locations:</strong> Your weather location searches and favorites</li>
                    <li><strong>Theme Settings:</strong> Your dark/light mode preference</li>
                    <li><strong>Cache Data:</strong> Temporary weather data to improve loading speed</li>
                    <li><strong>User Preferences:</strong> Temperature units, language preferences</li>
                  </ul>
                  <p className="mt-3">
                    This data is stored locally on your device and can be cleared through your browser settings.
                  </p>
                </div>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  6. How to Control and Delete Cookies
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:
                  </p>
                  
                  <div className="mt-3">
                    <h4 className="font-semibold mb-2">Browser Settings</h4>
                    <p className="mb-2">Most web browsers allow you to control cookies through their settings:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                      <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                      <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                      <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>
                  </div>

                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">⚠️ Important Note:</p>
                    <p className="mt-2 text-yellow-700 dark:text-yellow-200">
                      If you choose to block or delete cookies, some features of our website may not function properly. For example, your theme preferences may not be saved, and you may need to re-enter your location searches each time you visit.
                    </p>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-semibold mb-2">Opt-Out Options</h4>
                    <p className="mb-2">You can opt out of certain types of tracking:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                      <li>Advertising cookies: Visit <a href="http://www.youronlinechoices.com/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">Your Online Choices</a> or <a href="http://optout.aboutads.info/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">NAI Opt-Out</a></li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Mobile Devices */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  7. Cookies on Mobile Devices
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Similar to desktop browsers, mobile device browsers also allow you to control cookies through their settings. Additionally, you can manage tracking preferences through your device's privacy settings (e.g., "Limit Ad Tracking" on iOS or "Opt out of Ads Personalization" on Android).
                </p>
              </section>

              {/* Updates to Cookie Policy */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  8. Updates to This Cookie Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, our operations, or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies and related technologies. The "Last Updated" date at the top of this policy indicates when it was last revised.
                </p>
              </section>

              {/* More Information */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  9. More Information About Cookies
                </h2>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    If you would like to learn more about cookies and their use on the internet, you may find the following resources helpful:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><a href="https://www.allaboutcookies.org/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
                    <li><a href="https://www.cookiechoices.org/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">Cookie Choices</a></li>
                    <li><a href="https://ico.org.uk/for-the-public/online/cookies/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">ICO Cookie Guidance</a></li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  10. Contact Us
                </h2>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-3">
                    If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-1">
                    <p><strong>Email:</strong> privacy@Daily Weather.com</p>
                    <p><strong>Support:</strong> support@Daily Weather.com</p>
                    <p><strong>Website:</strong> www.Daily Weather.com</p>
                  </div>
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  By continuing to use our website, you consent to our use of cookies and similar tracking technologies as described in this Cookie Policy.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
