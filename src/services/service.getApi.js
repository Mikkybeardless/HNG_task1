import axios from "axios";

const getIpDetails = async (ip, key) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${ip}`;
  const response = await axios.get(url);
  return response.data;
};

export default getIpDetails;
