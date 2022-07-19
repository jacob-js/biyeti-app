import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../../../../assets/theme";

export default StyleSheet.create({
    ticket: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    ticketAvatar: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.light100,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    vipIcon: {
        width: 30,
        height: 30
    },
    ticketIcon: {
        fontSize: 25,
        color: theme.colors.light
    },
    ticketInfo: {
        marginLeft: 10,
        paddingTop: 10
    },
    ticketName: {
        color: theme.colors.light,
        fontFamily: 'Barlow-Bold',
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    ticketDesc: {
        fontFamily: 'Barlow',
        paddingRight: 20,
        marginTop: 5,
        width: Dimensions.get('window').width * 60 / 100
    },
    ticketPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gold
    }
})