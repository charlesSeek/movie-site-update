
var User = require('../models/user');
var Category = require('../models/category');
//add new category

exports.new = function(req, res){
    res.render('category',{
        title: 'Categories Input page',
        category: {
        }
    });
};

exports.save = function(req,res){
    var _category = req.body.category;
    var category = new Category(_category);
    category.save(function(err,category){
        if (err){
            console.log(err);
        }
        res.redirect('/admin/category/list');
    });
};

exports.list = function(req,res){
    Category.fetch(function(err, categories){
        if (err){
            console.log(err);
        }
        res.render('categorylist',{
            title: 'Category List page',
            categories: categories
        })
    });
};




