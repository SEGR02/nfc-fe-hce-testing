import axios from "axios";
import { url } from "./url";

export const apiGetTransactionsByCommerce = async (commerce) => {
  return axios
    .get(`${url}/api/v1/transactions/getTransactionsByCommerce/${commerce}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
