# EmailJS Setup Guide for Contact Form

## ✅ What's Been Done
- Installed `emailjs-com` package ✓
- Updated `ContactPanel.js` with EmailJS integration ✓
- Added form validation and error handling ✓
- Added loading state to submit button ✓
- Added success and error message displays ✓

## 🔧 Next Steps: Configure Your EmailJS Account

### Step 1: Get Your EmailJS Service ID
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/services)
2. Create a new service (e.g., "Gmail", "SendGrid", etc.)
3. Note your **SERVICE_ID** (looks like: `service_xxxxxxxxx`)

### Step 2: Create an Email Template
1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Create a new template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (where you receive messages)

Example template body:
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

3. Note your **TEMPLATE_ID** (looks like: `template_xxxxxxxxx`)

### Step 3: Update ContactPanel.js
In `src/components/ContactPanel.js`, find these lines (around line 9-10):

```javascript
emailjs.init('H0pwHSyJ7-mJ-PleR');
```

This is your public key (already set ✓).

Then find the `handleFormSubmit` function (around line 68-75) and replace:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',      // ⚠️ REPLACE HERE
  'YOUR_TEMPLATE_ID',     // ⚠️ REPLACE HERE
  templateParams
);
```

With your actual values:
```javascript
await emailjs.send(
  'service_abc123xyz',    // Your Service ID from Step 1
  'template_def456uvw',   // Your Template ID from Step 2
  templateParams
);
```

### Step 4: Test It Out
1. Run `npm start` in your terminal
2. Click the "Contact" button in navbar
3. Fill in the form and click "Send Message"
4. Check your email for the message!

## 📋 Template Variable Names (MUST MATCH)
Make sure your EmailJS template uses these exact variable names:
- `{{from_name}}` → matches `name` input field
- `{{from_email}}` → matches `email` input field
- `{{message}}` → matches `message` textarea
- `{{to_email}}` → your email address

## 🛠️ Features Included
✅ Form validation (all fields required)
✅ Loading state (button shows "Sending...")
✅ Success message (auto-dismisses after 3s)
✅ Error handling (shows error message for 5s)
✅ Button disabled while sending (prevents duplicate submissions)
✅ Prevents page reload
✅ Clears form after successful submission

## 🐛 Troubleshooting
- **"Failed to send message" error**: Check your SERVICE_ID and TEMPLATE_ID
- **Variables not appearing in email**: Make sure template variables match exactly
- **Email not received**: Check spam/promotions folder, verify email address in templateParams

## 📞 Support
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Dashboard: https://dashboard.emailjs.com/
