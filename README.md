# EduMeUp Frontend

## 🎓 Modern E-Learning Platform with Moodle Integration

EduMeUp is an open-source e-commerce frontend for Moodle that saves organizations $1000+ annually compared to proprietary solutions like Edwiser Bridge. Built with React, TypeScript, and modern web technologies, it provides dynamic multi-country pricing, bulk licensing, and seamless payment integration.

---

## 📊 Why EduMeUp Beats Edwiser Bridge

| Feature | EduMeUp | Edwiser Bridge | Cost Impact |
|---------|---------|---|---|
| **License Cost** | **FREE** (Open Source) | **$1,000+/year** | **💰 Save $1,000+** |
| **Moodle Integration** | ✅ Full Sync | ✅ Full Sync | Equal |
| **Multi-Country Pricing** | ✅ Dynamic % Markup | ⚠️ Limited | **Advantage: EduMeUp** |
| **Bulk Organization Licensing** | ✅ Schools/Orgs | ⚠️ Basic | **Advantage: EduMeUp** |
| **Currency Conversion** | ✅ 100+ Currencies | ⚠️ Limited | **Advantage: EduMeUp** |
| **Seat Management** | ✅ Auto-Assignment | ⚠️ Manual | **Advantage: EduMeUp** |
| **Payment Gateways** | ✅ Stripe, PayPal, Razorpay | ✅ Stripe, PayPal | Comparable |
| **Custom Pricing Rules** | ✅ Admin-Configurable | ❌ Custom Dev | **Advantage: EduMeUp** |
| **Source Code Access** | ✅ Full Open Source | ❌ Proprietary | **Advantage: EduMeUp** |

### 💰 5-Year Cost Comparison
```
EduMeUp:   $1,200-6,000 (hosting only)
Edwiser:   $12,500-17,500+ (licenses + support + customization)

SAVINGS:   $6,500-11,500+ over 5 years
```

---

## 🚀 Key Features

### 1. **Dynamic Multi-Country Pricing** 🌍
Automatically converts course prices to user's local currency with configurable per-country markups.

**Example:**
```
Base Price: 5,000 PKR

🇺🇸 USA User: $26.82 USD (converted + 20% markup)
🇵🇰 Pakistan User: ₨5,000 PKR (base price)
🇬🇧 UK User: £21.46 GBP (converted + 15% markup)
```

**How it works:**
```javascript
// Backend API automatically calculates based on user's country
GET /api/v1/courses/2
Headers: { 'X-Country-Code': 'PK' }

Response:
{
  "id": 2,
  "title": "Advanced JavaScript",
  "price": "5000.00",  // Base in PKR
  "display_price": 5000.0,  // Auto-calculated
  "display_currency": "PKR",  // Based on country
  "pricing_country": "PK"
}
```

### 2. **IPInfo Country Detection**
Uses IPInfo API to automatically detect user's country for accurate pricing.

```javascript
// Configured in .env
VITE_IPINFO_TOKEN=7d863e1849ce97
VITE_ENABLE_COUNTRY_HEADER=true

// Automatically sends X-Country-Code header with every API request
headers: {
  'X-Country-Code': detectedCountry  // PK, US, GB, etc.
}
```

### 3. **Bulk Organization Licensing** 🏫
Schools and organizations can purchase seats in bulk and distribute unique access codes.

**Use Cases:**
- 🎓 University: 500 seats for online program
- 🏢 Company: 100 team training licenses
- 📚 School Network: 1000 seats across multiple branches

**Workflow:**
1. Admin creates organization in backend
2. Admin creates bulk order (e.g., 100 seats × 3 courses = 300 codes)
3. System generates unique seat codes
4. Students redeem codes → auto-enrolled in course + Moodle sync

### 4. **Multiple Payment Gateways** 💳
- **Stripe** - Credit cards, Apple Pay, Google Pay
- **PayPal** - Global payment processor
- **Razorpay** - Preferred for Pakistan/India

All payment gateway fees are pass-through with no platform markup.

### 5. **Moodle Bridge Integration**
Bidirectional sync between EduMeUp and Moodle:
- ✅ User registration → Auto-create in Moodle
- ✅ Course enrollment → Auto-enroll in Moodle
- ✅ Grades → Sync back from Moodle
- ✅ Course updates → Sync from Moodle

### 6. **Shopping Cart & Wishlist** 🛒
- Add multiple courses before checkout
- Save courses to wishlist for later
- Cart persists across sessions
- Guest cart support

---

## 🛠️ Technologies

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TanStack Router** - Type-safe routing
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API calls

---

## 📦 Installation

### Prerequisites
- Node.js 18+ & npm
- Backend API running at `http://127.0.0.1:8000`
- IPInfo API token (free tier: 50k requests/month)

### Quick Start

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd edumeup-frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your settings

# 4. Start development server
npm run dev
```

### Environment Configuration

Create `.env` file in project root:

```env
# Backend API
VITE_API_BASE_URL=http://127.0.0.1:8000

# Country Detection (get free token at ipinfo.io)
VITE_IPINFO_TOKEN=your_token_here
VITE_DEFAULT_COUNTRY=US
VITE_DEFAULT_CURRENCY=USD

# Enable/Disable Country-Based Pricing
VITE_ENABLE_COUNTRY_HEADER=true
```

---

## 🔌 Backend API Integration

### Authentication
All protected endpoints require JWT token in Authorization header:

```javascript
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
  'X-Country-Code': userCountry  // For dynamic pricing
}
```

### Key Endpoints

**Courses:**
```javascript
// Get all courses (auto-calculated prices for user's country)
GET /api/v1/courses/
Response: [{
  id: 1,
  title: "Course Name",
  price: "5000.00",  // Base PKR
  display_price: 26.82,  // Converted
  display_currency: "USD",
  pricing_country: "US"
}]

