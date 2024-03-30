import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocalUrl } from "../../api/index";
import axios from "axios";
import logo from "../../assets/icon.png";
import { IoMdCloseCircle } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserPlan,
  darkModes,
  UserPayments,
} from "../../actions/DarkMode";
import moment from "moment";

function Membership() {
  const darkMode = useRecoilValue(darkModes);
  const User = useSelector((state) => state.currentUserReducer);
  const [reciept, setReciept] = useState(false);
  const [currentPlan, setcurrentPlan] = useRecoilState(currentUserPlan);
  const [payment, setPayments] = useRecoilState(UserPayments);
  const navigate = useNavigate();

  const updateSilverMembership = async () => {
    try {
      if (User) {
        const price = 100;
        const {
          data: { order },
        } = await axios.post(`${LocalUrl}user/checkout-session`, { price });

        const options = {
          key: "rzp_test_tV3f3Us5GGhyRH",
          amount: order.amount,
          currency: "INR",
          name: "Silver Membership of Stack Overflow",
          description: "User allow to Post 5 Questions a day",
          image: logo,
          order_id: order.id,
          callback_url: `${LocalUrl}user/payment-Verfication/${User?.result._id}/Silver`,
          prefill: {
            name: `${User?.result.name}`,
            email: `${User?.result.email}`,
            contact: "9999999999",
          },
          notes: {
            address: "Stack Overflow",
          },
          theme: {
            color: "#121212",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert("Login Before Purchasing a Membership");
        navigate("/Auth");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateGoldMembership = async () => {
    try {
      if (User) {
        const price = currentPlan === "Silver" ? 900 : 1000
        const {
          data: { order },
        } = await axios.post(`${LocalUrl}user/checkout-session`, { price });

        const options = {
          key: "rzp_test_tV3f3Us5GGhyRH",
          amount: order.amount,
          currency: "INR",
          name: "Gold Membership of Stack Overflow",
          description: "User allow to Post Unlimited Questions a day",
          image: logo,
          order_id: order.id,
          callback_url: `${LocalUrl}user/payment-Verfication/${User?.result._id}/Gold`,
          prefill: {
            name: `${User?.result.name}`,
            email: `${User?.result.email}`,
            contact: "9999999999",
          },
          notes: {
            address: "Stack Overflow",
          },
          theme: {
            color: "#121212",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert("Login Before Purchasing a Membership");
        navigate("/Auth");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FetchCurrentPlan = async () => {
    try {
      const id = User?.result._id;
      const { data } = await axios.get(`${LocalUrl}user/getUserPlan/${id}`);
      if (data.success) {
        setPayments(data.payment);
        setcurrentPlan(data.plan);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    User && FetchCurrentPlan();
  }, [User]);

  return (
    <div className="main-bar">
      {console.log(darkMode)}
      {reciept && (
        <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-50 select-none">
          <div className="flex items-center justify-center h-full min-h-screen">
            <div
              className={`${
                darkMode ? "bg-slate-800" : "bg-white"
              } p-10 rounded-lg shadow-xl max-h-[72vh] overflow-y-auto`}
            >
              <h1
                className={`flex items-center justify-between w-full text-2xl font-bold mb-4`}
              >
                Payment Reciepts
                <IoMdCloseCircle
                  onClick={() => setReciept(false)}
                  className="ml-5 cursor-pointer text-2xl"
                />
              </h1>
              {/* Reciepts Display */}
              <div>
                {payment && payment.length === 0 && (
                  <div className="bg-white text-black p-2 mb-5">
                    <h1>
                      <span className="font-bold ">No Payment Reciepts</span>
                    </h1>
                  </div>
                )}
                {payment &&
                  payment
                    .slice() // Create a shallow copy of the array
                    .sort(
                      (a, b) =>
                        new Date(b.purchasedOn) - new Date(a.purchasedOn)
                    )
                    .map((e, index) => {
                      return (
                        <div className="bg-white border-2 text-black p-2 mb-5">
                          <h1>
                            <span className="font-bold ">Plan Name -:</span>{" "}
                            {e.planName}
                          </h1>
                          <h1>
                            <span className="font-bold ">Order Id -:</span>{" "}
                            {e.razorpay_order_id}
                          </h1>
                          <h1>
                            <span className="font-bold ">Payment Id -:</span>{" "}
                            {e.razorpay_payment_id}
                          </h1>
                          <h1>
                            <span className="font-bold ">Purchased On -:</span>{" "}
                            {moment(e.purchasedOn).fromNow()}
                          </h1>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-2xl flex items-center justify-between font-semibold text-center mb-8">
        Membership Plans
        {User && (
          <button
            onClick={() => setReciept(true)}
            style={{ fontSize: "1rem" }}
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg p-2 text-white"
          >
            Show Reciepts
          </button>
        )}
      </h1>
      <h1 className="text-2xl p-2">
        <span className="font-bold">Current Plan </span> -{" "}
        {User ? currentPlan : " Login to Check your "} Plan !!
      </h1>
      {currentPlan === "Free" && (
        <p className="text-1xl p-2 mb-5">Can Post only 1 question per day.</p>
      )}
      {currentPlan === "Silver" && (
        <p className="text-1xl p-2 mb-5">Can Post only 5 question per day.</p>
      )}
      {currentPlan === "Gold" && (
        <p className="text-1xl p-2 mb-5">
          Can Post Unlimited question per day.
        </p>
      )}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Silver Plan */}
        <div className="flex-grow max-w-xs rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Silver Plan
            </h2>
            <p className="text-gray-600 mb-4">₹100/month</p>
            <p className="text-gray-600 mb-4">Post 5 questions a day</p>
            <button
              className={`w-full py-2 px-4 ${
                currentPlan === "Silver" || currentPlan === "Gold"
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
              onClick={
                currentPlan === "Silver" || currentPlan === "Gold"
                  ? undefined
                  : updateSilverMembership
              }
            >
              {!User && "Login to Purchase"}
              {currentPlan === "Silver" && "Already Bought"}
              {currentPlan === "Gold" && "Already Have Gold"}
              {currentPlan === "Free" && "Buy Now"}
            </button>
          </div>
        </div>
        {/* Gold Plan */}
        <div className="flex-grow max-w-xs rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Gold Plan</h2>
            <p className="text-gray-600 mb-4">{currentPlan === "Silver" ?<><span className="mr-5  line-through">₹1000/month</span><span className="font-bold">₹900/month</span></> : "₹1000/month" }</p>
            <p className="text-gray-600 mb-4">Post Unlimited questions</p>
            <button
              className={`w-full py-2 px-4 ${
                currentPlan === "Gold"
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
              onClick={
                currentPlan === "Gold" ? undefined : updateGoldMembership
              }
            >
              {!User && "Login to Purchase"}
              {currentPlan === "Gold" && "Already Have Gold"}
              {currentPlan === "Free" && "Buy Now"}
              {currentPlan === "Silver" && "Replace Silver with Gold at Discounted Price"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
