import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    collegeId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    paymentProof: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentId: String,
    paymentScreenshot: String,
    registrationData: {
      type: {
        originalPassword: String,
        college: String,
        collegeId: String,
        fullName: String,
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
