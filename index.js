"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const config = require("./config.json"); // import config file
const cors = require("cors");
const { ObjectId } = require("mongodb");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(config.connectionString);

// TODO: http request (GET request) to retreive articles from api (keeping in mind the rate limit/pagination)
// TODO: POST request to add articles to database
// TODO: GET request to retreive articles from database
// TODO: Implement search/filter/sort functionality (with mongoDB documantation(?))
// TODO: Add PUT/DELETE requests to update/delete articles from database

// ---------------------GET/POST request tests-------------------------------------
app.get("/api/articles", async (req, res) => {
  try {
    await client.connect();
    const articles = await client
      .db("web2-course-project")
      .collection("articles")
      .find({})
      .toArray();
    res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong.", value: error });
  } finally {
    await client.close();
  }
});

app.post("/api/articles", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    await client.connect();

    const result = await client
      .db("web2-course-project")
      .collection("articles")
      .insertOne(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong.", value: error });
  } finally {
    await client.close();
  }
});

app.delete("/api/articles/:id", async (req, res) => {
  try {
    await client.connect();

    const result = await client
      .db("web2-course-project")
      .collection("articles")
      .deleteOne({ _id: new ObjectId(req.params.id) }); // change string to ObjectId
      console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong.", value: error });
  } finally {
    await client.close();
  }
});

app.put("/api/articles/:id", async (req, res) => {
  try {
    await client.connect();

    // const objectId = new ObjectId(req.params.id);
    // console.log("objectId: ", objectId);
    const result = await client
      .db("web2-course-project")
      .collection("articles")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );

    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200).json({ success: true, message: "Article updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Not modified" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong", value: error });
  } finally {
    await client.close();
  }
});

// ---------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});