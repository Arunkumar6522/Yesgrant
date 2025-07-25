// Simple Google Apps Script for YesGrant Application Forms
// This version focuses on reliability and simplicity

const SHEET_ID = '1qlS9v0XvC67C3D89thCQnQOQvi45fA_DUgLjtGuKYxw';

function doPost(e) {
  // Simple, bulletproof POST handler
  const data = e.parameter || {};
  
  try {
    // Get or create the Applications sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName('Applications');
    
    if (!sheet) {
      // Create new Applications sheet
      sheet = spreadsheet.insertSheet('Applications');
      
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
      
      // Format header
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
    }
    
    // Add the application data
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
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Application submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

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
  // Handle success stories if needed
  if (e.parameter.action === 'get_success_stories') {
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      const sheet = spreadsheet.getSheetByName('Success Stories');
      
      if (!sheet) {
        return ContentService
          .createTextOutput(JSON.stringify({
            status: 'success',
            data: []
          }))
          .setMimeType(ContentService.MimeType.JSON)
          .setHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
      }
      
      const data = sheet.getDataRange().getValues();
      
      if (data.length <= 1) {
        return ContentService
          .createTextOutput(JSON.stringify({
            status: 'success',
            data: []
          }))
          .setMimeType(ContentService.MimeType.JSON)
          .setHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
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
      
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          data: stories
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: error.toString(),
          data: []
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is working'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

// Test function
function test() {
  const testData = {
    'Name': 'Test User',
    'Email': 'test@example.com',
    'Number': '1234567890',
    'year of study are you currently': 'Year 3',
    'GPA or percentage': '85%',
    'Field of study': 'Computer Science'
  };
  
  const mockEvent = {
    parameter: testData
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
} 