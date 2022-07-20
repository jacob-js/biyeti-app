import { theme } from "native-base";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollViewContainer: {
        padding: 20
    },
    bottom: {
        padding: 20
    },
    btn: {
        backgroundColor: 'white',
        borderColor: theme.colors.green[600],
        borderWidth: 2,
        height: 50,
        borderRadius: 10
    }
});