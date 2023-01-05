
import fetch from './fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    API_URL,
    ContentTypes,
    Endpoints
} from './Constants'
import SimpleToast from 'react-native-simple-toast';
import InfoMsg from '../Components/InfoMsg';
import { showMessage } from 'react-native-flash-message';

//Login
export const handleLogin = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.Login,
            formData.toString(),
            'Login Request',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {

            return response?.data
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//Register
export const handleRegister = async (email, password, fName, lName, type, address, apartment, distance, lat, long, services) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', fName);
    formData.append('lastName', lName);
    formData.append('userType', type);
    formData.append('address', address);
    formData.append('appartment', apartment);
    formData.append('willingRange', distance);
    formData.append('lat', lat);
    formData.append('lng', long);
    for (var i = 0; i < services.length; i++) {
        formData.append('services[]', services[i]);
    }

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.Signup,
            formData.toString(),
            'Register Request',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//UserProfile
export const handleUserProfile = async () => {
    const formData = {}

    try {
        const response = await fetch.get(
            API_URL + '/' + Endpoints.AuthProfile.Profile,
            'UserProfile',
        )
        return response

        // if (response?.code === 200) {
        // } else if (response?.code === 400) {
        //     SimpleToast.show(response?.message)
        //     return null
        // }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//ChangePassword
export const handleChangePassword = async (userId, password) => {
    const formData = new URLSearchParams();
    formData.append('newPassword', password);

    try {
        const response = await fetch.put(
            API_URL + '/' + `${Endpoints.AuthProfile.ChangePassword}/${userId}`,
            formData.toString(),
            'Change Password',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'Password changed successfully',
                type: 'success'
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//Update Number
export const handleUpdateNumber = async (userId, number) => {
    const formData = new URLSearchParams();
    formData.append('phoneNumber', number);

    try {
        const response = await fetch.put(
            API_URL + '/' + `${Endpoints.AuthProfile.UpdatePhoneNumber}/${userId}`,
            formData.toString(),
            'Change Number',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'Phone Number updated successfully',
                type: 'success',
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//Update User Details
export const handleUpdateUserDetails = async (userId, fName, lName, email) => {
    const formData = new URLSearchParams();
    formData.append('firstName', fName);
    formData.append('lastName', lName);
    formData.append('email', email);

    try {
        const response = await fetch.put(
            API_URL + '/' + `${Endpoints.AuthProfile.UpdateAccountDetail}/${userId}`,
            formData.toString(),
            'Update_User_Details',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'Details updated successfully',
                type: 'success',
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}

//Update User Location
export const handleUpdateUserLocation = async (userId, address, apartment, distance, zip, state, city, lat, long) => {
    const formData = new URLSearchParams();
    formData.append('address', address);
    formData.append('appartment', apartment);
    formData.append('willingRange', distance);
    formData.append('zipCode', zip);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('lat', lat);
    formData.append('lng', long);

    try {
        const response = await fetch.put(
            API_URL + '/' + `${Endpoints.AuthProfile.UpdateLocation}/${userId}`,
            formData.toString(),
            'Update_User_Location',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            return response
        } else if (response?.code === 400) {
            SimpleToast.show(response?.message)
            return null
        }
    } catch (e) {
        SimpleToast.show(e?.message)
        console.log(e);
        throw e
    }

}

//Forgot Password
export const handleForgotPassword = async (email) => {
    const formData = new URLSearchParams();
    formData.append('email', email);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.ForgotPassword,
            formData.toString(),
            'Forgot_Password',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'Check your gmail for a verification code',
                type: 'success'
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger'
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger'
        })
        console.log(e);
        throw e
    }

}

//CheckEmail
export const handleEmailCheck = async (email) => {
    const formData = new URLSearchParams();
    formData.append('email', email);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.CheckEmail,
            formData.toString(),
            'Email Check Request',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            return response?.data
        } else if (response?.code === 400) {
            showMessage({
                message: 'Please check your email, or click the sign in button',
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}


//Verify OTP
export const handleVerifyOTP = async (email, otp) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('otp', otp);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.VerifyOTP,
            formData.toString(),
            'Verify_OTP',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'OTP verified successfully',
                type: 'success',
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger',
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger',
        })
        console.log(e);
        throw e
    }

}


//Resend OTP
export const handleResendOTP = async (email) => {
    const formData = new URLSearchParams();
    formData.append('email', email);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.AuthProfile.ForgotPassword,
            formData.toString(),
            'Resend_OTP',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: 'Check your gmail for a verification code',
                type: 'success'
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger'
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger'
        })
        console.log(e);
        throw e
    }

}

//ContactUs
export const handleContactUs = async (sub, msg) => {
    const formData = new URLSearchParams();
    formData.append('subject', sub);
    formData.append('message', msg);

    try {
        const response = await fetch.post(
            API_URL + '/' + Endpoints.Dashboard.ContactUs,
            formData.toString(),
            'ContactUs',
            null,
            ContentTypes.XUrlEncodedFormData,
        )

        if (response?.code === 200) {
            showMessage({
                message: response?.message,
                type: 'success'
            })
            return response
        } else if (response?.code === 400) {
            showMessage({
                message: response?.message,
                type: 'danger'
            })
            return null
        }
    } catch (e) {
        showMessage({
            message: e?.message,
            type: 'danger'
        })
        console.log(e);
        throw e
    }

}

//Delete Account
export const handleDeleteAccount = async (userId) => {
    // console.log(userId);
    try {
        const response = await fetch.del(
            API_URL + '/' + `${Endpoints.AuthProfile.DeleteAccount}/${userId}`,
            'Delete Account',
        )

        if (response?.code === 200) {

            return response
        } else if (response?.code === 400) {
            SimpleToast.show(response?.message)
            return null
        }
    } catch (e) {
        SimpleToast.show(e?.message)
        console.log(e);
        throw e
    }

}

