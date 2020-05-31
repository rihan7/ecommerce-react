import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";

import classes from './Cart.module.css'
import CartElement from '../Cart-element/Cart-element';
import { dataContext } from '../../Context'

function Cart(props) {
   const {
      data: { orders, totalPrice, orderSuccessful },
      methodObj: { addProductToCart, checkoutShowHandler, reduceToCart, clearAll, placeOrder }
   } = useContext(dataContext);

   const modOrders = Object.keys(orders).map(order => {
      orders[order].item.totalPrice = orders[order].price;
      orders[order].item.totalQty = orders[order].qty;
      return orders[order].item;
   })

   return (
      <div className={classes.cartInit}>
         <div className={classes.backdrop} onClick={() => checkoutShowHandler()}></div>
         <div className={classes.cart}>
            {!!modOrders.length ?
               <div className={classes.cartBox}>
                  <div className={classes.cartHead}>
                     <h3>Your Cart</h3>
                     <span onClick={() => clearAll()}><MdDelete /> Clear</span>
                  </div>
                  <div className={classes.cartList}>
                     {modOrders.map((order, i) => {
                        return (< CartElement {...order}
                           upClicked={() => addProductToCart(order)}
                           downClicked={() => reduceToCart(order)} key={i} />)
                     }
                     )}
                  </div>
                  <div className={classes.cartHead}>
                     <button className={classes.orderBtn} onClick={() => placeOrder()}>Place Order</button>
                     <p>Grand Total: ${totalPrice}</p>
                  </div>
               </div>
               : <h3 className="container" >
                  {orderSuccessful ? 'You successfully created your order' : 'Nothing added to cart'}
               </h3>
            }
         </div>
      </div>
   )
}

export default Cart
