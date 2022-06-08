import { Flex, Box, Heading, Text } from "@chakra-ui/react";

const ProductDetails = ({ product }) => {
  return (
    <Flex
      width="100%"
      flexDirection="column"
      height={["auto", "auto", "auto", "60vh"]}
      overflow={["initial", "initial", "initial", "auto"]}
      pr="5"
      css={{
        "&::-webkit-scrollbar": { width: "5px" },
        "&::-webkit-scrollbar-thumb": { background: "#cecece" },
      }}
    >
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Storage & RAM</Heading>
        <Flex>
          <Text fontWeight="bold">Internal Memory</Text>
          <Text ml="2">{product.internalMemory}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold">RAM</Text>
          <Text ml="2">{product.ram}</Text>
        </Flex>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Dimensions</Heading>
        {/** Dimensions, not dimentions *derp* */}
        <Text ml="2">{product.dimentions}</Text>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Display</Heading>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Resolution</Text>
          <Text ml="2">{product.displayResolution}</Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Size</Text>
          <Text ml="2">{product.displaySize}</Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Type</Text>
          <Text ml="2">{product.displayType}</Text>
        </Flex>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">CPU/GPU</Heading>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Processor</Text>
          <Text ml="2">{product.displayResolution}</Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Graphic card</Text>
          <Text ml="2">{product.gpu}</Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Chipset</Text>
          <Text ml="2">{product.chipset}</Text>
        </Flex>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Battery</Heading>
        <Text ml="2">{product.battery}</Text>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Rear Camera</Heading>
        <Text ml="2">
          {new Intl.ListFormat("es").format(product.primaryCamera)}
        </Text>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Sensors</Heading>
        <Text ml="2">{new Intl.ListFormat("es").format(product.sensors)}</Text>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Weight</Heading>
        <Text ml="2">
          {`0,${product.weight}`}
          Kg
        </Text>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Network & Connectivity</Heading>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">WLAN</Text>
          <Text ml="2">{new Intl.ListFormat("es").format(product.wlan)}</Text>
        </Flex>
        <Flex flexDirection={["column", "column", "row"]}>
          <Text fontWeight="bold">Speed</Text>
          <Text ml="2">{product.networkSpeed}</Text>
        </Flex>
      </Box>
      <Box
        p="5"
        justifyContent="space-between"
        borderBottom="1px solid #cecece"
      >
        <Heading mb="5">Operating System</Heading>
        <Text ml="2">{product.os}</Text>
      </Box>
    </Flex>
  );
};

export default ProductDetails;
