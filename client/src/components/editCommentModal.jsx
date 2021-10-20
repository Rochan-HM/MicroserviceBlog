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
    useToast,
} from "@chakra-ui/react";

import apiAxios from "../api/customAxios";

function EditCommentModal({ id, postId, body, getComments }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [newComment, setnewComment] = useState(body);

    const submitComment = async () => {
        try {
            if (!newComment) {
                toast({
                    title: "Comment is Required",
                    status: "error",
                    isClosable: true,
                });
                return;
            }

            const res = await apiAxios.put(`/api/comments/${id}`, {
                body: newComment,
            });

            toast({
                title: "Comment Successfully Edited",
                status: "success",
                isClosable: true,
            });
            onClose();
            getComments();
        } catch (e) {
            toast({
                title: "Unable to Edit Comments",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <VStack>
            <Button onClick={onOpen} colorScheme="gray">
                Edit
            </Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Stack spacing={4} p="1rem">
                                <FormControl>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            value={newComment}
                                            placeholder="Comment"
                                            onChange={(e) =>
                                                setnewComment(e.target.value)
                                            }
                                            required={true}
                                        />
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={submitComment}
                        >
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

export default EditCommentModal;
