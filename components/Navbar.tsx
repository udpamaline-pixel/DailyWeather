'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, MapPin, Loader2, LocateFixed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/contexts/WeatherContext";
import ThemeToggle from "@/components/ThemeToggle";
interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}
interface CurrentWeather {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}
export default function Navbar() {
  const { selectedLocation, setSelectedLocation, currentTemp, setCurrentTemp, isHydrated } = useWeather();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  console.log('selectedLocation', searchResults);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  
  // API key - you should move this to environment variables
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "your_api_key_here";
  // Fetch current weather for the location
  const fetchCurrentWeather = async (locationName?: string, skipLocationUpdate?: boolean) => {
    const queryLocation = locationName || selectedLocation.name;
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(queryLocation)}&aqi=no`
      );
      if (response.ok) {
        const data: CurrentWeather = await response.json();
        console.log('response ---------=============--------', data.location.name);
        setCurrentTemp(Math.round(data.current.temp_c));
        // Only update the global location if we're not explicitly skipping it (i.e., when user hasn't selected a specific city)
        if (!locationName && !skipLocationUpdate) {
          setSelectedLocation({
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            lat: 0, // These will be updated when city is selected
            lon: 0
          });
        }
      } else {
        console.error('Weather fetch failed:', response.statusText);
        setCurrentTemp(null);
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
      setCurrentTemp(null);
    }
  };
  const searchCities = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data: SearchResult[] = await response.json();
        setSearchResults(data.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } else {
        console.error('Search failed:', response.statusText);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Debounce search requests
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchCities(value);
    }, 300);
  };
  const handleCitySelect = (city: SearchResult) => {
    setSearchQuery(`${city.name}, ${city.region}`);
    setShowResults(false);
    // Update global location state
    const newLocation = {
      name: city.name,
      region: city.region,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    };
    setSelectedLocation(newLocation);
    // Fetch weather for the new location, but don't let the API response override our selected location
    fetchCurrentWeather(city.name, true);
  };
  // Update search query when selected location changes (only after hydration)
  useEffect(() => {
    if (isHydrated && selectedLocation.name && selectedLocation.region) {
      setSearchQuery(`${selectedLocation.name}, ${selectedLocation.region}`);
    }
  }, [selectedLocation.name, selectedLocation.region, isHydrated]);
  // Fetch weather data only on initial mount (after hydration)
  useEffect(() => {
    if (isHydrated && selectedLocation.name) {
      fetchCurrentWeather();
    }
  }, [isHydrated]);
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop = desktopSearchRef.current && !desktopSearchRef.current.contains(target);
      const isOutsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(target);
      if (isOutsideDesktop && isOutsideMobile) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleCurrentLocationClick = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    setIsFetchingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Use coordinates to get the city name from WeatherAPI
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
          );
          if (response.ok) {
            const data: CurrentWeather = await response.json();
            // Update the selected location with the detected city
            const newLocation = {
              name: data.location.name,
              region: data.location.region,
              country: data.location.country,
              lat: latitude,
              lon: longitude
            };
            setSelectedLocation(newLocation);
            setCurrentTemp(Math.round(data.current.temp_c));
            setSearchQuery(`${data.location.name}, ${data.location.region}`);
          } else {
            console.error('Failed to fetch location data:', response.statusText);
            alert('Failed to get location information. Please try again.');
          }
        } catch (error) {
          console.error('Error fetching location data:', error);
          alert('Failed to get location information. Please try again.');
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setIsFetchingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Location access denied. Please enable location permissions in your browser.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('Location request timed out.');
            break;
          default:
            alert('An error occurred while getting your location.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 dark:bg-gray-950 text-white shadow-md">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="AccuWeather Logo"
              className="h-8 w-auto"
            />
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="h-4 w-4" />
              <span>
                {!isHydrated ? (
                  <span className="inline-block w-24 h-4 bg-gray-600 rounded animate-pulse"></span>
                ) : (
                  `${selectedLocation.name}, ${selectedLocation.region}`
                )}
              </span>
            </div>
            <div className="text-3xl font-bold">
              {currentTemp !== null ? `${currentTemp}°` : '--°'}
            </div>
          </div>
          {/* Search Bar */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative w-full" ref={desktopSearchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {(isSearching || isFetchingLocation) && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
              )}
              <Input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-gray-900"
                    >
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-500">
                        {city.region}, {city.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCurrentLocationClick}
              disabled={isFetchingLocation}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              {isFetchingLocation ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LocateFixed className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1" ref={mobileSearchRef}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {(isSearching || isFetchingLocation) && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
              )}
              <Input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              {/* Mobile Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-gray-900"
                    >
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-500">
                        {city.region}, {city.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCurrentLocationClick}
              disabled={isFetchingLocation}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              {isFetchingLocation ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LocateFixed className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-1 sm:px-2 md:px-4">
          <div className="flex items-center justify-between py-2 min-w-0">
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-1 overflow-x-auto">
              <Link href="/">
                <button
                  className={`px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors ${pathname === "/"
                    ? "text-gray-900 dark:text-white border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  Today
                </button>
              </Link>
              <Link href="/forecast">
                <button
                  className={`px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors ${pathname === "/forecast"
                    ? "text-gray-900 dark:text-white border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  Forecast
                </button>
              </Link>
              <Link href="/daily">
                <button
                  className={`px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors ${pathname === "/daily"
                    ? "text-gray-900 dark:text-white border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  Daily
                </button>
              </Link>
            </div>
            {/* Dark Mode Toggle */}
            <div className="flex items-center ml-2 flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


