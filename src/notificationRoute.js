// notificationRoute.js
const express = require('express');
const router = express.Router();
const admin = require('./firebaseAdmin');

router.post('/sendNotification', async (req, res) => {
  const { title, message, token } = req.body;

  const payload = {
    notification: {
      title,
      body: message,
    },
  };

  try {
    await admin.messaging().sendToDevice(token, payload);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    res.status(500).send('Error sending notification: ' + error.message);
  }
});

module.exports = router;
