require("dotenv").config();
console.log(1);

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  {
    headers: {
      accept: "application/json",
      Authorization: `bearer ${process.env.API_KEY}`,
    },
  }
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    console.log(process.env.API_KEY);
  })
  .catch((err) => JSON.stingify(err));
