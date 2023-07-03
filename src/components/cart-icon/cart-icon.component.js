import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.js';

const CartIcon = () => {
  const { isCartOpened, setIsCartOpened, cartCount } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpened(!isCartOpened);
  }

  return(
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon />
      <ItemCount as="span">{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;