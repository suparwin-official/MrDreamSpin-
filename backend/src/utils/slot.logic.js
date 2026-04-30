export const spinSlot = (betAmount) => {
  const RTP = 0.92; // 92%
  const rand = Math.random();

  let win = 0;

  if (rand < RTP / 10) win = betAmount * 10;
  else if (rand < RTP / 4) win = betAmount * 4;
  else if (rand < RTP / 2) win = betAmount * 2;

  return {
    win,
    isWin: win > 0
  };
};
