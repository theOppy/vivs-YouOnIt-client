import React from "react";
import { getUserID } from "../hooks/getUserID";

import axios from "axios";
import { Link } from "react-router-dom";

const OtherUserTweets = ({ followID }) => {
  const [userTweets, setUserTweets] = React.useState([]);
  const [displayComment, setDisplayComment] = React.useState(false);
  const userID = getUserID();
  const [reply, setReply] = React.useState({});

  const [comments, setComment] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/otheruser/tweets/${followID}`
      );
      setUserTweets(result.data);
    })();
  }, [followID]);

  const likeTweets = async (tweetID) => {
    await axios.patch(`https://vivs-youonit-server.onrender.com/tweet/like`, {
      tweetID: tweetID,
      userID: userID,
    });
    window.location.reload();
  };

  const handleReply = async (tweetID) => {
    setDisplayComment(!displayComment);

    const res = await axios.get(
      `https://vivs-youonit-server.onrender.com/getalltweets/tweet/${tweetID}`
    );
    setReply(res.data);
  };

  const submitComment = async (tweetID) => {
    let result = await axios.put(
      `https://vivs-youonit-server.onrender.com/tweet/comments`,

      {
        tweetID: tweetID,
        text: comments,
        postedBy: userID,
      }
    );
    setDisplayComment(!displayComment);
    setComment("");
  };

  const renderTweets = userTweets
    .slice(0)
    .reverse()
    .map((data) => {
      return (
        <div
          className="flex  flex-col mt-2 m-3 rounded-md shadow-inner shadow-black bg-blue-950 bg-opacity-20 "
          key={data._id}
        >
          <div className="flex  items-center">
            <img
              src={`https://vivs-youonit-server.onrender.com/${data.file}`}
              className="w-8 h-8 ml-3 mt-3 mr-3 "
              alt="Avtar"
            />
            <p className="font-semibold text-base capitalize mt-3 mr-1 text-white">
              {data.name || "Annonymus"}
            </p>

            <div className="text-base lowercase text-gray-300 mt-3 ml-1 opacity-60 font-light flex gap-2 justify-between">
              <div>@{data.username} </div>
              <div>•</div>
              <div className="italic font-extralight "> {data.date}</div>
            </div>
          </div>
          <div className=" ">
            <p
              className={`text-base font-thin my-2 pr-5 ${
                data.photo ? " " : "mb-5"
              } ml-4 h-auto  text-white break-words`}
            >
              {data.tweet}
            </p>
          </div>

          {data.photo && (
            <div
              className={`flex justify-center items-center mt-2 mx-5 my-5 mb-10 border-1 border-blue-600 border-opacity-30`}
            >
              <img
                src={`https://vivs-youonit-server.onrender.com/${data.photo}`}
                alt="tweetPhoto"
                className="min-h-full min-w-full mx-1 my-1"
              />
            </div>
          )}

          <div className="flex cursor-pointer  hover:transition-transform justify-around right-6 bottom-4 gap-2 items-center relative ">
            <div className="flex">
              <button
                className=" px-3 text-blue-700 lg:text-sm sm:text-xs  hover:text-blue-900   duration-150 rounded-2xl py-1"
                onClick={() => handleReply(data._id)}
              >
                Comment
              </button>
            </div>
            <div>
              <Link to={`/tweet/${data._id}`}>
                <button className="px-3 lg:text-sm sm:text-xs  text-blue-700 tracking-wide   hover:text-blue-900   duration-150 rounded-2xl py-1">
                  See Comments
                </button>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <button
                className="  transition tracking-wide ease-in-out  delay-75    duration-150 text-blue-700 hover:text-blue-900 rounded-2xl lg:text-sm sm:text-xs  px-3 py-1"
                onClick={() => likeTweets(data._id)}
                alt="heart"
              >
                Like
              </button>
              <p className="text-white font-light lg:text-sm sm:text-xs ">
                {" "}
                {Number(data.likes.length)}
              </p>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <div className="flex justify-center ">
        {displayComment && (
          <div className="flex flex-col h-96 lg:w-5/12 sm:w-screen rounded-xl blur-none text-white bottom-24 bg-black opacity-100 z-50 absolute ">
            <img
              onClick={() => setDisplayComment(!displayComment)}
              src="https://img.icons8.com/?size=512&id=4rKbquvlVYsP&format=png"
              alt="X"
              className="w-8 cursor-pointer justify-center  h-8 top-2 left-2 z-50 flex absolute hover:bg-opacity-50 hover:bg-blue-900 ease-in-out  p-1 rounded-xl "
            />
            <div className="flex mt-14">
              <img
                src={`https://vivs-youonit-server.onrender.com/${reply.file}`}
                alt="pfp"
                className="lg:h-12 sm:h-10 rounded-full ml-7 mr-3 lg:w-12 sm:w-10"
              />
              <div className="flex lg:text-base sm:text-sm flex-col ">
                <p>{reply.name}</p>
                <p className="text-gray-400 opacity-50 text-sm">
                  @{reply.username}
                </p>
              </div>
            </div>

            <div className="flex mt-3 ml-8 py-2 lg:text-base sm:text-sm font-semibold">
              <p className="overflow-y-auto  w-10/12 truncate overflow-hidden">
                {reply.tweet}
              </p>
            </div>

            <div className="mt-7 lg:text-base sm:text-sm ml-9">
              <p className="text-white font-light">
                replying to{" "}
                <span className="text-blue-500">@{reply.username}</span>
              </p>
            </div>
            <div>
              <textarea
                type="text"
                className="px-3 w-11/12 pt-2 pb-6  lg:text-base sm:text-sm  py-5 mx-4 mt-3 border-1 focus:outline-none  resize-none overflow-y-auto overflow-hidden  bg-transparent border-blue-600  text-white"
                placeholder="Tweet your reply!"
                value={comments}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end mr-6 mt-2">
              <button
                onClick={() => submitComment(reply._id)}
                className="px-3 rounded-md py-2 font-bold lg:text-sm sm:text-xs translate ease-in-out hover:bg-blue-800 hover:bg-opacity-60 duration-200 mb-1 bg-blue-500 text-white"
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={`${displayComment ? "blur-md" : ""}`}>{renderTweets}</div>
    </div>
  );
};

export default OtherUserTweets;
