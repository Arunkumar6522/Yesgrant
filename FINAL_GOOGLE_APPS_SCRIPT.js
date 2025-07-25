/**
 * YesGrant Comprehensive Google Apps Script
 * Handles: Success Stories, Application Forms, Chatbot Leads
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Deploy as web app with execute as "Me" and access "Anyone"
 * 5. Copy the web app URL and use it in your services
 */

// Main POST handler - routes to appropriate function based on 'type' parameter
function doPost(e) {
  try {
    const data = {};
    
    // Extract form data
    for (const key in e.parameter) {
      data[key] = e.parameter[key];
    }
    
    // Route based on type
    switch (data.type) {
      case 'form_submission':
        return handleFormSubmission(data);
      case 'chatbot_lead':
        return handleChatbotLead(data);
      case 'success_story':
        return handleSuccessStory(data);
      default:
        // Default to form submission for backward compatibility
        return handleFormSubmission(data);
    }
    
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler - returns success stories data
function doGet(e) {
  try {
    const action = e.parameter.action || 'get_success_stories';
    const callback = e.parameter.callback; // For JSONP support
    
    let result;
    switch (action) {
      case 'get_success_stories':
        result = getSuccessStories();
        break;
      default:
        result = getSuccessStories();
    }
    
    // If callback is provided, return JSONP response
    if (callback) {
      return ContentService
        .createTextOutput(callback + '(' + result.getContent() + ');')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    // Otherwise return regular JSON with CORS headers
    return ContentService
      .createTextOutput(result.getContent())
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
    
  } catch (error) {
    const errorResponse = JSON.stringify({
      status: 'error',
      message: error.toString()
    });
    
    return ContentService
      .createTextOutput(errorResponse)
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

// Handle application form submissions
function handleFormSubmission(data) {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Submissions');
    
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Form Submissions');
      sheet.getRange(1, 1, 1, 12).setValues([
        ['Timestamp', 'Full Name', 'Email', 'Phone', 'Country of Residence', 
         'Highest Education', 'Field of Study', 'Preferred Country', 
         'Preferred Field', 'English Level', 'Work Experience', 'Additional Info']
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground('#5ba79d');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    // Add the form submission
    sheet.appendRow([
      new Date(),
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.countryOfResidence || '',
      data.highestEducation || '',
      data.fieldOfStudy || '',
      data.preferredCountry || '',
      data.preferredField || '',
      data.englishLevel || '',
      data.workExperience || '',
      data.additionalInfo || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Application submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle chatbot leads
function handleChatbotLead(data) {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Chatbot Leads');
    
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Chatbot Leads');
      sheet.getRange(1, 1, 1, 12).setValues([
        ['Timestamp', 'User Name', 'Email', 'Phone', 'Country of Interest', 
         'Field of Study', 'Questions Asked', 'Interest Level', 'Requested Contact', 
         'Session Duration', 'Menu Interactions', 'User Agent']
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground('#5ba79d');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    sheet.appendRow([
      new Date(),
      data.userName || '',
      data.email || '',
      data.phone || '',
      data.countryOfInterest || '',
      data.fieldOfStudy || '',
      data.questionsAsked || '',
      data.interestLevel || 'Medium',
      data.requestedContact || 'No',
      data.sessionDuration || '',
      data.menuInteractions || '',
      data.userAgent || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Lead captured successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle success story submissions
function handleSuccessStory(data) {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Success Stories');
    
    if (!sheet) {
      sheet = createSuccessStoriesSheet();
    }
    
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.country || '',
      data.fieldOfStudy || '',
      data.youtubeLink || '',
      data.testimonial || '',
      data.university || '',
      data.currentStatus || 'Active'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Success story added successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Get success stories data (only real data, no dummy content)
function getSuccessStories() {
  try {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Success Stories');
    
    if (!sheet) {
      // Create sheet if it doesn't exist but return empty array
      createSuccessStoriesSheet();
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          data: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Filter out empty rows and only include rows with actual data
    const successStories = rows
      .filter(row => {
        // Only include rows that have name, country, and either YouTube link or testimonial
        return row[1] && row[2] && (row[4] || row[5]);
      })
      .map(row => ({
        timestamp: row[0],
        name: row[1],
        country: row[2],
        fieldOfStudy: row[3],
        youtubeLink: row[4],
        testimonial: row[5],
        university: row[6],
        status: row[7] || 'Active'
      }))
      .filter(story => story.status === 'Active'); // Only show active stories
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        data: successStories
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        data: []
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Create Success Stories sheet with proper structure
function createSuccessStoriesSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Success Stories');
  
  // Set up headers
  sheet.getRange(1, 1, 1, 8).setValues([
    ['Timestamp', 'Name', 'Country', 'Field of Study', 'YouTube Link', 'Testimonial', 'University', 'Status']
  ]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, 8);
  headerRange.setBackground('#5ba79d');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  
  // Set column widths for better readability
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 120); // Country
  sheet.setColumnWidth(4, 150); // Field of Study
  sheet.setColumnWidth(5, 200); // YouTube Link
  sheet.setColumnWidth(6, 300); // Testimonial
  sheet.setColumnWidth(7, 150); // University
  sheet.setColumnWidth(8, 100); // Status
  
  // Add instructions row
  sheet.getRange(2, 1, 1, 8).setValues([
    ['Auto-generated', 'Student Name', 'Country/Region', 'Study Field', 'YouTube Video URL', 'Written Testimonial', 'University Name', 'Active/Inactive']
  ]);
  
  // Format instructions row
  const instructionRange = sheet.getRange(2, 1, 1, 8);
  instructionRange.setBackground('#f0f8f7');
  instructionRange.setFontStyle('italic');
  
  return sheet;
}

// Utility function to extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
  if (!url) return '';
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/user\/[^\/]+#p\/[^\/]+\/[^\/]+\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return '';
}

// Test function to add sample data (run this once to test)
function addSampleSuccessStory() {
  const sampleData = {
    type: 'success_story',
    name: 'Priya Sharma',
    country: 'Germany',
    fieldOfStudy: 'Computer Science',
    youtubeLink: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    testimonial: 'Thanks to YesGrant, I got a full scholarship to study at TU Munich. The support was incredible!',
    university: 'Technical University of Munich',
    currentStatus: 'Active'
  };
  
  return handleSuccessStory(sampleData);
}

// Function to clean up test data (if needed)
function clearTestData() {
  const sheets = ['Form Submissions', 'Chatbot Leads', 'Success Stories'];
  
  sheets.forEach(sheetName => {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (sheet) {
      // Keep header row, clear data rows
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
      }
    }
  });
  
  return 'Test data cleared successfully';
} 