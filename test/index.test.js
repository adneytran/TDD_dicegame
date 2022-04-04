import { findBestRollType } from "../src/index";
import { ROLL_TYPES, ERROR_MESSAGE } from "../src/constants";
import shuffle from "../src/utils/shuffle";

describe("Checking validity of arguments", () => {
  const badTypeArray = [1, 1, 1, 1, "a"];
  const badLengthArray = [1, 1, 1, 1, 1, 1];
  const badValueArray = [1, 1, 1, 1, 7];

  it("should throw an error if an element of the dice array is non-numeric", () => {
    expect(findBestRollType(badTypeArray)).toThrow(ERROR_MESSAGE.invalidType);
  });

  it("should throw an error if the array has a length other than five", () => {
    expect(findBestRollType(badLengthArray)).toThrow(
      ERROR_MESSAGE.invalidArrayLength
    );
  });

  it("should throw an error if an element of the dice array is not between 1 and 6", () => {
    expect(findBestRollType(badValueArray)).toThrow(
      ERROR_MESSAGE.invalidDieValue
    );
  });
});

describe("Determining roll types", () => {
  let dice;

  it("should have an 'all same' type if all the dice are the same number", () => {
    dice = [1, 1, 1, 1, 1];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.allSame);
  });

  it("should be a straight if there are five consecutive, unique numbers", () => {
    dice = [1, 2, 3, 4, 5];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.straight);

    dice = [2, 3, 4, 5, 6];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.straight);

    dice = [1, 2, 3, 5, 6];
    expect(findBestRollType(shuffle(dice))).not.toEqual(ROLL_TYPES.straight);
  });

  it("should be a small straight if there are four consecutive, unique numbers", () => {
    dice = [1, 2, 3, 4, 6];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.smallStraight);

    dice = [2, 3, 4, 4, 5];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.smallStraight);

    dice = [3, 4, 5, 6, 6];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.smallStraight);
  });

  it("should be a full house if there are trips and a pair", () => {
    dice = [1, 1, 1, 2, 2];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.fullHouse);
  });

  it("should be a 4 of a kind if there are four instances of a single value", () => {
    dice = [1, 1, 1, 1, 2];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.fourOfAKind);
  });

  it(`should be a 3 of a kind if there are three instances of a single value, 
	with the other two values non-matching`, () => {
    dice = [1, 1, 1, 5, 3];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.threeOfAKind);

    dice = [2, 1, 1, 1, 3];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.threeOfAKind);

    dice = [2, 3, 1, 2, 3];
    expect(findBestRollType(shuffle(dice))).not.toEqual(
      ROLL_TYPES.threeOfAKind
    );
  });

  it("should be chance when the dice roll doesn't qualify for the other roll types", () => {
    dice = [1, 1, 2, 3, 5];
    expect(findBestRollType(shuffle(dice))).toEqual(ROLL_TYPES.chance);
  });
});
