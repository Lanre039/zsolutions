import {
  Box,
  Container,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "./components/Card";
import useItems from "./hooks/useItems";

function App() {
  const { loading, items } = useItems();

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
