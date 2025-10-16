"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Sun, Moon, Cloud, CloudRain, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useWeather } from "@/contexts/WeatherContext";
import { WeatherCardSkeleton, HourlyForecastSkeleton, DailyForecastSkeleton } from "@/components/WeatherSkeletons";

export const dynamic = 'force-dynamic';

;

interface CurrentWeather {
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
  current: {
    last_updated_epoch: number;
    last_updated: string;
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
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

interface AstronomyData {
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
  astronomy: {
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
  };
}

interface ForecastWeather {
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
  current: {
    last_updated_epoch: number;
    last_updated: string;
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
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
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

export default function ForecastPage() {
  const { selectedLocation } = useWeather();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null);
  const [forecastData, setForecastData] = useState<ForecastWeather | null>(null);
  const [astronomyData, setAstronomyData] = useState<AstronomyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API key - you should move this to environment variables
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your_api_key_here";

  // Fetch forecast weather data (includes current + forecast)
  const fetchForecastWeather = async () => {
    setLoading(true);
    setError(null);

    const location = selectedLocation.name;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=10&aqi=yes&alerts=yes`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Forecast API Response:', response.status, errorText);
        throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
      }

      const data: ForecastWeather = await response.json();
      setForecastData(data);
      // Also set current weather data from forecast response
      setWeatherData({
        location: data.location,
        current: data.current
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch forecast data';
      setError(errorMessage);
      console.error('Forecast fetch error:', err);

      // Try to provide helpful error messages
      if (errorMessage.includes('400')) {
        setError('Invalid API request. Please check your API key and try again.');
      } else if (errorMessage.includes('401')) {
        setError('Invalid API key. Please check your Weather API key.');
      } else if (errorMessage.includes('403')) {
        setError('API access forbidden. Your API key may have exceeded its limits.');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError('Network error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch current weather data (fallback)
  const fetchCurrentWeather = async () => {
    setLoading(true);
    setError(null);

    const location = selectedLocation.name;

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Current Weather API Response:', response.status, errorText);
        throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
      }

      const data: CurrentWeather = await response.json();
      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      console.error('Weather fetch error:', err);

      // Try to provide helpful error messages
      if (errorMessage.includes('400')) {
        setError('Invalid API request. Please check your API key and try again.');
      } else if (errorMessage.includes('401')) {
        setError('Invalid API key. Please check your Weather API key.');
      } else if (errorMessage.includes('403')) {
        setError('API access forbidden. Your API key may have exceeded its limits.');
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        setError('Network error. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch astronomy data
  const fetchAstronomyData = async () => {
    const location = selectedLocation.name;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${encodeURIComponent(location)}&dt=${new Date().toISOString().split('T')[0]}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Astronomy API Response:', response.status, errorText);
        throw new Error(`Astronomy API error: ${response.status} - ${response.statusText}`);
      }

      const data: AstronomyData = await response.json();
      setAstronomyData(data);
    } catch (err) {
      console.error('Astronomy fetch error:', err);
      // Don't set error state for astronomy as it's supplementary data
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

  // Format time from API
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Format date
  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  // Get next 12 hours of forecast data
  const getNext12Hours = () => {
    if (!forecastData?.forecast?.forecastday) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const hours = [];

    // Get today's remaining hours
    const today = forecastData.forecast.forecastday[0];
    if (today?.hour) {
      for (let i = currentHour; i < 24 && hours.length < 12; i++) {
        hours.push(today.hour[i]);
      }
    }

    // Get tomorrow's hours if needed
    if (hours.length < 12 && forecastData.forecast.forecastday[1]?.hour) {
      const tomorrow = forecastData.forecast.forecastday[1];
      for (let i = 0; i < 24 && hours.length < 12; i++) {
        hours.push(tomorrow.hour[i]);
      }
    }

    return hours;
  };

  // Get weather icon for hourly forecast
  const getHourlyWeatherIcon = (condition: string, isDay: number) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return isDay ? <Sun className="h-8 w-8 text-orange-400 mx-auto mb-2" /> : <Moon className="h-8 w-8 text-gray-400 mx-auto mb-2" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-8 w-8 text-gray-500 mx-auto mb-2" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="h-8 w-8 text-blue-500 mx-auto mb-2" />;
    } else {
      return isDay ? <Sun className="h-8 w-8 text-orange-400 mx-auto mb-2" /> : <Moon className="h-8 w-8 text-gray-400 mx-auto mb-2" />;
    }
  };

  // Get weather icon for daily forecast
  const getDailyWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return <Sun className="h-6 w-6 text-orange-400" />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="h-6 w-6 text-gray-500" />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    } else {
      return <Sun className="h-6 w-6 text-orange-400" />;
    }
  };

  // Format day name from date
  const formatDayName = (dateString: string, index: number) => {
    if (index === 0) return 'TODAY';

    const date = new Date(dateString);
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return dayNames[date.getDay()];
  };

  // Format date for daily forecast
  const formatDailyDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}`;
  };

  // Get moon phase emoji based on phase name
  const getMoonPhaseEmoji = (phase: string) => {
    const phaseLower = phase.toLowerCase();
    if (phaseLower.includes('new')) return '🌑';
    if (phaseLower.includes('waxing crescent')) return '🌒';
    if (phaseLower.includes('first quarter')) return '🌓';
    if (phaseLower.includes('waxing gibbous')) return '🌔';
    if (phaseLower.includes('full')) return '🌕';
    if (phaseLower.includes('waning gibbous')) return '🌖';
    if (phaseLower.includes('last quarter') || phaseLower.includes('third quarter')) return '🌗';
    if (phaseLower.includes('waning crescent')) return '🌘';
    return '🌙'; // Default
  };

  // Fetch weather data on component mount and when location changes
  useEffect(() => {
    fetchForecastWeather();
    fetchAstronomyData();
  }, [selectedLocation.name]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Today's Weather Card */}
          {/* <Card className="shadow-sm bg-slate-700 text-white mb-4">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Mock Test for SLAT 2026</h2>
                  <p className="text-gray-200 text-sm">
                    Less than 2 months left for SLAT 2026. Boost your Preparation with SLAT 2026 Mock test
                  </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors">
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card> */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-black dark:text-white uppercase tracking-wide">TODAY'S WEATHER</h2>
                <span className="text-sm font-medium ">
                  {weatherData ? formatDate(weatherData.location.localtime) : '--'}
                </span>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">
                  Error: {error}
                </div>
              ) : weatherData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {weatherData.current.is_day ?
                      <Sun className="h-6 w-6" /> :
                      <Moon className="h-6 w-6" />
                    }
                    <span className="font-medium">{weatherData.current.condition.text}</span>
                    <span className="font-bold">Current: {Math.round(weatherData.current.temp_c)}°</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Moon className="h-6 w-6" />
                    <span className="font-medium">Feels like: {Math.round(weatherData.current.feelslike_c)}°</span>
                    <span className="font-bold">Humidity: {weatherData.current.humidity}%</span>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
          <div className="flex justify-center " >
            <iframe src="https://youradurl.com"
              height="250px"
              width="250px">
            </iframe>
          </div>
          {/* Current Weather Card */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium uppercase tracking-wide">CURRENT WEATHER</h2>
                <span className="text-sm font-medium">
                  {weatherData ? formatTime(weatherData.location.localtime) : '--'}
                </span>
              </div>

              {loading ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-12 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-8">
                  Error: {error}
                </div>
              ) : weatherData ? (
                <>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-6">
                    <div className="flex items-center gap-4">
                      {getWeatherIcon(weatherData.current.condition.text, weatherData.current.is_day)}
                      <div>
                        <div className="text-6xl font-bold text-black dark:text-white">{Math.round(weatherData.current.temp_c)}°</div>
                        <div className="text-sm text-gray-600">C</div>
                        <div className="text-sm text-black dark:text-white mt-1">
                          Feels like <span className="font-medium">{Math.round(weatherData.current.feelslike_c)}°</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm w-full lg:w-auto lg:text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-black dark:text-white">Location</span>
                        <span className="text-black dark:text-white font-medium">{weatherData.location.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className=" ">Wind</span>
                        <span className=" font-medium">{weatherData.current.wind_dir} {Math.round(weatherData.current.wind_kph)} km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="">Wind Gusts</span>
                        <span className=" font-medium">{Math.round(weatherData.current.gust_kph)} km/h</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="">Humidity</span>
                        <span className=" font-medium">{weatherData.current.humidity}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="">UV Index</span>
                        <span className=" font-medium">{weatherData.current.uv}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold ">{weatherData.current.condition.text}</div>
                      <div className="flex items-center gap-1 text-sm cursor-pointer">
                        <span>Last updated: {formatTime(weatherData.current.last_updated)}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </CardContent>
          </Card>

          {/* Looking Ahead Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium  uppercase tracking-wide">LOOKING AHEAD</h2>
                <button
                  onClick={() => {
                    fetchForecastWeather();
                    fetchAstronomyData();
                  }}
                  disabled={loading}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Forecast
                </button>
              </div>

              <div className="text-lg font-medium">
                {weatherData ?
                  `Current conditions in ${weatherData.location.name}: ${weatherData.current.condition.text}` :
                  <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                }
              </div>
            </CardContent>
          </Card>

          {/* SLAT 2026 Mock Test Banner */}


          {/* Surat Weather Radar Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-sm font-medium  uppercase tracking-wide">SURAT WEATHER RADAR</h2>
              </div>

              {/* Map Container */}
              <div className="relative bg-blue-100 rounded-lg overflow-hidden mb-4 h-48 sm:h-64 md:h-80">
                <img
                  src="https://api.accuweather.com/maps/v1/radar/static/globalSIR/zxyuv/4/11/7/5/0.jpg?&imgwidth=768&imgheight=432&base_data=radar&apikey=de13920f574d420984d3080b1fa6132b&language=en"
                  alt="Weather Radar Map"
                  className="w-full h-full object-cover"
                />
                {/* Simplified Map Background */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300"> */}
                {/* Map Labels */}
                {/* <div className="absolute top-4 left-4 text-xs font-medium text-black">IRAN</div>
                  <div className="absolute top-8 right-8 text-xs font-medium text-black">CHINA</div>
                  <div className="absolute bottom-12 left-8 text-xs font-medium text-black">OMAN</div>
                  <div className="absolute top-16 left-1/3 text-xs font-medium text-black">AFGHANISTAN</div>
                  <div className="absolute top-20 right-1/4 text-xs font-medium text-black">PAKISTAN</div>
                  <div className="absolute bottom-16 right-1/3 text-xs font-medium text-black">INDIA</div>
                  <div className="absolute bottom-8 right-8 text-xs font-medium text-black">SRI LANKA</div> */}

                {/* Surat Location Marker */}
                {/* <div className="absolute" style={{ top: '60%', left: '45%' }}>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="text-xs font-bold text-black mt-1">SURAT</div>
                  </div> */}

                {/* Other Cities */}
                {/* <div className="absolute top-1/3 left-1/4 text-xs text-black">TEHRAN</div>
                  <div className="absolute top-1/2 left-1/3 text-xs text-black">KARACHI</div>
                  <div className="absolute bottom-1/3 right-1/4 text-xs text-black">MUMBAI</div>
                  <div className="absolute bottom-1/4 right-1/3 text-xs text-black">BENGALURU</div>
                </div> */}

                {/* Mapbox Attribution */}
                {/* <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  © mapbox © OpenStreetMap
                </div> */}
              </div>

              {/* Weather Controls */}
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                  </div>
                  <span className="text-xs sm:text-sm ">Clouds</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs sm:text-sm ">Temperature</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Weather Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6 ">
              <div className="mb-4">
                <h2 className="text-sm font-medium uppercase tracking-wide">HOURLY WEATHER</h2>
              </div>

              {/* Hourly Forecast Scroll Container */}
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 bg-blue-200 hover:bg-blue-300 flex items-center justify-center rounded-r transition-colors hidden md:flex  "
                >
                  <ChevronLeft className="h-4 w-4 " />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 bg-blue-200 hover:bg-blue-300 flex items-center justify-center rounded-l transition-colors hidden md:flex"
                >
                  <ChevronRight className="h-4 w-4 " />
                </button>

                {/* Hourly Data Container */}
                <div className="overflow-hidden mx-2 sm:mx-4 md:mx-8">
                  <div ref={scrollContainerRef} className="flex gap-3 sm:gap-4 md:gap-6 py-4 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {loading ? (
                      <HourlyForecastSkeleton />
                    ) : error ? (
                      <div className="text-red-500 text-center w-full py-4">
                        Error loading hourly forecast
                      </div>
                    ) : getNext12Hours().length > 0 ? (
                      getNext12Hours().map((hour, index) => {
                        const date = new Date(hour.time);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const displayHour = hours % 12 || 12; // Convert to 12-hour format
                        const displayMinutes = minutes.toString().padStart(2, '0');
                        const timeString = `${displayHour}:${displayMinutes} ${ampm}`;

                        return (
                          <div key={index} className="flex-shrink-0 text-center">
                            <div className="text-sm font-medium mb-2">{timeString}</div>
                            {getHourlyWeatherIcon(hour.condition.text, hour.is_day)}
                            <div className="text-lg font-bold mb-1">{Math.round(hour.temp_c)}°</div>
                            <div className="text-xs flex items-center gap-1">
                              <span>💧</span>
                              <span>{hour.chance_of_rain}%</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-gray-500 text-center w-full py-4">
                        No hourly forecast data available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10-Day Weather Forecast Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-sm font-medium  uppercase tracking-wide">10-DAY WEATHER FORECAST</h2>
              </div>

              <div className="space-y-0">
                {loading ? (
                  <DailyForecastSkeleton />
                ) : error ? (
                  <div className="text-red-500 text-center py-4">
                    Error loading forecast data
                  </div>
                ) : forecastData?.forecast?.forecastday ? (
                  forecastData.forecast.forecastday.map((day, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-blue-100 last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium  w-12">
                          <div>{formatDayName(day.date, index)}</div>
                          <div className="">{formatDailyDate(day.date)}</div>
                        </div>
                        {getDailyWeatherIcon(day.day.condition.text)}
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold ">{Math.round(day.day.maxtemp_c)}°</span>
                          <span className="text-sm">{Math.round(day.day.mintemp_c)}°</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium ">{day.day.condition.text}</div>
                          <div className="flex items-center gap-1 text-xs ">
                            <Moon className="h-3 w-3" />
                            <span>UV: {day.day.uv}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs ">
                          <span>💧</span>
                          <span>{day.day.daily_chance_of_rain}%</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    No forecast data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center " >
            <iframe src="https://youradurl.com"
              height="250px"
              width="250px">
            </iframe>
          </div>
          {/* Sun & Moon Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-sm font-medium  uppercase tracking-wide">SUN & MOON</h2>
              </div>

              <div className="space-y-4">
                {/* Sun Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="h-6 w-6 text-orange-400" />
                    <div>
                      <div className="text-sm font-medium ">Sunrise</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.sunrise ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                          '--'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium ">Sunset</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.sunset ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.sunset ||
                          '--'}
                      </div>
                    </div>
                    <Sun className="h-6 w-6 text-orange-300" />
                  </div>
                </div>

                {/* Moon Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="h-6 w-6 " />
                    <div>
                      <div className="text-sm font-medium ">Moonrise</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.moonrise ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.moonrise ||
                          '--'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium ">Moonset</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.moonset ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.moonset ||
                          '--'}
                      </div>
                    </div>
                    <Moon className="h-6 w-6 " />
                  </div>
                </div>

                {/* Moon Phase & Illumination */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="text-sm font-medium ">Moon Phase</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.moon_phase ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.moon_phase ||
                          '--'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium ">Moon Illumination</div>
                      <div className="text-xs ">
                        {astronomyData?.astronomy?.astro?.moon_illumination ||
                          forecastData?.forecast?.forecastday?.[0]?.astro?.moon_illumination ||
                          '--'}%
                      </div>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                      {getMoonPhaseEmoji(astronomyData?.astronomy?.astro?.moon_phase ||
                        forecastData?.forecast?.forecastday?.[0]?.astro?.moon_phase ||
                        'New Moon')}
                    </div>
                  </div>
                </div>

                {/* Current Sun/Moon Status */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${astronomyData?.astronomy?.astro?.is_sun_up ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                    <div className="text-sm ">
                      Sun is {astronomyData?.astronomy?.astro?.is_sun_up ? 'up' : 'down'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm ">
                      Moon is {astronomyData?.astronomy?.astro?.is_moon_up ? 'up' : 'down'}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${astronomyData?.astronomy?.astro?.is_moon_up ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
