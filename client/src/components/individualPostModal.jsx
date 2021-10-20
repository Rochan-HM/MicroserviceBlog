import React, { useState } from "react";
import {
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
} from "@chakra-ui/react";
import { authActions } from "../redux/slices/authSlice";

import apiAxios from "../api/customAxios";

function IndividualPostModal({ isOpen, onOpen, onClose }) {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            console.log(email);
            console.log(password);
            const res = await apiAxios.post("/api/users/signin", {
                email,
                password,
            });
            const { jwt, user } = res.data;
            dispatch(authActions.login({ jwt, user }));
            toast({
                title: "Logged In Successfully",
                status: "success",
                isClosable: true,
            });
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.data);
            toast({
                title: "Unable to Publish Comment",
                description: err.response.data.errors[0].message,
                status: "error",
                isClosable: true,
            });
        }
    };

    const signup = async () => {
        try {
            const res = await apiAxios.post("/api/users/signup", {
                email,
                password,
            });
            const { jwt, user } = res.data;
            dispatch(authActions.login({ jwt, user }));
            toast({
                title: "Signed Up Successfully",
                status: "success",
                isClosable: true,
            });
        } catch (err) {
            console.log(err.response.data);
            toast({
                title: "Unable to Sign Up",
                description: err.response.data.errors[0].message,
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <VStack>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={login}>
                            Sign In
                        </Button>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            opacity={0.7}
                            onClick={signup}
                        >
                            Sign Up
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}

export default IndividualPostModal;
