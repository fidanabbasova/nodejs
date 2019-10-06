var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req, res) {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const user = new User({
      username, 
      password: hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});


router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if(err) throw err;
    if(!user) res.json({status: false, message: 'User yoxdu'});
    else 
      bcrypt.compare(password, user.password).then( (result) => {
        if(!result) res.json({ status: false, message: 'Parol sehvdi' })
        else {
          const payload = { username };
          const token = jwt.sign(payload, req.app.get('api_secret_key'));
          res.json({ status: true, token});
        }
    });
  });
});

module.exports = router;
