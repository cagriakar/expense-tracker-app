import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context/GlobalState';
import Transaction from './Transaction';

function TransactionList() {
    const {transactions, getTransactions} = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
        // to get rid of warning in console
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>History</h3>
            <ul className='list'>
                {transactions.map((transaction) => (
                    <Transaction
                        key={transaction._id}
                        transaction={transaction}
                    />
                ))}
            </ul>
        </>
    );
}

export default TransactionList;
