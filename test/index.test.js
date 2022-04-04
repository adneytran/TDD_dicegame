import { findBestRollType } from "../src/index";
import { ROLL_TYPES } from "../src/constants";

describe("Determining roll types", () => {
  it("should have an 'all same' type if all the dice are the same number", () => {
    const dice = [1, 1, 1, 1, 1];
    expect(findBestRollType(dice)).toEqual(ROLL_TYPES.allSame);
  });
});
