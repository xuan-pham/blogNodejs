const { count } = require("../modles/Coures");
const Course = require("../modles/Coures");
const { mongooseToObject } = require("../../util/mongoose");
class CourseController {
    //[get]  /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("courses/show", { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    //[get]  /course/create
    create(req, res, next) {
        res.render("courses/create");
    }

    //[post]  /course/store
    store(req, res, next) {

        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD9QFkahguHM2_ISOBWeVW1UwbaMw`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect("/me/stored/courses"))
            .catch((error) => {});
    }

    //[get]  /course/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render("courses/edit", {
                course: mongooseToObject(course)
            }))
            .catch(next);

        ;
    }

    //[put]  /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);


    }

    //[DELETE]  /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE]  /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[PATCH]  /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST]  /course/handle-form-actions
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
        }
    }

    //[POST]  /course/handle-form-restore-forceDestroy
    handleFormRestoreForceDestroy(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'forceDestroy':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

        }

    }

}
module.exports = new CourseController();