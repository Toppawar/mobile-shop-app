import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

import {
  Flex,
  Box,
  Image,
  IconButton,
  Spinner,
  Tabs,
  TabPanel,
  TabList,
  Tab,
  TabPanels,
  Badge,
  Heading,
  Stat,
  StatNumber,
  StatLabel,
  useToast,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

import ProductDetails from "./components/ProductDetails";
import ProductActions from "./components/ProductActions";

import { ROUTES } from "../../constants/routes";

import { useStore } from "../../hooks/useStore";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const toast = useToast();

  const { data: product } = useSWRImmutable({
    url: `/api/product/${productId}`,
    method: "GET",
  });

  const [selectedOptionsState, setSelectedOptionsState] = useState();
  const [optionsState, setOptionsState] = useState({
    colors: null,
    storages: null,
  });

  useEffect(() => {
    if (product) {
      const { options } = product;
      setOptionsState({
        colors: options?.colors,
        storages: options?.storages,
      });
      setSelectedOptionsState({
        colors: options?.colors[0].code,
        storages: options?.storages[0].code,
      });
    }
  }, [product]);

  const handleBackHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setSelectedOptionsState({ ...selectedOptionsState, [name]: Number(value) });
  };

  const handleAddToCart = () => {
    const { colors, storages } = selectedOptionsState;
    addToCart({
      id: productId,
      colors,
      storages,
      price: Number(product.price),
      brand: product.brand,
      model: product.model,
      imgUrl: product.imgUrl,
    })
      .then(() => {
        toast({
          title: "Product added to cart",
          description: "You can check your cart in the top right corner",
          status: "success",
          duration: 4000,
          variant: "left-accent",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          description: "You can check your cart in the top right corner",
          status: "warning",
          duration: 4000,
          variant: "left-accent",
        });
      });
  };

  return !product ? (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="20vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <Box width={["100vw", "90vw", "85vw", "75vw"]}>
      <IconButton
        mt="5"
        variant="outline"
        onClick={handleBackHome}
        fontSize="3xl"
        icon={<ArrowBackIcon />}
      />

      <Flex
        width="100%"
        flexDirection={["column", "column", "column", "row"]}
        justifyContent={["center", "center", "center", "flex-start"]}
        alignItems={["center", "center", "center", "flex-start"]}
        p="5"
      >
        <Box width={["90%", "70%", "70%", "40%"]} p="10">
          <Box
            rounded="lg"
            mt="-12"
            pos="relative"
            height="auto"
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${product.imgUrl})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{ _after: { filter: "blur(30px)" } }}
          >
            <Image
              rounded="lg"
              height="auto"
              width="100%"
              objectFit="cover"
              loading="lazy"
              src={product.imgUrl}
              alt={product.model}
            />
          </Box>
        </Box>
        <Flex flexDirection="column" width={["95%", "90%", "85%", "60%"]}>
          {/**
           * Product info
           */}
          <Box>
            <Badge padding="2" fontSize="ls">
              {product.brand}
            </Badge>
            <Heading textAlign="right">{product.model}</Heading>
            <Stat flex="0">
              {product.price ? (
                <StatNumber textAlign="right">
                  {product.price}
                  <span>€</span>
                </StatNumber>
              ) : (
                <StatLabel>
                  <Badge colorScheme="red">Sin Stock</Badge>
                </StatLabel>
              )}
            </Stat>
          </Box>
          <Tabs width="100%">
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Specs.</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ProductActions
                  disabled={!product.price}
                  value={selectedOptionsState}
                  options={optionsState}
                  onChange={handleProductChange}
                  onAddToCart={handleAddToCart}
                />
              </TabPanel>
              <TabPanel>
                <ProductDetails product={product} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Product;
