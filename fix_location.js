const fs = require('fs');

const filePath = './components/Navbar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Find the line where we set is FetchingLocation and add cache clearing
const target = `    setIsFetchingLocation(true);\n    navigator.geolocation.getCurrentPosition(`;
const replacement = `    setIsFetchingLocation(true);
    // Clear cached search results to ensure fresh location is always fetched
    setLocalSearchResults(null);
    localStorage.removeItem('searchResults');
    
    navigator.geolocation.getCurrentPosition(`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added cache-clearing code to handleCurrentLocationClick!');
} else {
  console.log('Target code not found. The file may have been modified.');
}
