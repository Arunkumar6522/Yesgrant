// Google Apps Script for YesGrant Application - FIXED VERSION (No setHeaders)
// Copy and paste this entire code into your Google Apps Script editor

// Your Google Sheets ID - ALREADY FILLED IN
const SHEET_ID = '1qlS9v0XvC67C3D89thCQnQOQvi45fA_DUgLjtGuKYxw';

// Sheet names
const FORM_SHEET_NAME = 'Form Submissions';
const SUCCESS_STORIES_SHEET_NAME = 'Success Stories';  
const CHATBOT_LEADS_SHEET_NAME = 'Chatbot Leads';

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'get_success_stories') {
      const result = getSuccessStories();
      return createResponse(result);
    } else {
      return createResponse({
        status: 'success',
        message: 'Google Apps Script is working'
      });
    }
    
  } catch (error) {
    console.error('Error in doGet:', error);
    return createResponse({
      status: 'error',
      message: error.toString()
    });
  }
}

function doPost(e) {
  try {
    // Handle FormData from React app - FIXED VERSION
    const data = e.parameter || {};
    
    console.log('Received data:', data);
    
    // Check if this is a chatbot lead submission
    if (data.action === 'chatbot_lead') {
      const result = submitChatbotLead(data);
      return createResponse(result);
    } else {
      // Default to form submission
      const result = submitApplication(data);
      return createResponse(result);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return createResponse({
      status: 'error',
      message: error.toString()
    });
  }
}

function createResponse(data) {
  // Simple response without setHeaders to avoid compatibility issues
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function submitApplication(data) {
  try {
    console.log('Submitting application with data:', data);
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(FORM_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating Form Submissions sheet...');
      sheet = spreadsheet.insertSheet(FORM_SHEET_NAME);
    }
    
    // Create header row if it doesn't exist
    if (sheet.getLastRow() === 0) {
      console.log('Adding headers to sheet...');
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
    
    console.log('Adding row:', row);
    sheet.appendRow(row);
    console.log('Row added successfully');
    
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
    console.log('📞 Submitting chatbot lead with data:', data);
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(CHATBOT_LEADS_SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      console.log('Creating Chatbot Leads sheet...');
      sheet = spreadsheet.insertSheet(CHATBOT_LEADS_SHEET_NAME);
    }
    
    // Create header row if it doesn't exist
    if (sheet.getLastRow() === 0) {
      console.log('Adding headers to Chatbot Leads sheet...');
      const headers = [
        'Timestamp', 'User Name', 'Phone Number', 'Country of Interest', 
        'Field of Study', 'Questions Asked', 'Interest Level', 'Session Duration'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#FF9800');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
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
    
    console.log('📞 Adding chatbot lead row:', row);
    sheet.appendRow(row);
    console.log('📞 Chatbot lead added successfully');
    
    return {
      status: 'success',
      message: 'Chatbot lead captured successfully'
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

// Manual test function
function testFormSubmission() {
  const testData = {
    'Name': 'Test User',
    'Email': 'test@example.com',
    'Number': '1234567890',
    'year of study are you currently': 'Year 3 (Undergraduate)',
    'GPA or percentage': '80%-90%',
    'Field of study': 'Computer Science',
    'standardized test scores': 'IELTS: 7.0',
    'internship or practical training': 'Yes, 3 months',
    'published research papers, reviews, or conference presentations': 'Published 1 paper',
    'courses, certifications, or online programs': 'AWS Certified',
    'extracurricular activities': 'Sports team captain',
    'Do you have any work experience': 'Yes, part-time job',
    'Applied for any scholarships or financial aid': 'Yes, 2 applications',
    'Do you hold any national or international awards, honors': 'Dean\'s List'
  };
  
  console.log('Testing with data:', testData);
  const result = submitApplication(testData);
  console.log('Test result:', result);
  return result;
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