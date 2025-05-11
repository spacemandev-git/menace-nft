import { readdir, rename } from 'fs/promises';
import { join } from 'path';

async function main() {
  try {
    const peopleDir = './static/people';
    
    // Get all files in the directory
    const files = await readdir(peopleDir);
    
    // Counter for renamed files
    let renamedCount = 0;

    // Process each file
    for (const file of files) {
      if (file.includes(' ')) {
        const oldPath = join(peopleDir, file);
        const newFileName = file.replace(/ /g, '_');
        const newPath = join(peopleDir, newFileName);
        
        // Rename the file
        await rename(oldPath, newPath);
        renamedCount++;
        
        console.log(`Renamed: "${file}" to "${newFileName}"`);
      }
    }
    
    console.log(`\nRenamed ${renamedCount} files.`);
    console.log(`${files.length - renamedCount} files already had valid names.`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
