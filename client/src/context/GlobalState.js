import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
};

// Create Context
const GlobalContext = createContext(initialState);

//Provider component
function GlobalProvider(props) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
        try {
            // dont need to put whole path as "localhost:5000/api/v1/transactions/", we already added a proxy in "package.json" file
            const res = await axios.get('api/v1/transactions/');
            dispatch({
                type: 'GET_TRANSACTIONS',
                data: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                errorMessage: err.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                deleteId: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                errorMessage: err.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        //due to we're sendign data, needed to specify content type in order to clearify data type
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        try {
            const res = await axios.post(
                '/api/v1/transactions',
                transaction,
                config
            );

            dispatch({
                type: 'ADD_TRANSACTION',
                //using post response from axios
                newTransaction: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                errorMessage: err.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                error: state.error,
                loading: state.loading,
                deleteTransaction,
                addTransaction,
                getTransactions
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export {GlobalContext, GlobalProvider};
