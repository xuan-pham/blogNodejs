const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { Console } = require('console');
const app = express();
const port = 3000;
//đường dẫn router
const route = require('./routes');
const db = require('./config/db');
//connet to db
db.connet();
//sử dụng các thư viện
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));
//rút gọn đuôi file
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
//
app.set("view engine", 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))
    //router init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})