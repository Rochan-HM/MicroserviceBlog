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

function EditPostModal({
    oldTitle,
    oldBody,
    fetchPosts,
    postId,
    setHomeScreen,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [title, setTitle] = useState(oldTitle);
    const [body, setBody] = useState(oldBody);

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
            const res = await apiAxios.put(`/api/posts/${postId}`, {
                title,
                body,
            });

            toast({
                title: "Post Successfully Edited",
                status: "success",
                isClosable: true,
            });
            onClose();
            fetchPosts();
            setHomeScreen((prev) => !prev);
        } catch (err) {
            console.log(err.message);
            toast({
                title: "Unable to Edit Post",
                description: err.response.data.errors[0].message,
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <VStack>
            <Button onClick={onOpen} width="xs" colorScheme="blue">
                Edit Post
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
                                            value={title}
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
                                            value={body}
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
                            Edit
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

export default EditPostModal;
