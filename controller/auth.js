var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");
var User = require("../Models/user");

exports.signup = (req, res) => {
    console.dir(req.body)
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500)
                .send({
                    message: err
                });
            return;
        } else {
            res.status(200)
                .send({
                    message: "User Registered successfully"
                })
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500)
                    .send({
                        message: err
                    });
                return;
            }
            if (!user) {
                return res.status(404)
                    .send({
                        message: "User Not found."
                    });
            }

            //comparing passwords
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            // checking if password was valid and send response accordingly
            if (!passwordIsValid) {
                return res.status(401)
                    .send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
            }
            //signing token with user id
            var token = jwt.sign({
                id: user._id
            }, process.env.API_SECRET, {
                expiresIn: 864000
            });

            //responding to client request with user profile success message and  access token .
            res.status(200)
                .send({
                    user: {
                        id: user._id,
                        email: user.email,
                        fullName: user.fullName,
                    },
                    message: "Login successfull",
                    accessToken: token,
                });
        });
};

// Verify Token
exports.verifyToken = (req, res, next) => {
    console.dir(req.headers.token)
    if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.API_SECRET, function (err, decode) {
            if (err){
                if(err instanceof jwt.JsonWebTokenError ){
                    res.status(403)
                    .send({
                        message: "Invalid JWT token",
                        success:false
                    });
                } else{
                    res.status(403)
                    .send({
                        message:" expired",
                        success:false
                    });
                }
            }
            User.findOne({
                _id: decode.id
            }).then(user => {
                // req.user = user;
                console.log('user is logged in:' + user)
                if(user) next();
            }).catch(err => {
                res.status(500).send({
                    message: err
                });
            })
        });
    } else {
        console.log('>> token match any id')
        req.user = undefined;
        next();
    }
};
