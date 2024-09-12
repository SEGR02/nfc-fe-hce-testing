import axios from "axios";
import { url } from "./url";

export const apiGetPublicAddresses = async (privateKeys) => {
  const queryParams = new URLSearchParams();

  if (privateKeys.privateKey1) {
    queryParams.append("privateKey1", privateKeys.privateKey1);
  }
  if (privateKeys.privateKey2) {
    queryParams.append("privateKey2", privateKeys.privateKey2);
  }
  if (privateKeys.privateKey3) {
    queryParams.append("privateKey3", privateKeys.privateKey3);
  }

  const urlWithParams = `${url}/api/v1/cards/getPublicAddress/?${queryParams.toString()}`;

  try {
    const response = await axios.get(urlWithParams);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
