import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonInput } from './commons'
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

const IosDateInput = ({setDate, date, error, label}) => {
    const [shownPicker, setShownPicker] = useState(false);

    const onConfirm = useCallback((params) =>{
        setDate(new Date(params.date));
        setShownPicker(false);
    })

  return (
    <View>
      <CommonInput
        label={label || "Date de naissance"}
        onPressIn={() =>setShownPicker(true)}
        placeholder="Date de naissance" uiType='rounded'
        leftIcon={<AntIcon name="calendar" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
        value={moment(date).format('DD-MM-YYYY')}
        error={error}
        editable={false}
        />
        <DatePickerModal
            visible={shownPicker}
            locale="en"
            onDismiss={() => setShownPicker(false)}
            mode="single"
            onConfirm={onConfirm}
            date={date}
            saveLabel="Valider"
        />
    </View>
  )
};

export function IosTimeInput({date, setDate, error, label}) {
    const [shownPicker, setShownPicker] = useState(false);

    return(
        <View>
            <CommonInput
                label={label || "Heure"}
                onPressIn={() =>setShownPicker(true)}
                placeholder="Date de naissance" uiType='rounded'
                leftIcon={<AntIcon name="clockcircleo" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />}
                value={moment(date).format('HH:mm')}
                error={error}
                editable={false}
            />
            <TimePickerModal
                visible={shownPicker}
                hours={date.getHours()}
                minutes={date.getMinutes()}
                label="Choisir l'heure"
                animationType='slide'
                onDismiss={() => setShownPicker(false)}
                onConfirm={value => {
                    setDate(moment(date).set({hour: value.hours, minute: value.minutes}).toDate());
                    setShownPicker(false);
                }}
                confirmLabel="Valider"
                cancelLabel='Annuler'
            />
        </View>
    )
}

export default IosDateInput