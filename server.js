//during deployment to show your build folder
const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// import DB connection function
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

// connect DB
connectDB();

// import router function as "transactionsRouter"
const transactionsRouter = require('./routes/transactionsRouter');

//middleware
const app = express();
//to use body-parser
app.use(express.json());

// log the requests have been made  in console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// use transactionsRouter for below route
app.use('/api/v1/transactions', transactionsRouter);

// change the NODE_ENV value to production in your "config.env" file before the below code
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

// create server
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
