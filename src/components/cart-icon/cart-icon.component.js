import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { ReactComponent as ShoppingIcon } from '../../assets/114 shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpened, setIsCartOpened } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpened(!isCartOpened);
  }

  return(
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  )
}

export default CartIcon;