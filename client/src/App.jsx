import { Text, VStack, Center, useToast, Box, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import apiAxios from "./api/customAxios";
import NewPostModal from "./components/newPostModal";
import { useSelector } from "react-redux";
import PostScreen from "./screens/postScreen";

function App() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [posts, setPosts] = useState([]);
    const [homeScreen, setHomeScreen] = useState(true);
    const [currentPost, setCurrentPost] = useState();

    const toast = useToast();

    const fetchPosts = async () => {
        try {
            const res = await apiAxios.get("/api/posts");
            setPosts(res.data);
        } catch (e) {
            toast({
                title: "Unable to Fetch Posts",
                description: "Please check your internet connection",
                status: "error",
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <VStack m={20}>
            <Header />
            {isLoggedIn ? (
                <>
                    <VStack marginTop={5} width="100vw">
                        {homeScreen ? (
                            <>
                                <NewPostModal
                                    posts={posts}
                                    setPosts={setPosts}
                                />
                                {posts &&
                                    posts.map((post) => (
                                        <Box
                                            bgColor="gray.400"
                                            width="60%"
                                            height="100%"
                                            m={10}
                                            p={2}
                                            rounded="15"
                                            cursor="pointer"
                                            userSelect="none"
                                            onClick={(prev) => {
                                                setHomeScreen(!prev);
                                                setCurrentPost(post);
                                            }}
                                        >
                                            <Center>
                                                <Heading>{post.title}</Heading>
                                            </Center>
                                        </Box>
                                    ))}
                            </>
                        ) : (
                            <PostScreen
                                id={currentPost.id}
                                title={currentPost.title}
                                body={currentPost.body}
                                userId={currentPost.userId}
                                homeScreen={homeScreen}
                                setHomeScreen={setHomeScreen}
                                fetchPosts={fetchPosts}
                            />
                        )}
                    </VStack>
                </>
            ) : (
                <Text color="red" fontSize="xl">
                    Please Sign Up or Sign In to Continue
                </Text>
            )}
        </VStack>
    );
}

export default App;
