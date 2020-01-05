import { h } from "preact";
import { useState } from "preact/hooks";

import styles from "./PlaceInput.css";

const PlaceInput = props => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const performSearch = async ({ target: { value } }) => {
    setValue(value);
    const results = (await props.searcher.search(value)).features;
    setResults(results);
  };

  const selectPlace = feature => {
    setResults([]);
    setValue(feature.place_name);
    props.onSelected(feature);
  };

  return (
    <div>
      <input
        class={styles.input}
        value={value}
        onInput={performSearch}
        placeholder={props.placeholder}
      />
      <ul class={styles.results}>
        {results.map(r => (
          <li class={styles.result} onClick={() => selectPlace(r)}>
            {r.place_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceInput;
