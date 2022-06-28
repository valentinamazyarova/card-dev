import './style.sass';
import formatPrise from '../../utils/formatPrise';

const CartFooter = ({total}) => {
    return (
        <footer className="cart-footer">
            <div className="cart-footer__count">{total.count} ед.</div>
            <div className="cart-footer__price">{formatPrise(total.prise)} руб.</div>
        </footer>
    );
}

export default CartFooter;