import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import s from "../styles/Main.module.css";
import image from "../img/img_main (3).png";
import logoMain from '../img/WikiFoodMainLogo.png'
export const Main = () => {
  const dispatch = useDispatch();
  const loadDiets = () => {
    dispatch(actions.getDiets());
    dispatch(actions.resetRecipes(false));
  };

  return (
    <div className={s.MainContainer}>
      <div className={s.Left}>
        <div className={s.left_container}>
        <img src={image} alt="" className={s.ImageMain} />
        </div>
      </div>
      <div className={s.Right}>
        <div className={s.title}>
          <img src={logoMain} alt="" className={s.logoMain}/>
        </div>
          <div className={s.btnContainer}>
           <Link to={'/Home'}><button className={s.btn} onClick={() => loadDiets()}>Start Page</button></Link>
          </div>
      </div>
      
    </div>
  );
};
