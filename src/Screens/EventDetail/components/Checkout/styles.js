import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/theme";

export default StyleSheet.create({
    flexFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wallet: {
        marginTop: 20
    },
    label: {
        marginBottom: 10,
        fontFamily: 'Barlow'
    },
    btn: {
        width: '100%',
        backgroundColor: theme.colors.default100,
        borderRadius: 10,
        marginTop: 15,
        height: 45
    }
});