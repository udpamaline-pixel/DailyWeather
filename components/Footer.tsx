"use client";

import { CloudSun, Facebook, Twitter, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useWeather } from "@/contexts/WeatherContext";

const Footer = () => {
  const { selectedLocation } = useWeather();
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  
  // Dynamic breadcrumbs based on selected location
  const breadcrumbs = ["World", "Asia", selectedLocation.country, selectedLocation.region, selectedLocation.name];
  
  const footerLinks = {
    COMPANY: [
      "Private Superior Accuracy™",
      "About AccuWeather",
      "Digital Advertising",
      "Careers",
      "Press",
      "Contact Us"
    ],
    "PRODUCTS & SERVICES": [
      "For Business",
      "For Partners",
      "For Advertising",
      "AccuWeather APIs",
      "AccuWeather Connect",
      "RealFeel and RealFeel Shade®",
      "Personal Weather Stations"
    ],
    "APPS & DOWNLOADS": [
      "iPhone App",
      "Android App",
      "See All Apps & Downloads"
    ],
    MORE: [
      "AccuWeather Ready",
      "Business",
      "Health",
      "Hurricane",
      "Lifestyle and Recreation",
      "Severe Weather",
      "Space and Astronomy",
      "Sports",
      "Travel",
      "Weather News"
    ]
  };

  const subscriptionServices = [
    "AccuWeather Premium",
    "AccuWeather Professional"
  ];

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <nav className="flex items-center text-sm overflow-x-auto">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb} className="flex items-center">
                <a href="#" className="hover:text-gray-600 transition-colors">
                  {crumb}
                </a>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Weather Text */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <p className="text-sm break-words">
            Weather Text Goes: {selectedLocation.name}, {selectedLocation.region} - Driving Segment - UV Robust
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-2 sm:px-4 py-12">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className=" hover:text-gray-600 text-sm transition-colors block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              {category === "APPS & DOWNLOADS" && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                    SUBSCRIPTION SERVICES
                  </h4>
                  <ul className="space-y-2">
                    {subscriptionServices.map((service) => (
                      <li key={service}>
                        <a
                          href="#"
                          className=" hover:text-gray-600 text-sm transition-colors block"
                        >
                          {service}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View with Dropdowns */}
        <div className="md:hidden mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="border-b border-gray-200">
              <button
                onClick={() => toggleSection(category)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <h3 className="font-semibold text-sm uppercase tracking-wide">
                  {category}
                </h3>
                <ChevronDown 
                  className={`h-4 w-4  transition-transform ${
                    openSections[category] ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSections[category] && (
                <div className="pb-4">
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className=" hover:text-gray-600 text-sm transition-colors block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {category === "APPS & DOWNLOADS" && (
                    <div className="mt-4">
                      <button
                        onClick={() => toggleSection('SUBSCRIPTION_SERVICES')}
                        className="w-full flex items-center justify-between py-2 text-left"
                      >
                        <h4 className="font-semibold text-sm uppercase tracking-wide">
                          SUBSCRIPTION SERVICES
                        </h4>
                        <ChevronDown 
                          className={`h-4 w-4  transition-transform ${
                            openSections['SUBSCRIPTION_SERVICES'] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openSections['SUBSCRIPTION_SERVICES'] && (
                        <ul className="space-y-2 mt-2">
                          {subscriptionServices.map((service) => (
                            <li key={service}>
                              <a
                                href="#"
                                className=" hover:text-gray-600 text-sm transition-colors block"
                              >
                                {service}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="#"
            className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <Facebook className="h-4 w-4 text-white" />
          </a>
          <a
            href="#"
            className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
          >
            <Twitter className="h-4 w-4 text-white" />
          </a>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="text-center">
            <p className="text-xs mb-2">
              © 2024 AccuWeather, Inc. "AccuWeather" and sun design are registered trademarks of AccuWeather, Inc. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="#" className="hover:underline">Terms of Use</a>
              <span className="">|</span>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span className="">|</span>
              <a href="#" className="hover:underline">Cookie Policy</a>
              <span className="">|</span>
              <a href="#" className="hover:underline">Data Sources</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
