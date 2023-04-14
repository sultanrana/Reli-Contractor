import { ACTION_NEEDED_PROJECTS, CLAIM_PROJECTS, DETAILS_TAB, ON_LOGOUT, PROJECT_DETAILS, PROJECT_ID } from "../Types";


const initialState = {
    claim: null,
    actionNeeded: null,
    details: null,
    id: null,
    tab: null
};

const ProjectsReducer = (state = initialState, action = {}) => {
    switch (action.type) {

        case ON_LOGOUT:
            return initialState;

        case CLAIM_PROJECTS:
            return {
                ...state,
                claim: action.payload,
            };

        case ACTION_NEEDED_PROJECTS:
            return {
                ...state,
                actionNeeded: action.payload,
            };


        case PROJECT_ID:
            return {
                ...state,
                id: action.payload,
            };

        case PROJECT_DETAILS:
            return {
                ...state,
                details: action.payload,
            };
        case DETAILS_TAB:
            return {
                ...state,
                tab: action.payload,
            };

        default:
            return state;
    }
}

export { ProjectsReducer }