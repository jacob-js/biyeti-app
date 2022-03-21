import { Alert, CloseIcon, HStack, IconButton, Text, VStack } from "native-base"

export const MessageAlert = ({status='error', msg, onClose}) =>{

    return(
        <Alert w="100%" status={status} marginBottom={3} variant="left-accent">
            <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between" alignItems="center">
                <HStack space={2} flexShrink={1}>
                <Alert.Icon />
                <Text fontSize="sm" color="coolGray.800">
                    {msg}
                </Text>
                </HStack>
                <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} onPress={onClose} />
            </HStack>
            </VStack>
        </Alert>
    )
}