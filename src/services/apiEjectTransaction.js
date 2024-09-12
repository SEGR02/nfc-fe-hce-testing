import axios from "axios";
import { url } from "./url";

export const apiEjectTransaction = async (body) => {
  return axios
    .post(`${url}/api/v1/transactions/transferTokens/`, body)
    .then((response) => response)
    .catch((error) => console.log(error));
};
