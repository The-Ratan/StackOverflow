import React, { useEffect } from 'react';
import { useSearchParams,useNavigate,Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { setCurrentUser } from '../../actions/currentUser';
import jwt_decode from "jwt-decode";
import copy from "copy-to-clipboard";
import { IoIosCopy } from "react-icons/io";

function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSearchParams()[0];
  const refernceId = searchQuery.get("reference")
  const User = JSON.parse(localStorage.getItem("Profile"))
  const decoded = jwt_decode(User?.token);

  const copyText = ()=>{
    copy(refernceId);
    alert("Copied reference Id : " + refernceId);
  }

  useEffect(() => {
    const userDataString = searchQuery.get('user');
    if (userDataString && User?.token ) {
      const decodedUserData = decodeURIComponent(userDataString);
      const result = JSON.parse(decodedUserData);
      if(decoded.id === result._id){
      localStorage.setItem("Profile", JSON.stringify({ result,token:User?.token }));
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));}
      else{
        navigate("/");
      }
    }
    if(!userDataString || !refernceId || !User?.token){
      navigate("/");
    }
  }, [searchQuery]);


  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
    <h1 className="text-3xl font-bold mb-4 flex text-center">Congratulations! Your Payment Was Successful</h1>
    <h2 className="text-xl font-semibold mb-2">Your Reference ID:</h2>
    <span className='flex mb-8 items-center justify-center'>
    <input className="text-lg p-2 text-black outline-none" readOnly value={refernceId}/>
    <IoIosCopy className='text-4xl p-1 h-[2.8rem] flex cursor-pointer bg-white text-black items-center justify-center' onClick={copyText}/>
    </span>
    <Link to="/" className="text-blue-600 hover:underline bg-blue-100 p-2 rounded-lg outline-none no-underline">Back to Home</Link>
  </div>
  );
}

export default Success;

