
const FETCH_PUZZLE_ENDPOINT = "/.netlify/functions/fetch-puzzle";

export const fetchPuzzle = async () => {
    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    } as RequestInit;
    fetch(FETCH_PUZZLE_ENDPOINT, config).
        then((response) => response.json()).
        then((json) => {
            console.log(json);
        }).catch((err) => {
            console.error(err);
        });
}