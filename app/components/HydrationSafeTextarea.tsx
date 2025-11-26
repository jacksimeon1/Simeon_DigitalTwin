'use client';

import { forwardRef, TextareaHTMLAttributes, useEffect, useState } from 'react';

interface HydrationSafeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
}

const HydrationSafeTextarea = forwardRef<HTMLTextAreaElement, HydrationSafeTextareaProps>(
  ({ children, ...props }, ref) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Render a div placeholder on server-side to prevent hydration mismatch
    if (!mounted) {
      return (
        <div 
          className={props.className}
          style={{ 
            height: props.style?.height || '120px',
            width: props.style?.width || '100%',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem'
          }}
        />
      );
    }

    return (
      <textarea ref={ref} {...props}>
        {children}
      </textarea>
    );
  }
);

HydrationSafeTextarea.displayName = 'HydrationSafeTextarea';

export default HydrationSafeTextarea;
