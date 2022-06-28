import './style.sass'
const ButtonAddProduct = ({addProduct}) => {
    return (
        <section className="button-container">
            <button className="button" onClick={addProduct}>Add product</button>
        </section>
    );
}

export default ButtonAddProduct;