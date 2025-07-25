import React, { useState, useEffect, useRef } from 'react';
import SupportIcon from '../../assets/images/support-icon.svg';
import chatbotLeadsService from '../../services/chatbotLeadsService';

const TypingIndicator = () => (
    <div className="flex items-center space-x-2 px-2 py-1">
        <div className="w-2 h-2 rounded-full animate-[bounce_1s_infinite]" style={{ backgroundColor: '#5ba79d' }}></div>
        <div className="w-2 h-2 rounded-full animate-[bounce_1s_infinite_200ms]" style={{ backgroundColor: '#5ba79d' }}></div>
        <div className="w-2 h-2 rounded-full animate-[bounce_1s_infinite_400ms]" style={{ backgroundColor: '#5ba79d' }}></div>
    </div>
);

const Chatbot = ({ closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [chatPhase, setChatPhase] = useState('name'); // 'name', 'phone', 'chat'
  const [userMessages, setUserMessages] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [menuInteractions, setMenuInteractions] = useState([]);
  const chatEndRef = useRef(null);
  const initializationRef = useRef(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  useEffect(() => {
    // Prevent duplicate initialization
    if (initializationRef.current) return;
    initializationRef.current = true;

    // Initialize session start time
    setSessionStartTime(new Date());

    // Check if user details are already stored
    const savedName = localStorage.getItem('yesgrant_user_name');
    const savedPhone = localStorage.getItem('yesgrant_user_phone');
    
    if (savedName && savedPhone) {
      setUserName(savedName);
      setUserPhone(savedPhone);
      setChatPhase('chat');
      
      // Capture lead for returning user
      setTimeout(() => {
        captureLead();
      }, 1000);
      
      setTimeout(() => {
        setMessages([{
          text: `Welcome back, ${savedName}! 👋 How can I assist with your study abroad plans today?`,
          sender: "bot",
          timestamp: new Date()
        }]);
      }, 500);
    } else {
      // Start with name collection
      setTimeout(() => {
        setMessages([{
          text: "👋 Hi there! I'm your YesGrant assistant, ready to help you achieve your dream of studying abroad with zero tuition costs!",
          sender: "bot",
          timestamp: new Date()
        }]);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              text: "To get started, could you please enter your good name? 😊",
              sender: "bot",
              timestamp: new Date()
            }]);
            setIsTyping(false);
          }, 1000);
        }, 2000);
      }, 500);
    }
  }, []);

  // Phone number validation
  const validatePhoneNumber = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if exactly 10 digits
    if (cleanPhone.length !== 10) {
      return false;
    }
    
    // Check if not all same digits (like 0000000000)
    if (/^(\d)\1{9}$/.test(cleanPhone)) {
      return false;
    }
    
    // Check if first digit is not 0 or 1 (common validation for mobile numbers)
    if (cleanPhone[0] === '0' || cleanPhone[0] === '1') {
      return false;
    }
    
    return true;
  };

  // Function to get custom bot response
  const getCustomResponse = (userInput, userName = '') => {
    const lowerInput = userInput.toLowerCase();
    const nameGreeting = userName ? `, ${userName}` : '';
    
    // Scholarship Information
    if (lowerInput.includes('scholarship') || lowerInput.includes('funding') || lowerInput.includes('money') || lowerInput.includes('finance') || lowerInput.trim() === '1') {
      return `Great question${nameGreeting}! Let me tell you about our amazing scholarship opportunities 🎓

📚 **Our Full Scholarships Cover:**
✅ **100% Tuition Fees** - Complete education costs covered
✅ **Monthly Living Stipend** - €800-1200 for your daily expenses
✅ **Travel Allowance** - We cover your flight tickets
✅ **Health Insurance** - Full medical coverage included
✅ **Language Courses** - Free preparation classes

**Popular Study Fields:**
• Engineering & Technology
• Computer Science & IT
• Business & Management
• Medicine & Healthcare
• Data Science & Analytics

**Available Countries:**
• Germany 🇩🇪 (No tuition fees)
• France 🇫🇷 (Rich culture)
• Netherlands 🇳🇱 (Innovation hub)
• Sweden 🇸🇪 (High quality of life)

Would you like me to help you check your eligibility or learn more about any specific country? Just ask me!`;
    }
    
    // Application Process
    if (lowerInput.includes('application') || lowerInput.includes('apply') || lowerInput.includes('process') || lowerInput.includes('how to') || lowerInput.trim() === '3') {
      return `I'd love to guide you through our simple application process${nameGreeting}! 🚀

**Here's how we'll help you succeed:**

🎯 **Step 1: Quick Assessment (2-3 days)**
I'll check your academic background, language skills, and match you with the perfect program.

📋 **Step 2: Document Preparation (2-4 weeks)**
We'll help you prepare all necessary documents including transcripts, motivation letters, and language certificates.

🎓 **Step 3: University Application (1-2 weeks)**
I'll guide you through selecting the best universities and submitting your applications.

💰 **Step 4: Scholarship Application (2-3 weeks)**
We'll work together on scholarship essays and interview preparation.

✈️ **Step 5: Visa & Travel (4-6 weeks)**
Complete visa assistance, travel arrangements, and pre-departure support.

**Total Timeline: 3-4 months**

Ready to start your journey? Just tell me about your academic background and I'll assess your eligibility right away! What field did you study?`;
    }
    
    // Country Information
    if (lowerInput.includes('country') || lowerInput.includes('where') || lowerInput.includes('study') || lowerInput.includes('destination') || lowerInput.trim() === '2') {
      return `Excellent question${nameGreeting}! I can help you choose the perfect study destination 🌍

**Here are our top recommendations:**

🇩🇪 **Germany** - The Education Powerhouse
• Zero tuition fees at public universities
• 18-month post-study work visa
• Strong in engineering & technology
• Living cost: €800-1200/month

🇫🇷 **France** - Cultural Excellence
• Very affordable tuition (€3,770/year)
• Rich cultural heritage
• Growing startup ecosystem
• Living cost: €700-1000/month

🇳🇱 **Netherlands** - Innovation Hub
• World-class universities
• English-taught programs
• Tech & business focus
• Living cost: €900-1300/month

🇸🇪 **Sweden** - Quality Living
• Free education for EU students
• Excellent work-life balance
• Research opportunities
• Living cost: €900-1200/month

Which country sounds most appealing to you? I can give you detailed information about universities, programs, and the application process for any of these destinations!`;
    }
    
    // Germany Specific
    if (lowerInput.includes('germany') || lowerInput.includes('german')) {
      return `Excellent choice${nameGreeting}! Germany offers amazing opportunities 🇩🇪

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
4. Start your application`;
    }
    
    // France Specific
    if (lowerInput.includes('france') || lowerInput.includes('french')) {
      return `France is an excellent destination${nameGreeting}! 🇫🇷

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
4. Visa requirements`;
    }
    
    // Cost Information
    if (lowerInput.includes('cost') || lowerInput.includes('expense') || lowerInput.includes('money') || lowerInput.includes('fee')) {
      return `Let me break down the costs for you${nameGreeting}! 💰

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
4. Check scholarship amounts`;
    }
    
    // Eligibility
    if (lowerInput.includes('eligibility') || lowerInput.includes('qualify') || lowerInput.includes('eligible') || lowerInput.includes('requirements') || lowerInput.trim() === '5') {
      return `I'd be happy to help you check your eligibility${nameGreeting}! 🎯

**Here's what I need to know to assess your profile:**

✅ **Academic Background**
• Do you have a Bachelor's degree (3+ years)?
• What's your GPA or percentage?
• What field did you study?

✅ **Language Skills**
• Are you comfortable with English?
• Have you taken IELTS/TOEFL? (6.5+ IELTS or 90+ TOEFL needed)

✅ **Personal Details**
• Are you under 35 years old?
• Do you have less than 3 years work experience?

✅ **Financial Readiness**
• Can you show €8,000-11,000 for visa purposes?

**Quick Check:** If you answered "Yes" to most of these, you're likely eligible! 🎉

Tell me about your academic background and I'll give you a personalized assessment. What degree do you have and what was your field of study?`;
    }
    
    // Deadlines
    if (lowerInput.includes('deadline') || lowerInput.includes('when') || lowerInput.includes('dates')) {
      return `Here are the key dates${nameGreeting}! 📅

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
4. Book consultation`;
    }
    
    // Documents
    if (lowerInput.includes('document') || lowerInput.includes('papers') || lowerInput.includes('requirements')) {
      return `Here's your document checklist${nameGreeting}! 📝

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
• Book document review`;
    }
    
    // Language Requirements
    if (lowerInput.includes('language') || lowerInput.includes('english') || lowerInput.includes('german') || lowerInput.includes('french')) {
      return `Let me explain the language requirements${nameGreeting}! 🗣️

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
4. Check program requirements`;
    }
    
    // Greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey') || lowerInput.includes('good morning') || lowerInput.includes('good afternoon')) {
      return `Hello there${nameGreeting}! 👋 I'm your YesGrant assistant, and I'm excited to help you achieve your study abroad dreams! 🎓

I can help you with everything from finding the right scholarship to getting accepted at top European universities. Whether you're curious about:

• **Fully-funded scholarships** that cover tuition, living costs, and travel
• **Best countries** to study in (Germany, France, Netherlands, Sweden)
• **Application process** and requirements
• **Eligibility assessment** based on your background
• **Document preparation** and language requirements

Just tell me what you'd like to know! What's your biggest question about studying abroad?`;
    }
    
    // Thank You
    if (lowerInput.includes('thank')) {
      return `You're welcome${nameGreeting}! 😊 I'm here to help you succeed in your study abroad journey.

Can I help you with anything else?
• Scholarship details
• Application process
• Country information
• Cost breakdown
• Book a consultation

Feel free to ask any questions!`;
    }
    
    // Handle Menu Options (1-7)
    if (lowerInput.trim() === '1' || lowerInput.includes('scholarship information')) {
      return `📚 **Scholarship Information**${nameGreeting}

Our fully-funded scholarships cover:
✅ **100% Tuition Fees** - No education costs
✅ **Monthly Stipend** - €800-1200 for living expenses
✅ **Travel Allowance** - Flight tickets covered
✅ **Health Insurance** - Full medical coverage
✅ **Language Courses** - Free preparation classes

**Available Programs:**
• Master's Degree Programs
• Research Opportunities
• Professional Development
• Language Preparation

**Popular Fields:**
• Engineering & Technology
• Business & Management
• Computer Science
• Medicine & Healthcare
• Arts & Humanities

Would you like to:
A. Check your eligibility
B. See application requirements
C. Learn about specific programs
D. Get country-specific details

Type A, B, C, or D to continue!`;
    }
    
    if (lowerInput.trim() === '2' || lowerInput.includes('country selection')) {
      return `🌍 **Country Selection Guide**${nameGreeting}

**🇩🇪 Germany**
• No tuition fees at public universities
• 18-month post-study work visa
• Strong job market in tech & engineering
• Cost of living: €800-1200/month

**🇫🇷 France**
• Low tuition fees (€3,770/year)
• Rich cultural experience
• Growing tech & startup scene
• Cost of living: €700-1000/month

**🇳🇱 Netherlands**
• Innovation hub of Europe
• English-friendly environment
• High quality of life
• Cost of living: €900-1300/month

**🇸🇪 Sweden**
• Free education for EU students
• Excellent work-life balance
• Research excellence
• Cost of living: €900-1200/month

**🇦🇹 Austria**
• Beautiful Alpine country
• Strong in arts & sciences
• Central European location
• Cost of living: €800-1100/month

Which country interests you most? Type the country name for detailed information!`;
    }
    
    if (lowerInput.trim() === '3' || lowerInput.includes('application process')) {
      return `📋 **Application Process**${nameGreeting}

**Step 1: Initial Assessment** ⏱️ 2-3 days
• Complete eligibility check
• Academic background review
• Language proficiency assessment
• Personal goal alignment

**Step 2: Document Preparation** ⏱️ 2-4 weeks
• Academic transcripts & certificates
• Language test results (IELTS/TOEFL)
• CV/Resume preparation
• Statement of purpose writing
• Recommendation letters

**Step 3: University Selection** ⏱️ 1-2 weeks
• Program matching based on profile
• University application submission
• Interview preparation (if required)
• Application tracking

**Step 4: Scholarship Application** ⏱️ 2-3 weeks
• Scholarship essays writing
• Financial documentation
• Interview preparation
• Final submission

**Step 5: Visa & Travel** ⏱️ 4-6 weeks
• Visa application assistance
• Travel arrangements
• Pre-departure orientation
• Accommodation support

**Total Timeline:** 3-4 months

Ready to start? Type "START APPLICATION" to begin your journey!`;
    }
    
    if (lowerInput.trim() === '4' || lowerInput.includes('cost breakdown')) {
      return `💰 **Cost Breakdown**${nameGreeting}

**What Our Scholarship Covers:**
✅ **Tuition Fees:** €0 - €15,000/year (FULLY COVERED)
✅ **Living Stipend:** €800-1200/month
✅ **Travel Costs:** €500-1500 (COVERED)
✅ **Health Insurance:** €100-200/month (COVERED)
✅ **Language Courses:** €300-800 (COVERED)

**Monthly Living Expenses:**
🏠 **Accommodation:** €300-600
• Student dormitory: €300-400
• Shared apartment: €400-500
• Private studio: €500-600

🍽️ **Food & Groceries:** €200-350
• Campus meals: €150-250
• Home cooking: €200-300
• Dining out: €250-350

🚌 **Transportation:** €50-120
• Student discount: €30-60
• Public transport: €50-100
• Bike rental: €20-40

📱 **Personal Expenses:** €100-200
• Phone/Internet: €30-50
• Entertainment: €50-100
• Miscellaneous: €50-100

**Total Monthly Need:** €650-1270
**Scholarship Provides:** €800-1200

You'll have enough to live comfortably! Want to calculate for a specific country?`;
    }
    
    if (lowerInput.trim() === '5' || lowerInput.includes('eligibility check')) {
      return `✅ **Eligibility Check**${nameGreeting}

**Academic Requirements:**
📚 **Education:** Bachelor's degree (minimum 3 years)
📊 **GPA:** Minimum 3.0/4.0 or equivalent (60%)
🎓 **Field:** Any field of study accepted
📅 **Graduation:** Within last 5 years preferred

**Language Requirements:**
🇬🇧 **English Programs:**
• IELTS: 6.5+ overall (no band below 6.0)
• TOEFL: 90+ iBT
• Duolingo: 110+
• Cambridge: B2 First or higher

🇩🇪 **German Programs:**
• TestDaF: TDN 4 in all sections
• DSH: Level 2 or higher
• Goethe: C1 certificate

**Personal Requirements:**
👤 **Age:** Under 35 years old
💼 **Experience:** Less than 3 years work experience
🌍 **Nationality:** All countries welcome
💪 **Motivation:** Strong commitment to studies

**Financial Requirements:**
💳 **Funds:** Proof of €8,000-11,000 for visa
🏦 **Support:** Family support or sponsor
📄 **Documentation:** Complete financial records

**Quick Check:**
✓ Do you have a bachelor's degree?
✓ Is your GPA above 3.0?
✓ Are you under 35?
✓ Can you prove English proficiency?

If you answered YES to all, you're likely eligible! Type "DETAILED ASSESSMENT" for personalized evaluation.`;
    }
    
    if (lowerInput.trim() === '6' || lowerInput.includes('document requirements')) {
      return `📄 **Document Requirements**${nameGreeting}

**1. Academic Documents** 📚
✅ **Degree Certificate** (Bachelor's)
• Original + certified translation
• Apostille/attestation required
• Must show 3+ years of study

✅ **Academic Transcripts**
• Complete grade history
• Credit hours/ECTS mentioned
• Official university seal

✅ **GPA Calculation**
• Convert to 4.0 scale
• WES/ECE evaluation (if required)
• Explanation of grading system

**2. Language Certificates** 🗣️
✅ **English:** IELTS, TOEFL, Duolingo, Cambridge
✅ **German:** TestDaF, DSH, Goethe
✅ **French:** DELF, DALF, TCF
• Valid for 2 years from test date
• Minimum score requirements apply

**3. Personal Documents** 👤
✅ **Passport** (valid for 2+ years)
✅ **Passport Photos** (biometric)
✅ **CV/Resume** (European format)
✅ **Motivation Letter** (1-2 pages)

**4. Professional Documents** 💼
✅ **Work Experience** (if applicable)
• Employment certificates
• Salary slips
• Experience letters

✅ **Recommendation Letters** (2-3)
• From professors/employers
• On official letterhead
• Contact details included

**5. Additional Documents** ⚡
✅ **Health Certificate**
✅ **Police Clearance**
✅ **Bank Statements**
✅ **Insurance Documents**

**Document Checklist Service:**
We provide free document review! Type "DOCUMENT REVIEW" to get started.`;
    }
    
    if (lowerInput.trim() === '7' || lowerInput.includes('language requirements')) {
      return `🗣️ **Language Requirements**${nameGreeting}

**English-Taught Programs** 🇬🇧

**IELTS Academic:**
• Overall: 6.5+ (minimum)
• Reading: 6.0+
• Writing: 6.0+
• Listening: 6.0+
• Speaking: 6.0+

**TOEFL iBT:**
• Overall: 90+ (minimum)
• Reading: 20+
• Writing: 20+
• Listening: 20+
• Speaking: 20+

**Duolingo English Test:**
• Overall: 110+ (minimum)
• Valid for 2 years
• Online test available

**Cambridge English:**
• B2 First (FCE): 169+
• C1 Advanced (CAE): 180+
• C2 Proficiency (CPE): 200+

**German-Taught Programs** 🇩🇪

**TestDaF:**
• All sections: TDN 4 (minimum)
• Reading, Writing, Listening, Speaking

**DSH (Deutsche Sprachprüfung):**
• Level 2 (minimum)
• University-specific test

**Goethe Institute:**
• C1 Certificate (minimum)
• Globally recognized

**French-Taught Programs** 🇫🇷

**DELF/DALF:**
• DELF B2 (minimum)
• DALF C1 (preferred)

**TCF (Test de Connaissance du Français):**
• B2 level (minimum)
• All skills tested

**Preparation Support:**
• Free language classes
• Online resources
• Mock tests
• Study groups

**Test Centers:** Available in 150+ countries
**Validity:** 2 years from test date

Need help with test preparation? Type "LANGUAGE PREP" for our free courses!`;
    }
    
    // Handle Secondary Menu Options
    if (lowerInput.trim() === 'a' || lowerInput.includes('check your eligibility')) {
      return `🎯 **Quick Eligibility Assessment**${nameGreeting}

Let me ask you a few questions:

1. Do you have a completed Bachelor's degree? (Yes/No)
2. Is your GPA above 3.0 or 60%? (Yes/No)
3. Are you under 35 years old? (Yes/No)
4. Can you take IELTS/TOEFL? (Yes/No)
5. Do you have €8,000-11,000 for visa? (Yes/No)

Please answer "Yes" or "No" to each question, or type "FULL ASSESSMENT" for detailed evaluation.`;
    }
    
    if (lowerInput.trim() === 'b' || lowerInput.includes('see application requirements')) {
      return `📋 **Application Requirements**${nameGreeting}

**Essential Requirements:**
✅ Completed Bachelor's degree (3-4 years)
✅ Academic transcripts with good grades
✅ English proficiency certificate
✅ Valid passport
✅ Motivation letter
✅ CV/Resume
✅ Recommendation letters (2-3)

**Timeline:**
• Document preparation: 2-4 weeks
• Application submission: 1-2 weeks
• Processing time: 4-8 weeks
• Visa application: 4-6 weeks

**Success Tips:**
• Apply early (6 months before intake)
• Ensure all documents are complete
• Write compelling motivation letter
• Get strong recommendation letters

Ready to start? Type "START APPLICATION" or ask about specific requirements!`;
    }
    
    if (lowerInput.trim() === 'c' || lowerInput.includes('learn about specific programs')) {
      return `🎓 **Specific Programs**${nameGreeting}

**Engineering & Technology:**
• Computer Science & IT
• Mechanical Engineering
• Electrical Engineering
• Civil Engineering
• Data Science & Analytics

**Business & Management:**
• MBA Programs
• International Business
• Marketing & Sales
• Finance & Banking
• Project Management

**Science & Research:**
• Medicine & Healthcare
• Environmental Science
• Physics & Mathematics
• Chemistry & Biology
• Psychology

**Arts & Humanities:**
• International Relations
• Literature & Languages
• History & Philosophy
• Media & Communications
• Design & Architecture

Which field interests you? Type the field name for detailed program information!`;
    }
    
    if (lowerInput.trim() === 'd' || lowerInput.includes('get country-specific details')) {
      return `🌍 **Country-Specific Details**${nameGreeting}

Choose a country for detailed information:

**🇩🇪 GERMANY** - Type "Germany details"
• Top universities, visa process, living costs

**🇫🇷 FRANCE** - Type "France details"  
• Program options, culture, requirements

**🇳🇱 NETHERLANDS** - Type "Netherlands details"
• Innovation focus, English programs, lifestyle

**🇸🇪 SWEDEN** - Type "Sweden details"
• Research opportunities, Nordic lifestyle

**🇦🇹 AUSTRIA** - Type "Austria details"
• Alpine beauty, quality education

**🇮🇹 ITALY** - Type "Italy details"
• Art, culture, Mediterranean lifestyle

**🇪🇸 SPAIN** - Type "Spain details"
• Warm climate, growing tech scene

Which country would you like to explore? Type the country name!`;
    }
    
    if (lowerInput.includes('start application') || lowerInput.includes('begin journey')) {
      return `🚀 **Let's Start Your Application!**${nameGreeting}

I'll guide you through the process step by step:

**Step 1: Personal Information**
• Full name: ${userName}
• Phone: ${userPhone ? userPhone : 'Not provided'}
• Email: (Please provide)
• Country of residence: (Please provide)
• Date of birth: (Please provide)

**Step 2: Academic Background**
• Degree: (Please provide)
• University: (Please provide)
• GPA/Percentage: (Please provide)
• Field of study: (Please provide)

**Step 3: Preferred Destination**
• Country preference: (Please provide)
• Program type: (Please provide)
• Intake: Fall 2024 or Spring 2025

Please provide your email address and preferred country to continue!`;
    }
    
    if (lowerInput.includes('detailed assessment') || lowerInput.includes('personalized evaluation')) {
      return `🔍 **Detailed Assessment**${nameGreeting}

I'll need some information to provide a personalized evaluation:

**Academic Information:**
1. What degree do you have?
2. What was your GPA/percentage?
3. What field did you study?
4. When did you graduate?

**Language Skills:**
1. What's your English level?
2. Have you taken IELTS/TOEFL?
3. Are you willing to learn German/French?

**Preferences:**
1. Which country interests you most?
2. What field do you want to study?
3. When do you want to start?

Please provide this information, and I'll give you a detailed assessment!`;
    }
    
    if (lowerInput.includes('document review') || lowerInput.includes('checklist service')) {
      return `📄 **Document Review Service**${nameGreeting}

Our expert team will review your documents for FREE!

**What we check:**
✅ Document completeness
✅ Format compliance
✅ Translation accuracy
✅ Legal requirements
✅ University standards

**How it works:**
1. Upload your documents
2. Expert review (24-48 hours)
3. Detailed feedback report
4. Correction guidelines
5. Approval confirmation

**Documents we review:**
• Academic certificates
• Transcripts
• Language certificates
• CV/Resume
• Motivation letters
• Recommendation letters

Ready to get started? Please provide your email address and I'll send you the upload link!`;
    }
    
    if (lowerInput.includes('language prep') || lowerInput.includes('free courses')) {
      return `🗣️ **Language Preparation Courses**${nameGreeting}

**FREE Language Support:**

**English Preparation:**
• IELTS preparation course (8 weeks)
• TOEFL preparation course (8 weeks)
• Speaking practice sessions
• Writing workshops
• Mock tests

**German Preparation:**
• A1 to B2 level courses
• TestDaF preparation
• Conversation practice
• Cultural orientation
• Grammar workshops

**French Preparation:**
• A1 to B2 level courses
• DELF/DALF preparation
• Speaking practice
• Cultural immersion
• Writing skills

**Course Features:**
• Live online classes
• Interactive exercises
• Personal tutor support
• Study materials included
• Flexible scheduling

**Next batch starts:** January 15, 2025

Interested? Please provide your email and preferred language to register!`;
    }
    
    // Default response
    return `I'm here to help you achieve your dream of studying abroad${nameGreeting}! 🎓

I can help you with:
• **Scholarship information** - Learn about our fully-funded programs
• **Country selection** - Find the perfect study destination
• **Application process** - Get step-by-step guidance
• **Cost breakdown** - Understand all expenses and funding
• **Eligibility check** - See if you qualify for our programs
• **Document requirements** - Get your paperwork ready
• **Language requirements** - Prepare for language tests

Just ask me anything! For example:
• "Tell me about scholarships"
• "Which country should I choose?"
• "How do I apply?"
• "Am I eligible?"

What would you like to know about your study abroad journey?`;
  };

  // Function to track menu interactions
  const trackMenuInteraction = (option, description) => {
    const interaction = {
      option: option,
      description: description,
      timestamp: new Date().toISOString()
    };
    setMenuInteractions(prev => [...prev, interaction]);
  };

  // Function to capture lead
  const captureLead = async (userMsg = '') => {
    if (leadCaptured || !userName || !userPhone) return;
    
    try {
      const allUserMessages = [...userMessages, userMsg].filter(msg => msg.trim());
      
      const chatbotData = {
        userName: userName,
        phoneNumber: userPhone,
        messages: allUserMessages,
        messageCount: allUserMessages.length,
        startTime: sessionStartTime
      };

      await chatbotLeadsService.captureFromChatbot(chatbotData);
      setLeadCaptured(true);
      console.log('Lead captured successfully:', { userName, phoneNumber: userPhone });
    } catch (error) {
      console.error('Error capturing lead:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      const userMessage = { 
        text: inputValue, 
        sender: "user",
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setUserMessages(prev => [...prev, inputValue.trim()]);
      setIsTyping(true);
      
      const currentInput = inputValue.trim();
      setInputValue('');

      // Handle name collection phase
      if (chatPhase === 'name') {
        const name = currentInput.trim();
        
        if (!name || name.length < 2) {
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { 
              text: `Please enter a valid name (at least 2 characters). What's your good name?`,
              sender: "bot",
              timestamp: new Date()
            }]);
            setIsTyping(false);
          }, 1000);
          return;
        }
        
        setUserName(name);
        localStorage.setItem('yesgrant_user_name', name);
        setChatPhase('phone'); // Update phase immediately
        
        setTimeout(() => {
          setMessages(prevMessages => [...prevMessages, { 
            text: `Nice to meet you, ${name}! 😊 Now, could you please enter your phone number? (Please enter a valid 10-digit number)`,
            sender: "bot",
            timestamp: new Date()
          }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      // Handle phone collection phase
      if (chatPhase === 'phone') {
        const phone = currentInput.replace(/\D/g, '');
        
        if (!validatePhoneNumber(phone)) {
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { 
              text: `Please enter a valid 10-digit phone number. Requirements:
• Exactly 10 digits
• Should not start with 0 or 1
• Cannot be all same digits (like 0000000000)

Example: 9876543210`,
              sender: "bot",
              timestamp: new Date()
            }]);
            setIsTyping(false);
          }, 1000);
          return;
        }
        
        setUserPhone(phone);
        localStorage.setItem('yesgrant_user_phone', phone);
        setChatPhase('chat'); // Update phase immediately
        
        // Capture lead now that we have both name and phone
        setTimeout(() => {
          captureLead(currentInput);
        }, 500);
        
        setTimeout(() => {
          setMessages(prevMessages => [...prevMessages, { 
            text: `Perfect! Thank you for providing your details, ${userName}! 🎉 Now I'm ready to help you with your study abroad journey. What would you like to know about our scholarship programs?`,
            sender: "bot",
            timestamp: new Date()
          }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

             // Handle regular chat phase
       if (chatPhase === 'chat') {
         // Check if we should capture lead
         const triggers = [
           'apply', 'application', 'when', 'deadline', 'requirements', 'eligibility',
           'contact', 'email', 'phone', 'call', 'help me', 'interested',
           '@', '.com', '+', 'how do i', 'what do i need', 'start application',
           'detailed assessment', 'document review', 'language prep'
         ];
         
         const msgLower = currentInput.toLowerCase();
         const isMenuOption = /^[1-7]$/.test(currentInput.trim()) || /^[a-d]$/.test(currentInput.trim());
         
         // Track menu interactions
         if (currentInput.trim() === '1') trackMenuInteraction('1', 'Scholarship Information');
         if (currentInput.trim() === '2') trackMenuInteraction('2', 'Country Selection');
         if (currentInput.trim() === '3') trackMenuInteraction('3', 'Application Process');
         if (currentInput.trim() === '4') trackMenuInteraction('4', 'Cost Breakdown');
         if (currentInput.trim() === '5') trackMenuInteraction('5', 'Eligibility Check');
         if (currentInput.trim() === '6') trackMenuInteraction('6', 'Document Requirements');
         if (currentInput.trim() === '7') trackMenuInteraction('7', 'Language Requirements');
         if (currentInput.trim() === 'a') trackMenuInteraction('A', 'Quick Eligibility Assessment');
         if (currentInput.trim() === 'b') trackMenuInteraction('B', 'Application Requirements');
         if (currentInput.trim() === 'c') trackMenuInteraction('C', 'Specific Programs');
         if (currentInput.trim() === 'd') trackMenuInteraction('D', 'Country-Specific Details');
         if (msgLower.includes('start application')) trackMenuInteraction('ACTION', 'Start Application');
         if (msgLower.includes('detailed assessment')) trackMenuInteraction('ACTION', 'Detailed Assessment');
         if (msgLower.includes('document review')) trackMenuInteraction('ACTION', 'Document Review');
         if (msgLower.includes('language prep')) trackMenuInteraction('ACTION', 'Language Preparation');
         
         if (triggers.some(trigger => msgLower.includes(trigger)) || userMessages.length >= 5 || isMenuOption) {
           captureLead(currentInput);
         }

        try {
          const response = getCustomResponse(currentInput, userName);
          
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { 
              text: response, 
              sender: "bot",
              timestamp: new Date()
            }]);
            setIsTyping(false);
          }, 1000 + Math.random() * 1000);
        } catch (error) {
          console.error('Error getting response:', error);
          setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { 
              text: "I apologize, but I'm having trouble processing that at the moment. Please try again.", 
              sender: "bot",
              timestamp: new Date()
            }]);
            setIsTyping(false);
          }, 1000);
        }
      }
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Capture lead when chat is closed (if not already captured)
  const handleCloseChat = () => {
    if (userMessages.length >= 3 && !leadCaptured) {
      captureLead();
    }
    closeChat();
  };

  // Get placeholder text based on current phase
  const getPlaceholderText = () => {
    switch (chatPhase) {
      case 'name':
        return "Enter your good name...";
      case 'phone':
        return "Enter your 10-digit phone number...";
      case 'chat':
        return "Ask me anything about studying abroad...";
      default:
        return "Type your message...";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center p-4 text-white" style={{ background: 'linear-gradient(135deg, #5ba79d 0%, #4a9287 100%)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 p-2 backdrop-blur-sm">
              <img src={SupportIcon} alt="Support Assistant" className="w-full h-full"/>
            </div>
            <div>
              <h2 className="text-lg font-semibold">YesGrant Assistant</h2>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                Online & Ready to Help
              </p>
            </div>
          </div>
          <button 
            onClick={handleCloseChat}
            className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full p-1 flex-shrink-0" style={{ backgroundColor: '#5ba79d20' }}>
                  <img src={SupportIcon} alt="Support" className="w-full h-full"/>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm ${
                  msg.sender === 'user' 
                    ? 'text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
                style={msg.sender === 'user' ? { backgroundColor: '#5ba79d' } : { border: '1px solid #5ba79d20' }}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/80' : ''}`} style={msg.sender === 'bot' ? { color: '#5ba79d' } : {}}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-6 h-6 rounded-full p-1" style={{ backgroundColor: '#5ba79d20' }}>
                <img src={SupportIcon} alt="Support" className="w-full h-full"/>
              </div>
              <div className="bg-white rounded-2xl shadow-sm rounded-bl-none" style={{ border: '1px solid #5ba79d20' }}>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={getPlaceholderText()}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 disabled:bg-gray-100 transition-all"
              style={{
                '--tw-ring-color': '#5ba79d20',
                '--tw-ring-offset-shadow': '0 0 0 0px transparent',
                '--tw-ring-shadow': '0 0 0 2px var(--tw-ring-color)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#5ba79d'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="px-4 py-2.5 text-white rounded-xl transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0 min-w-[80px]"
              style={{ backgroundColor: '#5ba79d' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4a9287'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#5ba79d'}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot; 