import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  placeholder = "••••••••",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">{label}</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="size-5 text-base-content/40" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className="input input-bordered w-full pl-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="size-5 text-base-content/40" />
          ) : (
            <Eye className="size-5 text-base-content/40" />
          )}
        </button>
      </div>
    </div>
  );
};
