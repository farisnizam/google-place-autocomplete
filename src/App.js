import logo from "./logo.svg";
import "./App.css";
import Map from "./components/map.component";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "./actions";

function App() {
  // const dispatch = useDispatch();
  // const users = useSelector((state) => state.myFirstReducer.users);

  return <Map />;
  // return (
  //   <div className="App">
  //     <button onClick={() => dispatch(getUsersFetch())}>Get Users</button>
  //     <div>
  //       Users:{" "}
  //       {users.map((user) => (
  //         <div>{user.name}</div>
  //       ))}
  //     </div>
  //   </div>
  // );
}

export default App;
