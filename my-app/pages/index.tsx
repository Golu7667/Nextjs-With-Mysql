
import React, { useState,useEffect } from 'react'
import {Input,Center,Text,VStack,Button,HStack,Box, useToast} from '@chakra-ui/react'
import axios from 'axios'
import { color } from 'framer-motion'
import constructWithOptions from 'styled-components/dist/constructors/constructWithOptions'


function index() {
  const [name,setName]=useState("")
  const [nameData,setNameData]=useState([])
  const toast=useToast()
  console.log(nameData)
  console.log(nameData)
console.log(name)
 const handelSave=async()=>{
 
  console.log("handleSave") 
    try {
         const save=await axios.post("http://localhost:8000/api/posts",{name})
        if(save){
          console.log(save)
          toast({
            description:'Name Register Successfully',
            status:'success',
            duration:'5000',
            isClosable:true

          })
        }else{
          console.log("not save")
          toast({
            description:'Name Register Unsuccessfully',
            status:'error',
            duration:'5000',
            isClosable:true

          })
        }
    }catch(error){
        console.log(error)
        toast({
          description:'Error',
          status:'error',
          duration:'5000',
          isClosable:true

        })
    }
    setName("")
 }
const handleEdit=async(data)=>{
  console.log(data.id)
  const id=data.id;
   try{
        const update=await axios.put(`http://localhost:8000/api/edit:${id}`,"Romar")
   }catch(error){
    console.log(error)
   }


}
const handleDelete=(data)=>{
 const id=data.id;


}



 useEffect(()=>{
  console.log("useeffect ")
  const fetchData = async () => {
    console.log("fetchdata")
    try {
        const data=await axios.get("http://localhost:8000/api/alldata")
        console.log(data)
        setNameData(data.data)
     
    }catch(error){
         console.log(error)
    }}
    fetchData()
 },[])
  return (
    <Center w="100vw" >
        <VStack>
        <Text fontSize="3xl" fontWeight="bold" >Enter Name</Text>
        <HStack>
       <Input w="300px" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
       <Button onClick={()=>handelSave() } colorScheme='blue'>Save</Button>
       </HStack>
       <Box overflowY="auto" w="400px" h="500px"  rounded={'xl'} boxShadow='dark-lg' marginTop={'10px'}>
        <VStack>
        {nameData && (
        <>
          {nameData.map((item) => (
            <Box key={item.id} w="300px" h="40px" boxShadow='dark-lg' rounded={'xl'} mt="10px" display={'flex'} justifyContent={'space-between'}>
              <Text w="100px" fontSize={'xl'} fontWeight={'extrabold'} fontFamily={'Arvo'} ml={'20px'}>{item.name}</Text>
              <Text>{item.id}</Text>
             <Button colorScheme='blue' onClick={()=>handleEdit(item)}>Edit</Button>
             <Button colorScheme='blue' onClick={()=>handleDelete(item)}>Delete</Button>
            </Box>
          ))}
        </>
      )}
         
        </VStack>
       </Box>
       </VStack>
      
    </Center>
  )
}

export default index