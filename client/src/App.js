import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Register from "./components/register";
import Login from "./components/login";
import UpdateProfile from "./components/update";
import AllUser from "./components/AllUser";
import SingleUserProfile from "./components/SingleUserProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>

        <Route path="/Login" element={<Login></Login>}>
          {" "}
        </Route>
        <Route path="/alluser" element={<AllUser />}>
          {" "}
        </Route>

        <Route path="/" element={<UserProfile></UserProfile>}>
          {" "}
        </Route>
        <Route path="/Update" element={<UpdateProfile></UpdateProfile>}>
          {" "}
        </Route>
        <Route path="/SingleUserInfo/:id" element={<SingleUserProfile />}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
