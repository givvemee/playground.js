require("dotenv").config();

const apiCall = () => {
  fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `bearer ${process.env.API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(process.env.API_KEY);
    })
    .catch((err) => JSON.stingify(err));
};

apiCall();
