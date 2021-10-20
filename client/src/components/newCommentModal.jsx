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

function NewCommentModal({ postId, comments, setComments }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [newComment, setnewComment] = useState();

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

            const res = await apiAxios.post(`/api/comments`, {
                body: newComment,
                postId,
            });

            setComments([...comments, res.data]);
            onClose();
        } catch (e) {
            toast({
                title: "Unable to Fetch Comments",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    return (
        <VStack>
            <Button onClick={onOpen} colorScheme="blue" width="md">
                New Comment
            </Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <Stack spacing={4} p="1rem">
                                <FormControl>
                                    <InputGroup>
                                        <Input
                                            type="text"
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

export default NewCommentModal;
