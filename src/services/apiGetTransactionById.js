import axios from "axios";
import { url } from "./url";

export const apiGetTransactionById = async (id) => {
  return axios
    .get(`${url}/api/v1/transactions/getTransactionById/${id}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
