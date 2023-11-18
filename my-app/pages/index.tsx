import React, { useState } from 'react'
import {Input,Center,Text,VStack,Button,HStack} from '@chakra-ui/react'
import axios from 'axios'


function index() {
  const [name,setName]=useState("")
console.log(name)
 const handelSave=async()=>{
  console.log("handleSave")
    try {
         const save=await axios.post("http://localhost:8000/api/posts",{name})
        if(save){
          console.log(save)
        }else{
          console.log("not save")
        }
    }catch(error){
        console.log(error)
    }
 }

  return (
    <Center w="100vw" >
        <VStack>
        <Text fontSize="3xl" fontWeight="bold">Enter Name</Text>
        <HStack>
       <Input w="300px" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
       <Button onClick={()=>handelSave()}>Save</Button>
       </HStack>
       </VStack>

    </Center>
  )
}

export default index