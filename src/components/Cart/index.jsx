import { useEffect, useState, createContext } from "react";
import ButtonAddProduct from "../ButtonAddProduct";
import CartFooter from "../CartFooter";
import CartHeader from "../CartHeader";
import Product from "../Product";
import { serverPath } from "../../helpers/variables";

export const AppContext = createContext(null);

const Cart = () => {

    const [data, setData] = useState(null)
    const [total, setTotal] = useState(null)
    const [fetchData, setFetchData] = useState(true)

    useEffect(() => {
        fetch(serverPath + 'products').then((res) => res.json()).then((data) => {
            setData(data)
        })
    }, [fetchData])

    useEffect(() => {
        if (data) {
            setTotal({
                prise: data.reduce((prev, current) => prev + current.priceTotal, 0),
                count: data.reduce((prev, current) => prev + current.count, 0)
            })
        }

    }, [data])

    const deleteProductOld = (id) => {
        setData((products) => products.filter((item) => (id !== item.id)))
    }

    const deleteProduct = (id) => {
        fetch(serverPath + 'products/' + id, {
            method: 'DELETE'
        }).then((res) => {
            res.ok && setFetchData(value => !value)
        })
    }

    const increase = (id) => {
        const product = data.find(product => id === product.id)
        const cart = {
            ...product,
            count: product.count + 1,
            priceTotal: (product.count + 1) * product.price
        }
        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        }).then((res) => {
            res.ok && setFetchData(value => !value)
        })
    }

    const decrease = (id) => {

        const product = data.find(product => id === product.id)
        const cart = {
            ...product,
            count: product.count !== 1 ? --product.count : product.count = 1,
            priceTotal: product.count * product.price
        }
        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        }).then((res) => {
            res.ok && setFetchData(value => !value)
        })
    }

    const changeValue = (id, value) => {
        const product = data.find(product => id === product.id)
        const cart = {
            ...product,
            count: value,
            priceTotal: value * product.price
        }
        fetch(serverPath + 'products/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart)
        }).then((res) => {
            res.ok && setFetchData(value => !value)
        })
    }

    const addProduct = () => {

        const images = ["macbook.jpg", "apple-watch.jpg", "mac-pro.jpg"];
        const titles = ["Apple MacBook Air 13", "Apple watch", "Mac Pro"];
        const prices = [10000, 30000, 45000, 50500];

        const random = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)]
        };

        const price = random(prices);

        const data = {
            img: random(images),
            title: random(titles),
            count: 1,
            price: price,
            priceTotal: price
        }

        fetch(serverPath + 'products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            res.ok && setFetchData(value => !value)
        })

    }

    const products = () => {
        return data.map((product) => {
            return (
                <Product key={product.id} product={product} />
            )
        })
    }


    return (
        <AppContext.Provider value={{ deleteProduct, increase, decrease, changeValue }}>
            <section className="cart">
                <CartHeader />
                {data && products()}
                {total && <CartFooter total={total} />}
            </section>
            <ButtonAddProduct addProduct={addProduct} />
        </AppContext.Provider >

    );
}

export default Cart;