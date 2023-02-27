const request = require("request");
const rp = require("request-promise");
const { htmlToPuzzle } = require("./html-to-puzzle");

interface PuzzleCache {
  puzzles: Puzzle[];
  today: string;
  currentPuzzle: number;
}

const puzzleCache = {} as PuzzleCache;

const rateLimitReached = (cache: PuzzleCache) => {
  const today = (new Date()).toLocaleDateString();
  const maxPuzzleCount = Number.parseInt(process.env.max_puzzle_count || '') || 5;
  return (cache.today === today && cache.puzzles.length === maxPuzzleCount);
}

const nextPuzzleInCache = (cache: PuzzleCache) => {
  cache.currentPuzzle = (cache.currentPuzzle + 1) % cache.puzzles.length;
  return cache.puzzles[cache.currentPuzzle];
}

const resetCacheIfNeeded = (cache: PuzzleCache) => {
  const today = (new Date()).toLocaleDateString();
  if (today !== cache.today) {
    cache.today = today;
    cache.puzzles = [];
    cache.currentPuzzle = -1;
  }
}

exports.handler = async (event, context) => {
  let puzzle: Puzzle;

  resetCacheIfNeeded(puzzleCache);
  if (rateLimitReached(puzzleCache)) {
    puzzle = nextPuzzleInCache(puzzleCache);
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
    puzzleCache.currentPuzzle++;
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