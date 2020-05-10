import { ToastAndroid, Platform, AlertIOS } from 'react-native';

function toastFlash(params) {
    /* if (Platform.OS === 'android' ) {
        ToastAndroid.show(params.msg, 250)
    } else if (Platform.OS === 'web') {
        alert(params.msg)
    } else {
        AlertIOS.alert(params.msg);
    } */
}

export {toastFlash}