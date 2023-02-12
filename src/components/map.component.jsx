import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

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
import { getUsersFetch, getSearch } from "../actions";

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

  // console.log("selected: ", selected);

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
  const users = useSelector((state) => state.myFirstReducer.users);
  const all = useSelector((state) => state.myFirstReducer.address);

  const top100Films = [
    { description: "The Shawshank Redemption", year: 1994 },
    { description: "The Godfather", year: 1972 },
    { description: "The Godfather: Part II", year: 1974 },
    { description: "The Dark Knight", year: 2008 },
    { description: "12 Angry Men", year: 1957 },
  ];

  const top100Films2 = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Godfather: Part II",
    "The Dark Knight",
    "12 Angry Men",
  ];

  const [option, setOption] = useState(top100Films);

  console.log("USERS: ", users);
  console.log("ALL: ", all);

  const handleSelect = async (address) => {
    console.log("address SINI", address);
    dispatch(getUsersFetch());
    dispatch(getSearch(address));

    setValue(address, false);

    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  // console.log("top100Films", top100Films);
  console.log("data >>", data);
  console.log("option >>", option);

  const options = ["Option 1", "Option 2"];

  const [value2, setValue2] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (data) {
      console.log("option", value);
      setOption(data);
    }
  }, [data]);

  console.log("value", value);
  return (
    <div style={{ marginTop: "100px", background: "#FFF" }}>
      <Autocomplete
        onChange={(event, newValue) => {
          handleSelect(newValue.description);
        }}
        disablePortal
        id="combo-box-demo"
        options={data}
        getOptionLabel={(option) => (option ? option.description : "")}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => {
              // handleSelect(e.target.value);
              setValue(e.target.value);
            }}
            {...params}
            label="Movie"
          />
        )}
      />
      {/* 
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox> */}
    </div>
  );
};

export default Places;
