import React from "react";
import {
    VStack,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Center,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/slices/authSlice";

import apiAxios from "../api/customAxios";

function LoggedInModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const signout = async () => {
        try {
            const res = await apiAxios.post("/api/users/signout");
            dispatch(authActions.logout());
            toast({
                title: "Logged Out Successfully",
                status: "success",
                isClosable: true,
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <VStack>
            <Button onClick={onOpen}>Profile</Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign Out</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <VStack>
                                <Text m={5}>Hello {user.email}!</Text>
                                <Button colorScheme="red" onClick={signout}>
                                    Sign Out
                                </Button>
                            </VStack>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}

export default LoggedInModal;
