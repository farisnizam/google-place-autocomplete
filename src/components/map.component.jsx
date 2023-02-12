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

  const [option, setOption] = useState(top100Films);

  // console.log("USERS: ", users);
  // console.log("ALL: ", all);

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

  useEffect(() => {
    if (data) {
      setOption(data);
    }
  }, [data]);
  return (
    <>
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
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
      /> */}

      {/* <Autocomplete
        id="google-map-demo"
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add a location" fullWidth />
        )}
        renderOption={(props, option) => {
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      /> */}

      <Combobox onSelect={handleSelect}>
        {/* <Autocomplete>
        <input type="text" placeholder="Origin" />
      </Autocomplete> */}
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
      </Combobox>
    </>
  );
};

export default Places;
