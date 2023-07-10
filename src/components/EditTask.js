import React, { useState } from 'react';
import { IconButton, Input, useToast, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import supabase from '../supabase';
import { FiEdit } from 'react-icons/fi';

export default function EditTask({ id }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const cancelRef = React.useRef();
  const toast = useToast();

  async function handleSubmit() {
    setIsConfirmationOpen(false);

    setLoading(true);
    const { data, error } = await supabase.from('todos').update({ text }).eq('id', id).select();

    setLoading(false);
    setText('');

    toast({
      title: error || 'Task updated!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
  }

 

  return (
    <>
      <IconButton
        isRound
        icon={<FiEdit />}
        onClick={() => setIsConfirmationOpen(true)}
        isLoading={loading}
      />

      <AlertDialog
        isOpen={isConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit Task
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Edit task"
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsConfirmationOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="teal" ml={3} onClick={handleSubmit}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
