import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { addProductToCart } from "../actions/products";

const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    cart: {},
    cartTotalItems: 0,
    cartTotalPrice: 0,
  });

  useEffect(() => {
    const localStorageState = localStorage.getItem("cart");
    const parsedState = JSON.parse(localStorageState);
    if (parsedState && Object.keys(parsedState?.cart).length) {
      setState({
        cart: parsedState.cart,
        cartTotalItems: parsedState.cartTotalItems,
        cartTotalPrice: parsedState.cartTotalPrice,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("cart", JSON.stringify(state));
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("cart", JSON.stringify(state));
      });
    };
  }, [state]);

  const addToCart = useCallback(
    (product) => {
      const { cart, cartTotalItems, cartTotalPrice } = state;
      const { id, colors, storages, price, brand, model, imgUrl } = product;
      if (!Object.keys(cart).includes(id)) {
        const newState = {
          cart: {
            ...cart,
            [id]: {
              id,
              colors,
              storages,
              price,
              brand,
              model,
              imgUrl,
            },
          },
          cartTotalItems: cartTotalItems + 1,
          cartTotalPrice: cartTotalPrice + price,
        };
        setState(newState);
        return addProductToCart({
          id,
          colorCode: colors,
          storageCode: storages,
        });
      }
      return Promise.reject("Product already in cart");
    },
    [state]
  );

  const removeFromCart = useCallback(
    (id) => {
      const { cart } = state;
      const newCart = { ...cart };
      delete newCart[id];
      setState({
        ...state,
        cart: newCart,
        cartTotalItems: Object.keys(newCart).length,
        cartTotalPrice: Object.values(newCart).reduce((acc, cur) => {
          return acc + cur.price;
        }, 0),
      });
    },
    [state]
  );

  const store = useMemo(() => {
    return {
      state,
      addToCart,
      removeFromCart,
    };
  }, [state, addToCart, removeFromCart]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
