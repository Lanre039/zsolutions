import { Box, Flex, HStack, Image, useMediaQuery } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IItems } from "../types";

function Card({ item }: { item: IItems }) {
  const [isSmallScreen] = useMediaQuery("(max-width:480px)");

  const renderRatings = (rating: number) =>
    Array(5)
      .fill("")
      .map((_, i) => (
        // Assign colour based on the data rating
        <FaStar key={i} color={rating-- > 0 ? "#FA9E0D" : "#aaa"} />
      ));

  return (
    <Box
      // borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      borderTopRightRadius="3xl"
      borderBottomLeftRadius="3xl"
    >
      <Box maxW="sm">
        <Image
          src={item.strMealThumb}
          alt={item.strMeal}
          borderBottomLeftRadius="3xl"
          h="270px"
          width="full"
        />
        <Box p="6">
          <HStack justifyContent="space-between">
            <Box fontWeight="bold" as="h2" fontSize="large">
              {item.title}
            </Box>
            <Box fontWeight="bold" as="h2" fontSize="large">
              {/* format price e.g from $12 to 12$ */}
              {item.price.split("$")[1].concat(item.price[0])}
            </Box>
          </HStack>
          <Box as="p" color="gray.600" fontSize="sm">
            {item.strMeal}
          </Box>
          <Box as="h2" mt="4" color="gray.600" noOfLines={3}>
            {item.description}
          </Box>
        </Box>
      </Box>

      <Flex mt="1" justifyContent="space-between" alignItems="center">
        <Box d="flex" alignItems="center" ml="10">
          {renderRatings(item.ratings)}
        </Box>
        <Box
          py="4"
          px={isSmallScreen ? "4" : "7"}
          bg="#FA9E0D"
          borderTopLeftRadius="2xl"
          cursor="pointer"
        >
          <AiOutlinePlus color="#fff" fontSize="3rem" fontWeight="bold" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Card;
