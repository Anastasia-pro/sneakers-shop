import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import axios from "axios";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavs] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => { //для контроля посылания запросов только при первом рендере исп useEffect
    async function fetchData() {
      const cartResp = await axios.get('https://63a178f1e3113e5a5c5656d9.mockapi.io/cart');
      const favResp = await axios.get('https://63a178f1e3113e5a5c5656d9.mockapi.io/Favs');
      const itemsResp = await axios.get('https://63a178f1e3113e5a5c5656d9.mockapi.io/Items');

      setIsLoading(false);

      setItems(itemsResp.data);
      setCartItems(cartResp.data);
      setFavs(favResp.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://63a178f1e3113e5a5c5656d9.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://63a178f1e3113e5a5c5656d9.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj]);
    }

  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63a178f1e3113e5a5c5656d9.mockapi.io/cart/${id}`); //через шаблон передаём айдишник
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavs = async (obj) => {
    try {
      if (favourites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63a178f1e3113e5a5c5656d9.mockapi.io/Favs/${obj.id}`);
        setFavs((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://63a178f1e3113e5a5c5656d9.mockapi.io/Favs', obj);
        setFavs(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в закладки');
    }

  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  }

  return (
    <AppContext.Provider value={{ cartItems, favourites, items, isItemAdded, setCartOpened, setCartItems, onAddToCart, onAddToFavs }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} />}
        <Header onClickCart={() => { setCartOpened(true) }} />
        <Routes>
          <Route path="/sneakers-shop" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavs={onAddToFavs} //передаём через пропсы в компонент гл стр все нужные данные
            isLoading={isLoading}
          />}>
          </Route>
          <Route path="/Favs" element={<Favourites
            onAddToFavs={onAddToFavs}
          />}>
          </Route>
          <Route path="/orders" element={<Orders />}>
          </Route>
        </Routes>
      </div >
    </AppContext.Provider>
  );
}

export default App;
