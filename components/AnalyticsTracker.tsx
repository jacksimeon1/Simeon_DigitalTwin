'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const { trackPageVisit } = useAnalytics();

  useEffect(() => {
    // Track page visits
    const timer = setTimeout(() => {
      trackPageVisit(pathname);
    }, 1000); // Delay to ensure page is fully loaded

    return () => clearTimeout(timer);
  }, [pathname, trackPageVisit]);

  return null; // This component doesn't render anything
}
