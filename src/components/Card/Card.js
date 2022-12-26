import style from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import React from 'react';
import { AppContext } from '../../App';

function Card({ id,
    onFav,
    onPlus,
    title,
    imageUrl,
    price,
    isLiked = false,
    loading = false }) { //destructurization


    const { isItemAdded } = React.useContext(AppContext);
    const [isFav, setIsFav] = React.useState(isLiked);


    const handlePlus = () => {
        onPlus({ id, title, imageUrl, price });
    }

    const onClickFav = () => {
        onFav({ id, title, imageUrl, price });
        setIsFav(!isFav);
    }

    return (
        <div className={style.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={155}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="0" rx="10" ry="10" width="32" height="32" />

                </ContentLoader> :
                    <>
                        {onFav &&
                            (<div className={style.fav} onClick={onClickFav}>
                                <img
                                    src={isFav ? "/sneakers-shop/imgs/red-heart.svg" : "/sneakers-shop/imgs/grey-heart.svg"}
                                    alt="unliked-card"
                                />
                            </div>)
                        }
                        <img width="100%" height={135} src={imageUrl} alt="sneakers"></img>
                        <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            {onPlus && (
                                <img
                                    className={style.plus}
                                    onClick={handlePlus}
                                    src={isItemAdded(id) ? "/sneakers-shop/imgs/selected.svg" : "/sneakers-shop/imgs/plus-btn.svg"}
                                    alt="plus-btn">
                                </img>
                            )}
                        </div>
                    </>
            }
        </div>
    );
}
export default Card;