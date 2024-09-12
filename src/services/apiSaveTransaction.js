import axios from "axios";
import { url } from "./url";

export const apiSaveTransaction = async (userId, body) => {
  return axios
    .post(`${url}/api/v1/transactions/${userId}`, body)
    .then((response) => response)
    .catch((error) => console.log(error));
};
