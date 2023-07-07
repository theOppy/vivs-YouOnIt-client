import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [doubleClick, setDoubleClick] = React.useState(false);
  const [_, setCookies] = useCookies("access_token");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://vivs-youonit-server.onrender.com/login",
        {
          username,
          password,
        }
      );
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setDoubleClick(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onClick={onSubmit} onDoubleClick={() => navigate("/home")}>
      <div className="bg-slate-800    h-screen text-fuchsia-50 flex justify-center items-center">
        <div className=" justify-center flex flex-col lg:h-4/5 sm:h-screen bg-slate-950 items-center lg:w-2/5 sm:w-screen   shadow-lg shadow-slate-950 rounded-2xl">
          <div className="mb-8 lg:text-5xl sm:text-5xl font-bold flex">
            <div>Sign in to</div>
            <div>
              <img
                src="https://img.icons8.com/?size=512&id=HhOnRMbiUvBm&format=png"
                alt=" Logo"
                className="w-16 h-16 mb-2 ml-5 "
              />
            </div>
          </div>
          <div className="flex flex-col lg:w-96 sm:w-80 mt-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 p-3 rounded-lg font-semibold  text-neutral-950 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105  duration-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-12 p-3 font-semibold text-neutral-950 rounded-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105  duration-200"
            />
          </div>

          <div className="">
            <button
              type="submit"
              className=" mt-1 mb-1 px-11 py-2.5 text-lg rounded-full font-black transition ease-in-out delay-75 bg-blue-500 hover:bg-blue-800   duration-150"
            >
              Sign in
            </button>
            <div className="flex justify-center">
              {doubleClick && (
                <p className="text-xs font-light mb-2">
                  *double click to continue*
                </p>
              )}
            </div>
          </div>
          <div>
            <p className="mt-9 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
