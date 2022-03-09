import * as Font from 'expo-font';

export default useFonts = async() => await Font.loadAsync({
    'Barlow': require('../assets/fonts/Barlow-Regular.ttf'),
    'Barlow-Bold': require('../assets/fonts/Barlow-Bold.ttf'),
    'Barlow-SemiBold': require('../assets/fonts/Barlow-SemiBold.ttf'),
    'Barlow-Light': require('../assets/fonts/Barlow-Light.ttf'),
    'Barlow-Medium': require('../assets/fonts/Barlow-Medium.ttf'),
    'Barlow-Italic': require('../assets/fonts/Barlow-Italic.ttf'),
})