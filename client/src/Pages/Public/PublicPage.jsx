import {React,useEffect,useState}from 'react'
import './Public.css'
import moment from "moment";
import { LocalUrl } from '../../api';
import AddPublicInfo from './UploadPublic';
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { Audio } from 'react-loader-spinner'
import { IoAddCircle } from "react-icons/io5";
import { darkModes } from '../../actions/DarkMode';
import { useRecoilValue } from 'recoil';

const DisplayPublicPage = () => {
  const darkMode = useRecoilValue(darkModes)
  const [tweet,setTweet] = useState([]);
  const [image,setimage] = useState([]);
  const [video,setvideo] = useState([]);
  const [uploadPublic,setuploadPublic] = useState(false)
  const User = useSelector((state) => state.currentUserReducer);

  //get all tweets
  const GetAllTweets = async ()=>{
    try{
      const data = await fetch(`${LocalUrl}public/getTweet`,{
      method:'GET'
  })
  const res = await data.json()
  setTweet(res.data);
  }
  catch(err){
      console.log(err)
     }
  }

  //Get all Images
  const getImage = async ()=>{
    try{
      const data = await fetch(`${LocalUrl}public/getImage`,{
        method:'GET'
    })
    const res = await data.json()
    setimage(res.data);
    }
    catch(err){
      console.log(err)
    }
  }

  //Get all Videos
  const getVideo = async ()=>{
    try{
      const data = await fetch(`${LocalUrl}public/getVideo`,{
        method:'GET'
    })
    const res = await data.json()
    setvideo(res.data);
    }
    catch(err){
      console.log(err)
    }
  }
  
  const deleteImage = async(id)=>{
    try{
      if (!id) return alert("Id is Missing")
      const {data} = await axios.post(`${LocalUrl}public/deleteImage`,{id})
      if (data.success === true){
        alert('Delete Successfully')
        getImage();
      }
      else{
        alert("Something Went Wrong")
      }
    }
    catch(err){
      console.log("Something Went Wrong",err)
    }
  }
  const deleteTweet = async(id)=>{
   try{
    if (!id) return alert("Id is Missing")
    const {data} = await axios.post(`${LocalUrl}public/deleteTweet`,{id})
    if (data.success === true){
      alert('Delete Successfully')
      GetAllTweets();
    } 
    else{
      alert("Something Went Wrong")
    }
   } 
   catch(err){
    console.log("Something Went Wrong",err)
   }
  }
  const deleteVideo = async(id)=>{
    try{
      if (!id) return alert("Id is Missing")
      const {data} = await axios.post(`${LocalUrl}public/deleteVideo`,{id})
      if (data.success === true){
        alert('Delete Successfully')
        getVideo();
      }
      else{
        alert("Something Went Wrong")
      }
    }
    catch(err){
      console.log("Something Went Wrong",err)
    }
  }
  
  useEffect(()=>{
    GetAllTweets();
    getImage();
    getVideo();
  },[])

  //Change Hidden Property
  const GotoImage = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box1.classList.add("hidden")
    box3.classList.add("hidden")
    box2.classList.remove("hidden")
}
const gotoVideo = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box1.classList.add("hidden")
    box2.classList.add("hidden")
    box3.classList.remove("hidden")
}
const gotoTweet = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box3.classList.add("hidden")
    box2.classList.add("hidden")
    box1.classList.remove("hidden")
}
  return (
    <>
      {uploadPublic && <AddPublicInfo GetAllTweets={GetAllTweets} getImage={getImage} getVideo={getVideo} setuploadPublic={setuploadPublic}/>}
      <div>
    <div className='question-details-page'>
      <div className='main-data'>
      <div className="data">
      <h1  className='mb-5 text-center text-3xl font-bold flex items-center justify-between p-2'>Public Page
      <IoAddCircle className="text-5xl cursor-pointer text-blue-500" onClick={()=>setuploadPublic(true)}/></h1>
      <div className="btnss mb-5 font-bold">
      <button className='text-black' onClick={gotoTweet}>Tweet Section</button>
      <button className='text-black' onClick={GotoImage}>Image Section</button>
      <button className='text-black' onClick={gotoVideo}>Video Section</button>
      </div>
      
      <div className="tweeeet">
        <h1 style={{textAlign:"center"}} className='mb-5 font-bold text-2xl'>Tweets</h1>
        {
    tweet.length >= 1 ? tweet.map((e, index) => {
      return (
        <div className=" border rounded-lg p-4 my-4" key={index}>
          <p className="messsss">{e.tweet}</p>
          <div className="extra-Details mt-2">
          {User?.result.email === e.email && <MdDelete className='w-[190%] hover:text-red-900 text-red-500 cursor-pointer mb-2 text-2xl flex items-end justify-end' onClick={()=>deleteTweet(e._id)}/>}
            <p className="text-sm">Posted by: <span className="font-bold">{e.postedBy}</span></p>
            <p className="text-sm">Posted at: <span className="font-bold">{moment(e.createAt).fromNow()}</span></p>
          </div>
        </div>
      )
    }) : (          <div className="mt-10 flex items-center justify-center flex-col">
    <Audio
    height="80"
    width="80"
    radius="9"
    color={`${darkMode ? "white" : "black"}`}
    ariaLabel="loading"
    wrapperStyle
    wrapperClass
  />
  <h1 className="text-2xl ml-10">Loading Tweets...</h1>
  </div>)
}

      </div>
      {/*
      Image Section
       */}
       <div className="imgggg hidden">
        <h1 style={{textAlign:"center"}} className='mb-5 font-bold text-2xl'>Images</h1>
        {
    image.length >= 1 ? image.map((e, index) => {
      return (
        <div className="border rounded-lg overflow-hidden shadow-md my-4" key={index}>
          <a href={e.imageUrl} target="_blank" rel="noreferrer">
            <img src={e.imageUrl} alt="img" className="w-full h-48 object-cover" />
          </a>
          <div className="p-4">
            <p className="text-lg font-semibold mb-2">{e.imageCaption}</p>
            <div className="extra-Details text-sm ">
            {User?.result.email === e.email && <MdDelete className='w-[190%] hover:text-red-900 text-red-500 cursor-pointer mb-2 text-2xl flex items-end justify-end' onClick={()=>deleteImage(e._id)}/>}
              <p>Posted by: <span className="font-semibold">{e.postedBy}</span></p>
              <p>Posted at: <span className="font-semibold">{moment(e.createAt).fromNow()}</span></p>
            </div>
          </div>
        </div>
      )
    }) 
     : (          <div className="mt-10 flex items-center justify-center flex-col">
     <Audio
     height="80"
     width="80"
     radius="9"
     color={`${darkMode ? "white" : "black"}`}
     ariaLabel="loading"
     wrapperStyle
     wrapperClass
   />
   <h1 className="text-2xl ml-10">Loading Images...</h1>
   </div>)
}

      </div>
         {/*
      video Section
       */}
                 <div className="vidddd hidden">
        <h1 style={{textAlign:"center"}} className='mb-5 font-bold text-2xl'>Videos</h1>
        {
  video.length >= 1 ? video.map((e, index) => {
    return (
      <div className="border rounded-lg overflow-hidden shadow-md my-4" key={index}>
        {uploadPublic ? "" :
          <video src={e.videoUrl} controls className="w-full" style={{ height: "30vh", borderRadius: "1rem" }} />
        }
        <div className="p-4">
          <p className="text-lg font-semibold mb-2">{e.videoCaption}</p>
          <div className="extra-Details text-sm ">
          {User?.result.email === e.email && <MdDelete className='w-[190%] hover:text-red-900 text-red-500 cursor-pointer mb-2 text-2xl flex items-end justify-end' onClick={()=>deleteVideo(e._id)}/>}
            <p>Posted by: <span className="font-semibold">{e.postedBy}</span></p>
            <p>Posted at: <span className="font-semibold">{moment(e.createAt).fromNow()}</span></p>
          </div>
        </div>
      </div>
    )
  }): (
    <div className="mt-10 flex items-center justify-center flex-col">
    <Audio
    height="80"
    width="80"
    radius="9"
    color={`${darkMode ? "white" : "black"}`}
    ariaLabel="loading"
    wrapperStyle
    wrapperClass
  />
  <h1 className="text-2xl ml-10">Loading Videos...</h1>
  </div>
  )
}

      </div>
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default DisplayPublicPage
