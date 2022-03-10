import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import React from 'react'
import { theme } from '../../assets/theme'

export function CommonInput(props) {
    const { label, onChangeText, value, error, type, kType, placeholder, rightIcon, leftIcon, required, onBlur, style, maxLength } = props;

    return (
        <FormControl isRequired={required} style={{ marginBottom: 10, ...style }} isInvalid={error}>
            {/* <FormControl.Label>{label}</FormControl.Label> */}
            <Input  onBlur={onBlur} _focus={{
                borderBottomColor: theme.colors.default
            }} value={value} defaultValue={value} onChangeText={onChangeText} style={{ paddingLeft: 20, borderWidth: 5 }} 
                type={type} keyboardType={kType} placeholder={placeholder || label} InputRightElement={rightIcon} InputLeftElement={leftIcon}
                variant='underlined'
                borderBottomWidth={2}
                maxLength={maxLength}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
}