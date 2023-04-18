import {
    USER_DATA,
    AUTH_TOKEN,
    ON_LOGOUT,
    COMPANIES,
    ACTION_NEEDED_PROJECTS,
    CLAIM_PROJECTS,
    PROJECT_ID,
    PROJECT_DETAILS,
    UNPAID_TRANSACTIONS,
    PAID_TRANSACTIONS,
    STAFF_LIST,
    STAFF_CURRENT,
    FCM,
    DETAILS_TAB,
    REMINDERS,

} from './Types'


const setFcm = (payload) => ({
    type: FCM,
    payload: payload
})

const setDetailsTab = (payload) => ({
    type: DETAILS_TAB,
    payload: payload
})

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

const setUnpaidTransactions = (payload) => ({
    type: UNPAID_TRANSACTIONS,
    payload: payload
})

const setPaidTransactions = (payload) => ({
    type: PAID_TRANSACTIONS,
    payload: payload
})

const setStaffList = (payload) => ({
    type: STAFF_LIST,
    payload: payload
})

const setCurrentStaff = (payload) => ({
    type: STAFF_CURRENT,
    payload: payload
})

const logout = () => ({
    type: ON_LOGOUT,
    payload: null
})

const setReminders = (payload) => ({
    type: REMINDERS,
    payload: payload
})

export {
    setFcm,
    setAuthToken,
    setUserData,
    setCompaniesData,
    logout,
    setActionNeededProjects,
    setClaimProjects,
    setProjectDetails,
    setProjectID,
    setPaidTransactions,
    setUnpaidTransactions,
    setStaffList,
    setCurrentStaff,
    setDetailsTab,
    setReminders
}