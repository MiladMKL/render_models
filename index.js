const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

let models = [
  {
    id: 1,
    name: "",
    isThick: true,
    country: "USA",
  },
  {
    id: 2,
    name: "",
    isThick: true,
    country: "Germany",
  },
  {
    id: 3,
    name: "",
    isThick: true,
    country: "Australia",
  },
];

// GET
app.get("/", (request, response) => {
  response.send("<h1>Models</h1>");
});

app.get("/api/models/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("server id: ", id);

  const model = models.find((model) => model.id === id);

  console.log("server model: ", model);

  if (model) {
    response.json(model);
  } else {
    response.status(404).end();
  }
});

app.get("/api/models", (request, response) => {
  response.json(models);
});

// DELETE
app.delete("/api/models/:id", (request, response) => {
  const id = Number(request.params.id);
  models = models.filter((model) => model.id !== id);

  response.status(204).end();
});

// Helper Method
const generateId = () => {
  const maxId =
    models.length > 0 ? Math.max(...models.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

// POST
app.post("/api/models", (request, response) => {
  const body = request.body;

  console.log("server body: ", body);

  if (!body.name) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const model = {
    name: body.name,
    isThick: Boolean(body.isThick) || false,
    country: body.country,
    id: generateId(),
  };

  models = models.concat(model);
  response.json(model);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
