import axios from "axios";
// Function to get location data from IP address using IPinfo
export const getLocation = async (ip, IpInfo_api_key) => {
  const url = `https://ipinfo.io/${ip}?token=${IpInfo_api_key}`;
  const response = await axios.get(url);
  return response.data;
};
