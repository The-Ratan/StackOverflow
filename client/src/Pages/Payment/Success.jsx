import React, { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import jwt_decode from "jwt-decode";
import copy from "copy-to-clipboard";
import { IoIosCopy } from "react-icons/io";
import moment from "moment";

function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSearchParams()[0];
  const Reciepts = searchQuery.get("reference");
  const Reciept = JSON.parse(decodeURIComponent(Reciepts));
  const User = JSON.parse(localStorage.getItem("Profile"));
  const decoded = jwt_decode(User?.token);

  useEffect(() => {
    const userDataString = searchQuery.get("user");
    if (userDataString && User?.token) {
      const decodedUserData = decodeURIComponent(userDataString);
      const result = JSON.parse(decodedUserData);
      if (decoded.id === result._id) {
        localStorage.setItem(
          "Profile",
          JSON.stringify({ result, token: User?.token })
        );
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
      } else {
        navigate("/");
      }
    }
    if (!userDataString || !Reciept || !User?.token) {
      navigate("/");
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-4 flex text-center">
        Congratulations! Your Payment Was Successful
      </h1>
      <div
        className={`bg-white text-black
              p-10 rounded-lg shadow-xl max-h-[70vh] overflow-y-auto`}
      >
        <h1
          className={`flex items-center justify-between w-full text-2xl font-bold mb-4`}
        >
          Payment Reciept
        </h1>
        {/* Reciepts Display */}
        <div className="bg-white  p-2 mb-5">
          <h1>
            <span className="font-bold ">Plan Name -:</span> {Reciept.planName}
          </h1>
          <h1>
            <span className="font-bold ">Order Id -:</span>{" "}
            {Reciept.razorpay_order_id}
          </h1>
          <h1>
            <span className="font-bold ">Payment Id -:</span>{" "}
            {Reciept.razorpay_payment_id}
          </h1>
          <h1>
            <span className="font-bold ">Purchased On -:</span>{" "}
            {moment(Reciept.purchasedOn).fromNow()}
          </h1>
        </div>
      </div>
      <Link
        to="/"
        className="text-blue-600 mt-5 hover:underline bg-blue-100 p-2 rounded-lg outline-none no-underline"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Success;
