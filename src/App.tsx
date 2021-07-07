import {
  Box,
  Container,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { IItems } from "./types";

function App() {
  const [items, setItems] = useState<IItems[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    const baseUrl = "https://asm-dev-api.herokuapp.com/api/v1/food";
    setLoading(true);
    const result = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();

    setItems(data.data.meals);
    setLoading(false);
  };

  useEffect(() => {
    if (!items.length) {
      fetchData();
    }
  }, [items]);

  const renderCards = () =>
    items.map((item) => <Card key={item.id} item={item} />);

  if (loading) {
    return (
      <Box d="flex" justifyContent="center" alignItems="center" h="100vh">
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text>Loading...</Text>
        </Box>
      </Box>
    );
  }

  return (
    <VStack>
      <Container maxW="container.xl" my="5" centerContent>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="40px">
          {items && renderCards()}
        </SimpleGrid>
        <Box
          as="button"
          color="#fff"
          borderRadius="full"
          py="4"
          px="12"
          bg="#FA9E0D"
          fontSize="large"
          fontWeight="semibold"
          m="5"
        >
          Learn More
        </Box>
      </Container>
    </VStack>
  );
}

export default App;
