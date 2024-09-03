import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <div  className="loading">
          <h1>Loading...</h1>
        </div>
        
      ) : (
        <div className="card-container"> {/* Contenedor para las tarjetas */}
          {pokemon.map((item) => (
            <div
              className="card"
              key={item.id}
              onClick={() => infoPokemon(item)}
            >
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt={item.name} />
              <h2>{item.name.toUpperCase()}</h2> {/* Nombre en mayúsculas */}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Card;
