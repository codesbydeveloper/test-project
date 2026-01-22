import { useEffect, useRef } from 'react';

/**
 * Google AdSense Ad Component
 * 
 * To use this component:
 * 1. Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your actual AdSense Publisher ID
 * 2. Replace '1234567890' with your actual ad slot ID
 * 3. Get your Publisher ID from: https://www.google.com/adsense/
 * 
 * Example usage:
 * <GoogleAd adSlot="1234567890" adFormat="auto" />
 */
export default function GoogleAd({ 
  adSlot = '1234567890',
  adFormat = 'auto',
  className = '',
  style = {}
}) {
  const adRef = useRef(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // Initialize ad after component mounts
    const initializeAd = () => {
      if (adRef.current && !adInitialized.current) {
        try {
          // Push ad configuration to Google AdSense
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adInitialized.current = true;
        } catch (e) {
          console.error('Error initializing ad:', e);
        }
      }
    };

    // Wait for AdSense script to load
    if (window.adsbygoogle) {
      initializeAd();
    } else {
      // If script not loaded yet, wait a bit
      const timer = setTimeout(() => {
        if (window.adsbygoogle) {
          initializeAd();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

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
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
