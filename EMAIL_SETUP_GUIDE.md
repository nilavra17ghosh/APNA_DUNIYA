# Setting Up Direct Email Functionality in Your Portfolio

This guide will help you set up a serverless email system using EmailJS to allow visitors to send messages directly to your inbox from your portfolio site.

## Benefits

✅ No backend server required  
✅ Emails sent directly from the browser to your inbox  
✅ Works even if visitors don't have an email client configured  
✅ Free for up to 200 emails/month (EmailJS free plan)  

## Step-by-Step Setup

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

### 2. Set Up an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Name your service (e.g., "portfolio_contact")
6. Note down the **Service ID**

### 3. Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{user_name}}` - The name of the person contacting you
   - `{{user_email}}` - Their email address
   - `{{user_phone}}` - Their phone number (optional)
   - `{{message}}` - The content of their message
4. Example template content:
```
You have received a new message from your portfolio site!

Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}

Message:
{{message}}
```
5. Name your template (e.g., "portfolio_contact_form")
6. Save your template and note down the **Template ID**

### 4. Get Your User ID

1. In your EmailJS dashboard, go to "Account"
2. Find your **User ID** (API key)

### 5. Configure Your Portfolio

1. Create a `.env` file in your project root by copying from `.env.example`
2. Add your EmailJS credentials:
```
REACT_APP_EMAILJS_SERVICE_ID = "your_service_id"
REACT_APP_EMAILJS_TEMPLATE_ID = "your_template_id"
REACT_APP_EMAILJS_USER_ID = "your_user_id"
```

### 6. Test Your Contact Form

1. Start your portfolio app with `npm run dev`
2. Fill out the contact form with test data
3. Submit the form
4. Check your email inbox for the test message

## Troubleshooting

- If emails aren't arriving, check your spam/junk folder
- Check browser console for any errors
- Verify that your template variables match the form field names
- Ensure your EmailJS account is active and properly configured

## Fallback Mechanism

If EmailJS configuration fails or there's an error sending the email, the contact form will automatically display a "Send Email Manually" button that will open the visitor's email client as a fallback.

## Need More Help?

For detailed documentation, visit [EmailJS Documentation](https://www.emailjs.com/docs/).
