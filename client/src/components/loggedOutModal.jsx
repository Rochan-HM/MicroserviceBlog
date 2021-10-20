import React, { useState } from "react";
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
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Stack,
    chakra,
    useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/slices/authSlice";

import apiAxios from "../api/customAxios";

function LoggedOutModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleShowClick = () => setShowPassword(!showPassword);

    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);

    const dispatch = useDispatch();

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
            toast({
                title: "Unable to Log In",
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
            <Button onClick={onOpen}>Profile</Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Stack spacing={4} p="1rem">
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <CFaUserAlt color="gray.300" />
                                            }
                                        />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={
                                                <CFaLock color="gray.300" />
                                            }
                                        />
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                onClick={handleShowClick}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>

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

export default LoggedOutModal;
