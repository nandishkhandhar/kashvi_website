# Twilio SMS Setup Guide

This guide will help you set up automated sweet text messages for your Valentine!

## Step 1: Sign Up for Twilio

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your email and phone number
4. You'll get **$15-20 in free credit** (enough for ~1500 texts!)

## Step 2: Get Your Twilio Credentials

After signing up:

1. Go to your Twilio Console: https://console.twilio.com/
2. Find these three pieces of information:
   - **Account SID** (looks like: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token** (click "Show" to reveal it)
   - **Phone Number** (click "Get a Trial Number" if you don't have one)

## Step 3: Update the Phone Number in Code

1. Open `src/App.jsx`
2. Find line 191: `const phoneNumber = "+1XXXXXXXXXX";`
3. Replace `+1XXXXXXXXXX` with her actual phone number in this format:
   - Format: `+1234567890` (country code + 10 digits, no spaces or dashes)
   - Example: `+14155551234`

## Step 4: Customize Your Messages

1. Open `api/schedule-messages.js`
2. Find the `messages` array (around line 29)
3. Customize the 7 messages however you want!
4. Add more messages if you want (they'll be sent one per day)

Example:
```javascript
const messages = [
  "Good morning beautiful! ☀️ Hope you have an amazing day! 💕",
  "Just thinking about you and smiling 😊",
  "Can't wait to see you! Miss you so much 🥰",
  // Add your own messages here!
];
```

## Step 5: Add Environment Variables to Vercel

Once you deploy to Vercel:

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

| Name | Value |
|------|-------|
| `TWILIO_ACCOUNT_SID` | Your Account SID from Twilio Console |
| `TWILIO_AUTH_TOKEN` | Your Auth Token from Twilio Console |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number (format: +1234567890) |

4. Click **Save**
5. **Redeploy** your project for the variables to take effect

## Step 6: Test It!

1. Deploy your site to Vercel
2. Complete the Valentine's quiz
3. Click the "Click for a surprise!" button
4. Check if messages are scheduled successfully!

## Important Notes

### Trial Account Limitations
- **Free trial accounts** can only send texts to verified phone numbers
- To verify her number:
  1. Go to https://console.twilio.com/us1/develop/phone-numbers/manage/verified
  2. Click "Add a new number"
  3. Enter her phone number
  4. She'll receive a verification code via text
  5. Enter the code to verify

### Upgrading to Paid Account
- If you want to send to any number without verification, upgrade your account
- Cost: ~$0.0079 per SMS in the US
- No monthly fees, pay-as-you-go

### Scheduling Limitations
- Twilio allows scheduling messages up to 7 days in advance
- Messages are sent at the exact time specified (9 AM by default)
- You can change the send time in `api/schedule-messages.js` line 45

## Troubleshooting

### "Twilio credentials not configured"
- Make sure you added the environment variables in Vercel
- Redeploy after adding variables

### "Failed to schedule messages"
- Check that the phone number is in the correct format (+1234567890)
- Verify the phone number if using a trial account
- Check your Twilio console for error messages

### Messages not sending
- Verify you have credit in your Twilio account
- Check the Twilio logs: https://console.twilio.com/us1/monitor/logs/sms
- Ensure the phone number is verified (for trial accounts)

## Cost Breakdown

- **Free Trial**: $15-20 credit (enough for ~1500 messages)
- **After Trial**: ~$0.0079 per SMS in the US
- **7 messages**: ~$0.06 total
- **No monthly fees** with Twilio

## Alternative: Manual Scheduling

If you don't want to use Twilio, you can manually schedule messages using:
- iPhone: Shortcuts app with automations
- Android: Apps like "Do It Later" or "Scheduled"
- WhatsApp: No native scheduling, but third-party apps exist

---

## Need Help?

- Twilio Docs: https://www.twilio.com/docs/sms
- Twilio Support: https://support.twilio.com/
