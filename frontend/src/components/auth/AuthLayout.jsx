import { MessageSquare } from "lucide-react";

import AuthImagePattern from "./AuthImagePattern";

export const AuthLayout = ({
  title,
  subtitle,
  imageTitle,
  imageSubtitle,
  children,
}) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side: form area */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">{title}</h1>
              <p className="text-base-content/60">{subtitle}</p>
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* right side: pattern */}
      <AuthImagePattern title={imageTitle} subtitle={imageSubtitle} />
    </div>
  );
};
