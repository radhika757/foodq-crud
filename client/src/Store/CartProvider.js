// wrap the component which needs access to cart with this
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  // state object, action dispatched by me
  // return a new state.
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // to check if the item is already a part of the cart.

    const existCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id; // id of the existing item is same as id of the item we are adding.
    }); // a () which should return true if the item exists, this () will run for every item in []

    const existCartItem = state.items[existCartItemIndex]; // will work when item already exists in the cart.

    let updatedItems;
    if (existCartItem) {
      let updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  // Remove the item from the cart.
  if (action.type === "REMOVE") {
    // find the cart item
    const existCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existCartItem = state.items[existCartItemIndex];
    const newTotalAmount = state.totalAmount - existCartItem.price;
    let updatedItems;
    if (existCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  // array destructering to pull the elements out of array and store in two constants.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // add to cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD", // convention of string all caps identifier.
      item: item,
    });
  };

  // remove from cart
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
