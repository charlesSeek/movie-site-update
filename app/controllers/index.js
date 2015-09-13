var Movie = require('../models/movie');
// movie-site index page
var Category = require('../models/category');
exports.index = function (req, res) {
    console.log('user in session:');
    console.log(req.session.user);
    Category
        .find({})
        .populate({path: 'movies',options:{limit:5}})
        .exec(function(err,categories){
            if (err){
                console.log(err);
            }
            res.render('index',{
                title: 'Movie-site First Page',
                categories: categories
            });
        });

};
exports.search = function(req,res){
    var catId = req.query.cat;
    var page = parseInt(req.query.p,10)||1;
    var pageSize = 2;
    var index = (page-1)*pageSize;
    Category
        .find({_id:catId})
        .populate({
            path: 'movies',
            select: 'title poster',
        })
        .exec(function(err,categories){
            if (err){
                console.log(err);
            }
            var category = categories[0] || {};
            var movies = category.movies||[];
            var results = movies.slice(index,index+pageSize);
            res.render('results',{
                title: 'movie-site First Page',
                movies:results,
                currentPage:page,
                totalPage: Math.ceil(movies.length/pageSize),
                query: 'cat='+catId,
                keyword: category.name
            })
        })
};