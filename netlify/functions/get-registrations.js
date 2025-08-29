const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Path to the JSON file
    const dataPath = path.join(__dirname, '..', 'data', 'registrations.json');
    
    // Check if file exists
    try {
      await fs.access(dataPath);
    } catch {
      // File doesn't exist, return empty array
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: []
        })
      };
    }

    // Read and parse the data
    const data = await fs.readFile(dataPath, 'utf8');
    const registrations = JSON.parse(data);

    // Return the data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: registrations,
        count: registrations.length
      })
    };

  } catch (error) {
    console.error('Error reading registrations:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
