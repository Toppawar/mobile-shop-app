import { useState, useRef, useCallback, useEffect } from "react";

import {
  Center,
  Stack,
  Text,
  Heading,
  Box,
  Image,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  Skeleton,
} from "@chakra-ui/react";

const ListItem = ({ brand, model, imgUrl, price }) => {
  const [isRendered, setIsRendered] = useState(false);
  const itemRef = useRef(null);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: `${itemRef.current.offsetHeight / 2}px`,
      threshold: 0.5,
    });
    observer.observe(itemRef.current);
    return () => {
      observer.disconnect();
    };
  }, [callback, itemRef]);

  return (
    <Center py="12" ref={itemRef}>
      <Box
        role="group"
        p="6"
        maxW="330px"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        rounded="lg"
        pos="relative"
        cursor="pointer"
        zIndex="1"
      >
        {isRendered ? (
          <Box
            rounded="lg"
            mt="-12"
            pos="relative"
            height="230px"
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${imgUrl})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{ _after: { filter: "blur(30px)" } }}
          >
            <Image
              rounded="lg"
              height={230}
              width={282}
              objectFit="cover"
              loading="lazy"
              src={imgUrl}
            />
          </Box>
        ) : (
          <Skeleton width="282" height="230" />
        )}
        <Stack pt={10} align="center">
          {isRendered ? (
            <Text color="gray.500" fontSize="sm" textTransform="uppercase">
              {brand}
            </Text>
          ) : (
            <Skeleton height="20px" width="100%" />
          )}
          {isRendered ? (
            <Heading
              fontSize="2xl"
              fontFamily="body"
              height="57px"
              fontWeight={500}
            >
              {model}
            </Heading>
          ) : (
            <Skeleton height="57px" width="100%" />
          )}
          {isRendered ? (
            <Stack direction="row" align="center">
              <Stat>
                {price ? (
                  <StatNumber>
                    {price}
                    <span>€</span>
                  </StatNumber>
                ) : (
                  <StatLabel height="36px">
                    <Badge colorScheme="red">Sin Stock</Badge>
                  </StatLabel>
                )}
              </Stat>
            </Stack>
          ) : (
            <Skeleton width="100%" height="36px" />
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default ListItem;
