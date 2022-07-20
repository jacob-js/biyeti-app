import { theme } from "native-base";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.darkBlue[700],
        padding: 15,
        borderRadius: 10
    },
    right: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    balanceBox: {
        width: '40%',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.gray[300],
        paddingLeft: 20
    },
    balance: {
        color: 'white',
        fontFamily: 'Barlow-Bold',
        fontSize: 20
    },
    title: {
        color: 'white',
        fontFamily: 'Barlow-Bold',
        fontSize: 17
    },
    currency: {
        color: theme.colors.light[300],
        fontFamily: 'Barlow'
    }
})