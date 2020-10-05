const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const volunteerCollection = client
    .db("volunteer")
    .collection("volunteerEntry");
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome Backhand");
});

app.listen(PORT, () => {
  console.log(`Server is running ${"http://localhost:5000/"}`);
});
