npm install express twilio dotenv
require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const twilio = require('twilio');
const app = express();
const port = process.env.PORT || 3000;  // Set the port, default to 3000

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Endpoint to trigger the Twilio call
app.get('/make-call', (req, res) => {
  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",  // Twilio XML URL for demo
    to: "+18086420066",  // Destination phone number
    from: "+18885471318",  // Your Twilio phone number
  })
  .then(call => {
    res.send(`Call initiated with SID: ${call.sid}`);
  })
  .catch(error => {
    res.status(500).send(`Error: ${error.message}`);
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
