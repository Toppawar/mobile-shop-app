import { useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  useTheme,
  useColorMode,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";

import ColorModeSwitcher from "./ColorModeSwitcher";
import DrawerStore from "./DrawerStore";

import Logo from "../../assets/Icons/logo";

import { ROUTES } from "../../constants/routes";

const Header = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const logoColor = useMemo(() => {
    return colorMode === "light"
      ? colors?.brand?.mainColor
      : colors?.brand?.mainColorWhite;
  }, [colorMode]);

  const isHome = useMemo(() => {
    return location.pathname === ROUTES.HOME;
  }, [location?.pathname]);

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <Box width="full" bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Logo color={logoColor} height="3.5rem" width="280px" />
        </Box>
        {!isHome ? (
          <Box>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    handleNavigate(ROUTES.HOME);
                  }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="">Product</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
        ) : null}

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
