import {
    USER_DATA,
    AUTH_TOKEN,
    ON_LOGOUT,
    COMPANIES,
    ACTION_NEEDED_PROJECTS,
    CLAIM_PROJECTS,
    PROJECT_ID,
    PROJECT_DETAILS,

} from './Types'

const setAuthToken = (payload) => ({
    type: AUTH_TOKEN,
    payload: payload
})

const setUserData = (payload) => ({
    type: USER_DATA,
    payload: payload
})

const setCompaniesData = (payload) => ({
    type: COMPANIES,
    payload: payload
})


const setActionNeededProjects = (payload) => {
    return {
        type: ACTION_NEEDED_PROJECTS,
        payload: payload
    }
}

const setClaimProjects = (payload) => ({
    type: CLAIM_PROJECTS,
    payload: payload
})

const setProjectID = (payload) => ({
    type: PROJECT_ID,
    payload: payload
})

const setProjectDetails = (payload) => ({
    type: PROJECT_DETAILS,
    payload: payload
})

const logout = () => ({
    type: ON_LOGOUT,
    payload: null
})

export {setAuthToken, setUserData, setCompaniesData, logout, setActionNeededProjects, setClaimProjects, setProjectDetails, setProjectID }