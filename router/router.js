var express = require("express"),

router = express.Router(),
  {
    signup,
    signin
  } = require("../controller/auth");

router.post("/signup", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {
    console.log("welcome you're logged")
});

router.get("/",(req,res)=>{
    console.log('get server ok')
    res.send('home get ok')
})

module.exports = router;