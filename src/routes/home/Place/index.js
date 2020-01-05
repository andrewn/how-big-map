import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import config from "../../../../config";

import styles from "./styles.css";

mapboxgl.accessToken = config.accessToken;

const Place = ({ feature, theme = "light", zoom, onZoom }) => {
  const [isZooming, setIsZooming] = useState(false);
  const el = useRef();
  const map = useRef();

  useEffect(() => {
    if (!map.current) {
      // Initialize map
      const mapOpts = zoom
        ? { center: feature.center, zoom }
        : { bounds: feature.bbox };

      map.current = new mapboxgl.Map({
        ...mapOpts,
        container: el.current,
        style: `mapbox://styles/mapbox/${theme}-v10`
      });

      function fireZoom() {
        onZoom(map.current.getZoom());
      }

      map.current.on("load", fireZoom);
      map.current.on("zoomstart", () => {
        setIsZooming(true);
      });
      map.current.on("zoomend", () => {
        setIsZooming(false);
        fireZoom();
      });
    } else {
      if (!isZooming && map.current.getZoom() != zoom) {
        // Sync map zoom
        map.current.setZoom(zoom);
      }
    }
  }, [zoom]);

  return (
    <div class={styles.container}>
      {/*<div>{zoom}</div>*/}
      <div ref={el} class={styles.map}></div>
    </div>
  );
};

export default Place;
