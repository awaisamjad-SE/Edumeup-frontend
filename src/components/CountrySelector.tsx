import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { countryStore } from '@/lib/api/client';

const countries = [
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD' },
];

const CountrySelector = () => {
  const [currentCountry, setCurrentCountry] = useState(countryStore.getCountry());

  useEffect(() => {
    // Async country detection
    const detectCountry = async () => {
      const detected = await countryStore.getCountryAsync();
      setCurrentCountry(detected);
    };
    void detectCountry();
  }, []);

  const handleCountryChange = (countryCode: string) => {
    countryStore.setCountry(countryCode);
    setCurrentCountry(countryCode);
    // Reload page to fetch prices in new currency
    window.location.reload();
  };

  const selectedCountry = countries.find(c => c.code === currentCountry) || countries[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{selectedCountry.flag} {selectedCountry.code}</span>
          <span className="sm:hidden">{selectedCountry.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => handleCountryChange(country.code)}
            className={currentCountry === country.code ? 'bg-secondary/10' : ''}
          >
            <span className="mr-2">{country.flag}</span>
            <span className="flex-1">{country.name}</span>
            <span className="text-xs text-muted-foreground">{country.currency}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountrySelector;
