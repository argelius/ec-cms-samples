import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const COCKPIT_ROOT = "http://localhost:8090";

function renderMushroom(mushroom) {
  return (
    <div key={mushroom._id} className="mushroom">
      <h2>{mushroom.name}</h2>
      {mushroom.poisonous === "1" ? (
        <strong style={{ color: "red" }}>Giftig!</strong>
      ) : null}
      {mushroom.rating && mushroom.poisonous === "0" ? `Smak: ${mushroom.rating}` : null}
      <div className="mushroom-sn"><em>{mushroom.scientific_name}</em></div>
      <img alt={mushroom.name} src={`${COCKPIT_ROOT}/${mushroom.image.path}`} />
      <p>{mushroom.description}</p>
      {mushroom.similar_species ? (
        <div>
          <h3>Förväxlingssvampar</h3>
          <ul>
            {mushroom.similar_species.map(mushroom => mushroom.display)}
          </ul>
        </div>
      ) : null}
    </div>
  );
  return mushroom.name;
}

function App() {
  const [mushrooms, setMushrooms] = useState([]);
  const [onlyPoisonous, setOnlyPoisonous] = useState(false);
  const [sort, setSort] = useState("name");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let qs = `sort[${sort}]=${sort === "rating" ? -1 : 1}`;

    if (query) {
      qs += `&filter[name][$regex]=${query}`;
    }

    if (onlyPoisonous) {
      qs += "&filter[poisonous]=1";
    }

    axios
      .get(`${COCKPIT_ROOT}/api/collections/get/mushrooms?${qs}`)
      .then(response => {
        setMushrooms(response.data.entries);
      });
  }, [query, onlyPoisonous, sort]);

  return (
    <>
      <h1>Svampar</h1>
      <p>
        <label>
          <input value={query} type="text" onChange={e => setQuery(e.target.value)} placeholder="Sök..." />
        </label>
      </p>
      <p>
        <label>
          <input value={onlyPoisonous} type="checkbox" onChange={() => setOnlyPoisonous(!onlyPoisonous)} />
          Visa endast giftiga svampar
        </label>
      </p>
      <p>
        <label>
          Sortera på
          <select onChange={e => setSort(e.target.value)}>
            <option value="name">namn</option>
            <option value="rating">smak</option>
          </select>
        </label>
      </p>
      <div className="mushrooms">{mushrooms.map(renderMushroom)}</div>
    </>
  );
}

export default App;
