
const FETCH_PUZZLE_ENDPOINT = "/.netlify/functions/fetch-puzzle";

interface CellValue {
    row: number;
    col: number;
    value: number;
  }

export interface Puzzle {
    shown: CellValue[];
    hidden: CellValue[];
}

export const fetchPuzzle = async () => {
    try {
        const response = await fetch(FETCH_PUZZLE_ENDPOINT);
        const json = await response.json();
        return json.puzzle as Puzzle;
    } catch (err) {
        console.error(err);
    }
}