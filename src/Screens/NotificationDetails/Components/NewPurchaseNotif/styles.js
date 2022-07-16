import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/theme";

export default StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Barlow-Bold',
        textAlign: 'center',
        marginVertical: 15,
        fontSize: 18,
        fontWeight: 'bold'
    },
    body: {
        fontFamily: 'Barlow',
        textAlign: 'center',
        width: '60%'
    },
    btn: {
        height: 50,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 5,
        borderRadius: 15,
        marginTop: 20
    }
});