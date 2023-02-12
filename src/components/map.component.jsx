import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import parse from "autosuggest-highlight/parse";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch, getSearch } from "../store/search/search.action";

const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBiapQKnqFLYe1m3gID36ZXISop2sXh52w",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
};

const Map = () => {
  const center = { lat: 4.210484, lng: 101.975766 };
  const [selected, setSelected] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [focus, setFocus] = useState(center);

  useEffect(() => {
    if (selected) {
      setZoom(15);
      setFocus(selected);
    }
  }, [selected]);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <GoogleMap
        zoom={zoom}
        center={focus}
        mapContainerClassName="map-container"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.searchReducer.address);

  // console.log("USERS: ", users);
  console.log("search History: ", searchHistory);

  const handleSelect = async (address) => {
    // console.log("address SINI", address);
    dispatch(getSearch(address));
    setValue(address, false);

    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  // console.log("data >>", data);
  // console.log("option >>", option);

  // console.log("value", value);
  return (
    <div style={{ marginTop: "100px", background: "#FFF" }}>
      <Autocomplete
        onChange={(event, newValue) => {
          handleSelect(newValue.description);
        }}
        disablePortal
        id="combo-box-demo"
        options={data.length > 0 ? data : searchHistory}
        getOptionLabel={(option) => (option ? option.description : "")}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => {
              setValue(e.target.value);
            }}
            {...params}
            placeholder="Search Google Maps"
          />
        )}
      />
    </div>
  );
};

export default Places;
