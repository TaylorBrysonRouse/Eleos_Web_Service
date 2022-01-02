// Message Request

const express = require('express');
const router = express.Router();

const Message =  require('../models/Messages');
const User = require('../models/Users');


router.put('/:handle', (req, res) => {
  if(req.headers["eleos-platform-key"] != process.env.ELEOS_PLATFORM_KEY){
    res.status(401).send("401: Invalid Eleos Platform Key");
  }
  else {
        const newMessage = new Message ({
            direction: req.body.direction,
            username: req.body.username,
            message_type: req.body.message_type,
            composed_at: req.body.composed_at,
            platform_received_at: req.body.platform_received_at,
            body: req.body.body
        })


        newMessage.save().then(res.json(req.params.handle))
      }
})

module.exports = router;
