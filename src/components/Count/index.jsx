import './style.sass';
import { useContext } from 'react';
import { AppContext } from '../Cart';

const Count = ({id, count}) => {

    const {increase, decrease, changeValue} =useContext(AppContext)
    return (
        <div className="count">
            <div className="count__box">
                <input type="number" className="count__input" min="1" max="100" value={count} onChange={(e) => {changeValue(id, +e.target.value)}} />
            </div>
            <div className="count__controls">
                <button type="button" className="count__up" onClick={()=>{increase(id)}}>
                    <img src="./img/icons/icon-up.svg" alt="Increase" />
                </button>
                <button type="button" className="count__down" onClick={()=>{decrease(id)}}>
                    <img src="./img/icons/icon-down.svg" alt="Decrease" />
                </button>
            </div>
        </div>
    );
}

export default Count;