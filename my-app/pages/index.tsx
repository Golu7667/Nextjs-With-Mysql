import React from 'react'
import {Input,Center,Text,VStack,Button,HStack} from '@chakra-ui/react'



function index() {
  return (
    <Center w="100vw" >
        <VStack>
        <Text fontSize="3xl" fontWeight="bold">Enter Name</Text>
        <HStack>
       <Input w="300px" placeholder="Enter Name"/>
       <Button>Save</Button>
       </HStack>
       </VStack>

    </Center>
  )
}

export default index