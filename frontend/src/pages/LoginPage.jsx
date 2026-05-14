import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { AuthLayout } from "../components/AuthLayout";
import { FormInput } from "../components/FormInput";
import { PasswordInput } from "../components/PasswordInput";
import { SubmitButton } from "../components/SubmitButton";
import { useAuthStore } from "../store/useAuthStore";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      imageTitle="Welcome back!"
      imageSubtitle="Sign in to continue your conversations and catch up with your messages."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <SubmitButton isLoading={isLoggingIn}>Sign in</SubmitButton>
      </form>

      <div className="text-center">
        <p className="text-base-content/60">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
