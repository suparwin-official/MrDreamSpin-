import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

// ensure wallet exists
export const getWallet = async (req, res) => {
  let wallet = await Wallet.findOne({ user: req.userId });

  if (!wallet) {
    wallet = await Wallet.create({ user: req.userId });
  }

  res.json(wallet);
};

// deposit (admin/manual)
export const deposit = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

  const wallet = await Wallet.findOneAndUpdate(
    { user: req.userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  );

  await Transaction.create({
    user: req.userId,
    type: "deposit",
    amount,
    balanceAfter: wallet.balance
  });

  res.json(wallet);
};

// bet deduct
export const bet = async (req, res) => {
  const { amount } = req.body;
  const wallet = await Wallet.findOne({ user: req.userId });

  if (!wallet || wallet.balance < amount) {
    return res.status(400).json({ msg: "Insufficient balance" });
  }

  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
    user: req.userId,
    type: "bet",
    amount,
    balanceAfter: wallet.balance
  });

  res.json(wallet);
};

// win add
export const win = async (req, res) => {
  const { amount } = req.body;

  const wallet = await Wallet.findOneAndUpdate(
    { user: req.userId },
    { $inc: { balance: amount } },
    { new: true }
  );

  await Transaction.create({
    user: req.userId,
    type: "win",
    amount,
    balanceAfter: wallet.balance
  });

  res.json(wallet);
};

// history
export const history = async (req, res) => {
  const list = await Transaction.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(list);
};
