import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = React.useState({
    name: "",
    location: "",
    occupation: "",
    file: "",
    coverPic: "",
    username: "",
    password: "",
    followers: 0,
    following: 0,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleImage = (event) => {
    setUser({ ...user, file: event.target.files[0] });
  };

  const handleCover = (event) => {
    setUser({ ...user, coverPic: event.target.files[0] });
  };

  console.log(user);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1", user.file);
    formData.append("file2", user.coverPic);
    formData.append("name", user.name);
    formData.append("location", user.location);
    formData.append("occupation", user.occupation);
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("followers", user.followers);
    formData.append("following", user.following);

    try {
      await axios.post(
        "https://vivs-youonit-server.onrender.com/auth",
        formData
      );
      navigate("/");

      // setUser({ ...user, file: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post("https://vivs-youonit-server.onrender.com/auth", {
  //       ...user,
  //     });
  //     handleUpload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="bg-slate-800 h-screen text-fuchsia-50 focus:text-white flex flex-col justify-center items-center">
        <div className="pb-4 text-5xl font-bold">
          <blockquote className="lg:text-5xl lg:flex sm:hidden sm:text-4xl font-bold  text-center text-white">
            Create Your <span className="text-blue-600">Account</span>
          </blockquote>
        </div>
        <div className=" justify-center flex flex-col lg:h-5/6 sm:h-screen bg-slate-950 items-center lg:w-2/5 sm:w-screen shadow-lg shadow-slate-950 rounded-2xl">
          <div className="flex flex-col lg:w-8/12  sm:w-10/12 mt-1">
            <div className="flex flex-col mt-2 mb-8">
              <label className="block mt-1">
                <span className="flex  items-center mb-2 opacity-70 text-blue-500 font-bold">
                  Choose Your Proflie Picture
                </span>
                <input
                  onChange={handleImage}
                  type="file"
                  name="file1"
                  accept=".png, .jpg, .jpeg"
                  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-violet-600 
  
    "
                  title="Choose Your PFP"
                />
              </label>
              <label className="block mt-4">
                <span className="flex  items-center mb-2 opacity-70 text-blue-500 font-bold">
                  Choose Your Cover Picture
                </span>
                <input
                  onChange={handleCover}
                  type="file"
                  name="file2"
                  accept=".png, .jpg, .jpeg"
                  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-violet-600 
  
    "
                  title="Choose Your PFP"
                />
              </label>
            </div>
            <div className="lg:flex sm:flex sm:flex-col gap-2 ">
              <input
                value={user.name}
                onChange={handleChange}
                type="text"
                className="mb-2 p-3 rounded-lg border-1 border-blue-500 bg-transparent font-semibold  bg-blue-400 text-white placeholder:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105  duration-200"
                placeholder="First Name"
                name="name"
              />
            </div>
            <input
              value={user.username}
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="mb-2 p-3 rounded-lg border-1 border-blue-500 bg-transparent font-semibold  bg-blue-400 text-white placeholder:text-white transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105  duration-200"
            />
            <input
              value={user.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              className="mb-3 p-3  border-1 border-blue-500 bg-transparent font-semibold  text-white placeholder:text-white rounded-lg transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105  duration-200"
            />
          </div>

          <div>
            <p className="font-thin text-gray-300 mx-auto w-4/5 text-xs  mb-4 ">
              By signing up, you agree to the{" "}
              <span className="text-blue-500">Terms of Service</span> and{" "}
              <span className="text-blue-500">Privacy Policy</span>, including{" "}
              <span className="text-blue-500">Cookie Use.</span>
            </p>
          </div>

          <div className="">
            <button className=" mb-3 px-11 py-2 text-lg rounded-full font-black transition ease-in-out delay-75 bg-blue-500 hover:bg-blue-800   duration-150">
              Register
            </button>
          </div>

          <div>
            <p className="mt-3 text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-blue-400 underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
