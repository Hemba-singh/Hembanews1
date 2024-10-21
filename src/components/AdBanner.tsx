import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="my-4">
      {/* AdSense ad unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4587023648010112" // Replace with your AdSense publisher ID
        data-ad-slot="4916045713" // Replace with your ad unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
};

export default AdBanner;