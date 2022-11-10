import React from 'react'
import { useState } from 'react';
import * as actions from "../redux/actions";
import {useDispatch } from "react-redux";
import s from '../styles/SearchBar.module.css'
export const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleOnSumit = (e) => {
    e.preventDefault()
    dispatch(actions.getAllRecipe(input))
    dispatch(actions.resetRecipes(true))
    setInput('')
  }
  return (
    <div className={s.Container} >
      <form onSubmit={handleOnSumit}>
        <input type="text" name='name' value={input} onChange={handleChange} className={s.SearchBar_input} placeholder='Search Recipe' />
        <button type='submit' disabled={input === ''? true : false } className={s.SearchBar_btn}>Search</button>
      </form>
      
    </div>
  )
}
