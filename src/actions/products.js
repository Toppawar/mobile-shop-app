import fetcher from "../utils/fetcher";

export const addProductToCart = (product) => {
  return fetcher({
    url: "/api/cart",
    method: "POST",
    body: JSON.stringify(product),
  });
};
