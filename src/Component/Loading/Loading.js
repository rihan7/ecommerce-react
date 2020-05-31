import React from 'react'
import classes from './Loading.module.css'

function Loading(props) {
   return (
      <div className={props.viewport ? classes.loadingContainer1 : classes.loadingContainer2}>
         <div className={classes.ldsRipple}>
            <div></div>
            <div></div>
         </div>
      </div>
   )
}

export default Loading
