function AppReducer(state, action) {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.data
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction._id !== action.deleteId
                )
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.newTransaction]
            };

        case 'TRANSACTION_ERROR':
            return {
                ...state,
                loading: false,
                error: action.errorMessage
            };
        default:
            return state;
    }
}

export default AppReducer;
