import ShoppingIcon from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";

import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.reducer";

import { CartIconContainer, ItemCount, CartIconSvg } from "./cart-icon.styles";

const CartIcon = () => {

    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <CartIconSvg 
                src={ShoppingIcon} 
                alt="cart icon" 
            />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};


export default CartIcon;