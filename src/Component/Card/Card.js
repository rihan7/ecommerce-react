import React from 'react';
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import classes from './Card.module.css'

function Card(props) {
   let description = (props.description).length > 180 ? (props.description).substring(1, (props.description).indexOf(' ', 40)) + ' ...' : props.description;
   return (
      <div className={classes.card}>
         <div className={classes.cardImage}>
            <FaHeart className={props.favorite ? classes.favorite : null} onClick={props.toggleFavorite} />
            <img src={props.imagePath} alt="Products" />
         </div>
         <div className={classes.cardDescription}>
            <p className={classes.cardTitle}>{props.title}</p>
            <p>
               {description}
            </p>
         </div>
         <div className={classes.cardFooter}>
            <span>${props.price}</span>
            <span onClick={props.clicked}><FaShoppingCart /></span>
         </div>
      </div>
   )
}

export default Card
