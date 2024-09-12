import axios from "axios";
import { url } from "./url";

export const apiGetBalanceByWallet = async (wallet) => {
  return axios
    .get(`${url}/api/v1/transactions/balance/${wallet}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
