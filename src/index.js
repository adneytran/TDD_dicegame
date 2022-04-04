import { ROLL_TYPES } from "./constants";

const main = () => {
  console.log("hi mom");
};

main();

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {string} the highest roll type
 */
export const findBestRollType = (dice) => {
  const diceCount = initializeCounts(dice);
  if (diceCount.size === 1) {
    return ROLL_TYPES.allSame;
  }
};

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {Map<number, number>} a map that stores the number of occurances of each die value
 */
const initializeCounts = (dice) => {
  const diceCount = new Map();

  dice.forEach((die) => {
    const count = diceCount.get(die);
    if (!count) {
      diceCount.set(die, 1);
    } else {
      diceCount.set(die, count + 1);
    }
  });
  return diceCount;
};
