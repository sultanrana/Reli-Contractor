import {
    USER_LOCATION,
} from './Types'

const setUserLocation = (payload) => ({
    type: USER_LOCATION,
    payload: payload
})


export { setUserLocation }