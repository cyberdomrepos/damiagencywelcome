# Backend Integration - Email Functionality

## Overview

This project now includes backend email functionality using the Resend API. Quote requests submitted through the website are sent directly to the specified email address without requiring the user's email client.

## Features

- ✅ Direct email sending via API (no mailto: links)
- ✅ Professional HTML email templates
- ✅ Form validation (client and server-side)
- ✅ Loading states and user feedback
- ✅ Error handling with user-friendly messages
- ✅ Automatic form reset on successful submission
- ✅ Reply-to field set to user's email for easy responses

## Setup Instructions

### 1. Get a Resend API Key

1. Sign up for a free account at [Resend](https://resend.com)
2. Verify your domain (or use their test domain for development)
3. Generate an API key from the [API Keys page](https://resend.com/api-keys)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (or use Vercel environment variables):

```env
RESEND_API_KEY=re_your_api_key_here
QUOTE_EMAIL=rhymedominic.costa@damiagency.com
RESEND_FROM_EMAIL=quotes@yourdomain.com
```

**Note:** For production on Vercel, add these variables in the Vercel dashboard under Settings → Environment Variables.

### 3. Verify Domain (Production Only)

For production use, you need to verify your domain in Resend:

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add the provided DNS records to your domain registrar
4. Wait for verification (usually a few minutes)
5. Use an email address from your verified domain as `RESEND_FROM_EMAIL`

For development, you can use `onboarding@resend.dev` as the from address.

## API Endpoint

### POST /api/send-quote

Handles quote form submissions and sends emails.

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "serviceType": "string (optional)",
  "phone": "string (optional)",
  "website": "string (optional)",
  "preferredContact": "string (optional)",
  "budget": "string (optional)",
  "timeline": "string (optional)",
  "engagementType": "string (optional)",
  "features": "array<string> (optional)",
  "platforms": "array<string> (optional)",
  "notes": "string (optional)",
  "nda": "boolean (optional)",
  "timezone": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Quote request sent successfully",
  "id": "email_id_from_resend"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Security Features

This implementation includes several security measures:

- **XSS Protection**: All user inputs are HTML-escaped before being included in emails
- **Email Validation**: Server-side email format validation using a safe regex pattern
- **ReDoS Prevention**: Email regex designed to avoid Regular Expression Denial of Service
- **Input Sanitization**: All form fields are validated and sanitized
- **Server-side Processing**: Email sending happens on the server, API key never exposed to client
- **Environment Variables**: Sensitive credentials stored securely in environment variables

## Form Component Updates

The `SimpleQuoteForm` component has been updated with:

- **Async submission**: Uses `fetch` API to POST form data
- **Loading states**: Button shows "Sending..." during submission
- **Status messages**: Success/error messages displayed to users
- **Form reset**: Automatically clears form on successful submission
- **Accessibility**: ARIA labels and live regions for status updates

## Testing

### Development Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the quote section
3. Fill out and submit the form
4. Check the console for any errors
5. Verify email delivery in your inbox

### Production Testing

Before deploying to production:

1. Verify all environment variables are set in Vercel
2. Ensure your domain is verified in Resend
3. Test with a real email submission
4. Monitor the Vercel logs for any issues

## Troubleshooting

### Common Issues

1. **"Failed to send quote request"**
   - Check that `RESEND_API_KEY` is set correctly
   - Verify the API key is active in Resend dashboard
   - Check Vercel logs for detailed error messages

2. **Emails not received**
   - Check spam folder
   - Verify `QUOTE_EMAIL` is correct
   - Ensure `RESEND_FROM_EMAIL` is from a verified domain (in production)
   - Check Resend dashboard for delivery status

3. **Domain verification issues**
   - Ensure all DNS records are added correctly
   - Wait up to 24-48 hours for DNS propagation
   - Use the Resend dashboard to check verification status

## Cost Considerations

Resend offers:
- **Free tier**: 3,000 emails/month (perfect for most business websites)
- **No credit card required** for the free tier
- See [Resend Pricing](https://resend.com/pricing) for details

## Security Notes

- Never commit `.env` or `.env.local` files to Git
- Use environment variables for all sensitive data
- API key is server-side only (not exposed to client)
- All user inputs are HTML-escaped to prevent XSS attacks
- Email validation uses a safe regex pattern to prevent ReDoS
- Form includes server-side validation to prevent spam/abuse
- Reply-to field uses user's email for safe responses

## Future Enhancements

Potential improvements:
- Rate limiting to prevent abuse
- Email template customization
- Auto-responder email to users
- Integration with CRM systems
- File upload support
- CAPTCHA for additional spam protection
