'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  todayVisits: number;
  totalChats: number;
  totalContacts: number;
  projectViews: Array<{ projectId: string; views: number }>;
  weeklyData: Array<{ date: string; visits: number }>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard');
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <p className="text-slate-600 dark:text-slate-400">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Analytics Dashboard</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400">Today's Visits</h4>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{data.todayVisits}</p>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Total Chats</h4>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100">{data.totalChats}</p>
        </div>
        
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400">Contact Submissions</h4>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{data.totalContacts}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Weekly Visits</h4>
        <div className="space-y-2">
          {data.weeklyData.map((day) => (
            <div key={day.date} className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-white">{day.visits}</span>
            </div>
          ))}
        </div>
      </div>
      
      {data.projectViews.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Project Views</h4>
          <div className="space-y-2">
            {data.projectViews.map((project) => (
              <div key={project.projectId} className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">{project.projectId}</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{project.views}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
