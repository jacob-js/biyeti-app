import { Alert, CloseIcon, HStack, IconButton, Text, Toast, VStack } from "native-base"

export const MessageAlert = ({status='error', msg, onClose}) =>{

    return(
        <Alert w="100%" status={status} marginY={2} variant="left-accent">
            <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between" alignItems="center">
                <HStack space={2} flexShrink={1}>
                <Alert.Icon />
                <Text fontSize="sm" color="coolGray.800" paddingRight={5}>
                    {msg}
                </Text>
                </HStack>
                {
                    onClose &&
                    <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} onPress={onClose} />}
            </HStack>
            </VStack>
        </Alert>
    )
}

export const showToast = (msg, type='success') =>{
    Toast.show({
        title: type === 'success' ? 'Succès' : type === 'error' ? 'Erreur': 'Alert',
        description: msg,
        duration: 3000,
        status: type,
        width: '80%',
        borderRadius: 15
    })
}