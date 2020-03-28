const express = require('express');
const router = express.Router();

// import get, add and delete functions as object for requests
const {
    getTransactions,
    addTransaction,
    deleteTransaction
} = require('../controllers/transactionsController');

// handle get and post requests for "...blablabla.../"
router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

// handle delete request for "...blablabla.../:id"
router.route('/:id').delete(deleteTransaction);

// export router to use in server.js
module.exports = router;
