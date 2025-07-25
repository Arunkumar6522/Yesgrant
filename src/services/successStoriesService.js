class SuccessStoriesService {
  constructor() {
    this.GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJSa2PBat-jGRQbm_Exoqex4aT_SB44P9DzRhpmhWLgPZUgjB8ZMJNgCUk2kJGLe3y/exec';
  }

  async getSuccessStories() {
    try {
      console.log('Fetching success stories from:', this.GOOGLE_SCRIPT_URL);
      
      // Try the simple GET request first
      const response = await fetch(`${this.GOOGLE_SCRIPT_URL}?action=get_success_stories`, {
        method: 'GET'
        // Removed headers to avoid CORS preflight
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success stories API response:', result);
      
      if (result.status === 'success') {
        // Process and validate the data
        const validStories = result.data
          .filter(story => this.isValidStory(story))
          .map(story => this.processStory(story));
        
        console.log('Valid stories after processing:', validStories);
        
        return {
          status: 'success',
          data: validStories
        };
      } else {
        console.error('Error fetching success stories:', result.message);
        return {
          status: 'error',
          data: []
        };
      }
    } catch (error) {
      console.error('Error fetching success stories:', error);
      
      // If CORS error, try alternative approach
      if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
        console.log('Trying alternative approach due to CORS...');
        return this.getSuccessStoriesWithJSONP();
      }
      
      return {
        status: 'error',
        data: []
      };
    }
  }

  // Alternative method using JSONP-style approach
  async getSuccessStoriesWithJSONP() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      const callbackName = 'successStoriesCallback_' + Date.now();
      
      // Create callback function
      window[callbackName] = (data) => {
        document.body.removeChild(script);
        delete window[callbackName];
        resolve({
          status: 'success',
          data: data || []
        });
      };
      
      script.src = `${this.GOOGLE_SCRIPT_URL}?action=get_success_stories&callback=${callbackName}`;
      script.onerror = () => {
        document.body.removeChild(script);
        delete window[callbackName];
        resolve({
          status: 'error',
          data: []
        });
      };
      
      document.body.appendChild(script);
    });
  }

  // Validate that a story has the required minimum data
  isValidStory(story) {
    console.log('Validating story:', story);
    
    // Use correct field names from Google Sheets
    const name = story['Name'] || story.name || '';
    const country = story['Country'] || story.country || '';
    const youtubeUrl = story['YouTube Link'] || story.youtubeLink || '';
    const testimonialText = story['Testimonial Text'] || story.testimonial || '';
    const status = story['Status'] || story.status || 'Active';
    
    // Must have name, country, and either a YouTube link or testimonial
    const hasName = name && name.trim().length > 0;
    const hasCountry = country && country.trim().length > 0;
    const hasYouTubeLink = youtubeUrl && youtubeUrl.trim().length > 0;
    const hasTestimonial = testimonialText && testimonialText.trim().length > 0;
    const isActive = status === 'Active';
    
    console.log('Validation checks:', {
      hasName,
      hasCountry,
      hasYouTubeLink,
      hasTestimonial,
      isActive,
      status: status
    });
    
    const isValid = hasName && hasCountry && (hasYouTubeLink || hasTestimonial) && isActive;
    
    console.log('Story validation result:', isValid);
    return isValid;
  }

  // Process and clean story data
  processStory(story) {
    // Map Google Sheets column names to our expected field names
    const youtubeUrl = story['YouTube Link'] || story.youtubeLink || '';
    const fieldOfStudy = story['Field of Study'] || story.fieldOfStudy || 'International Studies';
    const testimonialText = story['Testimonial Text'] || story.testimonial || '';
    const universityName = story['University'] || story.university || '';
    const storyName = story['Name'] || story.name || '';
    const storyCountry = story['Country'] || story.country || '';
    
    const processedStory = {
      id: this.generateId(storyName, storyCountry),
      name: storyName.trim(),
      country: storyCountry.trim(),
      fieldOfStudy: fieldOfStudy.trim(),
      university: universityName.trim(),
      youtubeLink: youtubeUrl.trim(),
      youtubeId: youtubeUrl ? this.extractYouTubeId(youtubeUrl) : '',
      testimonial: testimonialText.trim(),
      timestamp: story.timestamp || story.Timestamp || new Date().toISOString(),
      hasVideo: !!(youtubeUrl && this.extractYouTubeId(youtubeUrl)),
      hasText: !!(testimonialText && testimonialText.trim().length > 0)
    };
    
    console.log('Processed story:', processedStory);
    return processedStory;
  }

  // Generate a unique ID for each story
  generateId(name, country) {
    return btoa(`${name}-${country}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
  }

  // Extract YouTube video ID from various URL formats
  extractYouTubeId(url) {
    if (!url) return '';
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/user\/[^\/]+#p\/[^\/]+\/[^\/]+\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return '';
  }

  // Submit a new success story
  async submitSuccessStory(storyData) {
    try {
      const formData = new FormData();
      formData.append('type', 'success_story');
      formData.append('name', storyData.name || '');
      formData.append('country', storyData.country || '');
      formData.append('fieldOfStudy', storyData.fieldOfStudy || '');
      formData.append('youtubeLink', storyData.youtubeLink || '');
      formData.append('testimonial', storyData.testimonial || '');
      formData.append('university', storyData.university || '');
      formData.append('currentStatus', 'Active');

      const response = await fetch(this.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting success story:', error);
      return { status: 'error', message: error.toString() };
    }
  }

  // Get stories for display with fallback handling
  async getStoriesForDisplay() {
    const result = await this.getSuccessStories();
    
    if (result.status === 'success' && result.data.length > 0) {
      return result.data;
    }
    
    // Return empty array if no real data available
    // This ensures no dummy content is ever shown
    return [];
  }

  // Get video testimonials only
  async getVideoTestimonials() {
    const stories = await this.getStoriesForDisplay();
    return stories.filter(story => story.hasVideo && story.youtubeId);
  }

  // Get text testimonials only
  async getTextTestimonials() {
    const stories = await this.getStoriesForDisplay();
    return stories.filter(story => story.hasText);
  }

  // Get stories by country
  async getStoriesByCountry(country) {
    const stories = await this.getStoriesForDisplay();
    return stories.filter(story => 
      story.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  // Get stories by field of study
  async getStoriesByField(field) {
    const stories = await this.getStoriesForDisplay();
    return stories.filter(story => 
      story.fieldOfStudy.toLowerCase().includes(field.toLowerCase())
    );
  }

  // Utility method to check if the service is properly configured
  isConfigured() {
    return this.GOOGLE_SCRIPT_URL && !this.GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE');
  }
}

export default new SuccessStoriesService(); 