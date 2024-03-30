import express from "express";

import {
  AddImage,
  AddVideo,
  Addtweet,
  getTweet,
  getImage,
  getVideo,
  deleteImage,
  deleteVideo,
  deleteTweet
} from "../controllers/public.js";

const router = express.Router();

router.post("/AddTweet", Addtweet);
router.get("/getTweet", getTweet);
router.post("/AddVideo", AddVideo);
router.get("/getVideo", getVideo);
router.post("/AddImage", AddImage);
router.get("/getImage", getImage);
router.post("/deleteImage", deleteImage);
router.post("/deleteTweet", deleteTweet);
router.post("/deleteVideo", deleteVideo);

export default router;
