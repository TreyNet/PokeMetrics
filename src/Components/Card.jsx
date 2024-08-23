import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
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
