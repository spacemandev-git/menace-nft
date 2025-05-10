import { readdir } from 'fs/promises';
import { readFileSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

async function main() {
  try {
    // Get all image filenames from the generated directory
    const imagesDir = join(import.meta.dir, 'generated');
    const files = await readdir(imagesDir);
    
    // Filter for image files (assuming PNGs)
    const imageFiles = files.filter(file => {
      const ext = extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif';
    });
    
    // Extract names without extensions
    const imageNames = imageFiles.map(file => {
      return file.replace(/\.[^/.]+$/, ""); // Remove file extension
    });
    
    // Read the menaces.json file
    const menacesPath = join(import.meta.dir, '../static/menaces.json');
    const menacesData = JSON.parse(readFileSync(menacesPath, 'utf-8'));
    
    // Create a map of menace data by name for easier lookup
    const menacesByName = {};
    menacesData.forEach(menace => {
      menacesByName[menace.Name] = menace;
    });
    
    // Combine the data
    const combinedData = imageFiles.map(imageFile => {
      const name = imageFile.replace(/\.[^/.]+$/, ""); // Remove file extension
      const menaceData = menacesByName[name] || null;
      
      return {
        imageName: imageFile,
        name: name,
        details: menaceData ? {
          field: menaceData["Field/Area"],
          reason: menaceData["Reason for being a 'Positive Menace'"]
        } : null
      };
    });
    
    // Save the combined data
    const outputPath = join(import.meta.dir, '../static/combinedMenaces.json');
    writeFileSync(outputPath, JSON.stringify(combinedData, null, 2));
    
    console.log(`Successfully created combinedMenaces.json with ${combinedData.length} entries.`);
    console.log(`Images without matching data: ${combinedData.filter(item => item.details === null).length}`);
    
    // Optional: Create a separate JSON file with just the image names array
    const imageNamesPath = join(import.meta.dir, 'imageNames.json');
    writeFileSync(imageNamesPath, JSON.stringify(imageFiles, null, 2));
    console.log(`Also created imageNames.json with ${imageFiles.length} image names.`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
