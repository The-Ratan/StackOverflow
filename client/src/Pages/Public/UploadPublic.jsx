import React, { useState } from "react";
import { darkModes } from "../../actions/DarkMode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import badWords from "bad-words-next";
import en from "bad-words-next/data/en.json";
import Filter from "bad-words";
import abusiveWords from "./abusiveWords.json";
import { useRecoilValue } from "recoil";
import { LocalUrl, VideoUploadUrl } from "../../api";
import { IoIosCloseCircle } from "react-icons/io";
import {
  RegExpMatcher,
  englishDataset,
  englishRecommendedTransformers,
} from "obscenity";
const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const filter = new Filter();
filter.addWords(...abusiveWords.abusiveWords);
const BADWORDS = new badWords({ data: en });

const AddPublicInfo = ({
  setuploadPublic,
  GetAllTweets,
  getImage,
  getVideo,
}) => {
  const darkMode = useRecoilValue(darkModes);
  const [showWarning, setshowWarning] = useState("");
  const [image, setimage] = useState(null);
  const [video, setVideo] = useState(null);
  const [tweet, settweet] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageCaption, setimageCaption] = useState("");
  const [videoCaption, setvideoCaption] = useState("");

  const User = useSelector((state) => state.currentUserReducer);
  const Navigate = useNavigate();

  //tweet upload
  const tweetUpload = async () => {
    try {
      if (User) {
        setUploading(true);
        let email = await User.result.email;
        let postedBy = await User.result.name;
        if (tweet !== "") {
          const badWordDetect = BADWORDS.check(tweet.toLowerCase());
          if (
            badWordDetect === true ||
            matcher.hasMatch(tweet.toLowerCase()) ||
            filter.isProfane(tweet.toLowerCase()) === true
          ) {
            settweet("");
            setUploading(false);
            return alert(" Cannot Post Bad Word Detected");
          }
          const data = await fetch(`${LocalUrl}public/AddTweet`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type header to JSON
            },
            body: JSON.stringify({ tweet, postedBy, email }),
          });
          const res = await data.json();

          if (res.success === true) {
            alert("Tweet Upload Successfully");
            settweet("");
            GetAllTweets();
            setuploadPublic(false);
          } else {
            alert("Error in Tweet Upload");
          }
        } else {
          alert("Cant Tweet Empty");
        }
      } else {
        Navigate("/Auth");
        alert("Login to Post a Tweet");
      }
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };

  //Image Upload

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const fileType = selectedImage.type.toLowerCase();
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
        "image/bmp",
        "image/webp",
        "image/tiff",
        "image/vnd.microsoft.icon",
        "image/x-icon",
        "image/vnd.dwg",
        "image/vnd.dxf",
      ];

      if (allowedTypes.includes(fileType)) {
        setimage(selectedImage);
      } else {
        alert("Please select a valid image file (JPEG, PNG, GIF, SVG).");
        e.target.value = null;
      }
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      if (User) {
        let email = await User.result.email;
        let postedBy = await User.result.name;

        if (!image) {
          alert("No image selected.");
          setUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append("image1", image);

        // Check if imageCaption is provided before appending
        if (imageCaption) {
          const badWordDetect = BADWORDS.check(imageCaption);
          if (
            badWordDetect === true ||
            matcher.hasMatch(imageCaption.toLowerCase()) ||
            filter.isProfane(imageCaption.toLowerCase()) === true
          ) {
            setimageCaption("");
            setUploading(false);

            return alert(" Cannot Post Bad Word Detected");
          }
          if (filter.isProfane(imageCaption) === true) {
            setimageCaption("");
            setUploading(false);

            return alert(" Cannot Post Bad Word Detected");
          }
          formData.append("imageCaption", imageCaption);
          formData.append("postedBy", postedBy);
          formData.append("email", email);
        }

        const data = await fetch(`${LocalUrl}public/AddImage`, {
          method: "POST",
          body: formData,
        });

        const res = await data.json();
        if (res.success === true) {
          alert("Image Upload Successfully");
          getImage();
          setimage(null);
          setimageCaption("");
          setuploadPublic(false);
        } else {
          alert("Error in Image Upload");
        }
      } else {
        Navigate("/Auth");
        alert("Login to Post a Image");
      }
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };

  //Video Upload

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    if (selectedVideo) {
      const fileType = selectedVideo.type.toLowerCase();
      const allowedTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv",
        "video/x-matroska",
        "video/webm",
        "video/x-flv",
        "video/3gpp",
        "video/3gpp2",
        "video/ogg",
      ];
      if (allowedTypes.includes(fileType)) {
        setVideo(selectedVideo);
      } else {
        alert("Please select a valid video file (MP4, MOV, AVI, MKV).");
        e.target.value = null;
      }
    }
  };

  const uploadVideo = async () => {
    setUploading(true);

    try {
      if (User) {
        let email = await User.result.email;
        let postedBy = await User.result.name;

        if (!video) {
          alert("No Video selected.");
          setUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append("video1", video);

        // Check if imageCaption is provided before appending
        if (videoCaption) {
          const badWordDetect = BADWORDS.check(videoCaption);
          if (
            badWordDetect === true ||
            matcher.hasMatch(videoCaption.toLowerCase()) ||
            filter.isProfane(videoCaption.toLowerCase()) === true
          ) {
            setvideoCaption("");
            setUploading(false);

            return alert(" Cannot Post Bad Word Detected");
          }
          if (filter.isProfane(video) === true) {
            setvideoCaption("");
            setUploading(false);

            return alert(" Cannot Post Bad Word Detected");
          }
          formData.append("videoCaption", videoCaption);
          formData.append("postedBy", postedBy);
          formData.append("email", email);
        }

        const data = await fetch(`${VideoUploadUrl}public/AddVideo`, {
          method: "POST",
          body: formData,
        });
        const res = await data.json();
        if (res.success === true) {
          alert("Video Upload Successfully");
          getVideo();
          setVideo(null);
          setvideoCaption("");
          setuploadPublic(false);
        } else {
          alert("Error in Video Upload");
        }
      } else {
        Navigate("/Auth");
        alert("Login to Post a Video");
      }
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };
  const GotoImage = () => {
    document.querySelector(".Tweets-Div").classList.add("hidden");
    document.querySelector(".Images-Div").classList.remove("hidden");
    document.querySelector(".Videos-Div").classList.add("hidden");
  };
  const gotoVideo = () => {
    document.querySelector(".Tweets-Div").classList.add("hidden");
    document.querySelector(".Images-Div").classList.add("hidden");
    document.querySelector(".Videos-Div").classList.remove("hidden");
  };
  const gotoTweet = () => {
    document.querySelector(".Tweets-Div").classList.remove("hidden");
    document.querySelector(".Images-Div").classList.add("hidden");
    document.querySelector(".Videos-Div").classList.add("hidden");
  };
  return (
    <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-50 select-none">
      <div className="flex items-center justify-center h-full min-h-screen">
        <div
          className={`${
            darkMode ? "bg-slate-800" : "bg-white"
          } p-10 rounded-lg shadow-xl`}
        >
          <h1
            className={`flex items-center justify-between text-2xl font-bold mb-4`}
          >
            Add Public info
            <IoIosCloseCircle
              className={`text-4xl ${
                uploading ? "text-gray-500" : "hover:text-gray-300"
              } cursor-pointer`}
              onClick={() => (uploading ? undefined : setuploadPublic(false))}
            />
          </h1>
          <div className="flex space-x-4 mb-4">
            <button
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={gotoTweet}
            >
              Add Tweet
            </button>
            <button
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={GotoImage}
            >
              Add Image
            </button>
            <button
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={gotoVideo}
            >
              Add Video
            </button>
          </div>
          <div className="">
            <div className="Tweets-Div">
              <div className="">
                <p className="text-2xl font-bold mb-5">
                  Add Tweet to Upload in Public
                </p>
                <input
                  className={`${
                    darkMode && "text-black"
                  } w-full p-2 mb-5 border-2 outline-none`}
                  style={{ cursor: "pointer" }}
                  type="text"
                  name="tweet"
                  placeholder="Tweet"
                  value={tweet}
                  onChange={(e) => {
                    tweet.length > 50
                      ? setshowWarning("tweet")
                      : setshowWarning("");
                    settweet(e.target.value);
                  }}
                />
                {showWarning === "tweet" && (
                  <p className="text-red-500">
                    Tweet More than 50 Words are prohibited
                  </p>
                )}
                <br />
                <button
                  className={`flex-1 text-white p-2 rounded ${
                    uploading || showWarning === "tweet"
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={
                    uploading || showWarning === "tweet" ? "" : tweetUpload
                  }
                >
                  {uploading ? "Uploading..." : "Upload Tweet"}
                </button>
              </div>
            </div>
            <div className="Images-Div hidden">
              <div className="">
                <p className="text-2xl font-bold mb-5">
                  Add Image to Upload in Public
                </p>
                <input
                  className="p-2 h-full mb-5"
                  style={{ cursor: "pointer" }}
                  type="file"
                  name="image"
                  accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp, image/bmp, image/tiff, image/vnd.microsoft.icon, image/x-icon, image/vnd.dwg, image/vnd.dxf"
                  onChange={handleImageChange}
                />
                <br />
                <input
                  className={`${
                    darkMode && "text-black"
                  } w-full p-2 mb-5 border-2 outline-none`}
                  type="text"
                  name="caption"
                  placeholder="caption"
                  style={{ cursor: "pointer" }}
                  value={imageCaption}
                  onChange={(e) => {
                    imageCaption.length > 50
                      ? setshowWarning("imageCaption")
                      : setshowWarning("");
                    setimageCaption(e.target.value);
                  }}
                />
                {showWarning === "imageCaption" && (
                  <p className="text-red-500">
                    Caption More than 50 Words are prohibited
                  </p>
                )}
                <br />
                <button
                  className={`flex-1 text-white p-2 rounded ${
                    uploading || showWarning === "imageCaption"
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={
                    uploading || showWarning === "imageCaption"
                      ? ""
                      : uploadImage
                  }
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </div>
            </div>
            <div className="Videos-Div hidden">
              <div className="">
                <p className="text-2xl font-bold mb-5">
                  Add Video to Upload in Public
                </p>
                <input
                  className="p-2 h-full mb-5"
                  style={{ cursor: "pointer" }}
                  type="file"
                  name="video"
                  accept="video/mp4, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/x-matroska, video/webm, video/x-flv, video/3gpp, video/3gpp2, video/ogg"
                  onChange={handleVideoChange}
                />
                <br />
                <input
                  className={`${
                    darkMode && "text-black"
                  } w-full p-2 mb-5 border-2 outline-none`}
                  type="text"
                  name="caption"
                  placeholder="caption"
                  style={{ cursor: "pointer" }}
                  value={videoCaption}
                  onChange={(e) => {
                    videoCaption.length > 50
                      ? setshowWarning("videoCaption")
                      : setshowWarning("");
                    setvideoCaption(e.target.value);
                  }}
                />
                {showWarning === "videoCaption" && (
                  <p className="text-red-500">
                    Caption More than 50 Words are prohibited
                  </p>
                )}
                <br />
                <button
                  className={`flex-1 text-white p-2 rounded ${
                    uploading || showWarning === "videoCaption"
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } `}
                  style={{ cursor: "pointer" }}
                  onClick={
                    uploading || showWarning === "videoCaption"
                      ? ""
                      : uploadVideo
                  }
                >
                  {uploading ? "Uploading..." : "Upload Video"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPublicInfo;
