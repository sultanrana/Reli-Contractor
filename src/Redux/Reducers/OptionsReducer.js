import { OPTIONS } from "../Types";

const initialState = {
    options: null
};

const OptionsReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case OPTIONS:
            return {
                ...state,
                options: action.payload,
            };

        default:
            return state;
    }
}

export { OptionsReducer }