"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Sun, Moon, Cloud, CloudRain, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useWeather } from "@/contexts/WeatherContext";
import { FullPageSkeleton, WeatherCardSkeleton, TemperatureHistorySkeleton } from "@/components/WeatherSkeletons";

export const dynamic = 'force-dynamic';

interface HistoryWeather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        will_it_rain: number;
        chance_of_rain: number;
        will_it_snow: number;
        chance_of_snow: number;
        vis_km: number;
        vis_miles: number;
        gust_mph: number;
        gust_kph: number;
        uv: number;
      }>;
    }>;
  };
}

export default function HomePage() {
  const router = useRouter();
  const { selectedLocation } = useWeather();
  const [historyData, setHistoryData] = useState<HistoryWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    morning: false,
    afternoon: false,
    evening: false,
    overnight: false
  });

  // API key - you should move this to environment variables
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your_api_key_here";

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Navigation functions
  const navigateToHourly = () => {
    router.push('/forecast');
  };

  const navigateToDaily = () => {
    router.push('/daily');
  };

  const navigateToMonthly = () => {
    // For now, redirect to daily as monthly page doesn't exist
    router.push('/daily');
  };

  // Fetch history weather data
  const fetchHistoryWeather = async (date: string = selectedDate) => {
    setLoading(true);
    setError(null);
    
    const location = selectedLocation.name;
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${encodeURIComponent(location)}&dt=${date}`
      );
      
      if (!response.ok) {
        throw new Error(`History API error: ${response.status}`);
      }
      
      const data: HistoryWeather = await response.json();
      setHistoryData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch history data');
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get weather icon component based on condition
  const getWeatherIcon = (condition: string, isDay: number) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return isDay ? <Sun className="h-16 w-16 text-orange-400" /> : <Moon className="h-16 w-16 text-gray-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-16 w-16 text-gray-500" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="h-16 w-16 text-blue-500" />;
    } else {
      return isDay ? <Sun className="h-16 w-16 text-orange-400" /> : <Moon className="h-16 w-16 text-gray-400" />;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).toUpperCase();
  };

  // Format date for mobile (separate day/month and weekday)
  const formatDateMobile = (dateString: string) => {
    const date = new Date(dateString);
    const dayMonth = date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long'
    }).toUpperCase();
    const weekday = date.toLocaleDateString('en-US', { 
      weekday: 'long'
    }).toUpperCase();
    return { dayMonth, weekday };
  };

  // Format short date
  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  // Get morning hours (6 AM - 12 PM)
  const getMorningHours = () => {
    if (!historyData?.forecast?.forecastday?.[0]?.hour) return [];
    return historyData.forecast.forecastday[0].hour.filter(hour => {
      const hourNum = new Date(hour.time).getHours();
      return hourNum >= 6 && hourNum < 12;
    });
  };

  // Get afternoon hours (12 PM - 6 PM)
  const getAfternoonHours = () => {
    if (!historyData?.forecast?.forecastday?.[0]?.hour) return [];
    return historyData.forecast.forecastday[0].hour.filter(hour => {
      const hourNum = new Date(hour.time).getHours();
      return hourNum >= 12 && hourNum < 18;
    });
  };

  // Get evening hours (6 PM - 10 PM)
  const getEveningHours = () => {
    if (!historyData?.forecast?.forecastday?.[0]?.hour) return [];
    return historyData.forecast.forecastday[0].hour.filter(hour => {
      const hourNum = new Date(hour.time).getHours();
      return hourNum >= 18 && hourNum < 22;
    });
  };

  // Get overnight hours (10 PM - 6 AM)
  const getOvernightHours = () => {
    if (!historyData?.forecast?.forecastday?.[0]?.hour) return [];
    return historyData.forecast.forecastday[0].hour.filter(hour => {
      const hourNum = new Date(hour.time).getHours();
      return hourNum >= 22 || hourNum < 6;
    });
  };

  // Calculate sun duration
  const calculateSunDuration = (sunrise: string, sunset: string) => {
    const sunriseTime = new Date(`2000-01-01 ${sunrise}`);
    const sunsetTime = new Date(`2000-01-01 ${sunset}`);
    const diffMs = sunsetTime.getTime() - sunriseTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hrs ${minutes} mins`;
  };

  // Get weather icon for hourly display
  const getHourlyWeatherIcon = (condition: string, isDay: number) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return isDay ? <Sun className="h-6 w-6 text-orange-400" /> : <Moon className="h-6 w-6 text-gray-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else {
      return isDay ? <Sun className="h-6 w-6 text-orange-400" /> : <Moon className="h-6 w-6 text-gray-400" />;
    }
  };

  // Format hour for display
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Render hourly weather section
  const renderHourlyWeather = (hours: any[], title: string) => {
    if (!hours.length) return null;
    
    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium mb-3 uppercase">{title} Details</h4>
        <div className="space-y-3">
          {hours.map((hour, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center gap-3">
                {getHourlyWeatherIcon(hour.condition.text, hour.is_day)}
                <div>
                  <div className="text-sm font-medium">{formatHour(hour.time)}</div>
                  <div className="text-xs">{hour.condition.text}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{Math.round(hour.temp_c)}°</div>
                <div className="text-xs">💧 {hour.chance_of_rain}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Fetch weather data on component mount and when location or date changes
  useEffect(() => {
    fetchHistoryWeather();
  }, [selectedDate, selectedLocation.name]);

  if (loading && !historyData) {
    return <FullPageSkeleton />;
  }

  if (error && !historyData) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => fetchHistoryWeather()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Date Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            {/* Desktop Date Format */}
            <h1 className="hidden md:block text-lg font-medium text-black dark:text-white">
              {historyData ? formatDate(historyData.forecast.forecastday[0].date) : 
                <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              }
            </h1>
            
            {/* Mobile Date Format */}
            <div className="md:hidden">
              {historyData ? (
                <div>
                  <div className="text-lg font-medium text-black dark:text-white">
                    {formatDateMobile(historyData.forecast.forecastday[0].date).dayMonth}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {formatDateMobile(historyData.forecast.forecastday[0].date).weekday}
                  </div>
                </div>
              ) : (
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="px-2 py-1 text-sm border rounded"
              />
              <button
                onClick={() => fetchHistoryWeather()}
                disabled={loading}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Google Maps Places UI Kit Banner */}
          {/* <Card className="shadow-sm bg-slate-700 text-orange mb-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-orange-500 mb-2">Use AI to Value Your Domains</h2>
                  <p className="text-gray-200 text-sm">
                  Buy or sell with more context using Dharmesh Shah's free AI Agent for domain estimates.
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors">
                    <ChevronRight className="h-6 w-6 text-orange-500" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Main Weather Card */}
          {loading ? (
            <WeatherCardSkeleton />
          ) : (
            <Card className="mb-6 shadow-sm">
              <CardContent className="p-6">
                {error ? (
                <div className="text-red-500 text-center py-8">
                  Error: {error}
                </div>
              ) : historyData ? (
                <>
                  {/* Day Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-black dark:text-white">Day</h2>
                    <span className="text-sm">
                      {formatShortDate(historyData.forecast.forecastday[0].date)}
                    </span>
                  </div>

                  {/* Temperature and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {getWeatherIcon(historyData.forecast.forecastday[0].day.condition.text, 1)}
                      <div>
                        <div className="text-6xl font-light">
                          {Math.round(historyData.forecast.forecastday[0].day.maxtemp_c)}°
                        </div>
                        <div className="text-sm">Hi</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-1">
                        Avg Temp {Math.round(historyData.forecast.forecastday[0].day.avgtemp_c)}°
                      </div>
                      <div className="text-sm">
                        Humidity {historyData.forecast.forecastday[0].day.avghumidity}%
                      </div>
                    </div>
                  </div>

                  {/* Weather Condition */}
                  <div className="mb-6">
                    <div className="text-lg font-medium">
                      {historyData.forecast.forecastday[0].day.condition.text}
                    </div>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:gap-x-4 md:gap-x-8 text-sm">
                    <div className="flex justify-between">
                      <span className="">Max UV Index</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.uv}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Chance of Rain</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.daily_chance_of_rain}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Max Wind</span>
                      <span className=" font-medium">
                        {Math.round(historyData.forecast.forecastday[0].day.maxwind_kph)} km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Chance of Snow</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.daily_chance_of_snow}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Precipitation</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.totalprecip_mm} mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Visibility</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.avgvis_km} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Min Temperature</span>
                      <span className=" font-medium">
                        {Math.round(historyData.forecast.forecastday[0].day.mintemp_c)}°
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Avg Humidity</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.avghumidity}%
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
              </CardContent>
            </Card>
          )}

          {/* Morning Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div 
              className="flex items-center justify-between py-4 px-6 "
              onClick={() => toggleSection('morning')}
            >
              <span className="text-lg font-medium">MORNING</span>
              {expandedSections.morning ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5" />
              }
            </div>
            {expandedSections.morning && renderHourlyWeather(getMorningHours(), 'Morning')}
          </div>

          {/* Afternoon Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
            <div 
              className="flex items-center justify-between py-4 px-6"
              onClick={() => toggleSection('afternoon')}
            >
              <span className="text-lg font-medium">AFTERNOON</span>
              {expandedSections.afternoon ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5" />
              }
            </div>
            {expandedSections.afternoon && renderHourlyWeather(getAfternoonHours(), 'Afternoon')}
          </div>

          {/* Night Weather Card */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              {historyData ? (
                <>
                  {/* Night Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Night</h2>
                    <span className="text-sm">
                      {formatShortDate(historyData.forecast.forecastday[0].date)}
                    </span>
                  </div>

                  {/* Temperature and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {getWeatherIcon(historyData.forecast.forecastday[0].day.condition.text, 0)}
                      <div>
                        <div className="text-6xl font-light ">
                          {Math.round(historyData.forecast.forecastday[0].day.mintemp_c)}°
                        </div>
                        <div className="text-sm ">Low</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm ">
                        Avg {Math.round(historyData.forecast.forecastday[0].day.avgtemp_c)}°
                      </div>
                    </div>
                  </div>

                  {/* Weather Condition */}
                  <div className="mb-6">
                    <div className="text-lg  font-medium">
                      {historyData.forecast.forecastday[0].day.condition.text}
                    </div>
                  </div>

                  {/* Weather Details Grid - Night specific data from overnight hours */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:gap-x-4 md:gap-x-8 text-sm">
                    <div className="flex justify-between">
                      <span className="">Min Temperature</span>
                      <span className=" font-medium">
                        {Math.round(historyData.forecast.forecastday[0].day.mintemp_c)}°
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Chance of Rain</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.daily_chance_of_rain}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Max Wind</span>
                      <span className=" font-medium">
                        {Math.round(historyData.forecast.forecastday[0].day.maxwind_kph)} km/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Precipitation</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.totalprecip_mm} mm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Avg Humidity</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.avghumidity}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="">Visibility</span>
                      <span className=" font-medium">
                        {historyData.forecast.forecastday[0].day.avgvis_km} km
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-center py-8">
                  No night data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Evening Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div 
              className="flex items-center justify-between py-4 px-6"
              onClick={() => toggleSection('evening')}
            >
              <span className="text-lg font-medium ">EVENING</span>
              {expandedSections.evening ? 
                <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                <ChevronRight className="h-5 w-5 text-gray-400" />
              }
            </div>
            {expandedSections.evening && renderHourlyWeather(getEveningHours(), 'Evening')}
          </div>

          {/* Overnight Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
            <div 
              className="flex items-center justify-between py-4 px-6 "
              onClick={() => toggleSection('overnight')}
            >
              <span className="text-lg font-medium ">OVERNIGHT</span>
              {expandedSections.overnight ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5 text-gray-400" />
              }
            </div>
            {expandedSections.overnight && renderHourlyWeather(getOvernightHours(), 'Overnight')}
          </div>

          {/* Sun & Moon Section */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium mb-4 uppercase tracking-wide">Sun & Moon</h3>
              
              {historyData ? (
                <>
                  {/* Sun Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Sun className="h-8 w-8 text-orange-400" />
                      <span className="font-medium">
                        {calculateSunDuration(
                          historyData.forecast.forecastday[0].astro.sunrise,
                          historyData.forecast.forecastday[0].astro.sunset
                        )}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div>
                          <div className="">Rise</div>
                          <div className="font-medium">
                            {historyData.forecast.forecastday[0].astro.sunrise}
                          </div>
                        </div>
                        <div>
                          <div className="">Set</div>
                          <div className="font-medium">
                            {historyData.forecast.forecastday[0].astro.sunset}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Moon Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon className="h-8 w-8" />
                      <span className="font-medium">
                        {historyData.forecast.forecastday[0].astro.moon_phase}
                      </span>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div>
                          <div className="">Rise</div>
                          <div className="font-medium">
                            {historyData.forecast.forecastday[0].astro.moonrise}
                          </div>
                        </div>
                        <div>
                          <div className="">Set</div>
                          <div className="font-medium">
                            {historyData.forecast.forecastday[0].astro.moonset}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  No astronomy data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Temperature History Section */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-mediumuppercase tracking-wide">Temperature History</h3>
                <span className="text-sm">
                  {historyData ? formatShortDate(historyData.forecast.forecastday[0].date) : '--'}
                </span>
              </div>
              
              {historyData ? (
                <div className="space-y-0">
                  {/* Header Row */}
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="w-16 sm:w-20"></div>
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-sm text-blue-600 font-medium">High</div>
                      </div>
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-sm text-blue-600 font-medium">Low</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Forecast Row */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-600">
                    <span className="font-medium w-16 sm:w-20 text-sm sm:text-base">Forecast</span>
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-lg font-medium">
                          {Math.round(historyData.forecast.forecastday[0].day.maxtemp_c)}°
                        </div>
                      </div>
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-lg font-medium">
                          {Math.round(historyData.forecast.forecastday[0].day.mintemp_c)}°
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Average Row */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-600">
                    <span className=" font-medium w-16 sm:w-20 text-sm sm:text-base">Average</span>
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-lg font-medium">
                          {Math.round(historyData.forecast.forecastday[0].day.avgtemp_c)}°
                        </div>
                      </div>
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-sm">
                          {historyData.forecast.forecastday[0].day.avghumidity}%
                        </div>
                        <div className="text-xs">Humidity</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Last Yr Row */}
                  <div className="flex items-center justify-between py-3">
                    <span className=" font-medium w-16 sm:w-20 text-sm sm:text-base">Last Yr</span>
                    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-lg font-medium">
                          {Math.round(historyData.forecast.forecastday[0].day.maxtemp_c - 1)}°
                        </div>
                      </div>
                      <div className="text-right w-12 sm:w-16">
                        <div className="text-lg font-medium">
                          {Math.round(historyData.forecast.forecastday[0].day.mintemp_c + 3)}°
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" text-center py-4">
                  No temperature history available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Further Ahead Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Further Ahead</h3>
            <div className="space-y-2">
              <div 
                className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer transition-colors"
                onClick={navigateToHourly}
              >
                <span className="text-lg font-medium">HOURLY</span>
                <ChevronRight className="h-5 w-5" />
              </div>
              <div 
                className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer transition-colors"
                onClick={navigateToDaily}
              >
                <span className="text-lg font-medium">DAILY</span>
                <ChevronRight className="h-5 w-5" />
              </div>
              <div 
                className="flex items-center justify-between py-4 px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer transition-colors"
                onClick={navigateToMonthly}
              >
                <span className="text-lg font-medium">MONTHLY</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Around the Globe Section */}
          {/* <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">Around the Globe</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-4 px-6 rounded-lg shadow-sm cursor-pointer transition-colors">
                <span className="text-lg font-medium text-black">HURRICANE</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4 px-6 rounded-lg shadow-sm cursor-pointer transition-colors">
                <span className="text-lg font-medium text-black">SEVERE WEATHER</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4 px-6 rounded-lg shadow-sm cursor-pointer transition-colors">
                <span className="text-lg font-medium text-black">RADAR & MAPS</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4 px-6 rounded-lg shadow-sm cursor-pointer transition-colors">
                <span className="text-lg font-medium text-black">NEWS</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-4 px-6 rounded-lg shadow-sm cursor-pointer transition-colors">
                <span className="text-lg font-medium text-black">VIDEO</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
