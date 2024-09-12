import axios from "axios";
import { url } from "./url";

export const apiGetTransactionsByUserId = async (userId) => {
  return axios
    .get(`${url}/api/v1/transactions/${userId}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
