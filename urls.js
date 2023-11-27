const fs = require('fs');
const axios = require('axios');

const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a filename as an argument.');
  process.exit(1);
}

try {
  const data = fs.readFileSync(fileName, 'utf8');
  const urls = data.trim().split('\n');

  // Create a function to download a URL and save the HTML to a file
  const downloadAndSave = async (url) => {
    try {
      const response = await axios.get(url);
      const hostname = new URL(url).hostname;
      const outputFile = `${hostname}.txt`;

      fs.writeFileSync(outputFile, response.data);
      console.log(`Wrote to ${hostname}`);
    } catch (error) {
      console.error(`Couldn't download ${url}`);
    }
  };

  // Download all URLs concurrently
  const downloadPromises = urls.map(downloadAndSave);

  // Wait for all downloads to complete
  Promise.all(downloadPromises)
    .then(() => console.log('All downloads completed successfully.'))
    .catch((err) => console.error('Error during downloads:', err));
} catch (err) {
  console.error(`Couldn't read the file ${fileName}`);
  process.exit(1);
}
