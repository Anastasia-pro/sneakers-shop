import Card from "../components/Card/Card";
import React from "react";

function Home({
    items,
    searchValue,
    setSearchValue,
    onAddToCart,
    onAddToFavs,
    onChangeSearchInput,
    isLoading }) {


    const renderItems = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
            <Card
                key={index}
                onFav={(obj) => onAddToFavs(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/imgs/search.svg" alt="search-icon" />
                    {searchValue &&
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear remove-btn cu-p"
                            src="imgs/btn-remove.svg"
                            alt="clear"
                        />}
                    {/* если есть что-то то кнопка будет, если пусто то кнопка не появляется */}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>

            <div className="sneakers d-flex flex-wrap">
                {renderItems()}
            </div>

        </div>
    )
}
export default Home;