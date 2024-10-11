import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, SimpleGrid, Button, VStack, useToast, useColorModeValue } from '@chakra-ui/react';

const Home = () => {
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const toastShownRef = useRef(false);

    const buttonColor = useColorModeValue('white', 'brand');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const justLoggedIn = searchParams.get('login') === 'success';
        
        if (justLoggedIn && user && !toastShownRef.current) {
            toast({
                title: "Login Successful",
                description: "You have successfully logged in",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            toastShownRef.current = true;
            
            // Remove the 'login' query parameter
            searchParams.delete('login');
            navigate('?' + searchParams.toString(), { replace: true });
        }
    }, [location, user, toast, navigate]);

    const handleFeatureClick = (path) => {
        if (user) {
            navigate(path);
        } else {
            navigate('/login');
        }
    };

    const features = [
        { title: "Financial Snapshot", description: "Get a clear picture of your current financial situation.", path: "/financial-snapshot" },
        { title: "AI-Powered Advice", description: "Receive personalized financial recommendations.", path: "/financial-advice" },
        { title: "Goal-Based Planning", description: "Set and track your financial goals with AI assistance.", path: "/goals" },
        { title: "AI Chatbot", description: "Get instant answers to your financial questions.", path: "/chatbot" },
    ];

    return (
        <Box>
            <Container maxW="container.xl" py={10}>
                <VStack spacing={10} align="stretch">
                    <Box textAlign="center">
                        <Heading as="h1" size="2xl" mb={4}>Your Personal AI-Powered Financial Assistant</Heading>
                        <Text fontSize="xl">Get tailored financial advice, plan your goals, and simulate scenarios - all powered by advanced AI.</Text>
                    </Box>

                    <Box>
                        <Heading as="h2" size="xl" mb={6}>Our Features</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            {features.map((feature, index) => (
                                <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
                                    <Heading as="h3" size="lg" mb={4}>{feature.title}</Heading>
                                    <Text mb={4}>{feature.description}</Text>
                                    <Button 
                                        colorScheme="brand" // Use the brand color scheme
                                        bg="brand.primary" // Set background to black
                                        color={buttonColor} // Set text color based on color mode
                                        onClick={() => handleFeatureClick(feature.path)}
                                    >
                                        Try It
                                    </Button>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default Home;