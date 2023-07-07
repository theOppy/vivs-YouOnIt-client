import axios from "axios";
import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const TweetReply = () => {
  const tweetID = window.location.href.slice(38, 70);

  const [tweet, setTweet] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/getalltweets/tweet/${tweetID}`
      );
      setTweet(result.data);
    })();
  }, []);

  const comments = tweet.comments?.map((comment) => {
    return (
      <div className="mb-2 shadow-inner py-4  mx-3 shadow-black bg-blue-950 bg-opacity-20">
        <div className="flex ml-16 ">
          <div>
            <img
              src={`https://vivs-youonit-server.onrender.com/${comment.file}`}
              alt="pfp"
              className="h-8 w-8 rounded-full mr-4"
            />
          </div>
          <div className="flex flex-col mr-2">
            <p className="text-white font-light text-sm">{comment.name}</p>{" "}
            <p className="text-gray-300 text-xs opacity-40">
              @{comment.username}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="italic font-extralight text-xs  mt-1 text-gray-300 opacity-40 ">
              {" "}
              replied to{" "}
              <span className="text-blue-500 font-semibold">{tweet.name}!</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-28 mt-2 text-white font-normal">
          <p>{comment.text}</p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <p className="text-3xl m-3 mb-2 font-bold flex justify-center text-white">
        <Link to="/home">
          <img
            src="https://img.icons8.com/?size=512&id=4rKbquvlVYsP&format=png"
            alt="X"
            className="w-10 cursor-pointer h-10 right-64 z-50 flex hover:bg-opacity-50 hover:bg-blue-900 ease-in-out  p-1 rounded-xl relative"
          />
        </Link>
        <span className="">Tweet</span>
      </p>
      <div className="text-white flex mt-4 ml-3 ">
        <div className="">
          <img
            src={`https://vivs-youonit-server.onrender.com/${tweet.file}`}
            alt="pfp"
            className="h-10 w-10 rounded-full mr-3"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-light">{tweet.name}</p>
          <p className="text-sm text-gray-400 opacity-40">@{tweet.username}</p>
        </div>
      </div>
      <div className="flex ml-16 text-white font-semibold mt-2  ">
        <p>{tweet.tweet}</p>
      </div>

      <div className="width mt-8 w-screen p-2 right-10 relative "></div>

      <div>
        <p className="text-2xl m-1 font-bold flex justify-center text-white">
          <span className="text-blue-500">
            {tweet?.comments?.length > 0
              ? `${tweet?.comments?.length} Comments`
              : "0 Comments"}
          </span>
        </p>
        <div className="">{comments}</div>
      </div>
    </div>
  );
};

export default TweetReply;
