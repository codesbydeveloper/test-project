import { useEffect, useRef } from 'react';

/**
 * Google AdSense Ad Component
 * 
 * Using Google's Test Ad Client ID for testing: ca-pub-3940256099942544
 * Replace with your actual AdSense Publisher ID when ready for production
 * 
 * Example usage:
 * <GoogleAd adSlot="6300978111" adFormat="auto" />
 */
export default function GoogleAd({ 
  adSlot = '6300978111',
  adFormat = 'auto',
  adClient = 'ca-pub-3940256099942544', // Google Test Ad Client ID
  className = '',
  style = {}
}) {
  const adRef = useRef(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // Function to initialize the ad
    const initializeAd = () => {
      if (adRef.current && !adInitialized.current && window.adsbygoogle) {
        try {
          // Push ad configuration to Google AdSense
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adInitialized.current = true;
        } catch (e) {
          console.error('Error initializing ad:', e);
        }
      }
    };

    // Check if AdSense script is already loaded
    if (window.adsbygoogle) {
      // Script is loaded, initialize immediately
      const timer = setTimeout(() => {
        initializeAd();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Wait for script to load
      const checkAdSense = setInterval(() => {
        if (window.adsbygoogle) {
          clearInterval(checkAdSense);
          initializeAd();
        }
      }, 100);

      // Cleanup after 5 seconds if script doesn't load
      const timeout = setTimeout(() => {
        clearInterval(checkAdSense);
      }, 5000);

      return () => {
        clearInterval(checkAdSense);
        clearTimeout(timeout);
      };
    }
  }, [adSlot, adFormat]);

  return (
    <div className={`google-ad-wrapper ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '100px',
          width: '100%',
          ...style
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
