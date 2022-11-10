import React from 'react'
import { Link } from 'react-router-dom'
import * as actions from "../redux/actions";
import {useDispatch } from "react-redux";
import s from '../styles/Nav.module.css'
import logoGif from '../img/wIKIfood (3).gif'
export const Nav = (props) => {
  const dispatch = useDispatch()
  const handleOnClick = () => {
    if(!props.reDispatch){
      dispatch(actions.getAllRecipe(''))
      dispatch(actions.resetRecipes(true))
    }
    
  }
  return (
    <div className={props.follow && s.Nav_Container}>
      <ul className={s.Nav_ul}>
        
        <Link to={'/Home'} className={s.Nav_Link}><img src={logoGif} alt="" className={s.Nav_img} onClick={handleOnClick}/></Link>
        <Link to={'/Create'}><button className={s.Nav_btn}>Create Recipe</button></Link>
      </ul>
    </div>
  )
}
