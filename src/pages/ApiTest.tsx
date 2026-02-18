import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ApiTest = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const testConnection = async () => {
    setTesting(true);
    const testResults: any = {
      baseUrl: apiBaseUrl,
      timestamp: new Date().toISOString(),
      tests: []
    };

    // Test 1: Basic connectivity
    try {
      const response = await fetch(apiBaseUrl);
      testResults.tests.push({
        name: 'Backend Reachable',
        status: response.ok ? 'success' : 'warning',
        message: `Status: ${response.status} ${response.statusText}`,
      });
    } catch (error) {
      testResults.tests.push({
        name: 'Backend Reachable',
        status: 'error',
        message: error instanceof Error ? error.message : 'Connection failed',
      });
    }

    // Test 2: API endpoint
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/courses`);
      const data = await response.json();
      testResults.tests.push({
        name: 'Courses API Endpoint',
        status: response.ok ? 'success' : 'error',
        message: response.ok 
          ? `Loaded ${Array.isArray(data) ? data.length : data.results?.length || 0} courses` 
          : `Error: ${response.status}`,
        data: response.ok ? data : null,
      });
    } catch (error) {
      testResults.tests.push({
        name: 'Courses API Endpoint',
        status: 'error',
        message: error instanceof Error ? error.message : 'Request failed',
      });
    }

    // Test 3: CORS
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/courses`, {
        headers: {
          'X-Country-Code': 'PK',
        }
      });
      testResults.tests.push({
        name: 'CORS Headers',
        status: response.ok ? 'success' : 'warning',
        message: 'Custom headers accepted',
      });
    } catch (error) {
      testResults.tests.push({
        name: 'CORS Headers',
        status: 'error',
        message: 'CORS might be blocking requests',
      });
    }

    setResults(testResults);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">API Connection Test</h1>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Backend URL</h2>
              <code className="text-sm bg-muted px-2 py-1 rounded">{apiBaseUrl}</code>
            </div>
            <Button onClick={testConnection} disabled={testing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
              {testing ? 'Testing...' : 'Run Tests'}
            </Button>
          </div>

          {results && (
            <div className="mt-6 space-y-3">
              {results.tests.map((test: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  {test.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                  {test.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />}
                  {test.status === 'error' && <XCircle className="h-5 w-5 text-red-500 mt-0.5" />}
                  <div className="flex-1">
                    <div className="font-semibold">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.message}</div>
                    {test.data && (
                      <details className="mt-2">
                        <summary className="text-xs cursor-pointer text-blue-500">Show response data</summary>
                        <pre className="text-xs mt-2 bg-background p-2 rounded overflow-auto max-h-40">
                          {JSON.stringify(test.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 bg-blue-50 dark:bg-blue-950">
          <h2 className="text-xl font-semibold mb-4">🔧 Troubleshooting Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              <strong>Is your backend server running?</strong>
              <div className="ml-6 text-muted-foreground">Check if Django/backend is running on port 8000</div>
            </li>
            <li>
              <strong>Check the backend URL in .env file</strong>
              <div className="ml-6 text-muted-foreground">
                Current: <code className="bg-muted px-1">{apiBaseUrl}</code>
              </div>
            </li>
            <li>
              <strong>CORS Configuration (Most Common Issue!)</strong>
              <div className="ml-6 text-muted-foreground mt-1">
                <p className="mb-2">Django needs to allow the <code className="bg-muted px-1">X-Country-Code</code> header.</p>
                <p className="mb-2">Add to your Django <code className="bg-muted px-1">settings.py</code>:</p>
                <pre className="bg-background p-2 rounded text-xs overflow-auto">
{`# Install: pip install django-cors-headers

INSTALLED_APPS = [
    'corsheaders',  # Add this
    # ... other apps
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add at top
    # ... other middleware
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:5173",
]

from corsheaders.defaults import default_headers
CORS_ALLOW_HEADERS = list(default_headers) + [
    'x-country-code',  # This is required!
]`}
                </pre>
                <p className="mt-2 text-yellow-600 dark:text-yellow-400 font-semibold">
                  ⚠️ Then restart your Django server!
                </p>
              </div>
            </li>
            <li>
              <strong>Check browser console (F12)</strong>
              <div className="ml-6 text-muted-foreground">Look for detailed error messages</div>
            </li>
          </ol>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ApiTest;
