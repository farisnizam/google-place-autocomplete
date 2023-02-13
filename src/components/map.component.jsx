import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useDispatch, useSelector } from "react-redux";
import { selectSearchHistory } from "../store/search/search.selector";
import { getSearch, resetSearch } from "../store/search/search.action";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Places = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBiapQKnqFLYe1m3gID36ZXISop2sXh52w",
    libraries: ["places"],
  });
  const indicatorSize = 50;

  if (!isLoaded) {
    return (
      <CircularProgress
        size={indicatorSize}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: `${-indicatorSize / 2}px`,
          marginLeft: `${-indicatorSize / 2}px`,
        }}
      />
    );
  }

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
  const searchHistory = useSelector(selectSearchHistory);

  const handleSelect = async (event, value) => {
    const address = value.description;
    dispatch(getSearch(address));
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  const handleReset = () => {
    dispatch(resetSearch());
  };

  return (
    <div
      style={{ marginTop: "60px", background: "#FFF", display: "inline-flex" }}
    >
      <Autocomplete
        forcePopupIcon={false}
        onChange={handleSelect}
        disablePortal
        options={data.length > 0 ? data : searchHistory}
        getOptionLabel={(option) => (option ? option.description : "")}
        sx={{ width: 300 }}
        inputValue={value}
        renderInput={(params) => (
          <TextField
            onChange={(e) => {
              setValue(e.target.value);
            }}
            {...params}
            placeholder="Search Google Maps"
          />
        )}
        disableClearable
      />
      <Button onClick={handleReset}>RESET</Button>
    </div>
  );
};

export default Places;
