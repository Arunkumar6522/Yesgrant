import React, { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const trackEvent = (eventName, eventData) => {
    const newEvent = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
    };
    setEvents(prev => [...prev, newEvent]);
    // Here you can add your actual analytics implementation
    console.log('Analytics Event:', newEvent);
  };

  const trackPageView = (pageName) => {
    trackEvent('page_view', { page: pageName });
  };

  const value = {
    events,
    trackEvent,
    trackPageView,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}; 