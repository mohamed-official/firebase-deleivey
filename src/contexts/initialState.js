import { fetchUser, fetchCart } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  products: null,
  cartShow: false,
  cartItems: cartInfo,
};
