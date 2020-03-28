// import mongoDB model as Transaction to use in below functions
const Transaction = require('../models/Transaction');

// handle get request
// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        // return a controlled api w/ some info (succesfull or not?, how many?, what are they?)
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        // return status w/ server error
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// handle add request
// @desc    ADD a transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
    try {
        const {text, amount} = req.body;

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        // check if error is ValidationError
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(
                (val) => val.message
            );
            // return status w/ bad request error
            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            // return status w/ server error
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// handle delete request
// @desc    DELETE a transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        // check if transaction exits
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        // delete transaction
        await transaction.remove();

        // return a controlled api w/ some info
        return res.status(200).json({
            success: true,
            data: {},
            message: 'Transaction has been deleted succesfully'
        });
    } catch (error) {
        // return status w/ server error
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
