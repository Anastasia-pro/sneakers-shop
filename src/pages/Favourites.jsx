import Card from "../components/Card/Card";
import React from "react";
import { AppContext } from "../App";

function Favourites({ onAddToFavs }) {
    const { favourites } = React.useContext(AppContext);
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers d-flex flex-wrap">
                {favourites.map((item, index) => (
                    <Card
                        key={index}
                        isLiked={true}
                        onFav={onAddToFavs}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}
export default Favourites;