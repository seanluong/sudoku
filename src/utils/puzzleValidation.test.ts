import { CellMap } from "../components/Sudoku";
import { cellMapKey, unique, validateRow } from "./puzzleValidation";

describe("unique", () => {
    it ('returns true for empty array', () => {
        expect(unique([])).toBeTruthy();
    });

    it('returns true for array of unique numbers', () => {
        expect(unique([1, 2, 3])).toBeTruthy();
    });

    it('returns false for array of non-unique numbers', () => {
        expect(unique([1, 2, 3, 1])).toBeFalsy();
    });
});

describe('cellMapKey', () => {
    it('returns correct key', () => {
        expect(cellMapKey(1, 2)).toEqual("1:2");
        expect(cellMapKey(0, 0)).toEqual("0:0");
    });
});

describe('validateRow', () => {
    it('returns true for valid row', () => {
        const cells: CellMap = {
            "0:0": { value: 1, isOriginal: true },
            "0:1": { value: 2, isOriginal: true },
            "0:2": { value: 3, isOriginal: true },
            "0:3": { value: 4, isOriginal: true },
            "0:4": { value: 5, isOriginal: true },
            "0:5": { value: 6, isOriginal: true },
            "0:6": { value: 7, isOriginal: true },
            "0:7": { value: 8, isOriginal: true },
            "0:8": { value: 9, isOriginal: true },
        };
        expect(validateRow(cells, 0)).toBeTruthy();
    });
    it('returns false for invalid row', () => {
        const cells: CellMap = {
            "0:0": { value: 1, isOriginal: true },
            "0:1": { value: 2, isOriginal: true },
            "0:2": { value: 3, isOriginal: true },
            "0:3": { value: 4, isOriginal: true },
            "0:4": { value: 5, isOriginal: true },
            "0:5": { value: 6, isOriginal: true },
            "0:6": { value: 7, isOriginal: true },
            "0:7": { value: 8, isOriginal: true },
            "0:8": { value: 1, isOriginal: true },
        };
        expect(validateRow(cells, 0)).toBeFalsy();
    });
});