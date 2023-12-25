import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';

const app = express();

app.use(cors({
        credentials: true,
    }));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser()); 


const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000/');
});

const MONGO_URL = 'mongodb+srv://parthjain1812:GhPl0l8Y2EipnPYm@my-cluster-0.vnpz0re.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});
app.use('/', router());
