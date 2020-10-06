const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qebvf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const volunteerCollection = client
    .db("volunteer")
    .collection("volunteerEntry");

  const eventSelectedData = client.db("volunteer").collection("eventSelect");

  //Post

  app.post("/addVolunteerData", (req, res) => {
    const volunteerData = req.body.data;
    console.log(volunteerData);
    // volunteerCollection.insertMany(volunteerData).then((result) => {
    //   console.log(result.insertedCount);
    //   res.send(result.insertedCount.toString());

    //   // res.status(200).send(result.insertedCount > 0);
    // });
  });

  app.post("/selectedEvent", (req, res) => {
    const selectEvent = req.body.data;
    eventSelectedData.insertOne(selectEvent).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // Get
  app.get("/volunteer/event", (req, res) => {
    console.log(req.query.email);
    eventSelectedData.find({ email: req.query.email }).toArray((err, doc) => {
      res.send(doc);
    });
  });

  app.get("/events", (req, res) => {
    volunteerCollection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });

  console.log("database contented");
});

app.get("/", (req, res) => {
  res.send("Welcome Backhand");
});

app.listen(PORT, () => {
  console.log(`Server is running ${"http://localhost:5000/"}`);
});
