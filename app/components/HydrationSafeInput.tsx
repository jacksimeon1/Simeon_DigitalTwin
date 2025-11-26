'use client';

import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';

interface HydrationSafeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const HydrationSafeInput = forwardRef<HTMLInputElement, HydrationSafeInputProps>(
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
            height: props.style?.height || '48px',
            width: props.style?.width || '100%',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem'
          }}
        />
      );
    }

    return (
      <input ref={ref} {...props}>
        {children}
      </input>
    );
  }
);

HydrationSafeInput.displayName = 'HydrationSafeInput';

export default HydrationSafeInput;
