import {
    USER_DATA,
    AUTH_TOKEN,
    ON_LOGOUT,
    COMPANIES,

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

const logout = () => ({
    type: ON_LOGOUT,
    payload: null
})

export {setAuthToken, setUserData, setCompaniesData, logout }