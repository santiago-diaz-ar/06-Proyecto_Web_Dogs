require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const axios = require("axios");
const { Temper } = require("../db");

const rootRouter = Router();

const url = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

rootRouter.get("/", async (req, res) => {
  const TemperApi = await axios.get(url);
  const Tempers = TemperApi.data.map((temper) => temper.temperament);
  const TemperArr = Tempers.toString().split(","); //convierto todo en string luego lo coloco en un arr
  TemperArr.forEach((t) => {
    //trim quito espacion al final y comienzo del string
    const t2 = t.trim();
    //busco si esta no creo, si no esta creo el temper en el modelo Temper
    Temper.findOrCreate({
      where: { name: t2 },
    });
  });

  const Alltempers = await Temper.findAll();
  return res.status(200).send(Alltempers);
});

module.exports = rootRouter;
