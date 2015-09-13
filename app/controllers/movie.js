var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');

// Movie first page
exports.index=function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'movie-site list page',
            movies: movies
        });
    });
};

// movie detail page
exports.detail=function (req, res) {
    var id = req.params.id;
    
    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err);
        }
        Comment
            .find({movie:id})
            .populate('from','name')
            .populate('reply.from reply.to', 'name')
            .exec(function(err,comments){
                Category
                    .findById(movie.category,function(err,category){
                        res.render('detail', {
                                title: 'movie-site ' + movie.title,
                                movie: movie,
                                comments: comments
                        });
                //return false;
                    });
                
            })
    });
};

//update movie information
exports.update = function(req,res){
    var id = req.params.id;
    if (id){
        Movie.findById(id,function(err,movie){
            Category.find({},function(err,categories){
                res.render('admin',{
                    title: 'Movie-site New Movie page',
                    movie: movie,
                    categories: categories
                });
            });
        });
    }
    
};

// admin new movie page
exports.new=function (req, res) {
    Category.find({},function(err,categories){
        res.render('admin', {
        title: 'movie-site Input Page',
        categories:categories,
        movie: {}
    });
    });
    
};

// admin list page
exports.list=function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: 'movie-site list page',
            movies: movies
        });
    });
};




//post new movie save page
exports.save=function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;

    var _movie;
    if (id) {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie(movieObj);
        var categoryId = _movie.category;
        var categoryName =movieObj.categoryName;
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            if (categoryId){
                Category.findById(categoryId,function(err,category){
                category.movies.push(movie._id);
                category.save(function(err,category){
                    res.redirect('/movie/' + movie._id);
                })
                });
            }
            else {
                if (categoryName){
                    var category = new Category({
                        name:categoryName,
                        movies:[movie._id]
                    });
                    
                   category.save(function(err, category) {
                        movie.category = category._id
                        movie.save(function(err, movie) {
                            res.redirect('/movie/' + movie._id)
                        })
                    })
                    
                }
            }
            
        });
    }
};

// delete movie
exports.del=function (req, res) {
    var id = req.query.id;
    if (id){
        console.log("delete Movie id:"+id);
        Movie.remove({_id:id},function(err,movie){
            if (err){
                console.log(err);
            }
            else {
                res.json({success:1})
            }
        });
    }
    else {
        console.log("the movie id is not existed");
    }
};