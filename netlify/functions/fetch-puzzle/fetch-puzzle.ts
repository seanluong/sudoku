const { parse } = require('node-html-parser');
const request = require("request");
const rp = require("request-promise");

// TODO: implement a rate limiter here

interface CellValue {
  row: number;
  col: number;
  value: number;
}

const coordinate = (index: number) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return { row, col };
}

const htmlToPuzzle = (dom) => {
    const cssSelector = '#sudoku';
    const puzzleTable = dom.querySelector(cssSelector);
    if (!puzzleTable) {
        throw new Error(`Cannot find element with selector ${cssSelector}`);
    }

    const cells = puzzleTable.querySelectorAll("td") as NodeList;
    if (cells.length !== 81) {
      throw new Error(`A puzzle should have 81 cells but only ${cells.length} found`);
    }

    const shownCells = [] as CellValue[];
    const hiddenCells = [] as CellValue[];
    cells.forEach((cell: Node, index) => {
      const { row, col } = coordinate(index);
      const element = cell as HTMLSpanElement;
      const value = element.innerText.trim();
      const shown = !value.endsWith("&nbsp;");
      if (shown) {
        shownCells.push({
          row, col, value: Number.parseInt(value)
        });
      } else {
        hiddenCells.push({
          row, col, value: Number.parseInt(value[0])
        });
      }
    });

    return {
      shown: shownCells,
      hidden: hiddenCells,
    };
}

exports.handler = async (event, context) => {
  try {

    const rpOptions = {
      uri: process.env.puzzle_url,
      headers: {
          "User-Agent": "Request-Promise",
      },
    };
    const html = await rp(rpOptions);
    const dom = parse(html);
    const puzzle = htmlToPuzzle(dom);

    return {
      statusCode: 200,
      body: JSON.stringify({
        puzzle,
      }),
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}