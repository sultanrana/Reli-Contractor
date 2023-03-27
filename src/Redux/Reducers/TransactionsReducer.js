import { PAID_TRANSACTIONS, UNPAID_TRANSACTIONS } from '../Types';

const initialState = {
    unpaid: [],
    paid: []
};

const TransactionsReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case UNPAID_TRANSACTIONS:
            return {
                ...state,
                unpaid: action.payload,
            };

        case PAID_TRANSACTIONS:
            return {
                ...state,
                paid: action.payload,
            };

        default:
            return state;
    }
}

export { TransactionsReducer }