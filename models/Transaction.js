const mongoose = require('mongoose');

// create Schema for each transactions to be stored
const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Please add some text']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a positive or negative number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// export mongoDB model created from above schema to use in controllers
module.exports = mongoose.model('Transaction', TransactionSchema);
