# Web3Forms Setup Guide

This portfolio is configured to use [Web3Forms](https://web3forms.com/) to handle form submissions directly to your email inbox without requiring server-side code.

## How It Works

1. When a visitor submits the contact form, the data is sent to the Web3Forms API
2. Web3Forms processes the submission and forwards it to your registered email address
3. You receive the contact form submission in your inbox
4. The visitor sees a success message

## Current Configuration

The contact form is set up with Web3Forms using an environment variable for security. The access key is stored in the `.env` file:

```
REACT_APP_WEB3FORMS_ACCESS_KEY = "your-web3forms-access-key"
```

## Customization

To use your own Web3Forms account:

1. Sign up for a free account at [Web3Forms.com](https://web3forms.com/)
2. Verify your email address
3. Copy your API key from the dashboard
4. Update the access key in your `.env` file:

```
REACT_APP_WEB3FORMS_ACCESS_KEY = "your-new-access-key"
```

## Form Fields

The current form is set up with the following fields:

- `name` - The name of the person contacting you (required)
- `email` - Their email address
- `phone` - Their phone number (optional)
- `message` - The content of their message (required)

## Testing

After making any changes to the form or access key:

1. Test the contact form by filling it out and submitting
2. Check your email inbox to ensure you've received the submission
3. Verify that the success message is displayed to the user

## Troubleshooting

If you're experiencing issues with the contact form:

### Common Issues

1. **Emails Not Being Received**
   - Check your spam/junk folder
   - Verify that your access key is valid and active in your Web3Forms dashboard
   - Confirm that the email address associated with your Web3Forms account is correct

2. **Error Messages During Submission**
   - Check your browser console for detailed error messages
   - Verify your internet connection
   - Make sure your Web3Forms account is active and not exceeding free tier limits

3. **"An unexpected error occurred" Message**
   - This could indicate an issue with the Web3Forms API or your API key
   - Try regenerating your API key in the Web3Forms dashboard
   - Ensure your `.env` file contains the correct access key
   - Try submitting with minimal form data (just name and message) to isolate the issue

### Additional Debugging

You can add this code temporarily to your Contact.js file to help debug:

```javascript
// At the beginning of the handleFormSubmit function:
console.log("Environment variables:", {
  accessKey: process.env.REACT_APP_WEB3FORMS_ACCESS_KEY ? 
    "Exists (first 5 chars): " + process.env.REACT_APP_WEB3FORMS_ACCESS_KEY.substring(0, 5) : 
    "Missing"
});
```

If submissions aren't coming through:

1. Check your spam/junk folder
2. Verify that your access key is correct
3. Make sure all form fields have the correct `name` attributes
4. Check the browser console for any errors during submission

## Advantages of Web3Forms

- Free tier with 50 submissions per month
- No server-side code needed
- Spam protection
- File attachments (if needed)
- Custom redirects
- Webhook support

For more information, visit [Web3Forms Documentation](https://web3forms.com/docs).
