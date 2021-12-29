const express = require('express');
const { default: jwtDecode } = require('jwt-decode');
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const router = express.Router();

const secret = 'iM-a-HeLlO-kItTy';

const Users = require('../models/Users');


router.get('/:token', function(req, res){
  if(req.headers["eleos-platform-key"] != process.env.ELEOS_PLATFORM_KEY) {
      res.status(401).send("401: Invalid Eleos Platform Key!!");
    }
  else {
    var jwtDecode = jwt_decode(req.params.token);
      Users.findOne({ username: jwtDecode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]})
        .then((user) => {
            user.api_token = jwt_encode({"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": user.username, "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": user.full_name }, secret,);
            res.send(user)
          }).catch((err) => {
             console.log(err);
             res.status(401);
         });
      }
  });

module.exports = router;
