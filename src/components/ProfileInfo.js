import React from "react";
import axios from "axios";
import { getUserID } from "../hooks/getUserID";
import "../index.css";
import UserTweets from "./UserTweets";
import { Link } from "react-router-dom";
import Edit from "../pages/Edit";

const ProfileInfo = () => {
  const userID = getUserID();
  const [userData, setUserData] = React.useState({});
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [blur, setBlur] = React.useState(false);

  const setting = () => {
    setBlur(!blur);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `https://vivs-youonit-server.onrender.com/userInfo/${userID}`
        );
        setUserData(result.data);
        const { followers, following } = result.data;
        setFollowers(followers.length);
        setFollowing(following.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userID]);
  return (
    <div className="flex justify-center">
      {blur && (
        <img
          src="https://img.icons8.com/?size=512&id=lgIrwM1kSBeh&format=png"
          alt="X"
          onClick={setting}
          className="w-14 cursor-pointer h-14 lg:top-36 sm:top-4 left-14 z-50 flex hover:bg-opacity-50 hover:bg-blue-900 ease-in-out  p-1 rounded-xl relative"
        />
      )}
      {blur && (
        <div className="flex z-50 rounded-2xl top-20 absolute blur-none lh-5/6 w-96 justify-center   bg-slate-900  shadow-md shadow-blue-500">
          <Edit userData={userData} setBlur={setBlur} blur={blur} />
        </div>
      )}
      <div className={`flex flex-col h-screen ${blur ? "blur" : ""}`}>
        <div className="h-2/5">
          <Link to="/home">
            <img
              src="https://img.icons8.com/?size=512&id=37317&format=png"
              className="h-10 w-10 ml-3 mt-2 absolute"
              alt="BACK"
            />
          </Link>
          <img
            src={`https://vivs-youonit-server.onrender.com/${userData.coverPic}`}
            alt="cover pic"
            className="h-60 w-screen "
          />
          <img
            src={`https://vivs-youonit-server.onrender.com/${userData.file}`}
            alt="profile pic"
            className="lg:w-32 sm:w-28 rounded-full border-slate-950 border-4   lg:h-32 sm:h-28 bottom-16 left-6 relative"
          />
        </div>

        <div className="flex flex-col lg:mt-3 sm:mt-0 ml-5">
          <div className="flex">
            <p className="text-white flex font-bold text-2xl">
              {userData.name}
            </p>
          </div>
          <p className="text-sm flex items-center font-light text-neutral-100 opacity-40">
            @{userData.username}
          </p>
        </div>
        <div className="flex justify-end bottom-10  sm:right-11 lg:right-8 relative ">
          <button
            className="px-3 rounded-2xl py-2  border-1 border-blue-500 hover:bg-blue-500 text-white font-bold text-sm translate duration-300 ease-in-out  hover:text-black"
            onClick={setting}
          >
            Edit Profile
          </button>
        </div>
        <div className="flex ml-6 mb-3 -mt-2">
          <p className="text-gray-100  font-light ">{userData.bio}</p>
        </div>
        <div className="flex lg:gap-8 sm:gap-4 ml-5 mt-2 my-2">
          <div className="flex items-center">
            <img
              src="https://icon-library.com/images/location-icon-white-png/location-icon-white-png-12.jpg"
              alt="location png icon"
              className="h-5 w-5 mr-1 opacity-40 text-white"
            />
            <p className=" lg:text-sm sm:text-xs flex items-center text-neutral-100 opacity-40">
              {userData.location}
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="https://img.icons8.com/?size=512&id=geb584jjXHjX&format=png"
              alt="work icon png"
              className="h-5 opacity-40 w-5 mr-1 items-center mb-1 text-white"
            />
            <p className=" lg:text-sm sm:text-xs flex items-center text-neutral-100 opacity-40">
              {userData.occupation}
            </p>
          </div>
          <div className="flex items-center">
            <p className=" lg:text-sm sm:text-xs flex items-center text-neutral-100 opacity-40">
              Born {"  "}
              {userData.dob}
            </p>
          </div>
        </div>
        <div className="flex text-white font-medium gap-4 text-lg ml-5 mt-2 items-center">
          <p>
            {followers}{" "}
            <span className="text-sm font-light opacity-40 text-neutral-100">
              followers
            </span>
          </p>
          <p>
            {following}{" "}
            <span className="text-sm font-light opacity-40 text-neutral-100">
              following
            </span>
          </p>
        </div>

        <div className="flex justify-center width text-2xl font-bold mt-4  bg p-3 text-blue-500">
          <span className="text-neutral-100 font-light opacity-40 ">Your </span>{" "}
          Tweets
        </div>

        <UserTweets userID={userID} />
      </div>
    </div>
  );
};

export default ProfileInfo;
