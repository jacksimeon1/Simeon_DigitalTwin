'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const initialTheme = saved || 'dark';
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    console.log('Applying theme:', newTheme);
    
    if (newTheme === 'light') {
      // Remove dark class for light mode
      root.classList.remove('dark');
      console.log('Removed dark class');
    } else {
      // Add dark class for dark mode
      root.classList.add('dark');
      console.log('Added dark class');
    }
    
    localStorage.setItem('theme', newTheme);
    console.log('Current classes:', root.className);
  };

  const toggleTheme = () => {
    console.log('Toggle theme clicked, current theme:', theme);
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      console.log('Switching from', prevTheme, 'to', newTheme);
      applyTheme(newTheme);
      return newTheme;
    });
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return { theme: 'dark' as const, toggleTheme: () => {} };
  }
  return context;
}
