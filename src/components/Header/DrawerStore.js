import { useRef } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Button,
  DrawerFooter,
  Image,
  Heading,
  Badge,
  Text,
} from "@chakra-ui/react";

import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";

import { useStore } from "../../hooks/useStore";

const DrawerStore = () => {
  const { state: store, removeFromCart } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box>
      <Box position="relative">
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          variant="ghost"
          size="md"
          fontSize="lg"
          marginRight="2"
          icon={<AiOutlineShoppingCart />}
        />
        {store.cartTotalItems > 0 ? (
          <Badge
            position="absolute"
            top="-10px"
            right="-10px"
            colorScheme="red"
            variant="solid"
            fontSize="xs"
            fontWeight="bold"
            borderRadius="full"
            px="2"
            py="1"
          >
            {store.cartTotalItems}
          </Badge>
        ) : null}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Products</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column">
              {Object.values(store.cart).map((product) => {
                return (
                  <Box
                    width="100%"
                    p="5"
                    key={product.id}
                    borderBottom="1px solid #cecece"
                    transition="all .3s ease"
                    _hover={{
                      borderBottom: "3px solid #cecece",
                      boxShadow: "0px 0px 7px #cecece",
                      cursor: "pointer",
                    }}
                  >
                    <Flex width="100%" justifyContent="flex-end">
                      <IconButton
                        variant="ghost"
                        size="md"
                        fontSize="lg"
                        icon={<AiOutlineCloseCircle />}
                        onClick={() => {
                          return removeFromCart(product.id);
                        }}
                      />
                    </Flex>
                    <Flex>
                      <Image
                        alt={product.model}
                        src={product.imgUrl}
                        height="64px"
                      />
                      <Box ml="5" width="100%">
                        <Flex justifyContent="space-between">
                          <Heading noOfLines={1} fontSize="sm" textAlign="left">
                            {product.model}
                          </Heading>
                          <Badge minWidth="32px">{product.brand}</Badge>
                        </Flex>
                        <Text mt="2" fontSize="24px">
                          {`${product.price} €`}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex flexDirection="column" width="100%">
              <Box mb="5">
                <Heading fontSize="lg">Total</Heading>
                <Text fontSize="24px">{`${store.cartTotalPrice} €`}</Text>
              </Box>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerStore;
