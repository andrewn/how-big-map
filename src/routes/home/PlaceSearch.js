import mapbox from "@mapbox/mapbox-sdk/services/geocoding";
import config from "../../../config";

const MY_ACCESS_TOKEN = config.accessToken;

const PlaceSearch = function() {
  const client = mapbox({ accessToken: MY_ACCESS_TOKEN });

  return {
    search: async query => {
      return (
        await client
          .forwardGeocode({
            query
          })
          .send()
      ).body;
    }
  };
};

export default PlaceSearch;
