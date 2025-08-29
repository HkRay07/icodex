// Google Apps Script for iCodeX Academy Pre-Registration
// Deploy this as a web app to handle form submissions

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create one and paste its ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Prepare the data row
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.firstName,
      data.lastName,
      data.dob,
      data.domain,
      data.motivation,
      data.level
    ];
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Date of Birth',
        'Domain of Interest',
        'Motivation',
        'Experience Level'
      ]);
    }
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Registration successful!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Registration failed. Please try again.',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function testConnection() {
  console.log('Google Apps Script is working!');
  return 'Script is ready for deployment';
}
