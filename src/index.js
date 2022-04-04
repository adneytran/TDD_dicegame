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
  const diceValues = Array.from(diceCount.keys()).sort((a, b) => a - b);

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

  if (diceValues.length === 2) {
    const dieValue = diceValues[0];
    if (diceCount.get(dieValue) === 2 || diceCount.get(dieValue) === 3) {
      return ROLL_TYPES.fullHouse;
    } else {
      return ROLL_TYPES.fourOfAKind;
    }
  }
};

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {Map<number,number>} a map that stores the number of occurances of each die value
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
