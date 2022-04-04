import { findBestRollType } from "../src/index";
import { ROLL_TYPES } from "../src/constants";
import shuffle from "../src/utils/shuffle";

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
});
