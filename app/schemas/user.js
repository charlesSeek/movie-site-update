var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    name:{
        unique: true,
        type: String
    },
    password: String,
    //0: normal user
    //1: verified user
    //2: professional user

    role: {
        type: Number,
        default: 0
    },

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});


UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if (err) 
            return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });

    });
});
UserSchema.methods = {
    comparePassword: function(_password,cb){
        bcrypt.compare(_password,this.password,function(err,isMatch){
            if (err){
                return cb(err);
            }
            else {
                cb(null,isMatch);
            }
        });
    }
};

UserSchema.statics = {
    fetch: function (cd) { 
        return this
            .find({})
            .exec(cd)
    },
    findById: function (id, cd) { 
        return this
            .findOne({_id: id})
            .exec(cd)
    }

};

module.exports = UserSchema;