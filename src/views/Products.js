import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import ListView from "../components/ListView";

import { ROUTES } from "../constants/routes";

const Products = () => {
  const navigate = useNavigate();
  const { data: products } = useSWRImmutable({
    url: "/api/product",
    method: "GET",
  });

  const handleLoadProduct = (id) => {
    navigate(ROUTES.PRODUCT.replace(":productId", id));
  };

  return (
    <Box width="75vw">
      {!products ? (
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
        <ListView data={products} onClick={handleLoadProduct} />
      )}
    </Box>
  );
};

export default Products;
