import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const FollowBar = () => {
  const [users, setUsers] = React.useState([]);
  const defaultImage = "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000"

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        "https://vivs-youonit-server.onrender.com/auth/users"
      );
      setUsers(result.data);
      console.log(result.data);
    })();
  }, []);

  const allUsers = users
    .slice()
    .reverse()
    .map((users) => {
      return (
        <div className="flex flex-col overflow-y-scroll">
          <Link to={`/user/${users._id}`}>
            <div className="border-2 flex overflow-hidden border-blue-700 border-opacity-30 justify-between items-start mx-3 my-2 px-3 py-4 hover:bg-blue-800 hover:bg-opacity-20">
              <div className="flex flex-col justify-center items-start">
                <p className="text-white text-xl">Check out</p>
                <p className="text-2xl font-bold text-blue-600 truncate w-full">@{users.username}</p>
              </div>
              <div>
                <img
                  src={
                    `https://vivs-youonit-server.onrender.com/${users.file}` ||
                    defaultImage
                  }
                  alt="pfp"
                  className="h-12 w-12 object-contain  rounded-full  ml-4"
                />
              </div>


            </div>
          </Link>
        </div>
      );
    });
  return (
    <div>
      <div className="font-bold text-3xl text-white my-4  justify-center flex">
        Whom to Follow?
      </div>
      <div className=" width -mb-2">{allUsers}</div>
    </div>
  );
};

export default FollowBar;
