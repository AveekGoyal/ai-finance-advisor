import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Flex, Box, Link, Button, useColorModeValue,useToast } from '@chakra-ui/react'; // Import useColorModeValue

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();
  // Define buttonColor using useColorModeValue
  const buttonColor = useColorModeValue('white', 'brand');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="gray.100" width="100%">
      <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
        AI Finance Advisor
      </Link>
      <Box>
        <Link as={RouterLink} to="/" mr={4}>Home</Link>
        {user ? (
          <>
            <Link as={RouterLink} to="/profile" mr={4}>Profile</Link>
            <Button 
              onClick={handleLogout} 
              colorScheme="brand" // Use the brand color scheme
              bg="brand.primary" // Set background to black
              color={buttonColor} // Set text color based on color mode
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/login" mr={4}>Login</Link>
            <Link as={RouterLink} to="/register">Register</Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;