const Course = require('../models/course.model');
const { mongooseToObject } = require('../ultils/index');
const { mutipleMongooseToObject } = require('../ultils/index');

class courseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
       res.render('courses/create')
    }
   
     // [POST] /courses/store
     store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('storedCourse'))
            .catch((error) => {});
    }

     // [GET] /courses/stored-course
     storedCourse(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
        .then(([courses, deletedCount]) =>
            res.render('courses/stored-course', {
                deletedCount,
                courses: mutipleMongooseToObject(courses),
            }),
        )
        .catch(next);
    }
    
    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses/storedCourse'))
            .catch(next);
    }

        // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

        // [GET] /courses/trash
        trashCourses(req, res, next) {
            Course.findDeleted({})
                .then((courses) =>
                    res.render('courses/trash', {
                        courses: mutipleMongooseToObject(courses),
                    }),
                )
                .catch(next);
        }
        
        // [PATCH] /courses/:id/restore
        restore(req, res, next) {
            Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
        }
        // [DELETE] /courses/:id/force
        force(req, res, next) {
            Course.deleteOne({ _id: req.params.id })
                .then(() => res.redirect('back'))
                .catch(next);
    }
}


module.exports = new courseController();