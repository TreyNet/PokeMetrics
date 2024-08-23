import React, { useEffect, useCallback, useState } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = useCallback(async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    const pokemonData = await getPokemon(res.data.results);
    setLoading(false);

    // Selecciona automáticamente el primer Pokémon después de cargar los datos.
    if (pokemonData.length > 0) {
      setPokeDex(pokemonData[0]);
    }
  }, [url]);

  const getPokemon = async (results) => {
    const pokemonData = await Promise.all(
      results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    pokemonData.sort((a, b) => (a.id > b.id ? 1 : -1));
    setPokeData(pokemonData);
    return pokemonData; // Retorna los datos de los Pokémon
  };

  useEffect(() => {
    pokeFun();
  }, [pokeFun]); // Dependencia en pokeFun

  return (
    <div className="container">
      <header className="header">
        <h1>PokeMetrics</h1>
      </header>
      <div className="top-content">
        <Pokeinfo data={pokeDex} />
      </div>
      <div className="bottom-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
        />
      </div>
      <div className="btn-group">
        {prevUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
        )}
        {nextUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
