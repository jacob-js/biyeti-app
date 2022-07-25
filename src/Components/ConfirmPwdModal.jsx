import React from 'react'
import { AlertDialog, Button, Center } from "native-base";
import { CommonInput } from '../Commons/commons';

const ConfirmPwdModal = ({ isOpen, setIsOpen, onClose, handleChange, cb }) => {
  
    const cancelRef = React.useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Entrer votre mot de passe pour confirmer</AlertDialog.Header>
            <AlertDialog.Body>
              <CommonInput onChangeText={handleChange} placeholder="Mot de passe" secureTextEntry={true} />
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Annuler
                </Button>
                <Button colorScheme="danger" bgColor="green.600" onPress={() => { cb(); setIsOpen(false) }}
                isLoadingText="Suppression">
                  Confirmer
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
}

export default ConfirmPwdModal