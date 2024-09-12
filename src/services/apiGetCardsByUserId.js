import axios from "axios";
import { url } from "./url";

export const apiGetCardsByUserId = async (userId) => {
  return axios
    .get(`${url}/api/v1/cards/${userId}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
