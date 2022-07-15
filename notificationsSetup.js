import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () =>({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
});

const getPushToken = async () =>{
    try {
        const statusResult =  await Notifications.getPermissionsAsync()
        if (statusResult.granted) {
            return (await Notifications.getExpoPushTokenAsync()).data;
        }
        const permissionsResult = await Notifications.requestPermissionsAsync()
        if (permissionsResult.granted) {
            return (await Notifications.getExpoPushTokenAsync()).data;
        }
        return null;
    } catch (error) {
        return null
    }
}