import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Tweet from "./pages/Tweet";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:user" element={<Profile />} />
        <Route path="/user/:user" element={<User />} />
        <Route path="/tweet/:tweetID" element={<Tweet />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
