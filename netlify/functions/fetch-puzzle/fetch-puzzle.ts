const request = require("request");
const rp = require("request-promise");
const { htmlToPuzzle } = require("./html-to-puzzle");

interface PuzzleCache {
  puzzles: Puzzle[];
  today: string;
}

const puzzleCache = {} as PuzzleCache;

const rateLimitReached = (cache: PuzzleCache) => {
  const today = (new Date()).toLocaleDateString();
  const maxPuzzleCount = Number.parseInt(process.env.max_puzzle_count || '') || 5;
  return (cache.today === today && cache.puzzles.length === maxPuzzleCount);
}

const randomPuzzleInCache = ({ puzzles }: PuzzleCache) => {
  const index = Math.floor(Math.random() * puzzles.length);
  return puzzles[index];
}

const resetCacheIfNeeded = (cache: PuzzleCache) => {
  const today = (new Date()).toLocaleDateString();
  if (today !== cache.today) {
    cache.today = today;
    cache.puzzles = [];
  }
}

exports.handler = async (event, context) => {
  let puzzle: Puzzle;

  resetCacheIfNeeded(puzzleCache);
  if (rateLimitReached(puzzleCache)) {
    puzzle = randomPuzzleInCache(puzzleCache);
    return {
      statusCode: 200,
      body: JSON.stringify({
        puzzle,
      }),
    }
  }
  
  try {
    const rpOptions = {
      uri: process.env.puzzle_url,
      headers: {
          "User-Agent": "Request-Promise",
      },
    };
    const html = await rp(rpOptions);
    puzzle = htmlToPuzzle(html);
    puzzleCache.puzzles.push(puzzle);
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      puzzle,
    }),
  }
}