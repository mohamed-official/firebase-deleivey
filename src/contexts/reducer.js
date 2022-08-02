export const actionType = {
  SET_USER: "SET_USER",
  SET_PRODUCTS: "SET_PRODUCTS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
};

export default reducer;
