import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { checkUserSession, setRedirectLocation } from "./store/user/user.reducer";
import { selectIsSignedIn, selectRedirectLocation } from "./store/user/user.selector";


const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isSignedIn = useSelector(selectIsSignedIn);
  const redirectLocation = useSelector(selectRedirectLocation);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  useEffect(() => {
    if(location.pathname === '/auth' && isSignedIn){
      redirectLocation ? navigate(redirectLocation) : navigate('/');
      // dispatch(setRedirectLocation('/'));
    }
  }, [isSignedIn])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
