import React from 'react'
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import classes from './Cart-element.module.css'

function CartElement(props) {
   return (
      <div>
         <div className={classes.shoppingCartEle}>
            <img src={props.imagePath} alt="itemImg" />
            <h5>{props.title} </h5>
            <p>${props.price}</p>
            <span className={classes.span}>
               <FaAngleUp onClick={props.upClicked} />
               <p>{props.totalQty}</p>
               <FaAngleDown onClick={props.downClicked} />
            </span>
            <p>Total: ${props.totalPrice}</p>
         </div>
         <hr />
      </div>
   )
}

export default CartElement
