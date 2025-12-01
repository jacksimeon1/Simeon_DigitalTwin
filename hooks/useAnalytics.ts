import { useEffect } from 'react';

export const useAnalytics = () => {
  const trackPageVisit = async (page: string) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'page_visit', 
          data: { page, url: window.location.pathname } 
        })
      });
    } catch (error) {
      console.error('Failed to track page visit:', error);
    }
  };

  const trackProjectView = async (projectId: string) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'project_view', 
          data: { projectId } 
        })
      });
    } catch (error) {
      console.error('Failed to track project view:', error);
    }
  };

  const trackContactSubmission = async () => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact_submission' })
      });
    } catch (error) {
      console.error('Failed to track contact submission:', error);
    }
  };

  return {
    trackPageVisit,
    trackProjectView,
    trackContactSubmission,
  };
};
