# Twilio Chatbot Setup Guide

## Overview
The YesGrant website now includes a Twilio-powered chatbot that provides intelligent responses about scholarships, applications, and study abroad opportunities.

## Current Status
- ✅ **Demo Mode**: The chatbot is currently running in demo mode with simulated responses
- 🔄 **Twilio Integration**: Ready for production Twilio integration

## Features
- **Smart Responses**: Context-aware responses about scholarships, countries, applications
- **Real-time Chat**: Live conversation with typing indicators
- **Professional UI**: Modern chat interface with timestamps
- **Mobile Responsive**: Works perfectly on all devices

## Demo Mode (Current)
The chatbot currently works with simulated responses that cover:
- Scholarship information
- Application processes
- Country-specific details (Germany, France, etc.)
- Cost and funding information
- Eligibility requirements
- Application deadlines

## Production Setup (Optional)

### 1. Get Twilio Credentials
1. Sign up at [Twilio Console](https://console.twilio.com/)
2. Get your Account SID and Auth Token
3. Create a Conversations Service

### 2. Environment Variables
Create a `.env` file in your project root:
```env
VITE_TWILIO_ACCOUNT_SID=your_account_sid_here
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_SERVICE_SID=your_service_sid_here
```

### 3. Enable Twilio Integration
Once credentials are added, the chatbot will automatically switch from "Demo Mode" to "Twilio Connected".

## Usage
1. Click the floating chatbot button (robot icon)
2. Ask questions about:
   - "scholarships"
   - "application process"
   - "Germany" or "France"
   - "costs and expenses"
   - "eligibility requirements"
   - "deadlines"

## Technical Details
- **Service**: `src/services/twilioService.js`
- **Component**: `src/components/Chatbot/Chatbot.jsx`
- **Dependencies**: `twilio` package installed
- **Fallback**: Graceful fallback to demo mode if Twilio is unavailable

## Customization
You can customize responses by editing the `getSimulatedResponse()` method in `twilioService.js`. 