var express = require("express"),

router = express.Router(),
  {
    signup,
    signin,
    verifyToken
  } = require("../controller/auth");

router.post("/signup", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {
    console.log("welcome you're logged")
});

router.get('/hiddencontent', verifyToken , function(req, res){
    res.status(200)
    .send({
        message: "user is verified",
        success:true
    });
});

router.get("/",(req,res)=>{
    console.log('get server ok')
    res.send('home get ok')
})

module.exports = router;