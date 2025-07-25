// Twilio Chatbot Service
// Note: You'll need to add your Twilio credentials to environment variables

class TwilioChatbotService {
  constructor() {
    this.accountSid = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
    this.authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
    this.serviceSid = import.meta.env.VITE_TWILIO_SERVICE_SID;
    this.isInitialized = false;
  }

  async initialize() {
    if (!this.accountSid || !this.authToken) {
      console.warn('Twilio credentials not found. Using simulated chatbot.');
      this.isInitialized = false;
      return false;
    }

    try {
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Twilio:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async sendMessage(userMessage, userName = '') {
    if (!this.isInitialized) {
      return this.getSimulatedResponse(userMessage, userName);
    }
    return this.getSimulatedResponse(userMessage, userName);
  }

  getSimulatedResponse(userInput, userName = '') {
    const lowerInput = userInput.toLowerCase();
    const nameGreeting = userName ? `, ${userName}` : '';
    
    // Scholarship Information
    if (lowerInput.includes('scholarship') || lowerInput.includes('funding')) {
      return {
        text: `We offer several fully-funded scholarship opportunities${nameGreeting}! Here's what you need to know:

📚 Our scholarships typically cover:
• Full tuition fees
• Monthly living stipend (€800-1200)
• Travel allowance
• Health insurance
• Language courses

Would you like to:
1. Check your eligibility
2. Learn about specific country programs
3. Get application timeline details
4. See required documents

Just let me know what interests you most!`,
        type: 'text'
      };
    }
    
    // Application Process
    if (lowerInput.includes('application') || lowerInput.includes('apply') || lowerInput.includes('process')) {
      return {
        text: `Let me walk you through our application process${nameGreeting}! 🎯

1️⃣ Eligibility Check
   • Academic requirements
   • Language proficiency
   • Field of study match

2️⃣ Document Preparation
   • Updated CV/Resume
   • Motivation letter
   • Academic transcripts
   • Language certificates

3️⃣ University Application
   • Program selection
   • Document submission
   • Application review

4️⃣ Scholarship Application
   • Additional documents
   • Interview preparation
   • Final selection

Would you like to:
• Start your eligibility check now
• Get document templates
• See application deadlines
• Schedule a consultation call`,
        type: 'text'
      };
    }
    
    // Country Information
    if (lowerInput.includes('country') || lowerInput.includes('where') || lowerInput.includes('study')) {
      return {
        text: `Great question${nameGreeting}! We partner with top universities in several European countries 🌍

Popular Destinations:
🇩🇪 Germany
• No tuition fees
• English-taught programs
• Strong job market

🇫🇷 France
• Low living costs
• Rich culture
• Research opportunities

🇳🇱 Netherlands
• Innovation hub
• English-friendly
• Tech focus

🇸🇪 Sweden
• Free education
• High quality of life
• Research excellence

Which country interests you most? I can provide specific details about programs, costs, and requirements for each!`,
        type: 'text'
      };
    }
    
    // Germany Specific
    if (lowerInput.includes('germany') || lowerInput.includes('german')) {
      return {
        text: `Excellent choice${nameGreeting}! Germany offers amazing opportunities 🇩🇪

Key Benefits:
• No tuition fees at public universities
• 18-month post-study work visa
• Strong industry connections
• High-quality education

Popular Programs:
• Engineering
• Computer Science
• Business & Management
• Natural Sciences

Requirements:
• Bachelor's degree (3-4 years)
• B2/C1 German or B2 English
• Blocked account (€11,208)
• Health insurance

Would you like to:
1. See available programs
2. Check language requirements
3. Learn about living costs
4. Start your application`,
        type: 'text'
      };
    }
    
    // France Specific
    if (lowerInput.includes('france') || lowerInput.includes('french')) {
      return {
        text: `France is an excellent destination${nameGreeting}! 🇫🇷

Education Highlights:
• Very low tuition (€3,770/year)
• Strong research focus
• Rich cultural experience
• Growing tech scene

Popular Cities:
🗼 Paris
• Tech & Business hub
• Cultural center
• International community

🏖️ Other Cities
• Lyon (Technology)
• Toulouse (Aerospace)
• Montpellier (Medicine)

Would you like details about:
1. Program options
2. City comparison
3. Living costs
4. Visa requirements`,
        type: 'text'
      };
    }
    
    // Cost Information
    if (lowerInput.includes('cost') || lowerInput.includes('expense') || lowerInput.includes('money') || lowerInput.includes('fee')) {
      return {
        text: `Let me break down the costs for you${nameGreeting}! 💰

Our Scholarship Covers:
✅ Full Tuition Fees
✅ Monthly Stipend (€800-1200)
✅ Travel Allowance
✅ Health Insurance
✅ Language Courses

Typical Living Costs:
🏠 Accommodation: €300-600
🍎 Food: €200-300
📚 Study Materials: €50
🚌 Transport: €50-100
📱 Internet/Phone: €30-50

Would you like to:
1. Use our cost calculator
2. Compare costs by country
3. See funding options
4. Check scholarship amounts`,
        type: 'text'
      };
    }
    
    // Greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return {
        text: `Hello${nameGreeting}! 👋 I'm your YesGrant assistant, ready to help make your study abroad dreams a reality!

I can help you with:
1. Scholarship Information
2. Country Selection
3. Application Process
4. Cost Breakdown
5. Eligibility Check

What would you like to explore first?`,
        type: 'text'
      };
    }
    
    // Thank You
    if (lowerInput.includes('thank')) {
      return {
        text: `You're welcome${nameGreeting}! 😊 I'm here to help you succeed in your study abroad journey.

Can I help you with anything else?
• Scholarship details
• Application process
• Country information
• Cost breakdown
• Book a consultation

Feel free to ask any questions!`,
        type: 'text'
      };
    }
    
    // Eligibility
    if (lowerInput.includes('eligibility') || lowerInput.includes('qualify') || lowerInput.includes('eligible')) {
      return {
        text: `Let's check your eligibility${nameGreeting}! 📋

General Requirements:
✅ Bachelor's degree (min. 3 years)
✅ Good academic record (min. 3.0 GPA)
✅ English proficiency
   • IELTS: 6.5+
   • TOEFL: 90+
✅ Under 35 years old
✅ Less than 3 years work experience

Would you like to:
1. Start eligibility check
2. See program requirements
3. Get language test info
4. Book a consultation

Choose an option or ask me anything specific!`,
        type: 'text'
      };
    }
    
    // Deadlines
    if (lowerInput.includes('deadline') || lowerInput.includes('when') || lowerInput.includes('dates')) {
      return {
        text: `Here are the key dates${nameGreeting}! 📅

Application Timeline:
🎯 Fall 2024 Intake
• Early Bird: December 15, 2023
• Regular: March 15, 2024
• Late: May 30, 2024

🎯 Spring 2025 Intake
• Early Bird: May 15, 2024
• Regular: July 30, 2024
• Late: September 30, 2024

Pro Tips:
• Apply early for better chances
• Allow 2-3 months for documents
• Start language prep early

Need help?
1. Start application now
2. Get document checklist
3. See country deadlines
4. Book consultation`,
        type: 'text'
      };
    }
    
    // Documents
    if (lowerInput.includes('document') || lowerInput.includes('papers') || lowerInput.includes('requirements')) {
      return {
        text: `Here's your document checklist${nameGreeting}! 📝

Required Documents:
1️⃣ Academic
   • Degree certificates
   • Transcripts
   • GPA calculation

2️⃣ Language
   • English: IELTS/TOEFL
   • German: TestDaF/DSH
   • French: DELF/DALF

3️⃣ Professional
   • Updated CV/Resume
   • Motivation Letter
   • Recommendation Letters

4️⃣ Additional
   • Passport copy
   • Passport photos
   • Portfolio (if applicable)

Need help?
• Get document templates
• See country requirements
• Start preparation
• Book document review`,
        type: 'text'
      };
    }
    
    // Language Requirements
    if (lowerInput.includes('language') || lowerInput.includes('english') || lowerInput.includes('german') || lowerInput.includes('french')) {
      return {
        text: `Let me explain the language requirements${nameGreeting}! 🗣️

English Programs:
• IELTS: 6.5+ overall
• TOEFL: 90+ overall
• Duolingo: 110+

German Programs:
• TestDaF: TDN 4
• DSH: Level 2
• Goethe: C1

French Programs:
• DELF: B2
• DALF: C1
• TCF: B2

Need help?
1. Find test centers
2. Get prep materials
3. Book language course
4. Check program requirements`,
        type: 'text'
      };
    }
    
    // Default response
    return {
      text: `I'm here to help with your study abroad journey${nameGreeting}! 🎓

I can assist with:
1. Scholarship Information
2. Country Selection
3. Application Process
4. Cost Breakdown
5. Eligibility Check
6. Document Requirements
7. Language Requirements

What would you like to know more about?`,
      type: 'text'
    };
  }

  async createConversation(userId) {
    if (!this.isInitialized) {
      return { success: true, conversationId: 'demo-conversation' };
    }
    return { success: true, conversationId: 'demo-conversation' };
  }
}

export default new TwilioChatbotService(); 