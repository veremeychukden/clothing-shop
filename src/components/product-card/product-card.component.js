import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './product-card.styles.js';
import { CartContext } from '../../contexts/cart.context';
import { ProductCardContainer, Footer, Name, Price } from './product-card.styles.js';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return(
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name as="span">{name}</Name>
        <Price as="span">{price}</Price>
      </Footer>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>ADD TO CARD</Button>
    </ProductCardContainer>
  )
}

export default ProductCard;