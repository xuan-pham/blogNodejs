const { count } = require('../modles/Coures');
const Course = require('../modles/Coures');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {

    //[get] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses)
                }))
    };

    //[get] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    };

}
module.exports = new MeController;