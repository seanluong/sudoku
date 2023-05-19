import { unique } from "./puzzleValidation";

describe("unique", () => {

    it ('returns true for empty array', () => {
        expect(unique([])).toBeTruthy();
    });
});