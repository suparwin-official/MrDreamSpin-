import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import { spinSlot } from "../utils/slot.logic.js";

export const slotSpin = async (req, res) => {
  const { bet } = req.body;

  const wallet = await Wallet.findOne({ user: req.userId });
  if (!wallet || wallet.balance < bet) {
    return res.status(400).json({ msg: "Insufficient balance" });
  }

  wallet.balance -= bet;

  const result = spinSlot(bet);

  wallet.balance += result.win;
  await wallet.save();

  await Transaction.create({
    user: req.userId,
    type: "bet",
    amount: bet,
    balanceAfter: wallet.balance
  });

  if (result.win > 0) {
    await Transaction.create({
      user: req.userId,
      type: "win",
      amount: result.win,
      balanceAfter: wallet.balance
    });
  }

  res.json({
    bet,
    win: result.win,
    balance: wallet.balance
  });
};
