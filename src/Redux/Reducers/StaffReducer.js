import { PAID_TRANSACTIONS, STAFF_CURRENT, STAFF_LIST, UNPAID_TRANSACTIONS } from '../Types';

const initialState = {
    list: [],
    current: null
};

const StaffReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case STAFF_LIST:
            return {
                ...state,
                list: action.payload,
            };

        case STAFF_CURRENT:
            return {
                ...state,
                current: action.payload,
            };

        default:
            return state;
    }
}

export { StaffReducer }