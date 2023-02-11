import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useFormik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../../../../Commons/commons';
import { Button, FormControl, Select, WarningOutlineIcon } from 'native-base';
import { useState } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import {theme} from '../../../../../assets/theme';
import * as yup from 'yup';
import DatePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux';
import { getCategorys, updateEventAction } from '../../../../Redux/actions/events';
import moment from 'moment';
import { MessageAlert } from '../../../../Utils/feedbacks';
import { useNavigation } from '@react-navigation/native';
import { getAgentsAction } from '../../../../Redux/actions/agents';
import { isEventAdmin } from '../../../../Utils/helpers';
import IosDateInput, { IosTimeInput } from '../../../../Commons/IosDateTimeInput';
import { DashboardEventContext } from '../../../../Utils/contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const fields = [
    {
        name: 'name',
        label: 'Nom',
    },
    {
        name: 'category',
        label: 'Catégorie',
        type: 'select',
        value: 3
    },
    {
        name: 'location',
        label: 'Lieu',
        icon: <EvilIcon name='location' size={20} color={theme.colors.light} style={{ marginLeft: 15 }} />
    },
    {
        name: 'event_date',
        type: 'date',
        label: 'Date de l\'événement',
        placeholder: 'Date de l\'événement',
        value: new Date()
    },
    {
        name: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Decrivez votre événement',
    }
];

const schema = yup.object({
    name: yup.string().required('Le nom de l\'événement est obligatoire'),
    category: yup.string().required('La catégorie est obligatoire'),
    description: yup.string().required('La description est obligatoire'),
    image: yup.string().required('La photo est obligatoire'),
    event_date: yup.date().required('La date est obligatoire')
})

