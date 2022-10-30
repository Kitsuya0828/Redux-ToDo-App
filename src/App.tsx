import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckIcon, DeleteIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  Input,
  Heading,
  Center,
  Text,
  Button,
  Grid,
  GridItem,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

function App() {
  const dispatch = useDispatch();
  const doneList = (name: string) => {
    dispatch({ type: "DONE_LIST", payload: name });
  };
  const deleteList = (name: string) => {
    dispatch({ type: "DELETE_LIST", payload: name });
  };
  const addList = () => {
    if (!name) return;

    setComplete(false);

    dispatch({
      type: "ADD_LIST",
      payload: {
        name,
        complete,
      },
    });
    setName("");
  };

  const [name, setName] = useState("");
  const [complete, setComplete] = useState(false);

  const lists = useSelector((state: any) => state.lists);
  return (
    <ChakraProvider>
      <Stack pl={2} pr={2}>
        <Center>
          <Heading fontSize="4xl" color="twitter.500">
            ToDoリスト
          </Heading>
        </Center>

        <Grid templateColumns="repeat(12, 1fr)" gap={2}>
          <GridItem colSpan={10}>
            <Input
              type="text"
              value={name}
              placeholder="ToDoを入力してください"
              onChange={(e) => setName(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Button onClick={addList} colorScheme="twitter">
              追加
            </Button>
          </GridItem>
        </Grid>

        <Accordion allowMultiple defaultIndex={[0, 1]}>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: "twitter.500", color: "white" }}
              >
                <Box flex="1" textAlign="left" fontWeight="bold">
                  未完了のToDoリスト
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={2}>
                {lists
                  .filter((list: any) => list.complete === false)
                  .map((list: any, index: number) => (
                    <ListItem>
                      <Grid templateColumns="repeat(12, 1fr)">
                        <GridItem colSpan={10}>
                          <Text fontSize="sm">{list.name}</Text>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Button onClick={() => doneList(list.name)} size="xs">
                            <CheckIcon />
                          </Button>
                        </GridItem>
                        <GridItem colSpan={1}>
                          <Button
                            onClick={() => deleteList(list.name)}
                            size="xs"
                          >
                            <DeleteIcon />
                          </Button>
                        </GridItem>
                      </Grid>
                    </ListItem>
                  ))}
              </List>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{ bg: "twitter.100", color: "black" }}
              >
                <Box flex="1" textAlign="left" fontWeight="bold">
                  完了したToDoリスト
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} display="true">
              <List>
                {lists
                  .filter((list: any) => list.complete === true)
                  .map((list: any, index: number) => (
                    <ListItem key={index}>
                      <ListIcon as={CheckCircleIcon} color="twitter.200" />
                      {list.name}
                    </ListItem>
                  ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
