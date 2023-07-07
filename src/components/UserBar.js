import React from "react";
import { getUserID } from "../hooks/getUserID";
import axios from "axios";
import { Link } from "react-router-dom";

const UserBar = () => {
  const [userData, setUserData] = React.useState({});
  const [followers, setFollowers] = React.useState(0);
  const userID = getUserID();

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/userInfo/${userID}`
      );
      const { followers } = result.data;
      setUserData(result.data);
      setFollowers(followers.length);
    })();
  }, []);

  return (
    <div
      className={`${
        userData.occupation ? "h-5/6" : "h-2/6"
      } w-screen  flex-col flex justify-between `}
    >
      <div className="h-1/6 flex items-center mt-8">
        <img
          src={`https://vivs-youonit-server.onrender.com/${userData.file}`}
          alt="Profile"
          className="w-12 h-12 rounded-full ml-5 mr-4"
        />
        <div>
          <Link to={`/profile/${userData.username}`}>
            <img
              src="https://img.icons8.com/?size=512&id=nO3RDuQhGBLx&format=png"
              alt="setting"
              className="absolute  h-5 w-5 ml-56 hover: top-10 "
            />
          </Link>
        </div>

        <div className=" capitalize font-semibold  text-white">
          {userData.name} {userData.lastName}
          <p className="text-sm font-light text-neutral-400 opacity-60">
            {followers} friends
          </p>
        </div>
      </div>
      {userData.location && (
        <div className="h-2/6 flex justify-around flex-col mt-11 gap-2  ml-5">
          <div className="flex">
            <img
              src="https://icon-library.com/images/location-icon-white-png/location-icon-white-png-12.jpg"
              alt="location png icon"
              className="h-6 w-6 mr-3 text-white hover:animate-spin"
            />
            <p className=" font-light text-sm flex items-center text-neutral-100 opacity-40">
              {userData.location}
            </p>
          </div>
          <div className="flex ">
            <img
              src="https://img.icons8.com/?size=512&id=geb584jjXHjX&format=png"
              alt="work icon png"
              className="h-6 w-6 mr-3 mb-2 text-white"
            />
            <p className=" font-light text-sm flex items-center text-neutral-100 opacity-40">
              {userData.occupation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBar;
