import React from 'react'

import classes from './Showcase.module.css'
import Card from '../Card/Card'

const Showcase = (props) => {
   return (
      <div className={classes.showcase}>
         {props.allProducts.map((product, i) =>
            <Card key={i} {...product} clicked={() => props.addProd(product)} toggleFavorite={() => props.favorite(product._id)} />)}
      </div>
   )
}

export default Showcase
