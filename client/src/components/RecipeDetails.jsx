import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as actions from "../redux/actions";
import { Card } from "./Card";
import loading from "../img/Spinner-1s-200px.gif";
import s from "../styles/Details.module.css";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";

export const RecipeDetails = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  let state = useSelector((state) => state.recipeDetails);
  useEffect(() => {
    dispatch(actions.resetRecipeDetails());
    dispatch(actions.getRecipeDetails(id));
  }, []);

  if (!state.hasOwnProperty("title")) {
    return (
      <div>
        <img src={loading} alt="" />
      </div>
    );
  } else {
    return (
      <div>
        <Nav />
        <div className={s.Details_Container}>
          <img src={state.image} alt="" className={s.Details_Image} />
          <div className={s.Details_Info}>
            <h1>{state.title}</h1>
            <p>{state.summary}</p>
            <h3>Healh score</h3>
            <p>{state.healthScore}%</p>
            <h3>Diets</h3>
            {state.diets.length === 0 ? (
              <p>Sin dietas</p>
            ) : state.diets[0].hasOwnProperty("name") ? (
              state.diets.map((d, index) => (
                <Card key={index} id={index} data={d.name} miniCard={true} />
              ))
            ) : (
              state.diets.map((d, index) => (
                <Card key={index} id={index} data={d} miniCard={true} />
              ))
            )}
            <h3>Instruccions</h3>
            {state.instructions.length === 0 ? (
              <p>Sin instrucciones</p>
            ) : (
              state.instructions.map((i, index) => (
                <span>
                  <b>Step {index + 1}:</b> {i}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
};
