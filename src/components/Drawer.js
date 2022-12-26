import React from "react";
import Info from "./Info";
import { AppContext } from "../App";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) { //Деструктуризация пропсов через задание значения по умолчанию для отдельных эл-ов

    const { cartItems, setCartItems } = React.useContext(AppContext);
    const [isOrderComplete, setIsOrderCompleted] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);




    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://63a178f1e3113e5a5c5656d9.mockapi.io/orders', {
                items: cartItems,

            });
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://63a178f1e3113e5a5c5656d9.mockapi.io/cart' + item.id);
                await delay(1000);
            }

        } catch (error) {
           console.log('Ошибка при создании заказа');
        }
        setIsLoading(false);
    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина
                    <img onClick={onClose} className="remove-btn cu-p" src="/sneakers-shop/imgs/btn-remove.svg" alt="close-btn" />
                </h2>

                {
                    items.length > 0 ?
                        <div className="d-flex flex-column flex"> <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cart-item d-flex align-center mb-20">
                                    <div className="cart-item__img" style={{ backgroundImage: `url(${obj.imageUrl})` }}></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.title}</p>
                                        <b>{obj.price}</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className="remove-btn" src="/sneakers-shop/imgs/btn-remove.svg" alt="remove-btn" />
                                </div>
                            ))}
                        </div>

                            <div className="cart-total__block">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice}</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="green-btn">Оформить заказ
                                    <img src="/sneakers-shop/imgs/arrow.svg" alt="arrow"></img>
                                </button>
                            </div></div>

                        :

                        <Info
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтбы сделать заказ."}
                            image={isOrderComplete ? "/sneakers-shop/imgs/complete-order.jpg" : "/sneakers-shop/imgs/empty-cart.jpg"} />
                }

            </div>
        </div>
    );
}

export default Drawer;