# YesGrant Google Sheet Integration Setup

This guide will help you set up the complete Google Sheet integration for your YesGrant website, handling:
1. **Success Stories/Testimonies** - Real testimonials with YouTube videos
2. **Application Form Submissions** - "Start Journey" form data
3. **Chatbot Leads** - Lead capture from AI chatbot interactions

## 🚀 Quick Setup

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "YesGrant Lead Management"

### Step 2: Deploy Google Apps Script
1. In your spreadsheet, go to **Extensions** → **Apps Script**
2. Delete the default code
3. Copy and paste the code from `GOOGLE_APPS_SCRIPT.js`
4. Save the project (name it "YesGrant Integration")
5. Click **Deploy** → **New Deployment**
6. Choose **Web app** as type
7. Set **Execute as**: Me
8. Set **Who has access**: Anyone
9. Click **Deploy**
10. **Copy the Web App URL** (you'll need this)

### Step 3: Update Service URLs
Update the API URL in these files with your Web App URL:

**File: `src/services/successStoriesService.js`**
```javascript
this.apiUrl = 'YOUR_WEB_APP_URL_HERE';
```

**File: `src/services/applicationService.js`**
```javascript
this.apiUrl = 'YOUR_WEB_APP_URL_HERE';
```

**File: `src/services/chatbotLeadsService.js`**
```javascript
this.apiUrl = 'YOUR_WEB_APP_URL_HERE';
```

## 📊 Three Sheet System

Your spreadsheet will automatically create three sheets:

### 1. Success Stories Sheet
**Columns:**
- Timestamp
- Name  
- Country
- Field of Study
- YouTube Link
- Testimonial
- University
- Status (Active/Inactive)

**How it works:**
- Only shows testimonials marked as "Active"
- Supports both YouTube videos and text testimonials
- No dummy content - only real data from sheet

### 2. Form Submissions Sheet (Start Journey)
**Columns:**
- Timestamp
- Full Name
- Email
- Phone
- Country of Residence
- Highest Education
- Field of Study
- Preferred Country
- Preferred Field
- English Level
- Work Experience
- Additional Info

### 3. Chatbot Leads Sheet
**Columns:**
- Timestamp
- User Name
- Email
- Phone
- Country of Interest
- Field of Study
- Questions Asked
- Interest Level
- Requested Contact
- Session Duration
- Menu Interactions
- User Agent

## 🎯 How Each System Works

### Success Stories/Testimonies
```javascript
// Add a new success story
successStoriesService.submitSuccessStory({
  name: 'John Doe',
  country: 'Germany',
  fieldOfStudy: 'Computer Science',
  youtubeLink: 'https://youtube.com/watch?v=VIDEO_ID',
  testimonial: 'Amazing experience with YesGrant!',
  university: 'TU Munich'
});

// Get all active stories for display
const stories = await successStoriesService.getStoriesForDisplay();
```

### Application Forms (Start Journey)
```javascript
// Submit application
applicationService.submitApplication({
  fullName: 'Jane Smith',
  email: 'jane@email.com',
  phone: '1234567890',
  countryOfResidence: 'India',
  highestEducation: 'Bachelor\'s Degree',
  fieldOfStudy: 'Engineering',
  preferredCountry: 'Germany',
  preferredField: 'Computer Science',
  englishLevel: 'Advanced (C1)'
});
```

### Chatbot Leads
```javascript
// Automatically captured when users interact with chatbot
// Includes name, phone, conversation data, and menu interactions
```

## 🔧 Testing Your Setup

### Test Success Stories
1. Add a test story directly in your Google Sheet:
   - Name: Test User
   - Country: Test Country  
   - Field of Study: Test Field
   - YouTube Link: https://youtube.com/watch?v=dQw4w9WgXcQ
   - Testimonial: Test testimonial
   - Status: Active

2. Test the API:
```javascript
// In browser console
fetch('YOUR_WEB_APP_URL?action=get_success_stories')
  .then(r => r.json())
  .then(console.log);
```

### Test Chatbot Integration
1. Open chatbot on your website
2. Complete name and phone entry
3. Have a conversation
4. Check "Chatbot Leads" sheet for captured data

### Test Application Form
1. Fill out any application form on your site
2. Submit the form
3. Check "Form Submissions" sheet for data

## 📝 Managing Content

### Adding Success Stories
1. **Manual Entry**: Add directly in Google Sheet
2. **Programmatic**: Use the `submitSuccessStory` method
3. **Bulk Upload**: Copy/paste data into sheet

### Controlling Testimonial Display
- Set Status to "Active" to show testimonial
- Set Status to "Inactive" to hide testimonial
- Empty rows are automatically filtered out
- Must have either YouTube link OR testimonial text

### YouTube Video Format Support
The system accepts various YouTube URL formats:
- `https://youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://youtube.com/embed/VIDEO_ID`

## 🔒 Security & Privacy

### Data Protection
- All submissions are timestamped
- Personal data is stored securely in Google Sheets
- No sensitive data is logged in browser console

### Access Control
- Google Apps Script runs with your permissions
- Only you can access the spreadsheet data
- Web app is configured for anonymous access for form submissions

## 🚨 Troubleshooting

### Common Issues

**"YOUR_SCRIPT_ID_HERE" Error**
- Make sure you've updated the API URL in all service files

**No Data Appearing**
- Check that sheets are named correctly (case-sensitive)
- Verify Web App deployment is active
- Check browser console for errors

**Testimonials Not Showing**
- Ensure Status column is set to "Active"
- Verify required fields (Name, Country) are filled
- Check that either YouTube link or testimonial text exists

**Chatbot Not Capturing Leads**
- Verify chatbot integration is complete
- Check that users are completing name/phone entry
- Ensure conversation triggers lead capture logic

### Debug Mode
Add this to any service file for debugging:
```javascript
console.log('API URL:', this.apiUrl);
console.log('Request data:', formData);
```

## 📈 Analytics & Insights

### Useful Queries You Can Run

**Most Popular Countries:**
Count occurrences in "Country of Interest" column

**Conversion Funnel:**
- Chatbot interactions → Form submissions
- Track user journey from chat to application

**Response Times:**
- Monitor how quickly you respond to leads
- Track follow-up success rates

## 🎨 Customization Options

### Adding New Fields
1. Update Google Apps Script to handle new fields
2. Add columns to respective sheets
3. Update service files to include new data

### Custom Validation
Modify the validation functions in `applicationService.js`:
```javascript
validateApplication(data) {
  // Add your custom validation logic
}
```

### Webhook Integration
You can extend the system to send data to other platforms:
```javascript
// In Google Apps Script
function sendToWebhook(data) {
  UrlFetchApp.fetch('YOUR_WEBHOOK_URL', {
    method: 'POST',
    payload: JSON.stringify(data)
  });
}
```

## ✅ Checklist

- [ ] Created Google Spreadsheet
- [ ] Deployed Google Apps Script as Web App  
- [ ] Updated API URLs in all service files
- [ ] Tested success stories display (should show no dummy content)
- [ ] Tested chatbot lead capture
- [ ] Tested application form submission
- [ ] Verified all three sheets are created automatically
- [ ] Added at least one real success story for testing

## 🔗 API Endpoints

Your deployed Web App provides these endpoints:

**GET Requests:**
- `?action=get_success_stories` - Fetch all active testimonials

**POST Requests:**
- `type=success_story` - Add new testimonial
- `type=form_submission` - Add application form data  
- `type=chatbot_lead` - Add chatbot interaction data

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Google Apps Script execution transcript
3. Ensure all API URLs are correctly updated
4. Test each component individually

Your complete lead management system is now ready! 🎉 