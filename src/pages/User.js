import React from "react";
import UserBar from "../components/UserBar";
import UserInfo from "../components/UserInfo";
import FollowBar from "../components/FollowBar";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-black ">
      <div className="flex lg:mx-16 sm:mx-0  h-screen gap-8">
        <div className="w-3/12 my-3 lg:flex lg:flex-col sm:hidden bg-neutral-900   hover:shadow-cyan-400 translate ease-in-out duration-300  hover:shadow-inner rounded-2xl h-44 ">
          <UserBar />
          <button
            onClick={logout}
            className="mt-12 bg-neutral-800 relative w-32 left-24 hover:bg-slate-800 rounded-lg px-3 py-2 text-white font-bold"
          >
            Log Out
          </button>
        </div>
        <div className="lg:w-6/12 lg:my-3 sm:my-0 px-2 sm:w-screen bg-slate-950  rounded-2xl  overflow-y-scroll">
          <UserInfo />
        </div>
        <div className="w-3/12 my-3 lg:flex lg:flex-col sm:hidden bg-neutral-900 rounded-2xl h-3/4 overflow-y-scroll">
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default User;
