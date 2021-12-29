const express = require('express');
const { default: jwtDecode } = require('jwt-decode');
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const router = express.Router();
const db = require('../config/dbkey').mongoURI

const Users = require('../models/Users');
const Loads = require('../models/Loads');

authorize = async (token) => {
    var jwtDecode = jwt_decode(token);
    var username = jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    var user = await Users.findOne({username: username}).exec();
    return user;
}

router.get('/', async (req, res) => {
  if(req.headers["eleos-platform-key"] != process.env.ELEOS_PLATFORM_KEY) {
    res.status(401).send("401: Invalid Eleos Platform Key");
  } else {
    try {
      var authToken = req.headers.authorization.split("=")[1];
      if(!(await authorize(authToken))){
        res.status(401).send("Error: Invalid User Token!!");
      }
      else {
        Loads.find()
        .then(loads => res.send(loads))
    .catch((err) => {
        res.status(401);
    });
      }
    }
    catch(err){
      res.send(err)
    }
  }
});


// Loads auth still not working returning both resolve and reject / look over carsons for ref
module.exports = router;
