import { StyleSheet } from "react-native";
import { theme } from "../../../assets/theme";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20
    },
    outlineBtn: {
        height: 50,
        borderColor: theme.colors.default100,
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: 'white'
    }
})