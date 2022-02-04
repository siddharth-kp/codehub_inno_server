var express = require('express');
var router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser
} = require('../controllers/userController');
/* GET users listing. */


router.post('/login', loginUser);
router.post('/register',registerUser);
router.get('/logout',logoutUser);

module.exports = router;
