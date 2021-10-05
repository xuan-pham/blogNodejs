const mongoose = require('mongoose');

async function connet() {
    try {
        await mongoose.connect('mongodb://localhost:27017/F8_education_dev', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('connet db successfully!!!');
    } catch (error) {
        console.log('connet db failure!!!');

    }
}

module.exports = { connet };