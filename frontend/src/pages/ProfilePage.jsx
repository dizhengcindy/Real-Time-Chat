import { useState } from "react";
import { Mail, User } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";
import { InfoField } from "../components/InfoField";
import { Avatar } from "../components/Avatar";
import { Card } from "../components/Card";
import { uploadImageToCloudinary } from "../lib/cloudinary";

export const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show an instant local preview while the upload happens in the background.
    const previewUrl = URL.createObjectURL(file);
    setSelectedImg(previewUrl);

    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      await updateProfile({ profilePic: uploadedUrl });
    } catch (error) {
      console.log("Error uploading profile picture", error.message);
      toast.error("Failed to upload image");
      setSelectedImg(null);
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Card className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Avatar
              src={selectedImg || authUser.profilePic}
              size="xl"
              editable
              onUpload={handleImageUpload}
              loading={isUpdatingProfile}
            />
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <InfoField label="Full Name" icon={User} value={authUser?.fullName} />
            <InfoField label="Email Address" icon={Mail} value={authUser?.email} />
          </div>

          <Card className="mt-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
};
