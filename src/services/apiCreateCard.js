import axios from "axios";
import { url } from "./url";

export const apiCreateCard = async (userId) => {
  return axios
    .post(`${url}/api/v1/cards/${userId}`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
