import axios from "axios";
import { url } from "./url";

export const apiGetCardById = async (id) => {
  return axios
    .get(`${url}/api/v1/cards/getCardById/${id}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
