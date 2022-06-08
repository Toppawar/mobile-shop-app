import { useMemo } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";

import ColorModeSwitcher from "./ColorModeSwitcher";

import Logo from "../../assets/Icons/logo";
import DrawerStore from "./DrawerStore";

const Header = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  const logoColor = useMemo(() => {
    return colorMode === "light"
      ? colors?.brand?.mainColor
      : colors?.brand?.mainColorWhite;
  }, [colorMode]);

  return (
    <Box width="full" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Logo color={logoColor} height="3.5rem" width="280px" />
        </Box>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <ColorModeSwitcher />
            <DrawerStore />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
