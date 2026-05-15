import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { uploadImageWithLocalPreview } from "../lib/uploadImageWithLocalPreview";
import { useChatStore } from "../store/useChatStore";

export const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const input = e.target;
    setIsUploadingImage(true);
    try {
      await uploadImageWithLocalPreview(file, {
        onPreview: setImagePreview,
        logContext: "message image",
      });
    } finally {
      setIsUploadingImage(false);
      input.value = "";
    }
  };

  const removeImage = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (isUploadingImage) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }
    if (!text.trim() && !imagePreview) {
      toast.error("Please enter a message or select an image");
      return;
    }

    await sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Selected attachment preview"
              className={`w-20 h-20 object-cover rounded-lg border border-zinc-700 ${
                isUploadingImage ? "opacity-60" : ""
              }`}
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
              aria-label="Remove image"
              disabled={isUploadingImage}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
            disabled={isUploadingImage}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={isUploadingImage || (!text.trim() && !imagePreview)}
          aria-label="Send message"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};
