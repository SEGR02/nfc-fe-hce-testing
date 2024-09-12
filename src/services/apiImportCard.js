import axios from "axios";
import { url } from "./url";

export const apiImportCard = async (userId, wallet) => {
  return axios
    .post(`${url}/api/v1/cards/importCard/${userId}`, { wallet })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
