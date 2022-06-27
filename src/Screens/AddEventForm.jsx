import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { Form, Formik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../Commons/commons';
import { Button, FormControl, Select, WarningOutlineIcon } from 'native-base';
import { useState } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import * as ImagePicker from 'expo-image-picker';
import {theme} from '../../assets/theme';
import * as yup from 'yup';
import DatePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getCategorys } from '../Redux/actions/events';
import moment from 'moment';
import IosDateInput, { IosTimeInput } from '../Commons/IosDateTimeInput';
// import FormData from 'form-data';

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
        name: 'description',
        type: 'text',
        label: 'Description',
        placeholder: 'Decrivez votre événement',
    },
    {
        name: 'event_date',
        type: 'date',
        label: 'Date de l\'événement',
        placeholder: 'Date de l\'événement',
        value: new Date()
    }
];

const schema = yup.object({
    name: yup.string().required('Le nom de l\'événement est obligatoire'),
    category: yup.string().required('La catégorie est obligatoire'),
    description: yup.string().required('La description est obligatoire'),
    image: yup.string().required('La photo est obligatoire'),
    event_date: yup.date().required('La date est obligatoire')
})

export default function AddEventForm({navigation}) {
    const [image, setImage] = useState(null);
    const [shownPicker, setShownPicker] = useState(false);
    const [shownPickerTime, setShownPickerTime] = useState(false);
    const { loading, error } = useSelector(({ events: { createEvent } }) =>createEvent);
    const { data: categorys, loading: loadingCateg } = useSelector(({ events: { categorys } }) =>categorys);
    const dispatch = useDispatch();
    const date = new Date()

    useEffect(() =>{
        getCategorys(dispatch);
    }, [navigation])

    const pickImage = async(setField) => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true
        });
        if (!res.cancelled) {
            setImage(res);
            setField('image', `data:image/jpeg;base64,${res.base64}`);
        }
    }

    const onDateChange = (event, date, setField) =>{
        setShownPicker(false);
        if(date) setField('event_date', date);
    };
    const onTimeChange = (event, date, setField) =>{
        setShownPickerTime(false);
        setField('event_date', date)
    };
    const submitForm = (values) =>{
        createEventAction({
            ...values,
            event_date: moment(values.event_date).format('YYYY-MM-DD HH:mm:ss')
        })(dispatch, navigation);
    }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Formik
            initialValues={fields?.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), { image: '' })}
            onSubmit={submitForm}
            validationSchema={schema}
            validateOnBlur
          >
              {({ handleSubmit, errors, handleChange, setFieldValue, values }) =>(
                  <>
                    <FormControl isRequired isInvalid={errors.image} style={{ marginBottom: 15 }}>
                        <View style={[styles.imageBox, errors.image && { borderColor: 'red' }]}>
                            {
                                image ?
                                <>
                                    <Image source={image} style={styles.image} />
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
                                            value={values.event_date}
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
                                            value={values.event_date}
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
                                            date={new Date(values.event_date) || new Date(new Date().getFullYear() - 18, 1, 1)}
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
                                            date={new Date(values.event_date) || new Date(new Date().getFullYear() - 18, 1, 1)}
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
                        />
                    ))}                    
                    <Button isLoading={loading} 
                        isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>} 
                        style={styles.submitBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase' }} 
                        onPress={handleSubmit}
                    >Enregistrer</Button>
                  </>
              )}
          </Formik>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
        shadowOpacity: 0.4,
        shadowColor: theme.colors.default, 
        elevation: 15,
        borderRadius: 15,
        marginTop: 10
    },
    date: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
})