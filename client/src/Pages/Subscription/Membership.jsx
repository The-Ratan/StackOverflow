import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocalUrl } from "../../api/index";
import axios from "axios";
import logo from "../../assets/icon.png";
import { useRecoilState } from "recoil";
import { currentUserPlan } from "../../actions/DarkMode";

function Membership() {
  const User = useSelector((state) => state.currentUserReducer);
  const [currentPlan,setcurrentPlan] = useRecoilState(currentUserPlan);
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
        const price = 1000;
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

  const FetchCurrentPlan = async()=>{
    try{
      const id = User?.result._id
      const {data} = await axios.get(`${LocalUrl}user/getUserPlan/${id}`)
      if(data.success){
        setcurrentPlan(data.plan)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    User && FetchCurrentPlan()
  },[User])

  return (
    <div className="main-bar">
      <h1 className="text-2xl font-semibold text-center mb-8">
        Membership Plans
      </h1>
      <h1 className="text-2xl p-2">
        <span className="font-bold">Current Plan </span> -{" "} 
        {User ? currentPlan : " Login to Check your " } Plan !!
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
              className={`w-full py-2 px-4 ${currentPlan === "Silver" || currentPlan === "Gold" ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
              onClick={currentPlan === "Silver" || currentPlan === "Gold" ? undefined : updateSilverMembership}
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
            <p className="text-gray-600 mb-4">₹1000/month</p>
            <p className="text-gray-600 mb-4">Post Unlimited questions</p>
            <button
              className={`w-full py-2 px-4 ${currentPlan === "Gold" ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75`}
              onClick={currentPlan === "Gold" ? undefined :updateGoldMembership}
            >
              {!User && "Login to Purchase"}
              {currentPlan === "Gold" && "Already Have Gold"}
              {currentPlan === "Free" || currentPlan === "Silver" ? "Buy Now" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;
