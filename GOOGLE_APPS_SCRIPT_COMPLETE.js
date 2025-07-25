// Google Apps Script for YesGrant Application - COMPLETE CORRECTED VERSION
// Copy and paste this entire code into your Google Apps Script editor

// Your Google Sheets ID - ALREADY FILLED IN
const SHEET_ID = '1qlS9v0XvC67C3D89thCQnQOQvi45fA_DUgLjtGuKYxw';

// Sheet names
const FORM_SHEET_NAME = 'Form Submissions';
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
      'Access-Control-Allow-Headers': 'Content-Type',
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
        message: 'Google Apps Script is working'
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
    // Handle FormData from React app - FIXED VERSION
    const data = e.parameter || {};
    
    // Direct form submission - no action needed
    const result = submitApplication(data);
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
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function submitApplication(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(FORM_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(FORM_SHEET_NAME);
    }
    
    // Create header row if it doesn't exist
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Name', 'Email', 'Phone', 'Year of Study', 'GPA', 
        'Field of Study', 'Test Scores', 'Internship Experience', 
        'Research Papers', 'Courses/Certifications', 'Extracurricular Activities', 
        'Work Experience', 'Previous Scholarship Applications', 'Awards'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    // Create row with corrected field names to match your React app
    const row = [
      new Date(),
      data['Name'] || '',
      data['Email'] || '',
      data['Number'] || '',
      data['year of study are you currently'] || '',
      data['GPA or percentage'] || '',
      data['Field of study'] || '',
      data['standardized test scores'] || '',
      data['internship or practical training'] || '',
      data['published research papers, reviews, or conference presentations'] || '',
      data['courses, certifications, or online programs'] || '',
      data['extracurricular activities'] || '',
      data['Do you have any work experience'] || '',
      data['Applied for any scholarships or financial aid'] || '',
      data['Do you hold any national or international awards, honors'] || ''
    ];
    
    sheet.appendRow(row);
    
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

function submitSuccessStory(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SUCCESS_STORIES_SHEET_NAME);
    
    // Create header row if it doesn't exist
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Name', 'Country', 'Field of Study', 'YouTube Link', 
        'Testimonial Text', 'University', 'Status'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const row = [
      new Date(),
      data.name || '',
      data.country || '',
      data.fieldOfStudy || '',
      data.youtubeLink || '',
      data.testimonialText || '',
      data.university || '',
      data.status || 'Active'
    ];
    
    sheet.appendRow(row);
    
    return {
      status: 'success',
      message: 'Success story submitted successfully'
    };
    
  } catch (error) {
    console.error('Error submitting success story:', error);
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

function submitChatbotLead(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(CHATBOT_LEADS_SHEET_NAME);
    
    // Create header row if it doesn't exist
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'User Name', 'Phone Number', 'Country of Interest', 
        'Field of Study', 'Questions Asked', 'Interest Level', 'Session Duration'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    const row = [
      new Date(),
      data.userName || '',
      data.phoneNumber || '',
      data.countryOfInterest || '',
      data.fieldOfStudy || '',
      data.questionsAsked || '',
      data.interestLevel || '',
      data.sessionDuration || ''
    ];
    
    sheet.appendRow(row);
    
    return {
      status: 'success',
      message: 'Chatbot lead submitted successfully'
    };
    
  } catch (error) {
    console.error('Error submitting chatbot lead:', error);
    return {
      status: 'error',
      message: error.toString()
    };
  }
}

function getSuccessStories() {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SUCCESS_STORIES_SHEET_NAME);
    
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

// Test function
function testScript() {
  console.log('Google Apps Script is working correctly!');
  return 'Test successful';
}

// Setup function to create all required sheets with headers
function setupSheets() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Create Success Stories sheet
    let successSheet = spreadsheet.getSheetByName(SUCCESS_STORIES_SHEET_NAME);
    if (!successSheet) {
      successSheet = spreadsheet.insertSheet(SUCCESS_STORIES_SHEET_NAME);
    }
    if (successSheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'Name', 'Country', 'Field of Study', 'YouTube Link', 'Testimonial Text', 'University', 'Status'];
      successSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Add sample data
      const sampleData = [
        new Date(), 'John Doe', 'United States', 'Computer Science', 
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 
        'This program changed my life!', 'MIT', 'Active'
      ];
      successSheet.getRange(2, 1, 1, sampleData.length).setValues([sampleData]);
    }
    
    // Create Form Submissions sheet
    let formSheet = spreadsheet.getSheetByName(FORM_SHEET_NAME);
    if (!formSheet) {
      formSheet = spreadsheet.insertSheet(FORM_SHEET_NAME);
    }
    if (formSheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Name', 'Email', 'Phone', 'Year of Study', 'GPA', 
        'Field of Study', 'Test Scores', 'Internship Experience', 
        'Research Papers', 'Courses/Certifications', 'Extracurricular Activities', 
        'Work Experience', 'Previous Scholarship Applications', 'Awards'
      ];
      formSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Create Chatbot Leads sheet
    let chatbotSheet = spreadsheet.getSheetByName(CHATBOT_LEADS_SHEET_NAME);
    if (!chatbotSheet) {
      chatbotSheet = spreadsheet.insertSheet(CHATBOT_LEADS_SHEET_NAME);
    }
    if (chatbotSheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'User Name', 'Phone Number', 'Country of Interest', 
        'Field of Study', 'Questions Asked', 'Interest Level', 'Session Duration'
      ];
      chatbotSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    return 'All sheets created successfully with headers and sample data!';
    
  } catch (error) {
    console.error('Error setting up sheets:', error);
    return 'Error: ' + error.toString();
  }
} 