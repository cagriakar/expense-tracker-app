import React, {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

function AddTransaction() {
    const {addTransaction} = useContext(GlobalContext);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            // no need to write as "text: text"
            text,
            // no need to write as "amount: amount"
            amount: parseInt(amount, 10)
        };

        addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='text'>Text</label>
                    <input
                        type='text'
                        placeholder='Enter text...'
                        onChange={(event) => setText(event.target.value)}
                        value={text}
                    ></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='amount'>
                        Amount <br />
                        (negative - expense, positive + income)
                    </label>
                    <input
                        type='number'
                        placeholder='Enter amount...'
                        onChange={(event) => setAmount(event.target.value)}
                        value={amount}
                    ></input>
                </div>
                <button className='btn'>Add Transaction</button>
            </form>
        </>
    );
}

export default AddTransaction;
