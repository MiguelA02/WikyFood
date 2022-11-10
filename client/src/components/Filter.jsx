import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import * as actions from "../redux/actions";
import s from '../styles/Filter.module.css'
export const Filter = () => {
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    dispatch(actions.order(e.target.value))
    dispatch(actions.update(true,false))
  };
  
  return (
    
    //Separar las dietas y afabericamente en diferentes filters

    <div className="App">
        <select name="lenguajes" className={s.Filter_Select} onChange={handleOnChange}>
            <option>Selecionar orden</option>
            <option value="ascendente">A-Z</option>
            <option value="desendente">Z-A</option>
        </select>
    </div>
  );
};
