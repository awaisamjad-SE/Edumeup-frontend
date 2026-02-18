# 👤 Profile Page - Complete Guide

## 📍 **Where to Find Profile**

### **Desktop Navigation (Header)**
- **Profile Link**: Visible in the main navigation when logged in
- **Profile Button**: Next to the Logout button in the header
- **Direct URL**: `/profile`

### **Mobile Navigation**
- Open the hamburger menu (☰)
- "Profile" link appears when logged in
- Located above the Logout button

---

## ✨ **Profile Features**

### **1. View Profile Information**
Display your complete user profile including:
- ✅ **Avatar**: Profile picture with camera icon for upload
- ✅ **Full Name**: First name + Last name
- ✅ **Username**: Your unique identifier
- ✅ **Email**: Contact email address
- ✅ **Phone**: Phone number
- ✅ **Bio**: Personal description
- ✅ **Member Since**: Account creation date

### **2. Edit Profile (Two Tabs)**

#### **Tab 1: Profile Information**
Edit your personal details:
- **First Name** - Your first name
- **Last Name** - Your last name
- **Username** - Unique username
- **Email** - Contact email
- **Phone Number** - Phone for communication
- **Bio** - Tell others about yourself

**Buttons:**
- 🟢 **Save Changes** - Update your profile
- ⚪ **Cancel** - Discard changes

#### **Tab 2: Security**
Change your password securely:
- **Current Password** - Enter your old password
- **New Password** - Enter new password (min 8 chars)
- **Confirm Password** - Re-enter new password

**Button:**
- 🔒 **Change Password** - Update your password

---

## 🚀 **How to Access & Edit Profile**

### **Step 1: Access Profile**
1. **Login** to your account
2. Click **"Profile"** in the header navigation (or hamburger menu on mobile)
3. You'll see your profile information displayed

### **Step 2: Edit Profile Information**
1. Click the **"Edit Profile"** button (top right)
2. Modify any fields you want to update
3. Click **"Save Changes"** to save
4. Click **"Cancel"** to discard changes
5. You'll see a success toast notification

### **Step 3: Change Password**
1. Go to your profile page
2. Click the **"Security"** tab
3. Enter your **current password**
4. Enter your **new password** (minimum 8 characters)
5. **Confirm** the new password
6. Click **"Change Password"**
7. You'll see a success message when done

---

## 🔐 **Security Features**

- ✅ **Authentication Required**: Must be logged in to access
- ✅ **Auto-redirect**: Redirects to login if not authenticated
- ✅ **Password Validation**: Minimum 8 characters required
- ✅ **Confirmation**: Must confirm new password
- ✅ **Error Handling**: Shows error messages for failed operations
- ✅ **Success Notifications**: Toast messages for successful updates

---

## 📱 **Responsive Design**

- **Desktop**: Full layout with side-by-side inputs
- **Tablet**: Adaptive grid layout
- **Mobile**: Single column, touch-friendly inputs

---

## 🔄 **API Integration**

| Action | Endpoint | Method | Function |
|--------|----------|--------|----------|
| **Get Profile** | `/api/v1/users/me` | GET | `getMyProfile()` |
| **Update Profile** | `/api/v1/users/me` | PATCH | `updateMyProfile()` |
| **Change Password** | `/api/v1/auth/change-password` | POST | `changePassword()` |

---

## 📊 **Supported Profile Fields**

### **Editable Fields**
- ✅ First Name
- ✅ Last Name
- ✅ Username
- ✅ Email
- ✅ Phone Number
- ✅ Bio/Description

### **Display-Only Fields**
- 👁️ User ID
- 👁️ Role (Student/Parent/Teacher)
- 👁️ Member Since Date
- 👁️ Moodle User ID (if synced)

---

## 🎨 **UI Components Used**

- **Tabs**: Switch between Profile Info and Security
- **Cards**: Organized sections with headers
- **Input Fields**: Text, email, tel, password types
- **Buttons**: Primary, outline, and ghost variants
- **Avatar**: Profile picture display with upload option
- **Toast Notifications**: Success and error messages
- **Loading States**: Spinner during data fetch
- **Icons**: Lucide React icons throughout

---

## 🔔 **Notifications**

### **Success Messages**
- ✅ "Profile updated successfully!"
- ✅ "Password changed successfully!"

### **Error Messages**
- ❌ "Failed to load profile. Please try again."
- ❌ "Failed to update profile. Please try again."
- ❌ "New passwords do not match."
- ❌ "Password must be at least 8 characters long."
- ❌ "Failed to change password. Please check your current password."

---

## 🛠️ **File Structure**

```
src/pages/Profile.tsx         ← Main profile page component
src/lib/api/auth.ts           ← Profile API functions
src/lib/types.ts              ← User interface definition
src/lib/api/normalize.ts      ← Data normalization (snake_case → camelCase)
src/components/Header.tsx     ← Profile link in navigation
src/App.tsx                   ← Profile route definition
```

---

## 🎯 **Usage Example**

```typescript
// Navigate to profile
<Link to="/profile">View Profile</Link>

// Or programmatically
navigate('/profile');

// API usage
const profile = await getMyProfile();
await updateMyProfile({ firstName: 'John', lastName: 'Doe' });
await changePassword('oldPass123', 'newPass456');
```

---

## ✅ **Complete Feature Checklist**

- ✅ Profile page created at `/profile`
- ✅ Route added to App.tsx
- ✅ Navigation link in Header (desktop & mobile)
- ✅ View all profile information
- ✅ Edit profile information
- ✅ Change password securely
- ✅ Avatar display with upload button
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states
- ✅ Error handling
- ✅ Success notifications
- ✅ Input validation
- ✅ Authentication check
- ✅ Auto-redirect to login if not authenticated
- ✅ Tab navigation (Profile Info / Security)
- ✅ Cancel/Save functionality
- ✅ Member since date display
- ✅ API integration complete

---

## 🚀 **Ready to Use!**

Your profile page is now **fully functional**! Users can:

1. ✅ **View** their complete profile information
2. ✅ **Edit** their personal details
3. ✅ **Change** their password securely
4. ✅ **Upload** profile picture (UI ready, backend integration needed)
5. ✅ **Navigate** easily from the header

**Access it at**: `http://localhost:8080/profile` (when logged in)
