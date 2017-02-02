var User = require('../models/user');

module.exports.checkLogin = function(req, res) {
    //var newUser = new User(req.body.user);
    var newUser = new User(req.query.filter);
    console.log(newUser);
    User.findOne({
        email: newUser.email
    }).then(function(results) {
        if ((results === null) || (newUser.email === null) || (newUser.email === null)) {
            console.log("No such user.");
            res.json({user: {
            		accepted: false
            }})
        } else {
            console.log("User found!");
            //console.log(results);
            console.log(newUser.password);
            if (results.password === newUser.password) {
            	console.log("Passwod is a match.");
            	res.json({user: {
              	accepted: true
            	}});	
            } else {
            	console.log("Passwod is not a match.");
            	res.json({user: {
              	accepted: false
            	}});
            }
        }
    }).catch(function(err) {
        console.log("Error finding user! Error: " + err);
    });
};
