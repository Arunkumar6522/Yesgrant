class ChatbotLeadsService {
  constructor() {
    this.GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJSa2PBat-jGRQbm_Exoqex4aT_SB44P9DzRhpmhWLgPZUgjB8ZMJNgCUk2kJGLe3y/exec';
  }

  async submitLead(leadData) {
    try {
      console.log('📞 Capturing chatbot lead:', leadData);
      
      const formData = new FormData();
      
      // Add action parameter for routing to chatbot lead function
      formData.append('action', 'chatbot_lead');
      
      // Core lead information
      formData.append('userName', leadData.userName || '');
      formData.append('phoneNumber', leadData.phoneNumber || '');
      
      // Additional context (optional)
      formData.append('countryOfInterest', leadData.countryOfInterest || '');
      formData.append('fieldOfStudy', leadData.fieldOfStudy || '');
      formData.append('questionsAsked', leadData.questionsAsked || '');
      formData.append('interestLevel', leadData.interestLevel || 'Medium');
      formData.append('sessionDuration', leadData.sessionDuration || '');

      const response = await fetch(this.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('📞 Chatbot lead capture result:', result);
      return result;
    } catch (error) {
      console.error('Error submitting chatbot lead:', error);
      return { 
        status: 'error', 
        message: 'Failed to capture lead. Please try again.' 
      };
    }
  }

  // Helper method to auto-detect country of interest from conversation
  detectCountryOfInterest(messages) {
    const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark'];
    const messageText = messages.join(' ').toLowerCase();
    
    for (const country of countries) {
      if (messageText.includes(country.toLowerCase())) {
        return country;
      }
    }
    return '';
  }

  // Helper method to auto-detect field of study from conversation
  detectFieldOfStudy(messages) {
    const fields = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Law', 'Psychology', 'Arts', 'Sciences'];
    const messageText = messages.join(' ').toLowerCase();
    
    for (const field of fields) {
      if (messageText.includes(field.toLowerCase())) {
        return field;
      }
    }
    return '';
  }

  // Helper method to calculate session duration
  calculateSessionDuration(startTime) {
    const now = new Date();
    const duration = Math.floor((now - startTime) / 1000 / 60); // in minutes
    return `${duration} minutes`;
  }

  // Helper method to determine interest level based on interaction
  determineInterestLevel(messageCount, hasContactInfo) {
    if (messageCount > 10 && hasContactInfo) return 'High';
    if (messageCount > 5 || hasContactInfo) return 'Medium';
    return 'Low';
  }

  // Main method to capture lead from chatbot interaction
  async captureFromChatbot(chatbotData) {
    const leadData = {
      userName: chatbotData.userName,
      phoneNumber: chatbotData.phoneNumber,
      countryOfInterest: this.detectCountryOfInterest(chatbotData.messages || []),
      fieldOfStudy: this.detectFieldOfStudy(chatbotData.messages || []),
      questionsAsked: (chatbotData.messages || []).join(' | '),
      interestLevel: this.determineInterestLevel(
        chatbotData.messageCount || 0,
        !!(chatbotData.userName && chatbotData.phoneNumber)
      ),
      sessionDuration: this.calculateSessionDuration(chatbotData.startTime || new Date())
    };

    return await this.submitLead(leadData);
  }
}

export default new ChatbotLeadsService(); 