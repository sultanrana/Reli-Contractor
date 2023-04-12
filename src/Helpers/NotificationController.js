import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment'
import axios from 'axios';


const FCM_URL_LEGACY = 'https://fcm.googleapis.com/fcm/send'
const SERVER_API_KEY = 'AAAAPl6CbTc:APA91bFEgY3J5Wd8MRuJmEmOl16vCaXjItxHFJKiiyt7DNpzPuQmDQJSsruDPov3vz5IWpf-lFLBAnjnJMSXVw1mLEWi_W_gOoSo1vcHRSOJM5impRmUglLo6SNXU538_ENdBdJdn00v'

const sendNotificationWithFCM = (data) => {
    const body = {
        "to": data.fcmToken,
        "notification": {
            "title": `${data?.title}` || '',
            "body": `${data?.message}` || ''
        },
        "data":  data?.details
    }

    // fetch(FCM_URL_LEGACY, {
    //     method: 'POST',
    //     headers: {
    //         "Authorization": `key=${SERVER_API_KEY}`,
    //         "Content-Type": 'application/json',
    //     },
    //     body: body
    // }).then(response => {
    //     console.log('API', 'sendNotificationWithFCM.status', response.status);
    // }).catch(error => {
    //     console.log('API', 'sendNotificationWithFCM-error', error);
    // });

    axios.post(FCM_URL_LEGACY, body, {
        headers: {
            "Authorization": `key=${SERVER_API_KEY}`,
            "Content-Type": 'application/json',
        }
    }).then(response => {
        console.log('API', 'sendNotificationWithFCM.status', response.status);
    }).catch(error => {
        console.log('API', 'sendNotificationWithFCM-error', error);
    });
}




const NotificationController = {
    sendNotificationWithFCM,
}

export default NotificationController;