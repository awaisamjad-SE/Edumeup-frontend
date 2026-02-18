import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { countryStore } from '@/lib/api/client';
import { getCourseDetails } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Globe } from 'lucide-react';

const TestCurrency = () => {
  const [country, setCountry] = useState('');
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [sampleCourse, setSampleCourse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [detectingCountry, setDetectingCountry] = useState(false);

  useEffect(() => {
    loadCountryInfo();
  }, []);

  const loadCountryInfo = async () => {
    setDetectingCountry(true);
    try {
      const detected = await countryStore.getCountryAsync();
      setCountry(detected);
      
      // Try to fetch IPInfo data for display
      const token = import.meta.env.VITE_IPINFO_TOKEN || '7d863e1849ce97';
      const response = await fetch(`https://ipinfo.io/json?token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setIpInfo(data);
      }
    } catch (error) {
      console.error('Failed to load country info:', error);
    } finally {
      setDetectingCountry(false);
    }
  };

  const loadSampleCourse = async () => {
    setLoading(true);
    try {
      // Try to load course ID 2 (Testing course from your example)
      const course = await getCourseDetails('2');
      setSampleCourse(course);
    } catch (error) {
      console.error('Failed to load course:', error);
    } finally {
      setLoading(false);
    }
  };

  const forceCountry = (countryCode: string) => {
    countryStore.setCountry(countryCode);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Currency & Country Debug</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              IPInfo Detection
            </h2>
            {detectingCountry ? (
              <p className="text-muted-foreground">Detecting location...</p>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Detected Country:</span>
                  <span className="font-bold text-lg">{country}</span>
                </div>
                {ipInfo && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Country Name:</span>
                      <span className="font-mono text-sm">{ipInfo.country_name || ipInfo.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span className="font-mono text-sm">{ipInfo.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City:</span>
                      <span className="font-mono text-sm">{ipInfo.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span className="font-mono text-sm">{ipInfo.region}</span>
                    </div>
                  </>
                )}
              </div>
            )}
            <Button 
              onClick={loadCountryInfo} 
              variant="outline" 
              size="sm" 
              className="mt-4 w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Location
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Country Switch</h2>
            <div className="space-y-2">
              <Button onClick={() => forceCountry('PK')} variant="outline" className="w-full justify-start">
                🇵🇰 Force Pakistan (PKR)
              </Button>
              <Button onClick={() => forceCountry('US')} variant="outline" className="w-full justify-start">
                🇺🇸 Force USA (USD)
              </Button>
              <Button onClick={() => forceCountry('IN')} variant="outline" className="w-full justify-start">
                🇮🇳 Force India (INR)
              </Button>
              <Button onClick={() => forceCountry('GB')} variant="outline" className="w-full justify-start">
                🇬🇧 Force UK (GBP)
              </Button>
              <Button onClick={() => forceCountry('AE')} variant="outline" className="w-full justify-start">
                🇦🇪 Force UAE (AED)
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Test API Response</h2>
          <Button onClick={loadSampleCourse} disabled={loading} className="mb-4">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Load Sample Course
          </Button>

          {sampleCourse && (
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Course: {sampleCourse.title}</h3>
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Display Price:</span>
                  <span className="font-bold ml-2">{sampleCourse.displayPrice || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Currency:</span>
                  <span className="font-bold ml-2">{sampleCourse.displayCurrency || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Pricing Country:</span>
                  <span className="font-bold ml-2">{sampleCourse.pricingCountry || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Base Price:</span>
                  <span className="font-bold ml-2">{sampleCourse.price}</span>
                </div>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-muted-foreground">Show Full JSON</summary>
                <pre className="text-xs overflow-auto mt-2 bg-background p-2 rounded">
                  {JSON.stringify({
                    price: sampleCourse.price,
                    displayPrice: sampleCourse.displayPrice,
                    displayCurrency: sampleCourse.displayCurrency,
                    pricingCountry: sampleCourse.pricingCountry,
                  }, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </Card>

        <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-950">
          <h2 className="text-xl font-semibold mb-4">📋 How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>IPInfo API</strong> detects your location from your IP address</li>
            <li>Country code is sent to backend in <code className="bg-muted px-1 py-0.5">X-User-Country</code> header</li>
            <li>Backend should return <code className="bg-muted px-1 py-0.5">display_currency</code> based on your country</li>
            <li>Frontend displays prices with the correct currency symbol</li>
          </ol>
          
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded border border-yellow-300 dark:border-yellow-700">
            <p className="text-sm font-semibold mb-1">⚠️ Important:</p>
            <p className="text-sm">
              If <code className="bg-muted px-1 py-0.5">displayCurrency</code> is still showing "USD" or null,
              the <strong>backend API needs to be configured</strong> to read the <code className="bg-muted px-1 py-0.5">X-User-Country</code> header
              and return country-specific pricing data.
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TestCurrency;
