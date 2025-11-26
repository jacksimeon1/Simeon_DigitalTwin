'use client';

import { forwardRef, useEffect, useState } from 'react';

interface HydrationSafeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HydrationSafeButton = forwardRef<HTMLButtonElement, HydrationSafeButtonProps>(
  ({ children, ...props }, ref) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    // Render a div during SSR to prevent hydration mismatch
    if (!isClient) {
      return (
        <div 
          className={props.className}
          style={props.style}
          {...(props.disabled && { 'aria-disabled': true })}
        >
          {children}
        </div>
      );
    }

    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

HydrationSafeButton.displayName = 'HydrationSafeButton';

export default HydrationSafeButton;
