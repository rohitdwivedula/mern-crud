// utils/API.js

import axios from "axios";

// console.log(process.env.BASE_URL);
export default axios.create({
  responseType: "json"
});