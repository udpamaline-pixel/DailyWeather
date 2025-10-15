'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Sun, CloudRain, Cloud, Snowflake } from "lucide-react";
import { useState, useEffect } from "react";
import { useWeather } from "@/contexts/WeatherContext";
import { DailyPageSkeleton } from "@/components/WeatherSkeletons";

export const dynamic = 'force-dynamic';

interface WeatherDay {
  day: string;
  date: string;
  temp: string;
  lowTemp: string;
  condition: string;
  realFeel: string;
  realFeelShade: string;
  maxUVIndex: string;
  wind: string;
  precipitation: string;
  icon: string;
}

interface WeatherApiResponse {
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        maxwind_kph: number;
        totalprecip_mm: number;
        avghumidity: number;
        uv: number;
      };
    }>;
  };
}

export default function DailyPage() {
  const { selectedLocation } = useWeather();
  const [dailyForecast, setDailyForecast] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="h-16 w-16 text-blue-400" />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <Cloud className="h-16 w-16 text-gray-400" />;
    } else if (lowerCondition.includes('snow')) {
      return <Snowflake className="h-16 w-16 text-blue-200" />;
    } else {
      return <Sun className="h-16 w-16 text-orange-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const dayNum = date.getDate().toString().padStart(2, '0');
    const monthNum = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayMonth = `${dayNum}/${monthNum}`;
    return { day, date: dayMonth };
  };

  const getUVIndexDescription = (uvIndex: number) => {
    if (uvIndex <= 2) return `${uvIndex} (Low)`;
    if (uvIndex <= 5) return `${uvIndex} (Moderate)`;
    if (uvIndex <= 7) return `${uvIndex} (High)`;
    if (uvIndex <= 10) return `${uvIndex} (Very High)`;
    return `${uvIndex} (Extreme)`;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using the forecast endpoint which works with free tier
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'YOUR_API_KEY';
        const location = selectedLocation.name; // Use global location
        const days = 10; // Maximum days for free tier forecast
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Daily Weather API Response:', response.status, errorText);
          throw new Error(`Weather API error: ${response.status} - ${response.statusText}`);
        }
        
        const data: WeatherApiResponse = await response.json();
        
        const formattedForecast: WeatherDay[] = data.forecast.forecastday.map((day) => {
          const { day: dayName, date: dayDate } = formatDate(day.date);
          const windDirection = 'NE'; // WeatherAPI provides wind direction, you can extract it
          
          return {
            day: dayName,
            date: dayDate,
            temp: `${Math.round(day.day.maxtemp_c)}°`,
            lowTemp: `/${Math.round(day.day.mintemp_c)}°`,
            condition: day.day.condition.text,
            realFeel: `${Math.round(day.day.maxtemp_c + 2)}°`, // Approximation
            realFeelShade: `${Math.round(day.day.maxtemp_c - 1)}°`, // Approximation
            maxUVIndex: getUVIndexDescription(day.day.uv),
            wind: `${windDirection} ${Math.round(day.day.maxwind_kph)} km/h`,
            precipitation: `${Math.round((day.day.totalprecip_mm / 25.4) * 100)}%`, // Convert mm to percentage approximation
            icon: day.day.condition.icon
          };
        });
        
        setDailyForecast(formattedForecast);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
        setError(errorMessage);
        console.error('Weather API Error:', err);
        
        // Provide helpful error messages
        if (errorMessage.includes('400')) {
          setError('Invalid API request. Please check your API key and try again.');
        } else if (errorMessage.includes('401')) {
          setError('Invalid API key. Please check your Weather API key.');
        } else if (errorMessage.includes('403')) {
          setError('API access forbidden. Your API key may have exceeded its limits.');
        } else if (errorMessage.includes('404')) {
          setError('Weather service not found. Using forecast data instead of future data.');
        } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          setError('Network error. Please check your internet connection.');
        }
        
        // No fallback data - show empty state
        setDailyForecast([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedLocation.name]);

  if (loading) {
    return <DailyPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-2 sm:px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Error Alert */}
          {error && (
            <Card className="shadow-sm bg-red-50 border-red-200 mb-4">
              <CardContent className="p-4">
                <div className="text-red-800">
                  <strong>Weather API Error:</strong> {error}
                  <br />
                  <small>Showing fallback data. Please check your API key and try again.</small>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Daily Forecast Cards */}
          <div className="space-y-4">
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
          <div className="text-left mb-6">
            <h1 className="text-lg font-medium ">
              {dailyForecast.length > 0 
                ? `${dailyForecast[0].date} - ${dailyForecast[dailyForecast.length - 1]?.date || ''}`
                : '10 OCTOBER - 23 NOVEMBER'
              }
            </h1>
          </div>
            {dailyForecast.length > 0 ? (
              dailyForecast.map((day, index) => (
                <Card key={index} className="shadow-sm">
                  <CardContent className="p-6">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-bold ">{day.day}</h2>
                        <span className="text-sm ">{day.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm ">☔ {day.precipitation}</span>
                      </div>
                    </div>

                    {/* Temperature and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon(day.condition)}
                        <div>
                          <div className="text-6xl font-light ">
                            {day.temp}<span className="text-2xl ">{day.lowTemp}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weather Condition */}
                    <div className="mb-6">
                      <div className="text-lg text-blue-600 font-medium">{day.condition}</div>
                    </div>

                    {/* Weather Details Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 sm:gap-x-4 md:gap-x-8 text-sm">
                      <div className="flex justify-between">
                        <span className="">RealFeel®</span>
                        <span className=" font-medium">{day.realFeel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="">Max UV Index</span>
                        <span className=" font-medium">{day.maxUVIndex}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="">RealFeel Shade®</span>
                        <span className=" font-medium">{day.realFeelShade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="">Wind</span>
                        <span className="text-blue-600 font-medium">{day.wind}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Cloud className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium  mb-2">No Weather Data Available</h3>
                  <p className="">
                    Please check your API key configuration and internet connection.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Today Section */}
          {/* <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold ">Today</h3>
                  <div className="text-sm  mt-1">
                    <div>Humidity: 65%</div>
                    <div>Comfort Index: 8/10</div>
                    <div>Ease of Breathing: 8/10</div>
                    <div>1 hr</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm  mb-2">WEATHER ALERTS</div>
                  <div className="text-sm text-blue-600">
                    <div>Official Weather Alert</div>
                    <div>Details</div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
