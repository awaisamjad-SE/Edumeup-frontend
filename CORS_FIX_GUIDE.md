# CORS Configuration Fix

## 🔴 Error Detected:
```
Access to fetch at 'http://127.0.0.1:8000/api/v1/courses' from origin 'http://localhost:8080' 
has been blocked by CORS policy: Request header field x-country-code is not allowed by 
Access-Control-Allow-Headers in preflight response.
```

## ✅ Solution: Configure Django Backend CORS

### **Step 1: Install django-cors-headers (if not already installed)**
```bash
pip install django-cors-headers
```

### **Step 2: Add to Django settings.py**

Add to `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
    # ... other apps
]
```

Add to `MIDDLEWARE` (near the top, before CommonMiddleware):
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]
```

### **Step 3: Configure CORS Settings**

Add these settings to your Django `settings.py`:

```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:8080",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
]

# Allow credentials (for cookies/auth)
CORS_ALLOW_CREDENTIALS = True

# IMPORTANT: Allow the custom X-Country-Code header
from corsheaders.defaults import default_headers

CORS_ALLOW_HEADERS = list(default_headers) + [
    'x-country-code',
]
```

### **Alternative (More Permissive for Development Only)**

If you want to allow all origins during development:

```python
# ⚠️ FOR DEVELOPMENT ONLY - DO NOT USE IN PRODUCTION
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_HEADERS = list(default_headers) + [
    'x-country-code',
]
```

### **Step 4: Restart Django Server**

```bash
python manage.py runserver
```

## 📋 Verify the Fix

1. After restarting Django, refresh your frontend
2. Check browser console - CORS error should be gone
3. Visit: http://localhost:8080/api-test (or your frontend URL)
4. All tests should pass ✅

## 🎯 What This Does

- Allows requests from your frontend (localhost:8080)
- Permits the `X-Country-Code` header we're sending for country-specific pricing
- Enables credentials for authentication

## ❓ Still Having Issues?

Check that:
1. Django server is running on port 8000
2. You saved settings.py and restarted the server
3. Your frontend URL matches what's in CORS_ALLOWED_ORIGINS
4. Browser cache is cleared (Ctrl+Shift+Delete)

## 📚 More Info

See: https://pypi.org/project/django-cors-headers/
