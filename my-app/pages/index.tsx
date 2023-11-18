
import React, { useState,useEffect } from 'react'
import {Input,Center,Text,VStack,Button,HStack,Box} from '@chakra-ui/react'
import axios from 'axios'
import { color } from 'framer-motion'


function index() {
  const [name,setName]=useState("")
  const [nameData,setNameData]=useState([])
  
  console.log(nameData)
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
        {nameData.map((data, index) => (
        <Box key={index}>{data}</Box>
      ))}
         
        </VStack>
       </Box>
       </VStack>
      
    </Center>
  )
}

export default index