# Google Apps Script Setup Guide - CORS Fixed

## Overview
This guide will help you set up the Google Apps Script with proper CORS headers to fix the `localhost` CORS issues during development.

## Prerequisites
- Google account
- Google Sheets access
- Google Apps Script access

## Step 1: Create a New Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "YesGrant Application Data"
4. Copy the Sheets ID from the URL (it's the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123def456GHI789jkl/edit`
   - The ID is: `1ABC123def456GHI789jkl`

## Step 2: Create the Required Sheets

Create three sheets in your Google Sheets document with these exact names:

### Sheet 1: "Form Submissions"
- Contains detailed application form data
- Headers: Timestamp, Name, Email, Phone, Year of Study, GPA, Field of Study, Test Scores, Internship Experience, Research Papers, Courses/Certifications, Extracurricular Activities, Work Experience, Previous Scholarship Applications, Awards

### Sheet 2: "Success Stories"
- Contains video testimonials and success stories
- Headers: Timestamp, Name, Country, Field of Study, YouTube Link, Testimonial Text, University, Status

### Sheet 3: "Chatbot Leads"
- Contains chatbot interaction data
- Headers: Timestamp, User Name, Phone Number, Country of Interest, Field of Study, Questions Asked, Interest Level, Session Duration

## Step 3: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `GOOGLE_APPS_SCRIPT_FIXED.js`
4. Replace `YOUR_GOOGLE_SHEETS_ID_HERE` with your actual Sheets ID from Step 1

## Step 4: Deploy the Script

1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set the following settings:
   - **Description**: "YesGrant Application API with CORS"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the generated Web App URL

## Step 5: Update Your React Application

Update the `GOOGLE_SCRIPT_URL` in your React services to use the new deployment URL:

### Files to update:
- `src/services/applicationService.js`
- `src/services/successStoriesService.js`
- `src/services/chatbotLeadsService.js`

Replace the old URL with your new deployment URL.

## Step 6: Test the Setup

1. Start your React development server: `npm run dev`
2. Open the browser console
3. Navigate to a page that uses the services (like testimonials)
4. Check if the CORS errors are resolved

## Key Features of the Fixed Script

### CORS Headers Added
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Access-Control-Max-Age: 86400`

### Supports All HTTP Methods
- **GET**: For retrieving success stories
- **POST**: For submitting applications, success stories, and chatbot leads
- **OPTIONS**: For handling preflight requests

### Error Handling
- Comprehensive try-catch blocks
- Proper error responses
- Console logging for debugging

## Troubleshooting

### If you still get CORS errors:
1. Make sure you deployed the script as a "Web app" with "Anyone" access
2. Verify the sheet names match exactly (case-sensitive)
3. Check that the Sheets ID is correct
4. Try redeploying the script

### If data isn't saving:
1. Check the Google Sheets permissions
2. Verify the sheet names in the script match your actual sheet names
3. Look at the Google Apps Script execution logs

### If YouTube videos aren't displaying:
1. Ensure the YouTube links are in the correct format
2. Check that the Status column is set to "Active"
3. Verify the YouTube video is public or unlisted

## Security Note
The script uses `Access-Control-Allow-Origin: *` for development. In production, you should restrict this to your actual domain.

## Next Steps
Once deployed, your React application should be able to:
- Submit application forms to Google Sheets
- Fetch and display success stories/testimonials
- Save chatbot interaction data
- All without CORS errors during development 