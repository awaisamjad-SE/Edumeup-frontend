import { useEffect } from 'react';
import { countryStore } from '@/lib/api/client';

/**
 * Debug component to check country detection and API responses
 */
const CountryDebug = () => {
  useEffect(() => {
    const detectCountry = async () => {
      // Trigger country detection
      const country = await countryStore.getCountryAsync();
      
      console.log('🌍 Country Debug Info:');
      console.log('Detected Country (via IPInfo):', country);
      console.log('IPInfo Token configured:', import.meta.env.VITE_IPINFO_TOKEN ? 'Yes' : 'No');
      console.log('Default Country:', import.meta.env.VITE_DEFAULT_COUNTRY || 'US');
      console.log('Default Currency:', import.meta.env.VITE_DEFAULT_CURRENCY || 'USD');
    };
    
    void detectCountry();
  }, []);

  return null;
};

export default CountryDebug;
