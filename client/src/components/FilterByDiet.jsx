import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import * as actions from "../redux/actions";
import s from '../styles/Filter.module.css';

export const FilterByDiet = () => {
    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        dispatch(actions.orderByDiet(e.target.value))
        dispatch(actions.update(true,false))
    };

  return (
    <div className="App">
        <select name="lenguajes" className={s.Filter_Select} onChange={handleOnChange}>
            <option value="All">All</option>
            <option value="gluten free">gluten Free</option>
            <option value="ketogenic">ketogenic</option>
            <option value="vegetarian">vegetarian</option>
            <option value="lacto vegetarian">lacto vegetarian</option>
            <option value="ovo vegetarian">ovo vegetarian</option>
            <option value="vegan">vegan</option>
            <option value="pescetarian">pescetarian</option>
            <option value="paleo">paleo</option>
            <option value="primal">primal</option>
            <option value="low FODMAP">low FODMAP</option>
            <option value="whole 30">whole 30</option>
        </select>
    </div>
  )
}
