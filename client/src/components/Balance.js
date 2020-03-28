import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import {numberWithCommas} from '../utils/format';

function Balance() {
    const {transactions} = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);
    const balance = amounts
        .reduce((cumSum, amount) => cumSum + amount, 0)
        .toFixed(2);

    return (
        <div>
            <h4>Your Balance</h4>
            <h1>${numberWithCommas(balance)}</h1>
        </div>
    );
}

export default Balance;
