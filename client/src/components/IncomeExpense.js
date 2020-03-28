import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import {numberWithCommas} from '../utils/format';

function IncomeExpenses() {
    const {transactions} = useContext(GlobalContext);
    const amounts = transactions.map((transaction) => transaction.amount);
    const incomeAmount = amounts
        .filter((amount) => amount > 0)
        .reduce((cumSum, amount) => cumSum + amount, 0)
        .toFixed(2);
    const expenseAmount = amounts
        .filter((amount) => amount < 0)
        .reduce((cumSum, amount) => cumSum + amount, 0)
        .toFixed(2);

    return (
        <div className='inc-exp-container'>
            <div>
                <h4>Income</h4>
                <p className='money plus'>+${numberWithCommas(incomeAmount)}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className='money minus'>
                    -${numberWithCommas(Math.abs(expenseAmount))}
                </p>
            </div>
        </div>
    );
}

export default IncomeExpenses;
