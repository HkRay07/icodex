const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'dob', 'domain', 'motivation', 'level'];
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false, 
            message: `Missing required field: ${field}` 
          })
        };
      }
    }

    // Create submission object with timestamp
    const submission = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data
    };

    // Path to the JSON file (will be created if it doesn't exist)
    const dataPath = path.join(__dirname, '..', 'data', 'registrations.json');
    
    // Ensure the data directory exists
    const dataDir = path.dirname(dataPath);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing data or create new array
    let registrations = [];
    try {
      const existingData = await fs.readFile(dataPath, 'utf8');
      registrations = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist or is empty, start with empty array
      registrations = [];
    }

    // Add new submission
    registrations.push(submission);

    // Write back to file
    await fs.writeFile(dataPath, JSON.stringify(registrations, null, 2));

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Registration submitted successfully!',
        id: submission.id
      })
    };

  } catch (error) {
    console.error('Error processing registration:', error);
    
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
