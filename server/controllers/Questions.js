import Questions from "../models/Questions.js";
import mongoose from "mongoose";
import users from "../models/auth.js";

export const AskQuestion = async (req, res) => {
  try {
    const postQuestionData = req.body;
    const userId = req.userId;
    let User = await users.findById(userId);

    if (!User) {
      return res.status(404).json("User not found");
    }
    // Check if membership has expired
    if(User.payments){
    if (User.payments.length > 0) {
      const lastPaymentDate =
        User.payments[User.payments.length - 1].purchasedOn;
      const expiryDate = new Date(lastPaymentDate);
      expiryDate.setDate(expiryDate.getDate() + 30); //Membership lasts for 30 days

      if (User.Currentplan !== "Free" && expiryDate < new Date()) {
        User = await users.findByIdAndUpdate(userId, { Currentplan: "Free" },{new: true});
      }
    }}

    let maxQuestionsAllowed = 1; // Default for Free plan
    if (User.Currentplan === "Silver") {
      maxQuestionsAllowed = 5;
    } else if (User.Currentplan === "Gold") {
      maxQuestionsAllowed = Infinity; // No limit for Gold plan
    }

    const questionsCount = await Questions.countDocuments({
      userId,
      askedOn: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }); 

    if (questionsCount >= maxQuestionsAllowed) {
      return res
        .status(400)
        .json(
          `Upgrade Your Plan to exceeded the daily limit of ${maxQuestionsAllowed} questions.`
        );
    }

    const postQuestion = new Questions({ ...postQuestionData, userId });
    await postQuestion.save();
    return res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Couldn't post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await Questions.find().sort({ askedOn: -1 });
    res.status(200).json(questionList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};
