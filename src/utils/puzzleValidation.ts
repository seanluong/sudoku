import { CellMap } from "../components/Sudoku";


interface ValidationError {
    type: "ROW" | "COLUMN" | "SUB_SQUARE";
    index: number;
}

export interface ValidationResult {
    valid: boolean;
    errors?: ValidationError[];
}

export const cellMapKey = (rowIndex: number, columnIndex: number): string => {
    return `${rowIndex}:${columnIndex}`;
}

const fromOneToNine = (numbers: number[]) => {
    const set = new Set();
    numbers.forEach((number) => {
        set.add(number);
    })
    return set.size === 9;
}

const validateRow = (cells: CellMap, rowIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return fromOneToNine(indices.map((columnIndex) => {
        const cell = cells[cellMapKey(rowIndex, columnIndex)];
        return cell.value;
    }));
}

const validateColumn = (cells: CellMap, colummIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return fromOneToNine(indices.map((rowIndex) => {
        const cell = cells[cellMapKey(rowIndex, colummIndex)];
        return cell.value;
    }));
}

const validateSubSquare = (cells: CellMap, subSquareIndex: number): boolean => {
    const numbers = [];
    const rowIndex = Math.floor(subSquareIndex / 3) * 3;
    const colIndex = (subSquareIndex % 3) * 3;
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            const cell = cells[cellMapKey(rowIndex + r, colIndex + c)];
            numbers.push(cell.value);
        }
    }
    return fromOneToNine(numbers);
}

// TODO: add tests
export const validateBoard = (cells: CellMap): ValidationError[] => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const rowErrors = indices
        .filter((index) => !validateRow(cells, index))
        .map((index) => ({
            type: "ROW", index
        } as ValidationError));

    const columnErrors = indices
        .filter((index) => !validateRow(cells, index))
        .map((index) => ({
            type: "COLUMN", index
        } as ValidationError));

    const subSquareErrors = indices
        .filter((index) => !validateRow(cells, index))
        .map((index) => ({
            type: "SUB_SQUARE", index
        } as ValidationError));


    const errors = rowErrors.concat(columnErrors).concat(subSquareErrors);
    console.log(errors);
    return errors;
}