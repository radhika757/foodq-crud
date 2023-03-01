// Context
import React from "react";

//data
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  // functions for updating the context
  addItem: (item) => {}, 
  removeItem: (id) => {}, 
});

export default CartContext;
