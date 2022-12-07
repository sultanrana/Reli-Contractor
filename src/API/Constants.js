//API Base URL
export const API_URL = 'http://34.236.149.254/api/mobile/api/';

//API Content Types
export const ContentTypes = {
    None: '',
    Raw: 'application/json',
    MultipartFormData: 'multipart/form-data',
    XUrlEncodedFormData: 'application/x-www-form-urlencoded'
}

//API End Points
export const Endpoints = {
    AuthProfile: {
        Login: 'login',
        Signup: 'signup',
        Profile: 'getLoginUserProfile',
        ChangePassword: 'changePassword',
        UpdatePhoneNumber: 'updatePhoneNumber',
        UpdateAccountDetail: 'updateAccountDetail',
        UpdateLocation: 'updateLocation',
        VerifyOTP: 'verifyOTP',
        DeleteAccount: 'deleteAccount',
        ForgotPassword: 'forgotPassword',
        CheckEmail: 'checkEmail',
        ResendVerifyOTP: 'resendVerifyOTP'
    },
    Dashboard: {
        ContactUs: 'contactUs',
    }
}
