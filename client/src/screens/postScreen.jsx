import { Button } from "@chakra-ui/button";
import { Box, Center, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import apiAxios from "../api/customAxios";
import EditCommentModal from "../components/editCommentModal";
import EditPostModal from "../components/editPostModal";
import NewCommentModal from "../components/newCommentModal";

function PostScreen({
    id,
    title,
    userId,
    body,
    setHomeScreen,
    homeScreen,
    fetchPosts,
}) {
    const [comments, setComments] = useState([]);
    const toast = useToast();

    const { user } = useSelector((state) => state.auth);

    const getComments = async () => {
        try {
            const res = await apiAxios.get(`/api/comments/${id}`);
            setComments(res.data);
            console.log(res.data);
        } catch (e) {
            toast({
                title: "Unable to Fetch Comments",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    const deletePost = async (postID) => {
        try {
            const res = await apiAxios.delete(`/api/posts/${postID}`);
            toast({
                title: "Successfully deleted post and asssociated comments",
                status: "success",
                isClosable: true,
            });
            setHomeScreen((prev) => !prev);
            fetchPosts();
        } catch (e) {
            toast({
                title: "Unable to Delete Post",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const res = await apiAxios.delete(`/api/comments/${commentId}`);
            toast({
                title: "Successfully deleted comment",
                status: "success",
                isClosable: true,
            });
            getComments();
        } catch (e) {
            toast({
                title: "Unable to Delete Comment",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    return (
        <>
            <Button
                marginTop={10}
                onClick={() => setHomeScreen(!homeScreen)}
                alignSelf="flex-start"
                marginX={100}
            >
                Back
            </Button>
            <VStack height="100vh">
                <Center>
                    <Heading>{title}</Heading>
                </Center>
                <Text padding={10} fontSize="2xl">
                    {body}
                </Text>
                {userId === user.id && (
                    <HStack>
                        <EditPostModal
                            oldBody={body}
                            oldTitle={title}
                            fetchPosts={fetchPosts}
                            postId={id}
                            setHomeScreen={setHomeScreen}
                        />
                        <Button
                            width="xs"
                            colorScheme="red"
                            onClick={() => {
                                deletePost(id);
                            }}
                        >
                            Delete
                        </Button>
                    </HStack>
                )}

                {/* Comments Modal */}
                <NewCommentModal
                    postId={id}
                    comments={comments}
                    setComments={setComments}
                />

                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    paddingTop={100}
                    alignSelf="flex-start"
                >
                    Comments
                </Text>

                {comments &&
                    comments.map((comment) => (
                        <Box
                            bgColor="gray.300"
                            width="100%"
                            rounded="1%"
                            margin={2}
                        >
                            <HStack justifyContent="space-between">
                                <Text padding={4} fontSize="lg">
                                    {comment.body}
                                </Text>
                                {comment.userId === user.id && (
                                    <HStack p={2}>
                                        <EditCommentModal
                                            id={comment.id}
                                            body={comment.body}
                                            getComments={getComments}
                                        />
                                        <Button
                                            colorScheme="red"
                                            onClick={() =>
                                                deleteComment(comment.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </HStack>
                                )}
                            </HStack>
                        </Box>
                    ))}
            </VStack>
        </>
    );
}

export default PostScreen;
