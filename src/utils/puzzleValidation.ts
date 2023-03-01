import { CellMap } from "../components/Sudoku";


export interface ValidationError {
    type: "ROW" | "COLUMN" | "SUB_SQUARE";
    index: number;
}

export const cellMapKey = (rowIndex: number, columnIndex: number): string => {
    return `${rowIndex}:${columnIndex}`;
}

const subSquareIndex = (rowIndex: number, columnIndex: number): number => {
    const rootRowIndex = Math.floor(rowIndex / 3);
    const rootColumnIndex = Math.floor(columnIndex / 3);
    return rootRowIndex * 3 + rootColumnIndex;
}

const unique = (numbers: number[]) => {
    const set = new Set();
    for (let number of numbers) {
        if (set.has(number)) {
            return false;
        }
        set.add(number);
    }
    return true;
}

const validateRow = (cells: CellMap, rowIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return unique(indices.map((columnIndex) => {
        const cell = cells[cellMapKey(rowIndex, columnIndex)];
        return cell?.value;
    }).filter((value) => value));
}

const validateColumn = (cells: CellMap, colummIndex: number): boolean => {
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return unique(indices.map((rowIndex) => {
        const cell = cells[cellMapKey(rowIndex, colummIndex)];
        return cell?.value;
    }).filter((value) => value));
}

const validateSubSquare = (cells: CellMap, subSquareIndex: number): boolean => {
    const numbers = [];
    const rowIndex = Math.floor(subSquareIndex / 3) * 3;
    const colIndex = (subSquareIndex % 3) * 3;
    for (let r=0;r<3;r++) {
        for (let c=0;c<3;c++) {
            const cell = cells[cellMapKey(rowIndex + r, colIndex + c)];
            if (cell && cell.value) {
                numbers.push(cell.value);
            }
        }
    }
    return unique(numbers);
}

// TODO: add tests
export const validateBoardForCell = (cells: CellMap, rowIndex: number, colummIndex: number): ValidationError[] => {
    const errors = [] as ValidationError[];

    if (!validateRow(cells, rowIndex)) {
        errors.push({
            type: "ROW", index: rowIndex
        } as ValidationError);
    }

    if (!validateColumn(cells, colummIndex)) {
        errors.push({
            type: "COLUMN", index: colummIndex
        } as ValidationError);
    }

    const index = subSquareIndex(rowIndex, colummIndex);
    if (!validateSubSquare(cells, index)) {
        errors.push({
            type: "SUB_SQUARE", index
        } as ValidationError);
    }

    console.log(errors);
    return errors;
}