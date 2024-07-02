import express from "express";
import dotenv from "dotenv";
import * as axiosCall from "./services/service.getApi.js";

const app = express();
dotenv.config();

const IpInfo_api_key = process.env.IpInfo_api_key;

app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.json({ message: "Hello, welcome to the home route" });
});

app.get("/api/hello", async (req, res) => {
  const visitor_name = req.query.visitor_name;
  const ip = req.ip;

  console.log("ip", ip);

  //get location
  const locationData = await axiosCall.getLocation(ip, IpInfo_api_key);
  console.log("location", locationData);
  const { city } = locationData;

  try {
    res.json({
      client_ip: ip,
      location: city,
      greeting: `Hello, ${visitor_name} the temperature is 11 degrees celcius in ${city}!`,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "An error occurred" });
  }
});

export default app;
