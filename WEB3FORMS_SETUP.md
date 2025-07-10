# Web3Forms Setup Guide

This portfolio is configured to use [Web3Forms](https://web3forms.com/) to handle form submissions directly to your email inbox without requiring server-side code.

## How It Works

1. When a visitor submits the contact form, the data is sent to the Web3Forms API
2. Web3Forms processes the submission and forwards it to your registered email address
3. You receive the contact form submission in your inbox
4. The visitor sees a success message

## Current Configuration

The contact form is already set up with Web3Forms. It's using the following access key:

```
access_key: "85420a0d-7ad8-47cc-80e1-6ab8d94af337"
```

## Customization

If you want to use your own Web3Forms account:

1. Sign up for a free account at [Web3Forms.com](https://web3forms.com/)
2. Verify your email address
3. Copy your API key from the dashboard
4. Replace the existing access key in `src/containers/contact/Contact.js`

```javascript
formDataObj.append("access_key", "YOUR_NEW_ACCESS_KEY");
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
