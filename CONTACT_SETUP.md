# Contact Form Setup Guide

## Overview
Your contact form is configured to:
1. Send contact messages to: **muaiad@muaiadhadad.me**
2. Send auto-replies from: **re.replay@muaiadhadad.me**
3. Match your website's pixel-art dark theme

## Setup Steps

### 1. Install Resend Package
If not already installed, run:
```bash
pnpm install
```

### 2. Get Resend API Key
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

### 3. Verify Domain in Resend
**IMPORTANT**: You need to verify your domain `muaiadhadad.me` in Resend:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `muaiadhadad.me`
4. Add the DNS records they provide to your domain registrar:
   - **TXT record** for domain verification
   - **DKIM records** (2-3 TXT records)
   - **MX record** (optional, for receiving emails)
5. Wait for verification (usually 5-15 minutes)

### 4. Configure Environment Variable
Add to your `.env` file:
```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 5. Restart Development Server
```bash
pnpm dev
```

## How It Works

When someone submits the contact form:

1. **You receive an email** at `muaiad@muaiadhadad.me` with:
   - Sender's name
   - Sender's email
   - Subject
   - Message content
   - Timestamp

2. **Sender receives auto-reply** with:
   - Confirmation that you received their message
   - Copy of their message for reference
   - Your contact links
   - Professional message in English

## Email Templates

Both emails use your website's dark theme:
- Dark background (#0a0a0a)
- Emerald green accents (#6ee7b7)
- Neutral gray text
- Pixel-style borders and gradients

## Testing

To test the contact form:
1. Fill out the form on your website
2. Check if you receive the notification email
3. Check if the sender receives the auto-reply
4. Verify both emails display correctly

## Troubleshooting

### "Failed to send message" error
- Check if RESEND_API_KEY is set in `.env`
- Verify domain is verified in Resend dashboard
- Check console for detailed error messages

### Domain not verified
- Wait 15-30 minutes after adding DNS records
- Use `dig` or online DNS checker to verify records are propagated
- Contact Resend support if issues persist

### Rate limits
- Free tier: 100 emails/day
- Upgrade to paid plan if you need more

## Security Features

- Honeypot field to prevent spam bots
- Required field validation
- Safe HTML email templates
- Environment variable for API key (never committed to git)

## Contact Form Features

- Real-time validation
- Loading states
- Success/error messages
- Pixel-art icons matching your theme
- Responsive design
- Accessible markup

