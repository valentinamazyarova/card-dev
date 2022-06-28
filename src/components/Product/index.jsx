import ButtonDelete from '../ButtonDelete';
import Count from '../Count';
import './style.sass';
import formatPrise from '../../utils/formatPrise';

const Product = ({product}) => {
    const {id, title, priceTotal, img, count} = product

    
    return ( 
        <section className="product">
                <div className="product__img"><img src={`./img/products/${img}`} alt={title} /></div>
                <div className="product__title">{title}</div>
                <div className="product__count">
                    <Count id={id} count={count}/>
                </div>
                <div className="product__price">{formatPrise(priceTotal)} руб.</div>
                <div className="product__controls">
                    <ButtonDelete id={id}/>
                </div>
            </section>
     );
}
 
export default Product;