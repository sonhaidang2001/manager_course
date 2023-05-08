const Course = require('../models/course.model');
const New = require('../models/new.model');
const User = require('../models/user.model');
const { mutipleMongooseToObject } = require('../ultils/index');
class SiteController {

    
    login(req, res, next) {       
       res.render('login')
    }

    loginCheck = async(req, res, next) => {       
        const user = await User.findOne({username:req.body.username})
        try {
         if (user.username === req.body.username && user.password===req.body.password) {
            Promise.all([Course.find({}), New.find({})])
            .then(([courses, news]) =>
                res.render('home', {
                    news:mutipleMongooseToObject(news),
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
         }
        } catch (error) {
         res.json(error.message)        
        }
    }
    // [GET] /
    index(req, res, next) {       
            Promise.all([Course.find({}), New.find({})])
            .then(([courses, news]) =>
                res.render('home', {
                    news:mutipleMongooseToObject(news),
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }

}

module.exports = new SiteController();

  