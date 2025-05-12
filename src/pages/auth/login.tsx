import { FloatingLabelInput } from "@/components/molecules/floating-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useMutationLogin from "../auth/hooks/use-mutation-login";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeClosed, Lock, LogIn, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Animation3D from "@/assets/images/3D.png";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { login, isErrorLogin, isPendingLogin, isSuccessLogin } =
    useMutationLogin();

  const handleAuthentication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("login");
    login({ identifier, password });
  };

  const handleClickNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Section (Hero) - Hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 relative bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col mx-auto my-auto w-full p-8">
            <img
              className="min-w-40 w-full max-w-[430px] mx-auto"
              src={Animation3D}
              alt=""
            />
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-4xl font-extrabold text-white">
                Travel Platform
              </h1>
              <p className="text-white text-sm">
                ©Copyright By Data Cakra 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full z-50 h-dvh md:w-1/2 bg-white p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-10 flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-blue-500">
                Login Now!
              </h1>
              <p className="text-gray-600">Login now to start your journey!</p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={handleAuthentication}
            >
              {/* Email Input */}
              <div className="relative flex items-center">
                <Mail className="absolute left-4 top-2.5 w-4 h-4.5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="e.g. harizal.daffa46@gmail.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pl-11 py-5"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-4 top-2.5 w-4 h-4.5 text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 pr-10 py-5"
                  required
                />
                <div
                  className="absolute right-4 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeClosed className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>

              <div className="mb-[-10px] text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <span
                    onClick={handleClickNavigateToRegister}
                    className="text-gray-800 hover:text-gray-800 font-medium hover:underline hover:cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                disabled={isPendingLogin}
              >
                Log In
                <LogIn />
              </Button>
            </form>

            {/* Footer - Only visible on mobile */}
            <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col items-center md:hidden">
              <p className="text-sm text-blue-900 font-normal">
                ©Copyright By Data Cakra 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
