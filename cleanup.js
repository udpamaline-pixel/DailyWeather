const fs = require('fs');

const filePath = './components/Navbar.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Remove the leftover broken code block
const brokenCodeStart = `        if (response) {
          console.log('response 98989989898988998989898989898988989989988989898989' , response);`;

const brokenCodeEnd = `    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Cleanup debounce on unmount`;

if (content.includes(brokenCodeStart)) {
  const startIndex = content.indexOf(brokenCodeStart);
  const endIndex = content.indexOf(brokenCodeEnd, startIndex);
  
  if (startIndex !== -1 && endIndex !== -1) {
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex + brokenCodeEnd.length);
    const cleaned = before + '// Cleanup debounce on unmount' + after;
    
    fs.writeFileSync(filePath, cleaned, 'utf8');
    console.log('Removed broken code successfully!');
  } else {
    console.log('Could not find complete broken code block');
  }
} else {
  console.log('No broken code found - file is already clean!');
}
