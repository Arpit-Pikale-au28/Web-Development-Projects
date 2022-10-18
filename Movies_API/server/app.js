const express = require("express");
const path = require("path");
const fs = require('fs')
const app = express();
const cors = require('cors')
const movies = require('./movies_metadata.json');

app.use(cors())

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
   let rawdata = fs.readFileSync('movies_metadata.json');
   let movies = JSON.parse(rawdata);
  response.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
    let foundUser = movies.find(x => x.id === parseInt(req.params.id));
     let jsonString = JSON.stringify(foundUser);
    res.send(jsonString);
})

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
