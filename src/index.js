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
  const [diceCount, diceValues] = initializeCounts(dice);

  if (diceValues.length === 1) {
    return ROLL_TYPES.allSame;
  }

  if (diceValues.length === 5) {
    if (diceValues[diceValues.length - 1] - diceValues[0] === 4) {
      return ROLL_TYPES.straight;
    } else {
      return ROLL_TYPES.smallStraight;
    }
  }

  if (
    diceValues.length === 4 &&
    diceValues[diceValues.length - 1] - diceValues[0]
  ) {
    return ROLL_TYPES.smallStraight;
  }
};

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {[Map<number,number>, Array<number>]} a map that stores the number of occurances of each die value
 * 																							  and a sorted array containing the unique die values
 */
const initializeCounts = (dice) => {
  const diceCount = new Map();
  const diceSet = new Set();

  dice.forEach((die) => {
    const count = diceCount.get(die);
    if (!count) {
      diceCount.set(die, 1);
    } else {
      diceCount.set(die, count + 1);
    }
    diceSet.add(die);
  });
  const diceValues = [...diceSet].sort((a, b) => a - b);
  return [diceCount, diceValues];
};
