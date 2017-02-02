// api/user.js

var User = require('../models/user');

module.exports.getAllUsers = function(req, res) {  
    //console.log(req);
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json({users: users});
        //console.log("RES::");
        //console.log(res);
    });
};

module.exports.addUser = function(req,res) {  
    var newUser = new User(req.body.user);
    User.findOne({
        email: newUser.email
    }).then(function(results) {
        if (results === null) {
            newUser.save(function(err) {
                if (err) {
                    res.send(err);

                }
                newUser.alreadySignedUp = false;
                res.json({user: newUser});
            });
        } else {
            console.log("User has already signed up!");
            res.json({user: {
                alreadySignedUp: true
            }});
        }
    }).catch(function(err) {
        console.log("Error finding user! Error: " + err);
    });
};