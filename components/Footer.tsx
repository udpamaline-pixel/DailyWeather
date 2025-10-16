"use client";

import { CloudSun, Facebook, Twitter, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useWeather } from "@/contexts/WeatherContext";
import Link from "next/link";

const Footer = () => {
  const { selectedLocation } = useWeather();
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  
  // Dynamic breadcrumbs based on selected location
  const breadcrumbs = ["World", "Asia", selectedLocation.country, selectedLocation.region, selectedLocation.name];
  
  const footerLinks = {
    COMPANY: [
      "Private Superior Accuracy™",
      "About Daily Weather",
      "Digital Advertising",
      "Careers",
      "Press",
      "Contact Us"
    ],
    "PRODUCTS & SERVICES": [
      "For Business",
      "For Partners",
      "For Advertising",
      "Daily Weather APIs",
      "Daily Weather Connect",
      "RealFeel and RealFeel Shade®",
      "Personal Weather Stations"
    ],
    "APPS & DOWNLOADS": [
      "iPhone App",
      "Android App",
      "See All Apps & Downloads"
    ],
    MORE: [
      "Daily Weather Ready",
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
    "Daily Weather Premium",
    "Daily Weather Professional"
  ];

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ">
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

      

      {/* Main Footer Content */}
      <div className="container mx-auto px-2 sm:px-4">


      
       
        {/* Copyright and Legal */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="text-center">
            <p className="text-xs mb-2">
              © 2025 Daily Weather, Inc. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/terms" className="hover:underline text-blue-600 dark:text-blue-400">Terms of Use</Link>
              <span className="">|</span>
              <Link href="/privacy" className="hover:underline text-blue-600 dark:text-blue-400">Privacy Policy</Link>
              <span className="">|</span>
              <Link href="/cookies" className="hover:underline text-blue-600 dark:text-blue-400">Cookie Policy</Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
