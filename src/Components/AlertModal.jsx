import React from "react";
import { AlertDialog, Button, Center } from "native-base";

const AlertModal = ({ isOpen, setIsOpen, title, alertBody, onDelete, loading }) => {
  
    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef(null);
    return <Center>
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{title}</AlertDialog.Header>
            <AlertDialog.Body>
              {alertBody}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Annuler
                </Button>
                <Button colorScheme="danger" bgColor="danger.700" onPress={onDelete} isLoading={loading} isLoadingText="Suppression">
                  Supprimer
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
};

export default AlertModal;