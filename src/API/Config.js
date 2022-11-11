
import fetch from './fetch'
import { AsyncStorage } from '@react-native-async-storage/async-storage';

import {
    API_URL,
    ContentTypes,
    Endpoints
} from './Constants'
import SimpleToast from 'react-native-simple-toast';

export const handleLogin = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    try { 
        const response = await fetch.post(
            Endpoints.AuthProfile.Login,
            formData.toString(),
            'Login Request',
            null,
            ContentTypes.XUrlEncodedFormData
        )
    
        if (response?.code === 200) {
            AsyncStorage.setItem('token', response?.token).then(()=> {
                return response?.data
            })
        } else if (response?.code === 400) {
            SimpleToast.show(response?.message)
            return null
        }
    } catch (e) {
        throw e
    }

}


export const handleSignup = (email, password) => {

}