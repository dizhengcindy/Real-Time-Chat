import { Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  AuthLayout,
  FormInput,
  PasswordInput,
  SubmitButton,
} from "../components/auth";
import { useAuthStore } from "../store/useAuthStore";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signUp(formData);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Get started with your free account"
      imageTitle="Join our community"
      imageSubtitle="Connect with friends, share moments, and stay in touch with your loved ones."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Full Name"
          icon={User}
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <FormInput
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <PasswordInput
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <SubmitButton isLoading={isSigningUp}>Create Account</SubmitButton>
      </form>

      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
