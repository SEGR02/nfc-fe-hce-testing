import axios from "axios";
import { url } from "./url";

export const apiGetUserById = async (userId) => {
  return axios
    .get(`${url}/api/v1/users/${userId}`)
    .then((response) => response?.data)
    .catch((error) => console.log(error));
};
