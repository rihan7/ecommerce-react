import React, { useContext } from 'react'

import classes from './Home.module.css'
import { dataContext } from '../../Context'
import Loading from '../../Component/Loading/Loading'
import Showcase from '../../Component/Showcase/Showcase';
import Cart from '../../Component/Cart/Cart';



function Home(props) {
   const {
      data: { loading, allProducts, checkoutShow },
      methodObj: { addProductToCart, favoriteHandler }
   } = useContext(dataContext);


   return (
      <div className={checkoutShow ? classes.home : null} >
         {checkoutShow ? <Cart /> : null}
         {loading ? <Loading viewport /> :
            <Showcase allProducts={allProducts} addProd={addProductToCart} favorite={favoriteHandler} />}
      </div>
   )
}

export default Home
