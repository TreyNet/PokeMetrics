import React from "react";

const Pokeinfo = ({ data }) => {
  console.log(data);
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt={data.name}
          />
          <div className="type">
            {data.types.map((poke, index) => (
              <div key={index}>
                <button className={`type-button ${poke.type.name}`}>
                  {poke.type.name.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((poke, index) => (
              <h4 key={index}>
                {poke.stat.name}: {poke.base_stat}
              </h4>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Pokeinfo;
