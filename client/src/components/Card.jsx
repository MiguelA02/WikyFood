import React from 'react'
import s from '../styles/Card.module.css'
import { Link } from 'react-router-dom'
export const Card = (props) => {
  
  if(props.miniCard){
    return(
    <div>
      <div>
        <p>{props.data}</p>
      </div>
    </div>
    )
  }else{
    return (
      <Link to={`/Recipe/Details/${props.id}`} className={s.Card_Link}>
          <div className={s.Card_container}>
              <img src={props.image} alt="" className={s.img}/>
              <p className={s.title}>{props.title}</p>
          </div>
      </Link>
    )
  }
  
}
