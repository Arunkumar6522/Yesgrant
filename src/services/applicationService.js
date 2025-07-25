class ApplicationService {
  constructor() {
    this.GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJSa2PBat-jGRQbm_Exoqex4aT_SB44P9DzRhpmhWLgPZUgjB8ZMJNgCUk2kJGLe3y/exec';
  }

  async submitApplication(applicationData) {
    try {
      console.log('🚀 Starting application submission...');
      console.log('Application data:', applicationData);
      
      // Try FormData approach first (works with older Google Apps Script deployments)
      const formData = new FormData();
      
      // Add form fields matching your Google Sheet column names exactly
      formData.append('Name', applicationData.name || '');
      formData.append('Email', applicationData.email || '');
      formData.append('Number', applicationData.number || '');
      formData.append('year of study are you currently', applicationData.yearOfStudy || '');
      formData.append('GPA or percentage', applicationData.gpa || '');
      formData.append('Field of study', applicationData.fieldOfStudy || '');
      formData.append('standardized test scores', applicationData.testScores || '');
      formData.append('internship or practical training', applicationData.internshipExperience || '');
      formData.append('published research papers, reviews, or conference presentations', applicationData.researchPapers || '');
      formData.append('courses, certifications, or online programs', applicationData.coursesCompleted || '');
      formData.append('extracurricular activities', applicationData.extracurricular || '');
      formData.append('Do you have any work experience', applicationData.workExperience || '');
      formData.append('Applied for any scholarships or financial aid', applicationData.scholarshipApplications || '');
      formData.append('Do you hold any national or international awards, honors', applicationData.awards || '');

      console.log('📝 FormData prepared with exact field names');
      console.log('📡 Sending POST request to:', this.GOOGLE_SCRIPT_URL);

      const response = await fetch(this.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      console.log('📡 Response received');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        return { 
          status: 'error', 
          message: `HTTP Error: ${response.status} ${response.statusText}` 
        };
      }

      const result = await response.json();
      console.log('✅ Response parsed as JSON:', result);
      
      if (result.status === 'success') {
        console.log('🎉 Application submitted successfully!');
      } else {
        console.error('❌ Application submission failed:', result.message);
      }
      
      return result;
    } catch (error) {
      console.error('❌ Error submitting application:', error);
      return { 
        status: 'error', 
        message: `Failed to submit application: ${error.message}` 
      };
    }
  }

  // Validate application data before submission
  validateApplication(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.fullName || data.fullName.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters)');
    }
    
    if (!data.email || !this.isValidEmail(data.email)) {
      errors.push('Valid email address is required');
    }
    
    if (!data.phone || !this.isValidPhone(data.phone)) {
      errors.push('Valid phone number is required');
    }
    
    if (!data.countryOfResidence) {
      errors.push('Country of residence is required');
    }
    
    if (!data.highestEducation) {
      errors.push('Highest education level is required');
    }
    
    if (!data.fieldOfStudy) {
      errors.push('Field of study is required');
    }
    
    if (!data.preferredCountry) {
      errors.push('Preferred study country is required');
    }
    
    if (!data.preferredField) {
      errors.push('Preferred field of study is required');
    }
    
    if (!data.englishLevel) {
      errors.push('English proficiency level is required');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }

  // Get available countries for dropdown
  getAvailableCountries() {
    return [
      'Germany',
      'France', 
      'Netherlands',
      'Sweden',
      'Austria',
      'Italy',
      'Spain',
      'Belgium',
      'Switzerland',
      'Norway',
      'Denmark',
      'Finland'
    ];
  }

  // Get available fields of study
  getFieldsOfStudy() {
    return [
      'Computer Science & IT',
      'Engineering & Technology',
      'Business & Management',
      'Medicine & Healthcare',
      'Natural Sciences',
      'Social Sciences',
      'Arts & Humanities',
      'Economics & Finance',
      'Law & Legal Studies',
      'Education',
      'Environmental Science',
      'Psychology',
      'Mathematics & Statistics',
      'Physics',
      'Chemistry',
      'Biology & Life Sciences',
      'Architecture & Planning',
      'Design & Creative Arts',
      'Communication & Media',
      'International Relations'
    ];
  }

  // Get education levels
  getEducationLevels() {
    return [
      'Bachelor\'s Degree (Completed)',
      'Bachelor\'s Degree (Final Year)',
      'Master\'s Degree',
      'PhD/Doctorate',
      'Professional Degree',
      'Diploma/Certificate'
    ];
  }

  // Get English proficiency levels
  getEnglishLevels() {
    return [
      'Native Speaker',
      'Fluent (C2)',
      'Advanced (C1)',
      'Upper Intermediate (B2)',
      'Intermediate (B1)',
      'Pre-Intermediate (A2)',
      'Beginner (A1)',
      'No English Knowledge'
    ];
  }

  // Get intake preferences
  getIntakeOptions() {
    return [
      'Fall 2024 (September)',
      'Spring 2025 (February)',
      'Fall 2025 (September)',
      'Flexible/Any Available'
    ];
  }

  // Generate application reference number
  generateApplicationId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `YG${timestamp.slice(-6)}${random}`;
  }

  // Prepare application data with validation and formatting
  prepareApplicationData(rawData) {
    return {
      // Personal Information
      fullName: this.sanitizeString(rawData.fullName),
      email: this.sanitizeEmail(rawData.email),
      phone: this.sanitizePhone(rawData.phone),
      countryOfResidence: this.sanitizeString(rawData.countryOfResidence),
      
      // Academic Information
      highestEducation: this.sanitizeString(rawData.highestEducation),
      fieldOfStudy: this.sanitizeString(rawData.fieldOfStudy),
      gpa: this.sanitizeString(rawData.gpa),
      graduationYear: this.sanitizeString(rawData.graduationYear),
      university: this.sanitizeString(rawData.university),
      
      // Preferences
      preferredCountry: this.sanitizeString(rawData.preferredCountry),
      preferredField: this.sanitizeString(rawData.preferredField),
      intakePreference: this.sanitizeString(rawData.intakePreference),
      
      // Language & Skills
      englishLevel: this.sanitizeString(rawData.englishLevel),
      languageTestScore: this.sanitizeString(rawData.languageTestScore),
      otherLanguages: this.sanitizeString(rawData.otherLanguages),
      
      // Experience
      workExperience: this.sanitizeString(rawData.workExperience),
      researchExperience: this.sanitizeString(rawData.researchExperience),
      volunteerWork: this.sanitizeString(rawData.volunteerWork),
      
      // Additional Information
      motivation: this.sanitizeString(rawData.motivation),
      careerGoals: this.sanitizeString(rawData.careerGoals),
      additionalInfo: this.sanitizeString(rawData.additionalInfo),
      howDidYouHear: this.sanitizeString(rawData.howDidYouHear),
      
      // Financial Information
      financialSupport: this.sanitizeString(rawData.financialSupport),
      scholarshipNeed: this.sanitizeString(rawData.scholarshipNeed),
      
      // Metadata
      applicationId: this.generateApplicationId(),
      submissionDate: new Date().toISOString()
    };
  }

  // Sanitization helpers
  sanitizeString(str) {
    return str ? str.toString().trim() : '';
  }

  sanitizeEmail(email) {
    return email ? email.toString().trim().toLowerCase() : '';
  }

  sanitizePhone(phone) {
    return phone ? phone.toString().replace(/[^\d+\-\s()]/g, '').trim() : '';
  }

  // Check if service is configured
  isConfigured() {
    return this.GOOGLE_SCRIPT_URL && !this.GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE');
  }
}

export default new ApplicationService(); 