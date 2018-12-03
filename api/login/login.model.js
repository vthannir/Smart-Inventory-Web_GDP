var mongoose = require('mongoose');
var schema = mongoose.Schema;

userShema = new schema({
    email: {type: String, require: true},
    password: {type: String, require: true},
    roles: {type: String, default: 'employee'},
    firstName: {type: String},
    lastName: {type: String}
});

module.exports = mongoose.model("Users", userShema);