// Get single course
GET /api/v1/courses/{id}/
```

**Enrollments:**
```javascript
// Enroll user in course
POST /api/v1/enrollments/
Body: { user_id: 123, course_id: 456 }

// Get user's enrollments
GET /api/v1/enrollments/?user_id=123
```

**Payments:**
```javascript
// Process payment
POST /api/v1/payments/process/
Body: {
  user_id: 123,
  course_id: 456,
  gateway: "stripe",
  amount: 26.82,
  currency: "USD",
  stripe_token: "tok_..."
}
```

**Bulk Licensing:**
```javascript
// Assign seat to user
POST /api/v1/commerce/bulk-seats/assign/
Body: { seat_code: "a7f4-8d9c-...", user_id: 123 }

// Revoke seat access
POST /api/v1/commerce/bulk-seats/revoke/
Body: { seat_id: 456 }
```

---

## 🎨 Component Architecture

```
src/
├── components/
│   ├── CourseCard.tsx           # Course listing card with dynamic pricing
│   ├── CountrySelector.tsx      # Manual country override dropdown
│   ├── Header.tsx               # Navigation with cart/auth
│   ├── Footer.tsx               # Site footer
│   └── ui/                      # shadcn components
├── pages/
│   ├── Index.tsx                # Landing page
│   ├── Courses.tsx              # Course catalog
│   ├── CourseDetail.tsx         # Single course view
│   ├── Cart.tsx                 # Shopping cart
│   ├── Checkout.tsx             # Payment processing
│   ├── Dashboard.tsx            # User dashboard
│   ├── Profile.tsx              # User profile
│   └── TestCurrency.tsx         # Currency testing tool
├── lib/
│   ├── api/
│   │   ├── client.ts            # API client with country detection
│   │   └── normalize.ts         # API response transformers
│   ├── utils.ts                 # Currency formatting utilities
│   ├── types.ts                 # TypeScript interfaces
│   └── cart-store.ts            # Cart state management
└── hooks/
    └── use-enrollment.ts        # Course enrollment logic
```

---

## 💻 Example: Display Course with Dynamic Pricing

```tsx
import { formatPrice, getCurrencySymbol } from '@/lib/utils';

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      
      {/* Dynamic pricing based on user's country */}
      <div className="price">
        {formatPrice(
          course.displayPrice ?? course.price,
          course.displayCurrency
        )}
      </div>
      
      <button onClick={() => enrollInCourse(course.id)}>
        Enroll Now
      </button>
    </div>
  );
};
```

### Currency Formatting Utility

```typescript
// lib/utils.ts
export const getCurrencySymbol = (currencyCode?: string): string => {
  const symbols: Record<string, string> = {
    PKR: '₨',
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    // ... 10+ more currencies
  };
  return symbols[currencyCode || 'USD'] || currencyCode || '$';
};

export const formatPrice = (price: number, currency?: string): string => {
  const symbol = getCurrencySymbol(currency);
  const formatted = price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
};
```

---

## 🧪 Testing & Debugging

### Currency Test Page
Visit `/test-currency` to debug country detection and pricing:

```
✅ Detected Country: PK
✅ IP Info: { country: "PK", country_name: "Pakistan" }
✅ Sample Course: display_price: 5000, currency: PKR
```

### API Connection Test
Visit `/api-test` to verify backend connectivity:

```
✅ Backend Reachable
✅ Courses API Endpoint
✅ CORS Headers
```

### Country Selector
Use the dropdown in header to manually test different countries:
- 🇵🇰 PK - PKR
- 🇺🇸 US - USD
- 🇬🇧 GB - GBP
- 🇦🇪 AE - AED
- 🇮🇳 IN - INR

---

## 📈 Production Deployment

### Build for Production
```bash
npm run build
```

Outputs optimized static files to `dist/` directory.

### Environment Variables (Production)
```env
VITE_API_BASE_URL=https://api.edumeup.com
VITE_IPINFO_TOKEN=your_production_token
VITE_ENABLE_COUNTRY_HEADER=true
```

### Deployment Platforms
- **Vercel** - Recommended (zero config)
- **Netlify** - Easy setup
- **AWS S3 + CloudFront** - Full control
- **GitHub Pages** - Free hosting

### CORS Configuration
Ensure Django backend allows your frontend domain:

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "https://edumeup.com",
    "https://www.edumeup.com",
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    'x-country-code',  # Required for dynamic pricing
]
```

---

## 🎯 Roadmap

- [ ] **Gift Cards** - Purchasable course vouchers
- [ ] **Subscription Plans** - Monthly access to course bundles
- [ ] **Affiliate System** - Partner referral tracking
- [ ] **Certificate Generation** - Auto-generate completion certificates
- [ ] **Mobile App** - React Native version
- [ ] **Multi-Language Support** - i18n localization
- [ ] **Advanced Analytics** - Student engagement dashboards
- [ ] **AI Course Recommendations** - Personalized suggestions

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Support

- **Documentation:** See [CORS_FIX_GUIDE.md](CORS_FIX_GUIDE.md) for backend setup
- **Issues:** [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-repo/discussions)

---

## 🏆 Why EduMeUp Matters

**Save $1,000+ annually** compared to proprietary solutions while gaining:
- ✅ Complete customization freedom
- ✅ No vendor lock-in
- ✅ Enterprise features (bulk licensing, dynamic pricing)
- ✅ Active community support
- ✅ Modern tech stack

**Built for educators, by educators. Open source forever.**

---

*Last Updated: February 2026*  
*Frontend: React 18 + TypeScript + Vite*  
*Backend: Django REST Framework*
