'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherContextType {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  currentTemp: number | null;
  setCurrentTemp: (temp: number | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isHydrated: boolean;
}

const defaultLocation: Location = {
  name: 'Surat',
  region: 'Gujarat',
  country: 'India',
  lat: 21.1702,
  lon: 72.8311
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocation] = useState<Location>(defaultLocation);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration and load saved location
  useEffect(() => {
    setIsHydrated(true);
    
    if (typeof window !== 'undefined') {
      const savedLocation = localStorage.getItem('selectedLocation');
      if (savedLocation) {
        try {
          const parsedLocation = JSON.parse(savedLocation);
          setSelectedLocation(parsedLocation);
        } catch (error) {
          console.error('Error parsing saved location:', error);
        }
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Save location to localStorage when it changes (but not on initial load)
  useEffect(() => {
    if (typeof window !== 'undefined' && isInitialized) {
      localStorage.setItem('selectedLocation', JSON.stringify(selectedLocation));
    }
  }, [selectedLocation, isInitialized]);

  const value = {
    selectedLocation,
    setSelectedLocation,
    currentTemp,
    setCurrentTemp,
    isLoading,
    setIsLoading,
    isHydrated
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
