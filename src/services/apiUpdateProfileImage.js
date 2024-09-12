import axios from "axios";
import { url } from "./url";

export const apiUpdateProfileImage = async (userId, image) => {
  const formData = new FormData();
  formData.append("profileImage", {
    uri: image.uri,
    type: image.mimeType || "image/jpeg",
    name: image.fileName || `profile_${userId}.jpg`,
  });

  return await axios.patch(
    `${url}/api/v1/users/profileImage/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
