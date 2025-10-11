import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from "react-redux";
import {Fragment, useEffect} from "react";
import {fetchCartData, sendCartData} from "./store/cart-actions";
import Notification from "./components/UI/Notification";
let initialRen = true;
function App() {
    const showCart = useSelector(state => state.cartToggle.showCart)
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.cartToggle.notification);
    useEffect(() => {
        dispatch(fetchCartData());
    }, []);
    useEffect(() => {
        if(initialRen) {
            initialRen = false;
            return ;
        }
        if(cart.changed){
            dispatch(sendCartData(cart));
        }


    }, [cart,dispatch]);
  return (
    <Fragment>
        {notification && <Notification status = {notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
        {showCart && <Cart/>}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
