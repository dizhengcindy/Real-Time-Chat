import { axiosInstance } from "./axios";

// Uploads a File directly from the browser to Cloudinary using a
// signature obtained from our backend. Returns the secure URL.
//
// We deliberately use native fetch (not our axiosInstance) for the
// Cloudinary call so that:
//   - our auth cookie is NOT sent to a third-party origin
//   - axios baseURL/withCredentials don't apply
export const uploadImageToCloudinary = async (file) => {
  const { data } = await axiosInstance.get("/auth/cloudinary-signature");
  const { signature, timestamp, folder, apiKey, cloudName } = data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = await response.json();
  return result.secure_url;
};
