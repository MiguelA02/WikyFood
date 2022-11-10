import React from "react";
import { Card } from "./Card";


export const Paginado = (props) => {
  return (
    <div>
      <div>
        {props.items.map((r) => (
          <Card key={r.id} id={r.id} title={r.title} image={r.image} />
        ))}
      </div>
      <button onClick={() => props.nextHandle}>Previo</button>
      <h3>{props.currenPage}</h3>
      <button>Next</button>
    </div>
  );
};
