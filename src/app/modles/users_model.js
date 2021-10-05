const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
    email: {
        type: String,
        default: ''
    },

    phone: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        default: ''
    },
    roles: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'noactive'
    },
    type_regis: {
        type: String,
        default: 'WE'
    },
    deleteAt: {
        type: Date,
        default: Date.now
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        default: 'System'
    },
}, {
    collection: 'users'
});

Users.index({
    email: 1
})
module.exports = mongoose.model('users', Users);