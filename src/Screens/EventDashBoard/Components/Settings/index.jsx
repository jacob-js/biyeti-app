import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react';
import FeatIcon from 'react-native-vector-icons/Feather';
import { theme } from '../../../../../assets/theme';
import { theme as nbTheme } from 'native-base';
import AlertModal from '../../../../Components/AlertModal';
import { deleteEventAction } from '../../../../Redux/actions/events';
import { DashboardEventContext } from '../../../../Utils/contexts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const { event } = useContext(DashboardEventContext);
    const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading: loadingDelete } = useSelector(({ events: { deleteEvent } }) =>deleteEvent);

    const menus = [
        {
            label: "Editer l'événement",
            icon: "edit-2",
            key: "EditEvent"
        },
        {
            label: "Options de payement",
            icon: "credit-card",
            key: "PaymentOptions",
            disabled: true
        }
    ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menus}>
            {
                menus.map(menu => (
                    <TouchableOpacity style={styles.menu} disabled={menu.disabled}>
                        <View style={[styles.icon, menu.disabled && styles.disabled]}>
                            <FeatIcon name={menu.icon} size={20} style={[ menu.disabled && styles.disabled ]} />
                        </View>
                        <Text style={[styles.label, menu.disabled && styles.disabled]}>{menu.label}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
        <TouchableOpacity onPress={() => setDeleteAlertVisible(true)}>
            <View style={styles.menu}>
                <View style={styles.icon}>
                    <FeatIcon name="trash" size={20} color={nbTheme.colors.danger[700]} />
                </View>
                <Text style={styles.deleteLabel}>Supprimer l'événement</Text>
            </View>
        </TouchableOpacity>
        <AlertModal
            title="Attention"
            alertBody="Vous êtes sur le point de supprimer cet événement. Cette action est irréversible."
            setIsOpen={setDeleteAlertVisible}
            isOpen={deleteAlertVisible}
            onDelete={() => deleteEventAction(event.id)(dispatch, navigation)}
            loading={loadingDelete}
        />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: nbTheme.colors.light[300],
        padding: 10
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: theme.colors.light100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    label: {
        marginLeft: 10,
        fontFamily: 'Barlow',
    },
    deleteLabel: {
        fontFamily: 'Barlow',
        color: nbTheme.colors.danger[700],
        marginLeft: 10
    },
    disabled: {
        color: nbTheme.colors.light[400]
    }
});

export default Settings