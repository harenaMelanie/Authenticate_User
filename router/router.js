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
    if(!user){
        res.status(403)
        .send({
            message: "Invalid JWT token"
        });
    } else{
        res.status(403)
        .send({
            message:" Unauthorized acces"
        });
    }
});

router.get("/",(req,res)=>{
    console.log('get server ok')
    res.send('home get ok')
})

module.exports = router;