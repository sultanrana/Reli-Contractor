import { COMPANIES } from '../Types';

const initialState = {
    companies: []
};

const CompaniesReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case COMPANIES:
            return {
                ...state,
                companies: action.payload,
            };

        default:
            return state;
    }
}

export { CompaniesReducer }