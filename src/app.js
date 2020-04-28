const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repo = { id: uuid(), url, title, techs, likes: 0 };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex(repo => repo.id === id);

  if(index === -1)
    return response.status(400).send('Repository not found');

  const repo = {...repositories[index], url, title, techs};

  repositories[index] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id === id);

  if(index === -1)
    return response.status(400).send('Repository not found');

  repositories.splice(index, 1);

  return response.status(204).send('Deleted')
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(repo => repo.id === id);

  if(index === -1)
    return response.status(400).send('Repository not found');

  repositories[index].likes++;

  return response.json(repositories[index]);
});

module.exports = app;
