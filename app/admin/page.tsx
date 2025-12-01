'use client';

import { useState } from 'react';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor your portfolio's performance and user engagement
          </p>
        </div>
        
        <AnalyticsDashboard />
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
