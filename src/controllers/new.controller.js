const New = require('../models/new.model');
const { mongooseToObject,mutipleMongooseToObject } = require('../ultils/');

class NewController {
    // [GET] /news/show
    show(req, res, next) {
        New.findOne({ slug: req.params.slug })
            .then((newOne) => {
                res.render('news/show', {
                    new: mongooseToObject(newOne),
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // [GET] /news/create
    create(req, res, next) {
        res.render('news/create')
    }

    // [POST] /news/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const newOne = new New(req.body);
        newOne.save()
            .then(() => res.redirect('storeNew'))
            .catch((error) => {});
    }

    // [GET] /news/storeNew
    storeNew(req, res, next) {
        Promise.all([New.find({}),New.countDocumentsDeleted()])
        .then(([news,deletedCount]) =>
            res.render('news/stored-new', {
                deletedCount,
                news: mutipleMongooseToObject(news),
            }),
        )
        .catch(next);
    }

    // [GET] /news/:id/edit
    edit(req, res, next) {
        New.findById(req.params.id)
            .then((newOne) =>
                res.render('news/edit', {
                    new: mongooseToObject(newOne),
                }),
            )
            .catch(next);
    }

    // [PUT] /news/:id
    update(req, res, next) {
        New.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/news/storeNew'))
            .catch(next);
    }

     // [DELETE] /news/:id
     delete(req, res, next) {
        New.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

     // [GET] /news/trash
     trashNew(req, res, next) {
        New.findDeleted({})
            .then((news) =>
                res.render('news/trash', {
                    news: mutipleMongooseToObject(news),
                }),
            )
            .catch(next);
    }

     // [PATCH] /news/:id/restore
     restore(req, res, next) {
        New.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

     // [DELETE] /news/:id/force
     force(req, res, next) {
        New.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
}
}

module.exports = new NewController();