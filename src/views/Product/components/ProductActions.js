import {
  Flex,
  Button,
  Text,
  Heading,
  Box,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import OptionsSelector from "../../../components/OptionsSelector/OptionsSelector";

const ProductActions = ({
  onAddToCart,
  value,
  options,
  onChange,
  disabled,
}) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Flex
      width="100%"
      height="20vh"
      mt={4}
      mb={4}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid #cecece"
    >
      {options?.colors ? (
        <Box width="100%" mt="2rem" mb="2rem">
          <Heading>Color</Heading>
          <Flex width="100%" justifyContent="center">
            <OptionsSelector
              name="colors"
              value={value?.colors}
              options={options.colors}
              onChange={onChange}
            />
          </Flex>
        </Box>
      ) : null}

      {options?.storages ? (
        <Box width="100%" mt="2rem" mb="2rem">
          <Heading>Storages</Heading>
          <Flex width="100%" justifyContent="center">
            <OptionsSelector
              name="storages"
              value={value?.storages}
              options={options.storages}
              onChange={onChange}
            />
          </Flex>
        </Box>
      ) : null}

      <Button
        backgroundColor={
          colorMode === "light"
            ? colors?.brand?.mainColor
            : colors?.brand?.mainColorWhite
        }
        color="white"
        p="2rem"
        width="100%"
        onClick={onAddToCart}
        _hover={{ backgroundColor: "gray.700" }}
        fontSize="lg"
        disabled={disabled}
      >
        <Flex justifyContent="center" alignItems="center">
          <AiOutlineShoppingCart size="28" />
          <Text ml="5" fontSize="24">
            Add to cart
          </Text>
        </Flex>
      </Button>
    </Flex>
  );
};

export default ProductActions;
