import { ROLL_TYPES, ERROR_MESSAGE } from "./constants.js";

const main = () => {
  console.log("hi mom");
};

main();

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {string} the highest roll type
 */
export const findBestRollType = (dice) => {
  try {
    if (dice.length !== 5) {
      throw ERROR_MESSAGE.invalidArrayLength;
    }
    dice.forEach((die) => {
      if (isNaN(die)) {
        throw ERROR_MESSAGE.invalidType;
      }
      if (die < 1 || die > 6) {
        throw ERROR_MESSAGE.invalidDieValue;
      }
    });
  } catch (e) {
    throw new Error(e);
  }

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
    diceValues[diceValues.length - 1] - diceValues[0] === 3
  ) {
    return ROLL_TYPES.smallStraight;
  }
  if (diceValues.length === 2) {
    const dieValue = diceValues[0];
    if (diceCount.get(dieValue) === 2 || diceCount.get(dieValue) === 3) {
      return threeOfKindBeatsFH(dice)
        ? ROLL_TYPES.threeOfAKind
        : ROLL_TYPES.fullHouse;
    } else {
      return ROLL_TYPES.fourOfAKind;
    }
  }
  const middleDie = dice.sort((a, b) => a - b)[2];
  if (diceValues.length === 3 && diceCount.get(middleDie) === 3) {
    return ROLL_TYPES.threeOfAKind;
  }
  return ROLL_TYPES.chance;
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

/**
 * @param {number[]} dice - array of numbers representing dice
 * @returns {boolean} true if 3 of a kind score is greater than 25 (full house score)
 */
const threeOfKindBeatsFH = (dice) => {
  let sum = 0;
  dice.forEach((die) => {
    sum += die;
  });
  return sum + 5 > 25;
};
