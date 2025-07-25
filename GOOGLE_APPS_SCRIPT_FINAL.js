// Google Apps Script for YesGrant Application - FINAL VERSION
// Matches your existing Google Sheet structure exactly

// Your Google Sheets ID
const SHEET_ID = '1qlS9v0XvC67C3D89thCQnQOQvi45fA_DUgLjtGuKYxw';

// Sheet names - using your existing sheet structure
const FORM_SHEET_NAME = 'Applications';
const SUCCESS_STORIES_SHEET_NAME = 'Success Stories';  
const CHATBOT_LEADS_SHEET_NAME = 'Chatbot Leads';

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Max-Age': '3600'
    });
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'get_success_stories') {
      const result = getSuccessStories();
      return createCorsResponse(result);
    } else {
      return createCorsResponse({
        status: 'success',
        data: []
      });
    }
    
  } catch (error) {
    console.error('Error in doGet:', error);
    return createCorsResponse({
      status: 'error',
      message: error.toString()
    });
  }
}

function doPost(e) {
  try {
    console.log('Received POST request');
    console.log('Event object:', e);
    console.log('Parameters:', e.parameter);
    console.log('PostData:', e.postData);
    
    // Handle form data - FormData comes through e.parameter, not e.postData.contents
    let formData = {};
    
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      // FormData submission
      formData = e.parameter;
      console.log('Using FormData from e.parameter');
    } else if (e.postData && e.postData.contents) {
      // JSON submission
      try {
        const jsonData = JSON.parse(e.postData.contents);
        formData = jsonData.data || jsonData;
        console.log('Using JSON data from e.postData.contents');
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        formData = {};
      }
    } else {
      console.error('No data found in request');
      return createCorsResponse({
        status: 'error',
        message: 'No data received in request'
      });
    }
    
    console.log('Final formData:', formData);
    const result = submitApplication(formData);
    
    console.log('Submit result:', result);
    return createCorsResponse(result);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createCorsResponse({
      status: 'error',
      message: error.toString()
    });
  }
}

function createCorsResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization'
    });
}

function submitApplication(data) {
  try {
    console.log('Submitting application with data:', data);
    
    // Open the spreadsheet and get or create the Applications sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(FORM_SHEET_NAME);
    
    // Create the Applications sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating new Applications sheet...');
      sheet = spreadsheet.insertSheet(FORM_SHEET_NAME);
      
      // Add headers
      const headers = [
        'Time Stamp',
        'Name',
        'Email',
        'Number',
        'year of study are you currently',
        'GPA or percentage',
        'Field of study',
        'standardized test scores',
        'internship or practical training',
        'published research papers, reviews, or conference presentations',
        'courses, certifications, or online programs',
        'extracurricular activities',
        'Do you have any work experience',
        'Applied for any scholarships or financial aid',
        'Do you hold any national or international awards, honors'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setWrap(true);
      
      console.log('Applications sheet created with headers');
    }
    
    console.log('Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Create the row data matching your exact sheet structure
    const row = [
      timestamp,                                                           // Time Stamp
      data['Name'] || '',                                                 // Name
      data['Email'] || '',                                                // Email
      data['Number'] || '',                                               // Number
      data['year of study are you currently'] || '',                     // year of study are you currently
      data['GPA or percentage'] || '',                                    // GPA or percentage
      data['Field of study'] || '',                                      // Field of study
      data['standardized test scores'] || '',                             // standardized test scores
      data['internship or practical training'] || '',                    // internship or practical training
      data['published research papers, reviews, or conference presentations'] || '', // published research papers, reviews, or conference presentations
      data['courses, certifications, or online programs'] || '',         // courses, certifications, or online programs
      data['extracurricular activities'] || '',                          // extracurricular activities
      data['Do you have any work experience'] || '',                     // Do you have any work experience
      data['Applied for any scholarships or financial aid'] || '',       // Applied for any scholarships or financial aid
      data['Do you hold any national or international awards, honors'] || '' // Do you hold any national or international awards, honors
    ];
    
    console.log('Row data:', row);
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    console.log('Row appended successfully to Applications sheet');
    
    return {
      status: 'success',
      message: 'Application submitted successfully'
    };
    
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

function getSuccessStories() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SUCCESS_STORIES_SHEET_NAME);
    
    if (!sheet) {
      return {
        status: 'success',
        data: []
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        status: 'success',
        data: []
      };
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    const stories = rows.map(row => {
      const story = {};
      headers.forEach((header, index) => {
        story[header] = row[index] || '';
      });
      return story;
    }).filter(story => story.Status === 'Active');
    
    return {
      status: 'success',
      data: stories
    };
    
  } catch (error) {
    console.error('Error getting success stories:', error);
    return {
      status: 'error',
      message: error.toString(),
      data: []
    };
  }
}

// Test function to verify the script works
function testScript() {
  console.log('Google Apps Script is working correctly!');
  
  // Test with sample data
  const testData = {
    'Name': 'Test User',
    'Email': 'test@example.com',
    'Number': '1234567890',
    'year of study are you currently': 'Year 3',
    'GPA or percentage': '85%',
    'Field of study': 'Computer Science'
  };
  
  const result = submitApplication(testData);
  console.log('Test result:', result);
  
  return 'Test completed';
}

// Debug function to check sheet structure
function checkSheetStructure() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheets()[0];
    
    console.log('Sheet name:', sheet.getName());
    console.log('Last row:', sheet.getLastRow());
    
    if (sheet.getLastRow() > 0) {
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      console.log('Headers:', headers);
    }
    
    return {
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow(),
      headers: sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : []
    };
    
  } catch (error) {
    console.error('Error checking sheet structure:', error);
    return { error: error.toString() };
  }
} 