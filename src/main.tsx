import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Board, CellMap, Row, Sudoku } from './Sudoku';

const generateBoard = (rowCount: number, columnCount: number): Board => {
    const board: Board = {
        rows: [] as number[],
        columns: [] as number[],
        cells: {} as CellMap,
    };

    for (let r=0;r<rowCount;r++) {
        board.rows.push(r);
        board.columns.push(r);
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
        <Box component={"main"} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            bgcolor: "yellow"
        }}>
            <Sudoku board={board}/>
        </Box>
    );
}