import toast from "react-hot-toast";

import { uploadImageToCloudinary } from "./cloudinary";

/**
 * Creates a blob URL for instant preview, uploads to Cloudinary, optionally runs
 * follow-up work, then updates or clears preview. Always revokes the blob URL in `finally`.
 *
 * @param {File | null | undefined} file
 * @param {{
 *   onPreview: (src: string | null) => void;
 *   afterUpload?: (secureUrl: string) => void | Promise<void>;
 *   clearPreviewAfterSuccess?: boolean;
 *   logContext?: string;
 * }} options
 * @returns {Promise<string | null>} secure URL, or `null` if skipped / failed
 */
export async function uploadImageWithLocalPreview(file, options) {
  const {
    onPreview,
    afterUpload,
    clearPreviewAfterSuccess = false,
    logContext = "image",
  } = options;

  if (!file) return null;

  const objectUrl = URL.createObjectURL(file);
  onPreview(objectUrl);

  try {
    const secureUrl = await uploadImageToCloudinary(file);
    await afterUpload?.(secureUrl);
    onPreview(clearPreviewAfterSuccess ? null : secureUrl);
    return secureUrl;
  } catch (error) {
    console.log(`Error uploading ${logContext}`, error.message);
    toast.error("Failed to upload image");
    onPreview(null);
    return null;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
