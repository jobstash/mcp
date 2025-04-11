import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load .env file from the root directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testExtraction() {
  const query = process.argv[2]; // Get query from command line argument
  const apiKey = process.env.OPENAI_API_KEY;
  const serverUrl = 'http://localhost:3000'; // Assuming default port
  const endpoint = `${serverUrl}/api/v1/structured-data/extract-params`;

  if (!query) {
    console.error('Error: Please provide a query string as an argument.');
    console.error('Usage: node scripts/test-structured-data.mjs "your query here"');
    process.exit(1);
  }

  if (!apiKey) {
    console.error('Error: OPENAI_API_KEY not found in environment variables.');
    console.error('Ensure it is set in your root .env file.');
    process.exit(1);
  }

  console.log(`Sending query to ${endpoint}: "${query}"`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error(`Error: API request failed with status ${response.status}`);
      console.error('Response:', JSON.stringify(responseBody, null, 2));
      process.exit(1);
    }

    console.log('\n--- Extracted Structured Data ---');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('---\n');

  } catch (error) {
    console.error('Error executing test script:', error.message);
    if (error.cause?.code === 'ECONNREFUSED') {
      console.error(`\n*** Is the server running at ${serverUrl}? ***\n`);
    }
    process.exit(1);
  }
}

testExtraction(); 