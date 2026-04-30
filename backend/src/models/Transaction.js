import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["deposit", "bet", "win"], required: true },
    amount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
