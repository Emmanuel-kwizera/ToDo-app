import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { url } from "../../helpers/url";
import { useNavigate } from "react-router-dom";

const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState<any>({});

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(url + "/api/private", config);
        setPrivateData(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="w-full flex flex-wrap justify-center my-6">
    <div className="w-6/12 flex flex-wrap justify-center bg-white border border-transparent rounded-md shadow-md pb-8">
      <div className="w-full text-center mt-2">
        <h2 className="mt-6 text-[#1F2F4F] text-center text-3xl font-extrabold text-gray-900">
          Your account settings
        </h2>        
      </div>
    <div className="m-4">
      <div className="w-full text-center mt-2">Welcome to the private page</div>
      <div className="w-full text-center mt-2">You are logged in</div>
      <div className="mt-1">{privateData?.data}</div>
      {privateData?.user && (
        <>
          <div className="mt-10">
            <b>Username:</b> {privateData?.user.username}
          </div>
          <div className="mt-1">
            <b>Email:</b> {privateData?.user.email}
          </div>
        </>
      )}
      <div className="flex justify-start items-start">
        <button
          className="w-9/12 text-center text-lg py-3 px-4 text-sm font-bold btn btn-primary mt-4"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>

    </div>

    </div>
  );
};

export default PrivateScreen;
