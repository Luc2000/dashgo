import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (<Box mr="4" textAlign="right">
                <Text>Lucas Annunziato</Text>
                <Text color="gray.300" fontSize="small">
                    lucassouzaannunziato@gmail.com
                </Text>
            </Box>)}
            
            <Avatar size="md" name="Diego Fernandes" src="https://xesque.rocketseat.dev/users/avatar/profile-be750e26-4669-4d0f-b483-085001f4fb24-1631758537528.jpg"/>
        </Flex>
    );
}