import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

// Weather Card Skeleton for main weather display
export function WeatherCardSkeleton() {
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Main weather info */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-16 w-16 rounded-full" />
          </div>
          
          {/* Weather details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Hourly Forecast Skeleton
export function HourlyForecastSkeleton() {
  return (
    <div className="flex gap-6 py-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-3 min-w-[80px]">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-5 w-10" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Daily Forecast Skeleton
export function DailyForecastSkeleton() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Temperature History Skeleton
export function TemperatureHistorySkeleton() {
  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
        <Skeleton className="h-4 w-16" />
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
      
      {/* Rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-600 last:border-b-0">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-8 sm:gap-12 md:gap-16">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Full Page Loading Skeleton
export function FullPageSkeleton() {
  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Date Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <Skeleton className="h-6 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          {/* Main Weather Card */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              {/* Day Header */}
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              
              {/* Main Weather Display */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div>
                    <Skeleton className="h-12 w-20 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              
              <Skeleton className="h-5 w-24 mb-4" />
              
              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Morning Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div className="flex items-center justify-between py-4 px-6">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-5" />
            </div>
          </div>

          {/* Afternoon Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div className="flex items-center justify-between py-4 px-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5" />
            </div>
          </div>

          {/* Night Section */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div>
                    <Skeleton className="h-12 w-20 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evening Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div className="flex items-center justify-between py-4 px-6">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-5" />
            </div>
          </div>

          {/* Overnight Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-2">
            <div className="flex items-center justify-between py-4 px-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-5" />
            </div>
          </div>

          {/* Sun & Moon Section */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="flex justify-between">
                <div className="text-center">
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-4 w-8 mb-2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature History Section */}
          <Card className="mb-6 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <TemperatureHistorySkeleton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Daily Page Skeleton
export function DailyPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Date Range Header */}
          <div className="text-left mb-6">
            <Skeleton className="h-6 w-64" />
          </div>
          
          {/* Daily forecast cards */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="p-6">
                  {/* Day Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <Skeleton className="h-6 w-16 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-8 w-12 mb-1" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                  
                  {/* Weather Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                  
                  {/* Weather Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
