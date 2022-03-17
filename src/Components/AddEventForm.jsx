import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import { CommonInput, CommonSelect, CommonTextArea } from '../Commons/commons';
import { Button, FormControl, Select, WarningOutlineIcon } from 'native-base';
import { useState } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import {theme} from '../../assets/theme';
import * as yup from 'yup';

const fields = [
    {
        name: 'name',
        label: 'Nom',
    },
    {
        name: 'category',
        label: 'Catégorie',
        type: 'select'
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
    cover: yup.object().required('La photo est obligatoire'),
})

export default function AddEventForm() {
    const [image, setImage] = useState(null);

    const pickImage = async(setField) => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1
        });
        if (!res.cancelled) {
            setImage(res);
            setField('cover', res)
        }
    }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Formik
            initialValues={fields?.reduce((acc, field) => ({ ...acc, [field.name]: '' }), { cover: '' })}
            onSubmit={values => console.log(values)}
            validationSchema={schema}
            validateOnBlur
          >
              {({ handleSubmit, errors, handleChange, setFieldValue }) =>(
                  <>
                    <FormControl isRequired isInvalid={errors.cover} style={{ marginBottom: 15 }}>
                        <View style={[styles.imageBox, errors.cover && { borderColor: 'red' }]}>
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
                            label={field.label} onValueChange={handleChange(field.name)}
                            uiType='rounded'
                        >
                            <Select.Item label="Culture" value="culture" />
                        </CommonSelect>:
                        field.type === 'text' ?
                        <CommonTextArea key={field.name} required 
                            error={errors[field.name]} onChangeText={handleChange(field.name)} 
                            placeholder={field.placeholder}
                            label={field.label}
                            uiType='rounded'
                        />:
                        <CommonInput key={index} required 
                            error={errors[field.name]} onChangeText={handleChange(field.name)} 
                            placeholder={field.placeholder}
                            label={field.label}
                            uiType='rounded'
                        />
                    ))}
                    <Button isLoading={false} 
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
    }
})