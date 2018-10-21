var UserSchema = require('./login.model.js');

var loginCtrl = {
    authenticate: function (email, password) {
        console.log('in login');

        UserSchema.findOne({email: email}, function (err, loggedUser) {
            if (err) {
                console.log(err)
            }
            console.log('loggedUser :' + loggedUser);

            //no user found
            if (!loggedUser) {
                console.log('No user found');
            }
            else return user.password === password;
        });
    },

    authenticateFake: function (email, password) {
        console.log('in fake login with email: ' + email);
        if(email === "admin123@gmail.com") {
            return true;
        } else if (email === "employee123@gmail.com"){
            return false;
        }

    },

    register: function (email, password) {
        console.log('in registration');

        var user = new UserSchema({
            email: email,
            password: password
        });

        UserSchema.save(user, function (err, registeredUser) {
            if(err) {
                console.log(err);
            }

            console.log('registered user: ' + registeredUser)
        })
    }
};

module.exports = loginCtrl;