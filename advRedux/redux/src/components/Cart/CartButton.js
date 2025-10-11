import classes from './CartButton.module.css';
import {toggleAction} from "../../store/cartToggle";
import {useDispatch,useSelector} from "react-redux";

const CartButton = (props) => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const handleCartToggle = () =>{
        dispatch(toggleAction.Ontoggle());
    }
  return (
    <button onClick={handleCartToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
