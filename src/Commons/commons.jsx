import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import React from 'react'
import { theme } from '../../assets/theme'

export function CommonInput({ label, onChangeText, value, error, type, kType, placeholder, rightIcon, leftIcon, required, onBlur, style }) {
    return (
        <FormControl isRequired={required} style={{ marginBottom: 20, ...style }} isInvalid={error}>
            {/* <FormControl.Label>{label}</FormControl.Label> */}
            <Input  onBlur={onBlur} _focus={{
                borderBottomColor: theme.colors.default
            }} value={value} defaultValue={value} onChangeText={onChangeText} style={{ paddingLeft: 20, borderWidth: 5 }} 
                type={type} keyboardType={kType} placeholder={placeholder || label} InputRightElement={rightIcon} InputLeftElement={leftIcon}
                variant='underlined'
                // borderColor={error ? 'danger.700' : 'black'}
                borderBottomWidth={2}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}> {error} </FormControl.ErrorMessage>
        </FormControl>
    )
}