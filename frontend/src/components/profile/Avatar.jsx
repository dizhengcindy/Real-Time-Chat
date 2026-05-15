import { Camera } from "lucide-react";

const sizeClasses = {
  sm: "size-8",
  md: "size-12",
  lg: "size-20",
  xl: "size-32",
};

const cameraIconSizeClasses = {
  sm: "size-3",
  md: "size-4",
  lg: "size-4",
  xl: "size-5",
};

export const Avatar = ({
  src,
  fallback = "/avatar.png",
  size = "md",
  alt = "Avatar",
  editable = false,
  onUpload,
  loading = false,
}) => {
  return (
    <div className="relative inline-block">
      <img
        src={src || fallback}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-4`}
      />

      {editable && (
        <label
          className={`
            absolute bottom-0 right-0
            bg-base-content hover:scale-105
            p-2 rounded-full cursor-pointer
            transition-all duration-200
            ${loading ? "animate-pulse pointer-events-none" : ""}
          `}
        >
          <Camera className={`${cameraIconSizeClasses[size]} text-base-200`} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onUpload}
            disabled={loading}
          />
        </label>
      )}
    </div>
  );
};
