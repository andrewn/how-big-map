import { h } from "preact";
import { useState, useReducer } from "preact/hooks";

import style from "./style";

import Place from "./Place";
import PlaceInput from "./PlaceInput";
import PlaceSearch from "./PlaceSearch";

const Actions = {};
const initialState = { zoom: null };
const reducer = (state, action) => {
  switch (action.type) {
    case Actions.zoom:
      return { ...state, zoom: action.payload };
    default:
      throw new Error("Unexpected action");
  }
};

const Home = () => {
  const searcher = new PlaceSearch();
  const [placeA, setPlaceA] = useState(null);
  const [placeB, setPlaceB] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(placeA, placeB);

  const zoom = state.zoom;
  const handleZoom = payload => dispatch({ type: Actions.zoom, payload });

  const hasBothPlaces = placeA && placeB;

  console.log("zoom", zoom);

  return (
    <div class={`${style.home} ${hasBothPlaces ? style.hasBothPlaces : ""}`}>
      <div class={style.banner}>
        <h1>How Big Map</h1>
        <p>Compare two places for fun</p>
      </div>

      <section class={`${style.a} ${placeA ? "is-map" : "is-input"}`}>
        {placeA ? (
          <Place
            feature={placeA}
            theme="light"
            zoom={zoom}
            onZoom={handleZoom}
          />
        ) : (
          <PlaceInput
            searcher={searcher}
            onSelected={setPlaceA}
            placeholder="A place"
          />
        )}
      </section>

      <section class={`${style.b} ${placeB ? "is-map" : "is-input"}`}>
        {placeB ? (
          <Place
            feature={placeB}
            theme="light"
            zoom={zoom}
            onZoom={handleZoom}
          />
        ) : (
          <PlaceInput
            searcher={searcher}
            onSelected={setPlaceB}
            placeholder="Another place"
          />
        )}
      </section>
    </div>
  );
};

export default Home;
