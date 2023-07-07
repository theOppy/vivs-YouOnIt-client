import React from "react";
import { getUserID } from "../hooks/getUserID";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = React.useState({});
  const userID = getUserID();

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/userInfo/${userID}`
      );
      setUserData(result.data);
    })();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  console.log(userData.file);
  return (
    <div className="">
      <nav className="bg-white border-gray-200 dark:bg-gray-900" />
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 px-3">
        <a className="flex items-center">
          <span className="self-center text-4xl font-light italic  whitespace-nowrap dark:text-gray-300">
            <span className="text-blue-500 font-semibold">You</span>OnIt
          </span>
        </a>
        <div className="flex items-center">
          <button
            onClick={logout}
            className="mr-6 lg:hidden sm:flex  text-sm font-light  text-gray-500 dark:text-white hover:underline"
          >
            Log Out
          </button>
          <Link to={`/profile/${userData.username}`}>
            <button className="mr-6 text-sm font-light  text-gray-500 dark:text-white hover:underline">
              Edit Your Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
