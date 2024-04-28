const express = require("express");
const cors = require("cors");
const { Client } = require("@opensearch-project/opensearch");

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "admin",
    password: "Kirochka1982?",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { start_date: startDate, end_date: endDate } = req.query;
    const response = await client.search({
      index: "test2",
      body: {
        size: "2000",
        query: {
          match_all: {},
        },
        sort: [
          {
            TS: { 
              order: 'asc'
            }
          }
        ]
      },
    });
    res.json(response.body.hits);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.listen(8080);
