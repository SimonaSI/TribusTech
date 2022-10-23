import logo from "./logo.svg";
import "./App.css";
import UserCard from "./components/CardUser/CardUser";
import AddUser from "./components/AddUser/AddUser";
import { route } from "./utils/appRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<UserCard />} />
        <Route path={route.addUser} element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
