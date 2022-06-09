import React from "react";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { SWRConfig } from "swr";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ErrorBoundary from "../ErrorBoundary";

import StoreProvider from "../../hooks/useStore";
// Views
import Products from "../../views/Products";
import Product from "../../views/Product";

import Header from "../Header";

import fetcher from "../../utils/fetcher";

import { ROUTES } from "../../constants/routes";

const theme = extendTheme({
  colors: {
    brand: {
      mainColor: "#043c54",
      mainColorWhite: "#5ec5f1",
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig
        value={{
          // 1 Hour
          refreshInterval: 1000 * 60 * 60,
          fetcher,
        }}
      >
        <StoreProvider>
          <Flex
            width="100%"
            height="100vh"
            flexDirection="column"
            justifyContent="start"
            alignItems="center"
          >
            <BrowserRouter>
              <Header />
              <ErrorBoundary>
                <Routes>
                  <Route index path={ROUTES.HOME} element={<Products />} />
                  <Route path={ROUTES.PRODUCT} element={<Product />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </Flex>
        </StoreProvider>
      </SWRConfig>
    </ChakraProvider>
  );
};

export default App;
