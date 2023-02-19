import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controls } from './Controls';
import { Board,  Sudoku } from './Sudoku';
import { CellMap } from './types';

const generateBoard = (rowCount: number, columnCount: number): Board => {
    const board: Board = {
        cells: {} as CellMap,
    };

    for (let r=0;r<rowCount;r++) {
        for (let c=0;c<columnCount;c++) {
            const key = `${r}:${c}`;
            board.cells[key] = 0;
        }
    }

    return board;
}

export const Main = () => {
    const initialBoard = generateBoard(9, 9);
    const [board, setBoard] = useState(initialBoard);

    useEffect(() => {
        setBoard(board => {
            return {
                ...board,
                cells: {
                    ...board.cells,
                    '0:0': 9,
                    '0:1': 4,
                    '7:3': 5,
                }
            };
        })
    }, []);

    // TODO: update the github link
    const gitHubUrl = "/TBD";

    return (
        <Stack component={"main"} sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100vw",
            paddingTop: "1rem",
        }} spacing={3}>
            <Sudoku board={board} />
            <Controls />
        </Stack>
    );
}