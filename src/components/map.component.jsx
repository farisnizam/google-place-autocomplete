import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import AccessTimeIcon from "@mui/icons-material/";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useDispatch, useSelector } from "react-redux";
import { getSearch } from "../store/search/search.action";

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

  // console.log("USERS: ", users);
  console.log("ALL: ", all);

  const handleSelect = async (event, value) => {
    const address = value.description;
    console.log("address SINI", address);
    // dispatch(getUsersFetch());
    dispatch(getSearch(address));

    setValue(address, false);

    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  console.log('value', value)

  return (
    <div style={{ marginTop: "100px", background: "#FFF" }}>
      <Autocomplete
        forcePopupIcon={false}
        onChange={handleSelect}
        disablePortal
        id="combo-box-demo"
        options={data.length > 0 ? data : all}
        getOptionLabel={(option) => (option ? option.description : "")}
        sx={{ width: 300 }}
        inputValue={value}
        renderInput={(params) => (
          <TextField
            // value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            {...params}
            placeholder="Search Google Maps"
          />
        )}

        disableClearable
      />
    </div>
  );
};

export default Places;
