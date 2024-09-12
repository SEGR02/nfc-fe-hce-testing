import axios from "axios";
import { url } from "./url";

export const apiUpdateCard = async (card) => {
  return axios
    .put(`${url}/api/v1/cards/${card?.id}`, card)
    .then((response) => response)
    .catch((error) => console.log(error));
};
