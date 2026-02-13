// Vercel Serverless Function for scheduling Twilio SMS messages
// This function will be called when the button is clicked

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;

  // Validate phone number
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Your Twilio credentials (we'll add these as environment variables)
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  // Check if credentials exist
  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return res.status(500).json({ error: 'Twilio credentials not configured' });
  }

  // Initialize Twilio client
  const twilio = require('twilio');
  const client = twilio(accountSid, authToken);

  // Your sweet messages (customize these!)
  const messages = [
    "Good morning cutie! ☀️ Hope you have an amazing day! 💕",
    "Just wanted to remind you how special you are to me 💖",
    "Thinking about you and smiling 😊 Have a great day!",
    "Can't wait to see you soon! Miss you tons 🥰",
    "You make every day brighter just by being you ✨",
    "Sending you all my love today and always 💕",
    "Hope your day is as wonderful as you are! 💖"
  ];

  try {
    // Send messages over the next 7 days
    const scheduledMessages = [];

    for (let i = 0; i < messages.length; i++) {
      // Calculate send time (one message per day at 9 AM)
      const sendAt = new Date();
      sendAt.setDate(sendAt.getDate() + i + 1); // Start tomorrow
      sendAt.setHours(9, 0, 0, 0); // 9 AM

      // Schedule message with Twilio
      const message = await client.messages.create({
        body: messages[i],
        from: twilioPhoneNumber,
        to: phoneNumber,
        sendAt: sendAt,
        scheduleType: 'fixed'
      });

      scheduledMessages.push({
        day: i + 1,
        sendAt: sendAt.toISOString(),
        sid: message.sid
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully scheduled ${messages.length} messages!`,
      scheduled: scheduledMessages
    });

  } catch (error) {
    console.error('Twilio error:', error);
    return res.status(500).json({
      error: 'Failed to schedule messages',
      details: error.message
    });
  }
}
