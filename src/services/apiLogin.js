import axios from "axios";
import { url } from "./url";

export const apiLogin = async (data) => {
  let user = {
    email: data.email,
    password: data.password,
  };

  return axios
    .post(`${url}/api/v1/auth/login`, user)
    .then((response) => response)
    .catch((error) => {
      if (error.message.includes("Network Error")) {
        throw new Error("network_error");
      } else {
        throw error;
      }
    });
};
