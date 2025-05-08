import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { tempData } from './middlewares/tempDataMiddleware.js';

const app = express();

const port = 5000;

try {
    const URI = 'mongodb://localhost:27017/Stantek-mobiles';
    await mongoose.connect(URI);
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

//TODO: Implement error container to app!


app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'koFOFKogksdm3226jkpolmsdpgmOGSPOGMgsdlgsmdg',
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

app.listen(`${port}`, () => console.log(`Server is listening on port: http://localhost:${port}...`));
