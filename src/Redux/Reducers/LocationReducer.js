import { USER_LOCATION } from '../Types';

const initialState = {
    location: null
};

const LocationReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case USER_LOCATION:
            return {
                ...state,
                location: action.payload,
            };

        default:
            return state;
    }
}

export { LocationReducer }