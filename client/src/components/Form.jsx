import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions";
import { useState } from "react";
import s from "../styles/Form.module.css";
import { Nav } from "./Nav";
import utils from '../utils/AllDiets'

export const Form = () => {
  const dispatch = useDispatch();
 
  const [error, setError] = useState(false);
  const [menssage, setMessage] = useState("")  

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    step: "",
    stepCount: 1,
    instructions: [],
    image:
      "https://img.freepik.com/foto-gratis/vista-superior-marco-comida-deliciosa_23-2148708201.jpg?w=1380&t=st=1666560093~exp=1666560693~hmac=822cf89eb21ba25a21902e66fa2b6ea8f627e705c60392bd1ab787731bbdcb81",
    type: "",
    diet: [],
  });

  const addDiet = () => {
    if(utils.includes(input.type)){
      setInput({ ...input, diet: [...input.diet, input.type.toLocaleLowerCase()], type: "" });
      setError(false)
      setMessage(``)
    }else{
      setError(true)
      setMessage(`La dieta ${input.type} no se encuentra en nuestra base de datos`)

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }
    
  };
  const addStep = () => {
    setInput({
      ...input,
      instructions: [...input.instructions, input.step],
      step: "",
      stepCount: input.stepCount + 1,
    });
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelete = (e) =>{
    e.preventDefault()
    setInput({
      ...input,
      diet: input.diet.filter((d) => d !== input.diet[e.target.value])
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.title === ''){
      setError(true)
      setMessage('El campo de title no puede estar vacio')

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }else if(input.summary === ""){
      setError(true)
      setMessage('El campo summary no puede estar vacio')

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 5000);
    }else{
      dispatch(actions.createRecipe(input));

      setInput({
        title: "",
        summary: "",
        healthScore: 0,
        step: "",
        stepCount: 1,
        instructions: [],
        image:
          "https://img.freepik.com/foto-gratis/vista-superior-marco-comida-deliciosa_23-2148708201.jpg?w=1380&t=st=1666560093~exp=1666560693~hmac=822cf89eb21ba25a21902e66fa2b6ea8f627e705c60392bd1ab787731bbdcb81",
        type: "",
        diet: [],
      });
      dispatch(actions.update(false, true));
    }
  };
  return (
    <div className={s.outContainer}>
      <Nav reDispatch={true} />
      <div className={s.containerMain}>
        <h1>Create recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className={s.Form_container_elements}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={input.title}
              className={s.Form_input}
              onChange={handleChange}
            />
          </div>

          <div className={s.Form_container_elements}>
            <label htmlFor="">Image</label>
            <input
              type="text"
              name="image"
              value={input.image}
              className={s.Form_input}
              onChange={handleChange}
            />
          </div>

          <div className={s.Form_container_elements}>
            <label htmlFor="">Step {input.stepCount}</label>
            <div>
              <input
                type="text"
                name="step"
                value={input.step}
                className={s.Form_input_withBtn}
                onChange={handleChange}
              />
              <button
                type="button"
                className={s.Form_input_btn}
                onClick={addStep}
              >
                Add step
              </button>
            </div>
          </div>

          <div className={s.container_small}>
            <div className={s.Form_container_elementsScore}>
              <label htmlFor="">Health Score</label>
              <input
                type="number"
                name="healthScore"
                max={100}
                value={input.healthScore}
                className={s.Form_input_small}
                onChange={handleChange}
              />
            </div>

            <div className={s.Form_container_elementsSmall}>
              <label htmlFor="">Diet</label>
              <div>
                <input
                  type="text"
                  name="type"
                  value={input.type.toLowerCase()}
                  className={s.Form_input_smallBnt}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={s.Form_btn_Small}
                  onClick={addDiet}
                >
                  Add diet
                </button>
                {input.diet.map((d, i) =>
                  {
                    return <div key={i}>
                      <p>{d}</p>
                      <button value={i} onClick={handleDelete}>x</button>
                    </div>
                  })}
              </div>
            </div>
          </div>
          <div className={s.Form_container_TextArea}>
            <label htmlFor="">Summary</label>
            <textarea
              type="text"
              name="summary"
              value={input.summary}
              cols="40"
              rows="6"
              onChange={handleChange}
            />
          </div>
          <div className={error? s.errorBox: s.errorBox_disable}>
            <p className={s.textError}>{menssage}</p>
            
            {menssage === `La dieta ${input.type} no se encuentra en nuestra base de datos` &&<div>
              <p>Lista de dietas disponibles</p>
              <p>
                {utils.map(d => `${d}, `)}
              </p>
            </div>}

          </div>
          <button type="submit" className={s.Form_btnCreate}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
