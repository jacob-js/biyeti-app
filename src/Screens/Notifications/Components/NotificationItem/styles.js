import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/theme";

export default StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    details: {
        marginLeft: 10
    },
    title: {
        fontFamily: 'Barlow'
    },
    body: {
        fontFamily: 'Barlow',
        fontSize: 13,
        width: '80%',
        color: theme.colors.light
    },
    date: {
        fontFamily: 'Barlow',
        fontWeight: 'bold',
        color: theme.colors.light,
        marginTop: 5,
        fontSize: 10
    },
    unread: {
        borderRightWidth: 5,
        borderRightColor: theme.colors.default
    }
})