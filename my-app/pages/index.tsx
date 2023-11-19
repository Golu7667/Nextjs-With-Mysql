import React, { useState, useEffect } from "react";
import {
  Input,
  Center,
  Text,
  VStack,
  Button,
  HStack,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { color } from "framer-motion";
import constructWithOptions from "styled-components/dist/constructors/constructWithOptions";

function index() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [nameData, setNameData] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const toast = useToast();
  console.log(nameData);
  console.log(nameData);
  console.log(name);
  const handelSave = async () => {
    console.log("handleSave");
    try {
      const save = await axios.post("http://localhost:8000/api/posts", {
        name,
      });
      if (save) {
        console.log(save);
        toast({
          description: "Name Register Successfully",
          status: "success",
          duration: "5000",
          isClosable: true,
        });
      } else {
        console.log("not save");
        toast({
          description: "Name Register Unsuccessfully",
          status: "error",
          duration: "5000",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Error",
        status: "error",
        duration: "5000",
        isClosable: true,
      });
    }
    setName("");
  };
  const handleEdit = async (data) => {
    setIsInputDisabled(false);
    setNewName(data.name)
    console.log(data.id);
    const id = data.id;
    try {
      const update = await axios.put(
        `http://localhost:8000/api/alldata/${id}`,
        { newName }
      );
      toast({
        description: "Updated Successfully",
        status: "success",
        duration: "5000",
        isClosable: true,
      });
      console.log(update.data);
    } catch (error) {
      toast({
        description: "Error",
        status: "error",
        duration: "5000",
        isClosable: true,
      });
      console.error(error);
    }
    setIsInputDisabled(true);
  };

  const handleDelete = (data) => {
    const id = data.id;
  };
  const handleChange =(data)=>{
    setIsInputDisabled(false);
    setNewName(data.name)
  }



  useEffect(() => {
    console.log("useeffect ");
    const fetchData = async () => {
      console.log("fetchdata");
      try {
        const data = await axios.get("http://localhost:8000/api/alldata");
        console.log(data);
        setNameData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [handleChange]);
  return (
    <Center w="100vw">
      <VStack>
        <Text fontSize="3xl" fontWeight="bold">
          Enter Name
        </Text>
        <HStack>
          <Input
            w="300px"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Button onClick={() => handelSave()} colorScheme="blue">
            Save
          </Button>
        </HStack>
        <Box
          overflowY="auto"
          w="400px"
          h="500px"
          rounded={"xl"}
          boxShadow="dark-lg"
          marginTop={"10px"}
        >
          <VStack>
            {nameData && (
              <>
                {nameData.map((item) => (
                  <Box
                    key={item.id}
                    w="390px"
                    h="50px"
                    boxShadow="dark-lg"
                    rounded={"xl"}
                    mt="10px"
                    display={"flex"}
                    justifyContent={"space-between"}
                    px={'10px'}
                    alignItems={'center'}
                  > {
                    !isInputDisabled ?
                    <Input
                    type="text"
                    name={newName}
                    disabled={isInputDisabled}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter New Name"
                  /> :
                   <Text w="100px" fontSize={'md'} fontFamily="fantasy" ml="10px" mt="4px">{item.name}</Text>
                  }
                   

                    {isInputDisabled ? (
                      <Button
                        colorScheme="blue"
                        onClick={() => handleChange(item)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEdit(item)}
                        mx="10px"
                      >
                        Update
                      </Button>
                    )}
                    <Button
                      colorScheme="blue"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </>
            )}
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
}

export default index;
