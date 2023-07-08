import React from "react";
import axios from "axios";

const UserTweets = ({ userID }) => {
  const [userTweets, setUserTweets] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const result = await axios.get(
        `https://vivs-youonit-server.onrender.com/getalltweets/user/${userID}`
      );
      setUserTweets(result.data);
    })();
  }, [userID]);

  const deleteTweets = async (tweetID) => {
    await axios.delete(
      `https://vivs-youonit-server.onrender.com/tweet/delete`,
      {
        tweetID: tweetID,
      }
    );
    setUserTweets(
      userTweets.filter((val) => {
        return val._id !== tweetID;
      })
    );
  };

  const renderTweets = userTweets
    .slice(0)
    .reverse()
    .map((data) => {
      return (
        <div
          className="flex flex-col mt-2 m-3  py-2 px-2  rounded-md shadow-inner shadow-black bg-blue-950 bg-opacity-20 "
          key={data._id}
        >
          <div className="flex items-center">
            <img
              src={`https://vivs-youonit-server.onrender.com/${data.file}`}
              className="w-8 h-8 ml-3 mt-3 mr-3 "
              alt="Avtar"
            />
            <p className="font-semibold text-base capitalize mt-3 mr-3 text-white">
              {data.name.slice(0, 5) || "Annonymus"}
            </p>

            <div className=" flex lowercase  text-gray-300 mt-3 ml-1 opacity-60 font-light items-center gap-2 justify-between">
              <div>@{data.username} </div>
              <div>•</div>
              <div className="italic  font-extralight lg:flex lg:flex-col sm:hidden ">
                {" "}
                {data.date.slice(0, 7)}
              </div>

              <img
                src="https://cdn-icons-png.flaticon.com/512/995/995039.png"
                className="h-4 w-4 lg:ml-72 sm:ml-48  cursor-cell"
                onClick={() => deleteTweets(data._id)}
                alt="delete"
              />
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
            <div className="flex justify-center items-center mt-2 mx-5 my-5 mb-10 border-1 border-blue-600 border-opacity-30">
              <img
                src={`https://vivs-youonit-server.onrender.com/${data.photo}`}
                alt="tweetPhoto"
                className="min-h-full min-w-full mx-1 my-1"
              />
            </div>
          )}
        </div>
      );
    });
  return <div className=" ">{renderTweets}</div>;
};

export default UserTweets;
