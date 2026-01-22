import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google AdSense Ad Component
 * 
 * Using Google's Test Ad Client ID for testing: ca-pub-3940256099942544
 * Replace with your actual AdSense Publisher ID when ready for production
 * 
 * Features:
 * - Development mode visual indicators (red border/background)
 * - Automatic re-initialization on route changes
 * - Improved error handling with interval checking
 * - Test mode enabled for local testing
 * 
 * Example usage:
 * <GoogleAd adSlot="6300978111" adFormat="auto" />
 */
export default function GoogleAd({ 
  adSlot = '6300978111',
  adFormat = 'auto',
  adClient = 'ca-pub-3940256099942544', // Google Test Ad Client ID
  'data-ad-layout': adLayout,
  className = '',
  style = {}
}) {
  const adRef = useRef(null);
  const intervalRef = useRef(null);
  const location = useLocation();
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';

  useEffect(() => {
    const initializeAd = () => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        try {
          // Check if the 'ins' element exists and adsbygoogle is available
          if (adRef.current && window.adsbygoogle) {
            // Check if the element already has an ad in it
            const hasAd = adRef.current.querySelector('.adsbygoogle') !== null;
            
            if (!hasAd) {
              window.adsbygoogle.push({});
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
            }
          }
        } catch (err) {
          console.error('Error pushing ads: ', err);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 100);

      // Cleanup interval after 10 seconds if ad doesn't load
      const timeout = setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
    };

    // Initialize ad when component mounts or route changes
    const cleanup = initializeAd();

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [location.pathname, adSlot, adFormat]); // Re-run when route changes or props change

  // Build props object for the ins element
  const adProps = {
    'data-ad-client': adClient,
    'data-ad-slot': adSlot,
    'data-ad-format': adFormat,
    'data-full-width-responsive': 'true',
    'data-adtest': 'on',
    ...(adLayout && { 'data-ad-layout': adLayout })
  };

  return (
    <div className={`google-ad-wrapper ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          overflow: 'hidden',
          textAlign: 'center',
          minHeight: '100px',
          width: '100%',
          // Development mode visual indicators
          border: isDevelopment ? '1px solid red' : 'none',
          background: isDevelopment ? 'rgba(255, 0, 0, 0.1)' : 'none',
          ...style
        }}
        {...adProps}
      />
    </div>
  );
}
