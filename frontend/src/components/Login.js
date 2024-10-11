import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { login } from '../services/api';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Link, Alert, AlertIcon } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useColorModeValue } from '@chakra-ui/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buttonColor = useColorModeValue('white', 'brand');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await login(email, password);
            const decodedToken = jwtDecode(response.token);
            const userData = {
                token: response.token,
                user: {
                    ...response.user,
                    id: decodedToken.userId,
                    username: decodedToken.username,
                    email: email
                }
            };
            dispatch(setCredentials(userData));
            setSuccess('Login successful! Redirecting to home page...');
            setTimeout(() => {
                navigate('/?login=success');
            }, 2000);
        } catch (err) {
            console.error('Login error:', err);
            if (err.error === 'EMAIL_NOT_FOUND') {
                setError('This email is not registered. Please check your email or sign up.');
            } else if (err.error === 'INVALID_PASSWORD') {
                setError('Incorrect password. Please try again.');
            } else {
                setError(err.message || 'An error occurred during login');
            }
        }
    };

    return (
        <Box minH="calc(100vh - 60px - 60px)" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={8} width="100%" maxWidth="400px" boxShadow="lg" p={8} borderRadius="md" bg="white">
                <Heading>Login</Heading>
                {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                {success && <Alert status="success"><AlertIcon />{success}</Alert>}
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password:</FormLabel>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Button 
                            type="submit" 
                            colorScheme="brand" // Use the brand color scheme
                            bg="brand.primary" // Set background to black
                            color={buttonColor} // Set text color based on color mode
                        >
                            Login
                        </Button>
                    </VStack>
                </form>
                <Text>
                    Don't have an account? <Link as={RouterLink} to="/register" color="blue.500">Register here</Link>
                </Text>
            </VStack>
        </Box>
    );
};

export default Login;