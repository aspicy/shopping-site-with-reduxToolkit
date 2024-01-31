// import { CART_ACTION_TYPES } from "./cart.types";
import { createSlice } from "@reduxjs/toolkit";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contain productToAdd
    // returns first value (here cartItem) that passes the condition
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    // return new array with modified cartItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find cartItem to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        addItemToCart(state, action) {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action) {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        }
    }
})

export const { 
    setIsCartOpen, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//     const { type, payload } = action;

//     switch(type) {
//         case CART_ACTION_TYPES.SET_CART_ITEMS:
//             return {
//                 ...state,
//                 cartItems: payload
//             }
//         case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//             return {
//                 ...state,
//                 isCartOpen: payload
//             }
//         default:
//             return state;
//     }
// }