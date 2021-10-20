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
    Input,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";

import apiAxios from "../api/customAxios";

function LoggedOutModal({ posts, setPosts }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    const submitPost = async () => {
        try {
            if (!title || title.length === 0) {
                toast({
                    title: "Title is required",
                    status: "error",
                    isClosable: true,
                });
                return;
            }
            const res = await apiAxios.post("/api/posts", {
                title,
                body,
            });

            toast({
                title: "Published Successfully",
                status: "success",
                isClosable: true,
            });
            onClose();
            setPosts([...posts, res.data]);
        } catch (err) {
            console.log(err.response.data);
            toast({
                title: "Unable to Publish Post",
                description: err.response.data.errors[0].message,
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <VStack>
            <Button onClick={onOpen} colorScheme="blue" m={10}>
                New Post
            </Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Stack spacing={4} p="1rem">
                                <FormControl>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <Textarea
                                            onChange={(e) =>
                                                setBody(e.target.value)
                                            }
                                            placeholder="Post Body"
                                            size="md"
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={submitPost}>
                            Publish
                        </Button>
                        <Button color="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}

export default LoggedOutModal;
