import { FormControl, Input, Select, TextArea, WarningOutlineIcon } from 'native-base'
import React, { useRef } from 'react'
import { theme } from '../../assets/theme'
import PhoneInput from 'react-native-phone-number-input';
import { theme as nbTheme } from 'native-base';

export function CommonInput(props) {
    const { label, onChangeText, value, error, type, kType,
        placeholder, rightIcon, leftIcon, required, 
        onBlur, style, maxLength,
        uiType
    } = props;

    return (
        <FormControl isRequired={required} style={{ marginBottom: 10, ...style }} isInvalid={error}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Input  onBlur={onBlur} _focus={{
                borderBottomColor: theme.colors.default,
                borderColor: theme.colors.default
            }} value={value} defaultValue={value} onChangeText={onChangeText}
                type={type} keyboardType={kType} placeholder={placeholder || label} InputRightElement={rightIcon} InputLeftElement={leftIcon}
                variant={uiType || 'rounded'}
                borderBottomWidth={2}
                maxLength={maxLength}
                rounded={15}
                borderRadius={15}
                height="45px"
                {...props}
            />
            <FormControl.ErrorMessage my="0px" leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
};

export function CommonSelect(props) {
    const { label, onValueChange, value, error,
        placeholder, required,
        style,
        uiType
    } = props;

    return (
        <FormControl isRequired={required} style={{ marginBottom: 10, ...style }} isInvalid={error}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Select _focus={{
                borderBottomColor: theme.colors.default,
                borderColor: theme.colors.default
            }} value={value} defaultValue={value} onValueChange={onValueChange} style={{ paddingLeft: 20 }} 
                placeholder={placeholder || label}
                variant={uiType || 'underlined'}
                borderBottomWidth={2}
                borderRadius={15}
                height="45px"
                selectedValue={value}
                {...props}
            >
                {props.children}
            </Select>
            <FormControl.ErrorMessage my="0px" marginTop={0} leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
};

export const CommonTextArea = (props) => {
    const { label, onChangeText, value, error,
        placeholder, required,
        style,
        uiType,
        onBlur
    } = props;

    return (
        <FormControl isRequired={required} style={{ marginBottom: 10, ...style }} isInvalid={error}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <TextArea onBlur={onBlur} _focus={{
                borderBottomColor: theme.colors.default,
                borderColor: theme.colors.default
                }}
                value={value} defaultValue={value} 
                onChangeText={onChangeText} style={{ paddingLeft: 20 }} 
                placeholder={placeholder || label}
                variant={uiType || 'underlined'}
                borderBottomWidth={2}
                borderRadius={15}
            />
            <FormControl.ErrorMessage my="0px" leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
}

export const CommonPhoneInput = ({ value, setFieldValue, error, required }) => {
    const phoneInput = useRef(null);
    return(
        <FormControl style={{ marginBottom: 10 }} isRequired={required} isInvalid={error}>
            <PhoneInput
                ref={phoneInput}
                value={value}
                defaultValue={value}
                defaultCode="CD"
                onChangeFormattedText={(phone_number) => setFieldValue('phone_number', phone_number)}
                containerStyle={{
                    borderWidth: 1, borderRadius: 15, borderColor: error ? nbTheme.colors.danger[600] : nbTheme.colors.gray[300],
                    height: 45,
                    width: '100%',
                    borderBottomWidth: 2
                }}
                textContainerStyle={{ backgroundColor: null,
                    padding: 0,
                    paddingTop: 10,
                    paddingLeft: 0
                }}
                textInputStyle={{
                    marginBottom: -3,
                    fontFamily: 'Barlow'
                }}
                codeTextStyle={{ marginBottom: -3, fontFamily: 'Barlow' }}
                placeholder="Numéro de téléphone"
            />
            <FormControl.ErrorMessage my="0px" marginTop={-3} leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
}