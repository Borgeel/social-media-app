import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    // Destructure response
    const { clientId, credential } = response;

    // Decode credential in order to access profile info
    const decoded = jwt_decode(credential);

    // Update sanity via client
    const doc = {
      _id: clientId,
      _type: "user",
      userName: decoded.name,
      image: decoded.picture,
    };

    // Check whether user already exists, if not update sanity
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_GOOGLE_API_TOKEN}
              // render={(renderProps) => (
              //   <button
              //     type="button"
              //     className="bg-mainColor flex justify-center items-center p-3 rounded-md cursor-pointer outline-none hover:scale-105 transition-all ease-in-out delay-100"
              //     onClick={renderProps.onClick}
              //     disabled={renderProps.disabled}
              //   >
              //     <FcGoogle className="mr-4" /> Sign in with Google
              //   </button>
              // )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
