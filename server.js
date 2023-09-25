const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const videosRoute = require("./routes/videos");

app.use(cors());
app.use(express.json());

app.use('/videos', videosRoute);

app.listen(port, () => {
    console.log("Server is running on port 8080!");
});