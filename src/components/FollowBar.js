import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

const FollowBar = () => {
  const [users, setUsers] = React.useState([]);

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
            <div className="border-2 flex border-blue-700 border-opacity-30 justify-between mx-3 my-2 p-3 hover:bg-blue-800 hover:bg-opacity-20">
              <div className="flex flex-col text-white justify-center ">
                <p className="font-bold  text-white">Check Out</p>
                <p className="text-blue-600 text-3xl  font-bold  ">
                  @{users.username}
                </p>
              </div>

              <div>
                <img
                  src={
                    `https://vivs-youonit-server.onrender.com/${users.file}` ||
                    "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000"
                  }
                  alt="pfp"
                  className="h-14 w-14  rounded-full  ml-4"
                />
                <p className="text-lg font-light text-white mt-1  opacity-70">
                  <span className="font-semibold text-xl ">
                    {" "}
                    {users.followers.length}
                  </span>{" "}
                  followers
                </p>
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
