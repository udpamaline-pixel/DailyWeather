const fs = require('fs');

const filePath = './components/Navbar.tsx';
const content = fs.readFileSync(filePath, 'utf8');

const oldFunction = `  const handleCurrentLocationClick = async (locationName?: string, skipLocationUpdate?: boolean) => {
    if (navigator.geolocation) {
      console.log("Current location clicked", locationName);
      const queryLocation = locationName || selectedLocation.name;

      try {
        const response = await fetch(
          \`https://api.weatherapi.com/v1/current.json?key=\${API_KEY}&q=\${encodeURIComponent(queryLocation)}&aqi=no\`
        );
        if (response) {
          console.log('response 98989989898988998989898989898988989989988989898989' , response);
          const currentWeatherData: CurrentWeather = await response.json();
          console.log('response ---------=============-- 123456789------', currentWeatherData);
          // setCurrentTemp(Math.round(data.current.temp_c));

          // // Only update the global location if we're not explicitly skipping it (i.e., when user hasn't selected a specific city)
          // if (!locationName && !skipLocationUpdate) {
          //   setSelectedLocation({
          //     name: data.location.name,
          //     region: data.location.region,
          //     country: data.location.country,
          //     lat: 0, // These will be updated when city is selected
          //     lon: 0
          //   });
          // }
        } else {
          console.error('Weather fetch failed:', response.statusText);
          setCurrentTemp(null);
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
        setCurrentTemp(null);
      }
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };`;

const newFunction = `  const handleCurrentLocationClick = async () => {
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
            \`https://api.weatherapi.com/v1/current.json?key=\${API_KEY}&q=\${latitude},\${longitude}&aqi=no\`
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
            setSearchQuery(\`\${data.location.name}, \${data.location.region}\`);
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
  };`;

const updatedContent = content.replace(oldFunction, newFunction);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('File updated successfully!');
