import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../supabase';


import {Flex,Heading,Input,Button,useColorModeValue,useToast} from '@chakra-ui/react';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

createClient(supabaseUrl, supabaseAnonKey);

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function SignIn() {
    const signUp = await supabase.auth.signUp({
   
      email: email,
      password: password,
    })

    toast({
      title: !signUp.user? 'Invalid creadentials' : 'Sign up successfull!',
      position: 'top',
      status: signUp.error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
if(signUp.user){
  console.log("data i i",signUp)
 
  navigate('/todo');

}
}

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        textAlign="center"
        color="blackAlpha.700"
      >
        <Heading mb={6} color="blue.400">SIGN UP</Heading>
        <Input
          placeholder="test@gmail.com"
          type="email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          mb={3}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          mb={6}
        />
        <Button colorScheme="blue" onClick={SignIn} mb={4}>
          SIGN UP
        </Button>
     
       
      </Flex>
    </Flex>
  );
};

export default Login;