const EditEvent = ({route}) => {
    const { event } = route.params;
    const navigation = useNavigation();
    const [image, setImage] = useState(event.cover);
    const [shownPicker, setShownPicker] = useState(false);
    const [shownPickerTime, setShownPickerTime] = useState(false);
    const [ apiError, setError ] = useState([]);
    const { loading, error } = useSelector(({ events: { updateEvent } }) =>updateEvent);
    const { data: categorys, loading: loadingCateg } = useSelector(({ events: { categorys } }) =>categorys);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: fields?.reduce((acc, field) => ({ ...acc, [field.name]: event[field.name] }), { image: event.cover }),
        onSubmit: values => updateEventAction(event.id, {
            ...values,
            event_date: moment(values.event_date).format('YYYY-MM-DD HH:mm:ss')
        })(dispatch, navigation),
        validationSchema: schema,
        validateOnBlur: true
    });
    const { values, handleChange, touched, errors, setFieldValue, handleSubmit } = formik;
    const { rows: eventMembers } = useSelector(({ agents: { agents }}) => agents);
    const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser); 

    useEffect(() =>{
        getCategorys(dispatch);
        getAgentsAction(null, event.id)(dispatch, navigation);
    }, []);

    useEffect(() =>{
        (() =>{
            setFieldValue('event_date', moment(event.event_date).toDate());
        })()
    }, [event]);

    useEffect(() =>{
        (() =>{
            setError(error)
        })()
    }, [error]);

    const getError = (field) =>{
        return apiError[field]
    }

    const pickImage = async() => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true
        });
        if (!res.canceled) {
            setImage(res.assets[0]);
            setFieldValue('image', `data:image/jpeg;base64,${res.assets[0]?.base64}`);
        }
    }

    const onDateChange = (event, date) =>{
        setShownPicker(false);
        if(date) setFieldValue('event_date', date);
    };
    const onTimeChange = (event, date) =>{
        setShownPickerTime(false);
        if(date) setFieldValue('event_date', date);
    };

    const availableChange = () =>{
        return fields.filter(field => field.name !== 'event_date')
                    .some(field => values[field.name] !== event[field.name]) || event.cover !== image || moment(event.event_date).toDate().toLocaleString() !== values.event_date.toLocaleString();
    };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{
        paddingBottom: 50
    }}>
        <>
            {
            typeof(apiError) === 'string' && typeof(error) === 'string' &&
            <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
            }
            <FormControl isRequired isInvalid={errors.image} style={{ marginBottom: 15 }}>
                <View style={[styles.imageBox, errors.image && { borderColor: 'red' }]}>
                    {
                        image ?
                        <>
                            <Image source={typeof(image) === 'string' ? {uri: image}: image} style={styles.image} />
                            <TouchableOpacity onPress={() =>pickImage(setFieldValue)} style={styles.editPic}>
                                <AntIcon name="camera" size={30} color="black" style={styles.editIcon} />
                            </TouchableOpacity>
                        </>
                        :
                        <TouchableOpacity onPress={() =>pickImage(setFieldValue)} style={{ alignItems: 'center' }}>
                            <AntIcon name='picture' size={50} style={styles.icon} />
                            <Text style={styles.text}>Ajouter une image</Text>
                        </TouchableOpacity>
                    }
                </View>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}> {errors.cover} </FormControl.ErrorMessage>
            </FormControl>
            {fields.map((field, index) => (
                field.name === 'category' ?
                <CommonSelect key={field.name} error={errors.category}
                    label={field.label} onValueChange={value => setFieldValue(field.name, value)}
                    uiType='rounded'
                    value={values[field.name]}
                >
                    {
                        categorys.map((category, index) =>(
                            <Select.Item label={category.name} value={category.id} key={index} />
                        ))
                    }
                </CommonSelect>:
                field.type === 'text' ?
                <CommonTextArea key={field.name} required 
                    error={errors[field.name]} onChangeText={handleChange(field.name)} 
                    placeholder={field.placeholder}
                    label={field.label}
                    uiType='rounded'
                    value={values[field.name]}
                />:
                field.type === 'date' ?
                <>
                    {
                        Platform.OS !== 'ios' ?
                        <View style={styles.date}>
                            <CommonInput 
                                onPressIn={setShownPicker} label={field.label} 
                                placeholder={field.placeholder} uiType='rounded'
                                leftIcon={<AntIcon name="calendar" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                                value={moment(values.event_date).format('DD/MM/YYYY')}
                                style={{
                                    width: '50%'
                                }}
                            />
                            {
                                shownPicker &&
                                <DatePicker
                                    value={moment(values.event_date).toDate()}
                                    mode="datetime"
                                    format="YYYY-MM-DD"
                                    minDate={new Date()}
                                    is24Hour={true}
                                    onChange={(event, date) =>onDateChange(event, date, setFieldValue)}
                                />
                            }
                            <CommonInput 
                                onPressIn={setShownPickerTime} label='Heure' 
                                placeholder={field.placeholder} uiType='rounded'
                                leftIcon={<AntIcon name="clockcircleo" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                                value={moment(values.event_date).format('HH:mm')}
                                style={{
                                    width: '40%'
                                }}
                            />
                            {
                                shownPickerTime &&
                                <DatePicker
                                    value={moment(values.event_date).toDate()}
                                    mode="time"
                                    format="HH:mm"
                                    minDate={new Date()}
                                    is24Hour={true}
                                    onChange={(event, date) =>onTimeChange(event, date, setFieldValue)}
                                />
                            }
                        </View>:
                        <View style={styles.date}>
                            <View
                                style={{
                                    width: '50%'
                                }}
                            >
                                <IosDateInput
                                    date={moment(values.event_date).toDate()}
                                    setDate={(date) => setFieldValue('event_date', date)}
                                    error={errors.event_date}
                                    label={field.label}
                                />
                            </View>
                            <View
                                style={{
                                    width: '40%'
                                }}
                            >
                                <IosTimeInput
                                    date={moment(values.event_date).toDate()}
                                    setDate={(date) => setFieldValue('event_date', date)}
                                    error={errors.event_date}
                                />
                            </View>
                        </View>
                    }
                </>
                :
                <CommonInput key={index} required 
                    error={errors[field.name]} onChangeText={handleChange(field.name)} 
                    placeholder={field.placeholder}
                    label={field.label}
                    leftIcon={field.icon}
                    value={values[field.name]}
                />
            ))}                    
            {
                isEventAdmin(user, eventMembers) &&
                <>
                    <Button isLoading={loading} 
                        isLoadingText={<Text style={{ color: 'white' }}>Enregistrement...</Text>} 
                        style={[styles.submitBtn, !availableChange() && styles.disabledBtn]} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }} 
                        onPress={handleSubmit}
                        disabled={!availableChange()}
                    >Enregistrer les modifications</Button>
                </>
            }
        </>
    </KeyboardAwareScrollView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 40
    },
    imageBox: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Barlow'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15
    },
    editPic: {
        position: 'absolute',
        bottom: -20,
        left: '45%',
        backgroundColor: 'gray',
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editIcon: {
        color: 'white'
    },
    submitBtn: {
        height: 50,
        backgroundColor: theme.colors.default100,
        borderRadius: 15,
        marginTop: 10
    },
    disabledBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteBtn: {
        height: 50,
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 15,
    }
})

export default EditEvent