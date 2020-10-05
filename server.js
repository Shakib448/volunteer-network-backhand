const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const volunteerCollection = client
    .db("volunteer")
    .collection("volunteerEntry");

  app.post("/addVolunteerData", (req, res) => {
    const volunteerData = req.body.data;
    volunteerCollection.insertMany(volunteerData).then((result) => {
      console.log("count", result.insertedCount);
      res.send(result.insertedCount);
    });

    app.get("/volunteerData", (req, res) => {
      volunteerCollection.find({}).toArray((err, doc) => {
        console.log("doc", doc);
        console.log("err", err);
        res.send(doc);
      });
    });
  });
  console.log("database contented");
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome Backhand");
});

app.listen(PORT, () => {
  console.log(`Server is running ${"http://localhost:5000/"}`);
});
