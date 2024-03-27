import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import otpSchema from "../models/otp.js";
import nodeMailer from "nodemailer";
import otpGenerator from "otp-generator";
import users from "../models/auth.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_KEY,
});

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const { _id, tags, joinedOn } = await newUser;

    res
      .status(200)
      .json({ result: { _id, name, email, tags, joinedOn }, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const { _id, name, tags, joinedOn } = await existinguser;
    res
      .status(200)
      .json({ result: { _id, name, email, tags, joinedOn }, token });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    //validate user exists or not
    const userExist = await users.findOne({ email: email });
    if (!userExist) {
      return res.json({
        message: "User does not exists with this email",
        success: false,
      });
    }

    //Generate otp
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await otpSchema.create({ otp });

    //if userexists send otp
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: "StackOverflow",
        to: email,
        subject: "Email Authentication",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
            <h2 style="color: #333;">Email Authentication</h2>
            <p>Your One-Time Password (OTP) for authentication is:</p>
            <h1 style="color: #007bff; font-size: 48px; margin: 20px 0;">${otp}</h1>
            <p style="margin-bottom: 20px;">Do not share it with anyone. This OTP is valid for 5 minutes only.</p>
            <p style="font-size: 14px; color: #777;">If you did not request this OTP, please ignore this email.</p>
          </div>
        `,
      });
    } catch (err) {
      console.log(`Failed to send Email`, err);
    }

    //send response
    res.status(200).json({
      message: `OTP has been sent on your registered mail id`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const authenticate = async (req, res) => {
  try {
    const { email, otp } = req.body;

    //validate user exists or not
    const userExist = await users.findOne({ email: email });
    if (!userExist) {
      return res.json({
        message: "User does not exists with this email",
        success: false,
      });
    }

    //extract otp from database
    const Sendedotp = await otpSchema.findOneAndDelete({ otp });

    if (!Sendedotp || Sendedotp === "" || Sendedotp === null) {
      return res.json({
        message: "Otp is Expired",
      });
    }

    //extract userId too
    const userId = userExist._id;

    //check otp matches or not`
    if (otp !== Sendedotp.otp) {
      return res.json({
        success: false,
        message: "Invalid Otp",
      });
    }

    //send res
    return res.status(200).json({
      success: true,
      data: userId,
      message: "User Authenticated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const checkoutSession = async (req, res) => {
  try {
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const options = {
      amount: price * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const paymentVerfication = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const id = req.params.userId;
    const Currentplan = req.params.plan;

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update the user document to add the new payment
      const user = await users.findByIdAndUpdate(
        id,
        {
          Currentplan,
          $push: {
            payments: {
              planName: Currentplan,
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              purchasedOn: new Date(),
            },
          },
        },
        { new: true }
      );
      const { _id, name, email, tags, joinedOn } = user;
      const Reciept = {
        planName: Currentplan,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        purchasedOn: new Date(),
      };
      const recieptData = encodeURIComponent(JSON.stringify(Reciept));

      // Redirect to success page with payment reference and user data
      const userData = encodeURIComponent(
        JSON.stringify({ _id, name, email, tags, joinedOn })
      );
      res.redirect(
        `https://stackoverflow-test.netlify.app/success?reference=${recieptData}&user=${userData}`
      );
    } else {
      return res.redirect(
        `https://stackoverflow-test.netlify.app/cancel?reference=${razorpay_payment_id}`
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};
