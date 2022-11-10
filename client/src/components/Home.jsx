import React, { useState } from "react";
import { Card } from "./Card";
import { useEffect } from "react";
import { Filter } from "./Filter";
import { FilterByDiet } from "./FilterByDiet";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import s from '../styles/Home.module.css'
import loading from '../img/Spinner-1s-200px.gif'

export const Home = () => {
  const dispatch = useDispatch();
  let update = useSelector((state) => state.update);
  let state = useSelector((state) => state.recipes);
  let reset = useSelector((state) => state.resetRecipes);
  let copyState = useSelector(state => state.recipesCopy)

  const [page, setPage] = useState(0)
  const handleNext = () => {
    let firstIndex = (page + 1) * 10
    if(copyState.length > firstIndex){
      setPage(page + 1)
    }
    
  };
  const handlePrev = () => {
    if(page >= 1){
      setPage(page - 1)
    }
    
  }

  useEffect(() => {
    if ((state.length === 0 && !reset) || update.recipes) {
      dispatch(actions.getAllRecipe());
    }
  }, [update]);

  useEffect(() => {
    dispatch(actions.showPage(page))
    dispatch(actions.update(true, false))
  },[page])
  
  if (state.hasOwnProperty("message")) {
    return (
      <div className={s.Home_container}>
        <div className={s.Home_Filter}>
          <Filter/>
          <FilterByDiet/>
       </div>
        <h1>{state.message}</h1>
      </div>
    );
  }
  else if (state.length === 0) {
    return (
      <div>
        <img src={loading} alt="" />
      </div>
    );
  }else{
  return (
    <div className={s.Home_container}>
      <div className={s.Home_Filter}>
        <Filter/>
        <FilterByDiet/>
      </div>
      
      <div>
        {state.map((r) => (
          <Card key={r.id} id={r.id} title={r.title} image={r.image} />
        ))}
      </div>
      <div className={s.Home_Paginator}>
        <button onClick={handlePrev} className={s.Home_btn}>Previous</button>
        <h3>{page + 1} de {Math.ceil(copyState.length / 10)}</h3>
        <button onClick={handleNext} className={s.Home_btn}>Next</button>
      </div>
    </div>
  );
  }
  
 
};
