
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
import { ProjectStatuses } from '../Constants/ProjectStatus';

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
export const handleRegister = async (email, password, fName, lName, type, address, apartment, distance, lat, long, services, accountType, company) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', fName);
    formData.append('lastName', lName);
    formData.append('userType', type);
    formData.append('address', address);
    formData.append('accountType', accountType);
    formData.append('company', company);
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

// Get All Companies
export const handleGetAllCompanies = async () => {
    console.log('Calling Companies Eddpoint');
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.AuthProfile.ListOfAllCompanies}`,
            'Company Listing',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI0Mzg5MjdmMWE0MTNhMDVmMDI2OCIsImlhdCI6MTY2ODU0MTYxNywiZXhwIjoxNzAwMDc3NjE3fQ.8mX3JqRFwskaISPHJBYKIWUDQ7Z-hPPsq0AwKgxxotw'
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

export const handleGetDashboardData = async (authToken) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.DashboardData}`,
            'Get Dashboard Data',
            authToken
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

export const handleGetAllActiveProjects = async (authToken) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Projects.ActiveProjects}`,
            Endpoints.Dashboard.Projects.ActiveProjects,
            authToken
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

export const handleGetAllAvailableProjects = async (authToken) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Projects.AvailableProjects}`,
            Endpoints.Dashboard.Projects.AvailableProjects,
            authToken
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

export const handleGetAllCompletedProjects = async (authToken) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Projects.CompletedProjects}`,
            Endpoints.Dashboard.Projects.CompletedProjects,
            authToken
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

export const handleChangeProjectStatusRequest = async (authToken, projectID, newProjectStatus) => {

    try {
        const formData = new URLSearchParams();
        formData.append('requestStatus', newProjectStatus);

        const response = await fetch.post(
            API_URL + `${Endpoints.Dashboard.Projects.UpdateProjectStatus}/${projectID}`,
            formData.toString(),
            Endpoints.Dashboard.Projects.UpdateProjectStatus,
            authToken,
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

export const handleGetStaffData = async (authToken, companyID) => {

    try {

        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Staff}/${companyID}`,
            Endpoints.Dashboard.Staff,
            authToken
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

export const handleGetProjectDetails = async (authToken, projectID) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Projects.ProjectDetails}/${projectID}`,
            Endpoints.Dashboard.Projects.ProjectDetails,
            authToken
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

export const handleGetStaffList = async (authToken, companyID) => {
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Staff}/${companyID}`,
            Endpoints.Dashboard.Staff,
            authToken
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

export const handlePostClaimData = async (authToken, projectID, orderStatus, date) => {
   
    try {
        const formData = new URLSearchParams();
        formData.append('orderStatus', orderStatus);
        formData.append('orderStatusDate', date);

        const body = {
            orderStatus: orderStatus,
            orderStatusDate: date
        }

        const response = await fetch.post(
            API_URL + `${Endpoints.Dashboard.ChangeProjectOrderStatus}/${projectID}`,
            JSON.stringify(body),
            Endpoints.Dashboard.ChangeProjectOrderStatus,
            authToken,
            ContentTypes.Raw,
        )

        console.log('Responsez', response);

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

export const handlePostAssigneeData = async (authToken, projectID, orderStatus = ProjectStatuses.Assigned, date, assigneeID) => {
    try {
        console.log({authToken, projectID, orderStatus, date, assigneeID});
        const formData = new URLSearchParams();

        const body = {
            order: projectID,
            userTo: assigneeID,
            assignedDate: date
        }


        formData.append('order', projectID);
        formData.append('userTo', assigneeID);
        formData.append('assignedDate', date);

        console.log(JSON.stringify(body));

        const response = await fetch.post(
            API_URL + `${Endpoints.Dashboard.AssignProjectToUser}`,
            JSON.stringify(body),
            Endpoints.Dashboard.AssignProjectToUser,
            authToken,
            ContentTypes.Raw,
        )

        console.log('Code', response?.code);

        if (response?.code === 200) {

            const res2 = await handleProjectStatusChange(authToken, projectID, orderStatus)

            if (res2) {
                return res2
            } return 'Project Status Change not working'

        } else if (response?.code === 400) {
            SimpleToast.show(response?.message)
            return null
        } else if (response?.code === 404) {
            SimpleToast.show(response?.message)
            const res2 = await handleProjectStatusChange(authToken, projectID, orderStatus)

            if (res2) {
                return res2
            }
            return null
        }
    } catch (e) {
        SimpleToast.show(e?.message)
        console.log(e);
        throw e
    }
}

export const handleProjectStatusChange = async (authToken, projectID, orderStatus) => {
    try {
        const formData = new URLSearchParams();
        formData.append('orderStatus', orderStatus);
        // formData.append('orderStatusDate', date);

        const body = {
            orderStatus: orderStatus,
        }

        const response = await fetch.post(
            API_URL + `${Endpoints.Dashboard.ChangeProjectOrderStatus}/${projectID}`,
            JSON.stringify(body),
            Endpoints.Dashboard.ChangeProjectOrderStatus,
            authToken,
            ContentTypes.Raw,
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

export const handleGetScheduledProjects = async (authToken, forStaffID) => {
    // Filter-based staff_id param for next use
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Projects.ScheduleProjectsForStaff}`,
            Endpoints.Dashboard.Projects.ScheduleProjectsForStaff,
            authToken
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

export const handleGetListOfNotifications = async (authToken, readBit) => {
    // Filter-based read param for next use
    try {
        const response = await fetch.get(
            API_URL + `${Endpoints.Dashboard.Notifications}`,
            Endpoints.Dashboard.Notifications,
            authToken
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