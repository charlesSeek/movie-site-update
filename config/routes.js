var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');
module.exports = function(app){
	// pre-handle user
	app.use(function(req,res,next){
	    var _user = req.session.user;
	    app.locals.user = _user;
	    console.log(_user);
	    return next();
	});
	/*
	* the route of the index page
	**/
	//index page
	app.get('/', Index.index);
	

	/*
	*  the route of the user related pages
	**/
	app.post("/user/register",User.register); //user register post page
	app.post('/user/login', User.login);  //user login post page
	app.get('/user/login',User.showLogin); //user login page
	app.get('/user/register',User.showRegister); //user register page
	app.get("/user/logout", User.logout); //user logout page
	
	/*
	* the route of the movie related pages
	**/
	//app.get('/movie/list', Movie.list);  //movie list page
	app.get('/movie/:id', Movie.detail);// movie detail page

	/*
	* the route of the admin related pages
	*/
	app.get('/admin/user/list', User.loginRequired, User.adminRequired,User.list); // user list page
	app.get('/admin/movie/update/:id', User.loginRequired, User.adminRequired,Movie.update); // update movie information
	app.get('/admin/movie/new', User.loginRequired, User.adminRequired,Movie.new); // new movie
	app.get('/admin/movie/list', User.loginRequired, User.adminRequired,Movie.list); //// admin list page
	app.post('/admin/movie/new',User.loginRequired, User.adminRequired, Movie.save); ////post new movie data page
	app.delete('/admin/movie/list', User.loginRequired, User.adminRequired,Movie.del); // delete movie

	//Comment
	app.post('/user/comment',User.loginRequired,Comment.save);

	//category
	app.get('/admin/category', User.loginRequired, User.adminRequired, Category.new);
	app.post('/admin/category/new', User.loginRequired, User.adminRequired, Category.save);
	app.get('/admin/category/list',User.loginRequired,User.adminRequired,Category.list);

	//result
	app.get('/results',Index.search);
}