import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { tempData } from './middlewares/tempDataMiddleware.js';
import time from './utils/time.js';

import 'dotenv/config';


const app = express();


try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Database is connected!');
} catch (err) {
    console.log('Cannot connect to the DB!');
    console.error(err);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));

app.use((req, res, next) => {
    res.locals.time = time();
    next();
});

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}));

app.use(tempData);
app.use(authMiddleware);

app.use(routes);

app.listen(`${process.env.HOST}:${process.env.PORT}`, () => console.log(`Server is listening on port: ${process.env.HOST}:${process.env.PORT}...`));
