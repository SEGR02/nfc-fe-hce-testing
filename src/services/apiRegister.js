import axios from "axios";
import { url } from "./url";

export const apiRegister = async (data) => {
  let user = {
    email: data.email,
    password: data.password,
  };

  return axios
    .post(`${url}/api/v1/auth/register`, user)
    .then((response) => response)
    .catch((error) => console.log(error));
};
