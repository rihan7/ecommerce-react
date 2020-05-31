import React, { useState, useEffect } from 'react'

export const dataContext = React.createContext();

function Context(props) {
   const methodObj = {};
   const [data, setData] = useState({
      loading: true,
      orders: {},
      totalQty: 0,
      totalPrice: 0,
      checkoutShow: false,
      orderSuccessful: false,
      favorite: []
   });

   useEffect(() => {
      getProducts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const getProducts = async () => {
      const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
      const response = await (await fetch('http://localhost:3001/')).json();
      response.map(ele => {
         if (favorite.indexOf(ele._id) >= 0) {
            return ele.favorite = true;
         }
         return ele.favorite = false;
      })
      setData({
         ...data,
         favorite,
         allProducts: response,
         loading: false
      });
   }

   methodObj.addProductToCart = (item) => {
      let { orders, totalPrice, totalQty } = { ...data }
      let storeItem = orders[item._id];
      if (!storeItem) {
         storeItem = orders[item._id] = { item: item, qty: 0, price: 0 };
      }
      storeItem.qty++;
      storeItem.price = storeItem.item.price * storeItem.qty;
      totalQty++;
      totalPrice += storeItem.item.price;
      setData({
         ...data,
         orders, totalPrice, totalQty
      });
   }

   methodObj.reduceToCart = (item) => {
      let { orders, totalPrice, totalQty } = { ...data }
      let storeItem = orders[item._id];
      storeItem.qty--;
      storeItem.price = storeItem.item.price * storeItem.qty;
      totalQty--;
      totalPrice -= storeItem.item.price;
      if (storeItem.qty === 0) {
         delete orders[item._id]
      }
      setData({
         ...data,
         orders, totalPrice, totalQty
      });
   }

   methodObj.clearAll = () => {
      setData({
         ...data,
         orders: {},
         totalQty: 0,
         totalPrice: 0,
      })
   }

   methodObj.checkoutShowHandler = () => {
      setData(prevState => {
         return {
            ...prevState,
            checkoutShow: !prevState.checkoutShow
         }
      })
   }

   methodObj.placeOrder = async () => {
      await (await fetch('http://localhost:3001/checkout', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({ items: data.orders })
      })).json();
      setData({
         ...data,
         orders: {},
         totalQty: 0,
         totalPrice: 0,
         orderSuccessful: true
      })
   }

   methodObj.favoriteHandler = (id) => {
      let allProducts = [...data.allProducts];
      allProducts.map(ele => {
         if (ele._id === id) {
            return ele.favorite = !ele.favorite
         }
         return ele;
      })

      const index = data.favorite.indexOf(id);
      let favorite = [...data.favorite];
      if (index < 0) {
         favorite.push(id);
      } else {
         favorite = favorite.filter(ele => ele !== id);
      }

      setData({
         ...data,
         favorite: favorite
      })
      localStorage.setItem('favorite', JSON.stringify(favorite));
   }

   return (
      <dataContext.Provider value={{ data, methodObj }} >
         {props.children}
      </dataContext.Provider>
   )
}

export default Context
