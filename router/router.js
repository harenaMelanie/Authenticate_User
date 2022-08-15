var express = require("express"),

router = express.Router(),
  {
    signup,
    signin
  } = require("../controller/auth");

router.post("/signup", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

module.exports = router;