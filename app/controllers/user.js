
var User = require('../models/user');
//user signup
exports.showRegister = function(req,res){
    res.render('Register',{
        title: 'Movie-Site Register Page'
    });
};

exports.showLogin = function(req,res){
    res.render('login',{
        title: 'Movie-Site Login Page'
    });
};

exports.register = function(req, res){
    var _user = req.body.user;
    User.find({name:_user.name},function(err,user){
        if (err)
            console.log(err);
        if (user){
            return res.redirect('/user/register');
        }
        else {
            var user = new User(_user);
            user.save(function(err,user){
            if (err){
                console.log(err);
            }
            res.redirect('/admin/user/list')
            });
        }
    });
};

//admin userlist
exports.list=function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'movie-site user list page',
            users: users
        });
    });
};

exports.loginRequired=function(req,res,next){
    var user = req.session.user;
    if (!user){
        return res.redirect('/user/login');
    }
    next();
};

exports.adminRequired=function(req,res,next){
    var user = req.session.user;
    if (user.role<=10||user.role==null){
        return res.redirect('/user/login');
    }
    next();
};
// user login
exports.login=function(req,res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    console.log('my current url:'+req.url);
    User.findOne({name:name},function(err,user){
        if (err){
            console.log(err);
        }
        if (!user){
        	console.log('the user is not existed');
            return res.redirect("/user/register");
        }
        else {
            user.comparePassword(password,function(err,isMatch){
                if (err){
                    console.log(err);
                }
                if (isMatch){
                    req.session.user = user;
                    return res.redirect("/");
                    
                }
                else {
                    console.log('Password is not corrected');
                    return res.redirect("/user/login");
                }
            });
        }
    })
};

//log out 
exports.logout=function(req,res){
    //delete req.session.user;
    //delete app.locals.user;
    delete req.session.user;
    res.redirect('/');
};
