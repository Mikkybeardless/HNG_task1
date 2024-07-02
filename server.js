import express from "express";
import dotenv from "dotenv";
import * as axiosCall from "./services/service.getApi.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const IpInfo_api_key = process.env.IpInfo_api_key;

app.get("/api/hello", async (req, res) => {
  const visitor_name = req.query.name;
  const ip = req.ip;

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

app.listen(port, () =>
  console.log(`Server is listening on port http://localhost:${port}`)
);
