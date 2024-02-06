import { 
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
    ClearCartButton
} from "./checkout.styles";

import { useDispatch, useSelector, } from "react-redux";
import { clearCart } from "../../store/cart/cart.reducer";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

const Checkout = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

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
                cartItems.map((cartItem) => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
            <Total>Total: ${cartTotal}</Total>
            <ClearCartButton onClick={clearWholeCart}>Clear Cart</ClearCartButton>
            <PaymentForm />
        </CheckoutContainer>
    )
}

export default Checkout;