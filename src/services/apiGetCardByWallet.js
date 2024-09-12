import axios from "axios";
import { url } from "./url";

export const apiGetCardByWallet = async (wallet) => {
  return axios
    .get(`${url}/api/v1/cards/cardIdByWallet?wallet=${wallet}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
