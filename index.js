//require = require("esm"(module));
//module.exports = require("./app.js");
/*
//const express = require("express");
import express from "express";
const app = express();

const router = express.Router();
const PORT = process.env.PORT || 4000;

app.use(express.json());

/**
 * @req -> query params
 * @param path -> por url usando /
 * @body -> cuerpo

app.get("/", (req, res) => {
  res.send("mi primera ruta en express");
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.query.name;
  const lastname = req.query.lastname;
  const body = req.body;
  console.log("body ", body);
  const data = JSON.stringify(body);
  res.send(`id ${id}- ${name} ${lastname} la info del body es ${data}`);
});

app.delete("/", (req, res) => {
  res.send("mi primera delete");
});

app.put("/", (req, res) => {
  res.send("mi primera put");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
*/