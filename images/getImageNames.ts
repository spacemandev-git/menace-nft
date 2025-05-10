import * as fs from 'fs';
import * as path from 'path';

// Directory containing the images
const imagesDir = path.join(__dirname, 'generated');

// Function to get all image filenames
function getImageNames(): string[] {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(imagesDir);
    
    // Filter for image files (assuming all are PNGs but being safe)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif';
    });
    
    return imageFiles;
  } catch (error) {
    console.error('Error reading image directory:', error);
    return [];
  }
}

// Get image names
const imageNames = getImageNames();

// Create JSON file with the array of image names
fs.writeFileSync(
  path.join(__dirname, 'imageNames.json'), 
  JSON.stringify(imageNames, null, 2)
);

console.log(`Successfully created imageNames.json with ${imageNames.length} image names.`);
