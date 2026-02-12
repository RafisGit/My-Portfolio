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
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{reply_to}}` - Visitor's email for easy replies
   - `{{time}}` - Timestamp of message

Example template body (HTML format):
```html
<div style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <div style="background-color: #f4f4f4; padding: 20px; border-bottom: 1px solid #ddd;">
    <h2 style="margin: 0; color: #000;">New Contact Message</h2>
  </div>
  
  <div style="padding: 20px;">
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
    
    <p><strong>Message:</strong></p>
    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
      {{message}}
    </div>
    
    <p style="font-size: 0.8em; color: #888; margin-top: 30px;">
      Sent at: {{time}}
    </p>
  </div>
  
  <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-top: 1px solid #ddd;">
    <p style="margin: 0; font-size: 0.9em;">Sent from Portfolio Website</p>
  </div>
</div>
```

3. Note your **TEMPLATE_ID** (looks like: `template_xxxxxxxxx`)

### Step 3: Update ContactPanel.js
In `src/components/ContactPanel.js`, your setup is already configured to map these variables correctly.

## 📋 Template Variable Names (MUST MATCH)
Make sure your EmailJS template uses these exact variable names:
- `{{name}}`
- `{{email}}`
- `{{message}}`
- `{{reply_to}}`
- `{{time}}`

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
