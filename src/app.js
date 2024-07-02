import express from "express";
import dotenv from "dotenv";
import getIpDetails from "./services/service.getApi.js";

const app = express();
dotenv.config();
const api_key = process.env.api_key;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.json({
    message: "Hello, welcome to the home route",
    useful_links: {
      Api: `https://hng-task1-dl2y.onrender.com/api/hello?visitor_name=your_name`,
    },
  });
});

app.get("/api/hello", async (req, res) => {
  const visitor_name = req.query.visitor_name;
  const ip = req.ip;
  console.log(ip);
  try {
    const ipDetails = await getIpDetails(ip, api_key);

    const city = ipDetails.location.name;
    const temperature = ipDetails.current.temp_c;

    res.json({
      client_ip: ip,
      location: city,
      greeting: `Hello, ${visitor_name} the temperature is ${temperature} degrees celcius in ${city}!`,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "An error occurred" });
  }
});

export default app;
