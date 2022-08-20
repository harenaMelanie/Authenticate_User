var express = require("express"),

router = express.Router();
const {
    signup,
    signin,
    verifyToken
  } = require("../controller/auth");

router.post("/signup", signup, function (req, res) {
  signup(req,res);
});

router.post("/login", function (req, res) {
  signin(req,res);
});

router.post('/hiddencontent', verifyToken , function(req, res){
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