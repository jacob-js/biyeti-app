import { Dimensions, StyleSheet } from "react-native";
import { theme } from '../../../assets/theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingVertical: 20
    },
    searchView: {
      marginBottom: 20
    },
    search: {
      color: 'black',
    },
    section: {
      marginBottom: 20,
      paddingHorizontal: 20
    },
    sectionHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Barlow-Bold',
      textTransform: 'uppercase',
      color: theme.colors.light
    },
    showAll: {
      color: theme.colors.default100,
      fontFamily: 'Barlow',
      fontWeight: 'bold',
    },
    dot: {
      fontSize: 15,
      marginTop: 3,
      color: theme.colors.light
    },
    eventButtonText: {
      color: theme.colors.default,
      fontFamily: 'Barlow-Bold',
      fontSize: 16,
    },
    skeleton: {
      borderRadius: 15
    },
    categs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    loaders: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    loader: {
      width: (Dimensions.get('window').width - 50) / 2
    }
  });

export default styles