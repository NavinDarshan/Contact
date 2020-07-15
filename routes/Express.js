const Express = require('express');
const bodyparser = require('body-parser');
const Login = require('../models/Login');
const passport = require('passport');
const app = Express();
const router = Express.Router();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

router.post("/signup", (req, res) => {
    Login.register(new Login({ username: req.body.username }), req.body.password, (err, login) => {
        if(err){
            data= {
                message: "Username already Exist"
            }
            res.send(data);
        }
        else {
            passport.authenticate("local")(req, res, () => {
                Login.findOne({ username: req.body.username }, (err, foundUser) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        data = {
                            username: req.body.username,
                            id: foundUser._id,
                            message: "Successfully Logged In"
                        }
                        res.send(data);
                    }
                })
            })
        }
    })
})

router.post("/login",(req,res) => {
    passport.authenticate("local", (err, user, info) => {
        if(err){console.log("AUTH"+err)}
        if(!user){
            console.log("USER FALSE")
            data = {
                message: "Invalid Username or Password"
            }
            return res.send(data);
        }
        req.logIn(user, err => {
            if(err){console.log("LOGIN"+err)}
            data = {
                username: user.username,
                id: user._id,
                message: "Successfully Logged In"
            }
            return res.send(data);
        })
    })
    (req,res,() => {
    })
});



module.exports = router;