import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { theme } from '../../assets/theme'
import { Formik } from 'formik'
import { Avatar, Button, Select } from 'native-base'
import { CommonInput, CommonSelect } from '../Commons/commons'
import moment from 'moment'
import DatePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { updateProfileAction } from '../Redux/actions/auth'
import { MessageAlert } from '../Utils/feedbacks'

const schema = yup.object({
  firstname: yup.string().required('Ce champ est obligatoire'),
  lastname: yup.string().required('Ce champ est obligatoire'),
  email: yup.string().email('Ce champ doit être un email valide').required('Ce champ est obligatoire'),
  phone_number: yup.string().required("Ce champ est obligatoire").min(9, 'numéro de téléphone invalid')
                  .matches(/[0-9]+$/, "numéro de téléphone invalid"),
  date_of_birth: yup.date(),
})

export default function EditProfile({navigation}) {
  const { data: user } = useSelector(({ users: {currentUser} }) =>currentUser);
  const { loading, error } = useSelector(({ users: {updateProfile} }) =>updateProfile);
  const [ apiError, setError ] = useState({});
  const [shownPicker, setShownPicker] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{
    (() =>{
        setError(error)
    })()
  }, [error]);

  const getError = (field) =>{
    return apiError[field]
  }

  const pickImage = async(setField) => {
    const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true
    });
    if (!res.cancelled) {
        setField('avatar', `data:image/jpeg;base64,${res.base64}`);
    }
  }

  const onDateChange = (event, date, setField) =>{
    setShownPicker(false);
    if(date){
        setField('date_of_birth', moment(date).format('YYYY-MM-DD'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <View style={styles.headerTop}>
              <AntIcon name='arrowleft' style={styles.topIcon} onPress={() => navigation.goBack()} />
              <Text style={[styles.title]}>Modifier mes informations</Text>
          </View>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        {
          typeof(apiError) === 'string' && typeof(error) === 'string' &&
          <MessageAlert msg={error.toString()} onClose={() =>setError({})} status='error' />
        }
      <Formik
        initialValues={{
          firstname: user.firstname, lastname: user.lastname, email: user.email, phone_number: user.phone_number,
          date_of_birth: user.date_of_birth, avatar: user.avatar, gender: user.gender, city: user.city
        }}
        validationSchema={schema}
        onSubmit={values => updateProfileAction(values)(dispatch, navigation)}
      >
        {
          ({handleSubmit, errors, handleChange, touched, setFieldValue, values}) =>(
            <>
              <View style={styles.avatarContainer}>
                <Avatar bg="light.200"
                    source={values.avatar &&{
                      uri: values.avatar
                    }}
                    style={styles.avatar}
                    size='2xl'
                    borderColor='#fff'
                    borderWidth={2}
                >
                    <SIcon name='user' size={50} color="gray" />
                </Avatar>
                <TouchableOpacity style={styles.editPic} onPress={() =>pickImage(setFieldValue)}>
                  <MIcon name='image-edit-outline' style={styles.editPicIcon} />
                </TouchableOpacity>
              </View>

              <CommonInput required error={touched.firstname && errors.firstname || error?.firstname} 
                onChangeText={handleChange('firstname')} value={values.firstname} label="Nom"
                  placeholder='Nom' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
              <CommonInput required error={touched.lastname && errors.lastname} onChangeText={handleChange('lastname')} 
                  placeholder='Post-nom' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' 
                  style={{ marginLeft: 15 }} />} label="Post-nom" value={values.lastname}
                />
              <CommonInput required error={touched.email && errors.email || getError('email')} kType='email-address' 
                onChangeText={handleChange('email')} value={values.email} label="Email"
                placeholder='Email' leftIcon={<FIcon name="mail" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
              />
              <CommonInput error={touched.phone_number && errors.phone_number || getError('phone_number')} kType='phone-pad' 
                onChangeText={handleChange('phone_number')} value={values.phone_number} label="Téléphone"
                required
                placeholder='Téléphone' leftIcon={<FIcon name="phone" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
              <CommonSelect
                  label="Sexe" onValueChange={value => setFieldValue('gender', value)}
                  uiType='rounded'
                  value={values.gender}
                  leftIcon={
                    <MIcon name='human-male-female' size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />
                  }
              >
                <Select.Item label="Masculin" value="Masculin" key="Masculin" />
                <Select.Item label="Feminin" value="Feminin" key="F" />
                <Select.Item label="Autre" value="Autre" key="a" />
              </CommonSelect>
              <CommonInput
                label="Ville"
                placeholder="Ville" uiType='rounded'
                leftIcon={<SIcon name="location-pin" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                value={values.city}
                error={touched.city && errors.city || getError('city')}
                onChangeText={handleChange('city')}
              />
              <CommonInput
                label="Date de naissance"
                onPressIn={() =>setShownPicker(true)}
                placeholder="Date de naissance" uiType='rounded'
                leftIcon={<AntIcon name="calendar" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                value={moment(values.date_of_birth).format('DD-MM-YYYY')}
                error={touched.date_of_birth && errors.date_of_birth || getError('date_of_birth')}
              />
              {
                  shownPicker === true &&
                  <DatePicker
                      value={new Date(values.date_of_birth) || new Date(new Date().getFullYear() - 18, 1, 1)}
                      mode="datetime"
                      format="YYYY-MM-DD"
                      minDate={new Date()}
                      is24Hour={true}
                      onChange={(event, date) =>onDateChange(event, date, setFieldValue)}
                  />
              }

              <View style={{
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%'
              }}>
                  <Button isLoading={loading} 
                    isLoadingText={<Text style={{ color: theme.colors.default100 }}>Patientez...</Text>}
                    style={styles.saveBtn} _text={{ fontWeight: 'bold', textTransform: 'uppercase', color: theme.colors.default }} 
                    onPress={() =>handleSubmit()}>
                      Enregistrer
                  </Button>
              </View>
            </>
          )
        }
      </Formik>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  header: {
      position: 'relative',
  },
  headerTop: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 20,
      paddingTop: 15
  },
  topIcon: {
      fontSize: 23,
      color: 'black'
  },
  title: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Barlow',
      fontWeight: 'bold',
      marginLeft: 50
  },
  form: {
    padding: 20,
    alignItems: 'center'
  },
  saveBtn: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.default,
    color: theme.colors.default,
    borderRadius: 15
  },
  avatarContainer: {
    marginBottom: 20
  },
  editPic: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'gray',
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editPicIcon: {
    color: 'white',
    fontSize: 20
  }
})