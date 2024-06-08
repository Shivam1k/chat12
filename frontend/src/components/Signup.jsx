import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
       
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center  text-gray-300">
          Signup
        </h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text  text-white">
                Full Name
              </span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input input-bordered h-10 "
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10 "
              type="Password"
              placeholder="password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full input input-bordered h-10 "
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p className="text-white">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p className="text-white">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <p className="text-center text-white">
            Already have an account?<Link to="/login">Login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
