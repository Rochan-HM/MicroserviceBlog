import React from "react";
import { VStack, Text, HStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoggedOutModal from "./components/loggedOutModal";
import LoggedInModal from "./components/loggedInModal";

function Header() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <VStack>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                width="80vw"
            >
                <Text fontSize="3xl" fontWeight="bold" m={5}>
                    Blog App
                </Text>
                {isLoggedIn ? <LoggedInModal /> : <LoggedOutModal />}
            </HStack>
        </VStack>
    );
}

export default Header;
