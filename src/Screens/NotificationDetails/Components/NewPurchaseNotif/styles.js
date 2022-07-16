import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/theme";

export default StyleSheet.create({
    qrContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Barlow',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    body: {
        fontFamily: 'Barlow',
        textAlign: 'center'
    },
    btn: {
        height: 50,
        backgroundColor: theme.colors.default100,
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15,
        marginTop: 20
    }
});