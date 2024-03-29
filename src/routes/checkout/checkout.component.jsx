import { 
    CheckoutContainer,
    CheckoutHeader,
    EmptyCartMessage,
    HeaderBlock,
    Total,
    ClearCartButton,
    NavLink,
    SignInButton
} from "./checkout.styles";

import { Link } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { clearCart } from "../../store/cart/cart.reducer";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const clearWholeCart = () => {
        dispatch(clearCart());
    }

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.length > 0 ?
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                }) :
                (<EmptyCartMessage>Your cart is empty!</EmptyCartMessage>)
            }
            <Total>Total: ${cartTotal}</Total>
            <ClearCartButton onClick={clearWholeCart}>Clear Cart</ClearCartButton>
            {
                cartItems.length > 0 
                ? 
                    (currentUser 
                    ?
                        (<PaymentForm />)
                    :
                        (<NavLink to="/auth"><SignInButton>Sign in to checkout</SignInButton></NavLink>)
                    )
                :
                    <></>
            }
            
        </CheckoutContainer>
    )
}

export default Checkout;