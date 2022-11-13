import { AUTH_TOKEN, USER_DATA, ON_LOGOUT } from '../Types';

const initialState = {
    token: null,
    userData: null,
};

const Reducers = (state = initialState, action = {}) => {
    switch (action.type) {
        case AUTH_TOKEN:
            return {
                ...state,
                token: action.payload,
            };

        case USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };

        case ON_LOGOUT:
            return initialState;

        default:
            return state;
    }
}

export { Reducers }