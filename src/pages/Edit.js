import axios from "axios";
import React from "react";
import { getUserID } from "../hooks/getUserID";

const Edit = ({ userData, setBlur, blur }) => {
  const userID = getUserID();

  const [editUser, setEditUser] = React.useState({
    name: userData.name,
    username: userData.username,
    location: userData.location,
    occupation: userData.occupation,
    bio: userData.bio,
    dob: userData.dob,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const onSubmit = async () => {
    await axios.patch(`https://vivs-youonit-server.onrender.com/auth/update`, {
      userID: userID,
      editUser: editUser,
    });
    setBlur(!blur);
    window.location.reload();
  };

  return (
    <div className="flex  flex-col  items-center justify-start">
      <div>
        <p className="text-3xl font-bold text-white m-4  flex justify-center item-center ">
          Edit your profile
        </p>
      </div>

      <div className="  mt-3 flex flex-col gap-3">
        <div className="flex flex-col">
          <span className="text-gray-200  font-semibold    ">name</span>{" "}
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={editUser.name}
            className="pl-3 pr-24  py-1  bg-transparent border-blue-500 border-1 text-white"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-gray-200  font-semibold  items-center justify-center  mr-2">
            Username:
          </span>{" "}
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={editUser.username}
            className="pl-3 pr-24  py-1 bg-transparent border-blue-500 border-1 text-white"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-gray-200  font-semibold  items-center justify-center  mr-2">
            Location:
          </span>{" "}
          <input
            type="text"
            name="location"
            onChange={handleChange}
            value={editUser.location}
            className="pl-3 pr-24  py-1 bg-transparent border-blue-500 border-1 text-white"
          />
        </div>

        <div className="flex-col flex">
          <span className="text-gray-200  font-semibold  items-center justify-center  mr-2">
            Occupation:
          </span>{" "}
          <input
            type="text"
            name="occupation"
            onChange={handleChange}
            value={editUser.occupation}
            className="pl-3 pr-24  py-1 bg-transparent border-blue-500 border-1 text-white"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-gray-200  font-semibold  items-center justify-center  mr-2">
            Bio:
          </span>{" "}
          <input
            type="text"
            name="bio"
            onChange={handleChange}
            value={editUser.bio}
            className="pl-3 pr-24  py-1 bg-transparent border-blue-500 border-1 text-white"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-gray-200  font-semibold  items-center justify-center  mr-2">
            Date of Birth:
          </span>{" "}
          <input
            type="text"
            name="dob"
            onChange={handleChange}
            value={editUser.dob}
            className="pl-3 pr-24  py-1 bg-inherit border-blue-500 border-1 text-white"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="px-4 py-2 lg:mt-4 sm:mt-4 sm:mb-4 rounded-3xl bg-blue-500 text-white flex justify-center items-center"
      >
        Change
      </button>
    </div>
  );
};

export default Edit;
