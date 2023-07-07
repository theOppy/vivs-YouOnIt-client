import React from "react";
import axios from "axios";
import OtherUserTweets from "./OtherUserTweets";
import { Link } from "react-router-dom";
import { getUserID } from "../hooks/getUserID";

const UserInfo = () => {
  const [userData, setUserData] = React.useState([]);
  const [followers, setFollowers] = React.useState(0);
  const [following, setFollowing] = React.useState(0);
  const [isFollowed, setIsFollowed] = React.useState(false);

  const followID = window.location.href.slice(39, 70);

  const userID = getUserID();

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/otheruser/${followID}`
      );
      setUserData(result.data);
      const { followers, following } = result.data;
      setFollowers(followers.length);
      setFollowing(following.length);
    })();
  }, [followID]);

  const follow = async () => {
    setIsFollowed(!isFollowed);
    setFollowers(isFollowed ? followers - 1 : followers + 1);
    await axios.put(`https://vivs-youonit-server.onrender.com/auth/follow`, {
      followID: followID,
      userID: userID,
    });
  };
  return (
    <div className="flex flex-col h-screen ">
      <div className="h-2/5">
        <Link to="/home">
          <img
            src="https://img.icons8.com/?size=512&id=37317&format=png"
            className="h-10 w-10 ml-3 mt-2 bg-auto absolute"
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

      <div className="flex  mt-3 ml-5 gap-96 ">
        <div>
          <p className="text-white  font-bold text-3xl ">{userData.name}</p>
          <p className="text-sm flex items-center font-light text-neutral-100 opacity-40">
            @{userData.username}
          </p>
        </div>

        <div className="lg:ml-12 sm:-ml-20 ">
          <button
            onClick={follow}
            className="px-5 flex py-2 w-16 rounded-3xl bg-blue-600  justify-center text-white  hover:bg-blue-800  transition duration-300 ease-in-out"
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
      <div className="flex ml-6 mb-2 mt-4">
        <p className="text-gray-100  font-light ">{userData.bio}</p>
      </div>

      <div className="flex gap-8 ml-5 my-2 mt-3">
        <div className="flex items-center">
          <img
            src="https://icon-library.com/images/location-icon-white-png/location-icon-white-png-12.jpg"
            alt="location png icon"
            className="h-5 w-5 mr-2 opacity-40 text-white"
          />
          <p className=" text-sm flex items-center text-neutral-100 opacity-40">
            {userData.location}
          </p>
        </div>
        <div className="flex items-center">
          <img
            src="https://img.icons8.com/?size=512&id=geb584jjXHjX&format=png"
            alt="work icon png"
            className="h-5 opacity-40 w-5 mr-2 mb-1 items-center text-white"
          />
          <p className=" text-sm flex items-center text-neutral-100 opacity-40">
            {userData.occupation}
          </p>
        </div>
        <div className="flex items-center">
          {userData.bod && (
            <p className=" text-sm flex items-center text-neutral-100 opacity-40">
              Born {userData.bod}
            </p>
          )}
        </div>
      </div>
      <div className="flex text-white mt-3 font-medium gap-4 text-xl ml-5  items-center">
        <p>
          {followers}{" "}
          <span className="text-sm    opacity-40 text-neutral-100">
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
        <span className="text-neutral-100 font-light opacity-40 ">
          @{userData.username}
        </span>
        's Tweets
      </div>

      <OtherUserTweets followID={followID} />
    </div>
  );
};

export default UserInfo;
