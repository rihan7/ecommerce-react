import React, { useContext } from 'react'
import { FaShoppingCart } from "react-icons/fa";

import classes from './Header.module.css';
import { dataContext } from '../../Context'


function Header(props) {
   const { data: { totalQty }, methodObj: { checkoutShowHandler } } = useContext(dataContext);

   return (
      <div className={classes.header}>
         <div>
            <h3>New Market</h3>
         </div>
         <ul>
            <li onClick={() => checkoutShowHandler()} >
               <FaShoppingCart /> Shopping Cart
                  {totalQty > 0 ? <span className={classes.badge}> {totalQty}</span> : null}
            </li>
         </ul>
      </div>
   )
}


export default Header;
