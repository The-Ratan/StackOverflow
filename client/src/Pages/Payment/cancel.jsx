import React, { useEffect } from 'react'
import { useSearchParams ,useNavigate,Link} from 'react-router-dom';


function Cancel() {
  const navigate = useNavigate();
  const searchQuery = useSearchParams()[0];
  const reference = searchQuery.get("reference")

  useEffect(()=>{
    if(!reference){
      navigate("/")
    }
  },[searchQuery])
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen ">
    <h1 className="text-4xl font-bold mb-4 text-red-600 text-center">Oops! Your Payment Got Cancelled</h1>
    <h2 className="text-lg font-semibold mb-6">Something Went Wrong</h2>
    <Link to="/" className="text-white bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out shadow-md">Back to Home</Link>
  </div>
  )
}

export default Cancel
