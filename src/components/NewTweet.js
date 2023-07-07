import React from "react";
import axios from "axios";
import AllTweets from "./AllTweets";
import { useNavigate } from "react-router-dom";

import { getUserID } from "../hooks/getUserID";
import Navbar from "./Navbar";

const NewTweet = () => {
  const [tweet, setTweet] = React.useState("");
  const [image, setImage] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [photo, setPhoto] = React.useState(false);
  let date = new Date().toUTCString().slice(5, 16);

  const userID = getUserID();

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/userInfo/${userID}`
      );
      setUserData(result.data);
    })();
  }, [userID]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", image);
    formData.append("name", userData?.name);
    formData.append("username", userData?.username);
    formData.append("tweet", tweet);
    formData.append("userID", userID);
    formData.append("file", userData?.file);
    formData.append("date", date);
    try {
      await axios.post(
        "https://vivs-youonit-server.onrender.com/tweet",
        formData
      );
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <form onSubmit={onSubmit}>
        <div className="flex  ml-3 mt-4 lg:mx-2 sm:mx-0 ">
          <img
            src={`https://vivs-youonit-server.onrender.com/${userData.file}`}
            className="lg:w-14 sm:w-10 lg:h-14 border-2 border-black sm:h-10 ml-4 rounded-full"
            alt="Avtar"
          />

          <textarea
            type="text"
            onChange={(e) => setTweet(e.target.value)}
            className=" w-5/6 pb-8 px-2 lg:text-base sm:text-sm  bg-transparent ml-4 focus:outline-none text-gray-200  resize-none overflow-y-auto overflow-hidden "
            placeholder="What's Happening?!"
          />
        </div>

        <div className="flex justify-end items-center mr-10 mb-4 mt-4">
          {!photo && (
            <img
              onClick={() => setPhoto(!photo)}
              src="https://img.icons8.com/?size=512&id=qntjbzBgTSLf&format=png"
              alt="addphoto"
              className="h-5 rounded-md cursor-pointer mr-6 w-5 hover:opacity-60 translate ease-out duration-150"
            />
          )}
          {photo && (
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                onChange={handleImage}
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-violet-600
    "
                accept=".png, .jpg, .jpeg"
              />
            </label>
          )}
          <button
            className="px-4 py-2 rounded-3xl ransition disabled:opacity-30 disabled:hover:bg-blue-700 disabled:hover:text-black disabled:cursor-help ease-in-out delay-75 bg-blue-500 hover:bg-blue-800   duration-150  text-white font-medium"
            disabled={tweet === ""}
          >
            Post
          </button>
        </div>
      </form>

      <div>
        <AllTweets tweet={tweet} setTweet={setTweet} />
      </div>
    </div>
  );
};

export default NewTweet;
