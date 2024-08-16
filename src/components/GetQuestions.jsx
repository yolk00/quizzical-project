export default function GetQuestions(gameSettings) {
  // destructures gameSettings to enable us to fetch correct api link
  const { category, difficulty, type } = gameSettings;

  let categoryQuery = "";
  let difficultyQuery = "";
  let typeQuery = "";

  if (category !== "") {
    categoryQuery = `&category=${category}`;
  }

  if (difficulty !== "") {
    difficultyQuery = `&difficulty=${difficulty}`;
  }

  if (type !== "") {
    typeQuery = `&type=${type}`;
  }

  let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`;

  console.log(apiUrl);
  // console.log("fetched")

  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data.results);
}
