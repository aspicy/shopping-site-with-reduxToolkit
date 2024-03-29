import styled from 'styled-components';
import Button from '../../components/button/button.component';
import { Link } from 'react-router-dom';

export const CheckoutContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const EmptyCartMessage = styled.span`
  font-size: 2rem;
  padding-top: 2rem;
`

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

export const ClearCartButton = styled(Button)`
  color: red;
`

export const NavLink = styled(Link)`
  margin-top: 2rem;
`

export const SignInButton = styled(Button)`
  font-size: 2rem;
`


