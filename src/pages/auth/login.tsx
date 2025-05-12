import { FloatingLabelInput } from "@/components/molecules/floating-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useMutationLogin from "../auth/hooks/use-mutation-login";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isErrorLogin, isPendingLogin, isSuccessLogin } =
    useMutationLogin();

  const handleAuthentication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ identifier, password });
  };

  return (
    <div className="flex flex-col min-h-screen bg-emerald-800">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Section (Hero) - Hidden on mobile */}
        <div
          className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: "url('/api/placeholder/800/600')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col justify-between w-full p-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Travel Article App{" "}
              </h2>
            </div>
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Create Your Account Now!
              </h1>
              <p className="text-white text-lg">
                By creating an account, you'll enjoy personalized travel
                recommendations, faster bookings, and exclusive offers.
              </p>
            </div>
            <div className="flex justify-between text-white text-sm">
              <p>Copyright By Data Cakra 2025. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full h-dvh md:w-1/2 bg-white p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Login Now!</h2>
              <p className="text-gray-600">Login now to start your journey!</p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleAuthentication}
            >
              <FloatingLabelInput
                onChange={(e) => setIdentifier(e.target.value)}
                type="email"
                id="identifier"
                label="Identifier"
              />

              <FloatingLabelInput
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                label="Password"
              />

              <div className="flex items-center mx-auto mb-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to{" "}
                  <a href="#" className="text-gray-800 font-medium">
                    Terms of Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-800 font-medium">
                    Privacy of Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                disabled={isPendingLogin}
              >
                Sign In
                <svg
                  className="ml-2 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-gray-800 font-medium hover:underline"
                >
                  Register
                </a>
              </p>
            </div>

            {/* Footer - Only visible on mobile */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col items-center md:hidden">
              <div className="flex gap-4 mb-2">
                <a href="#" className="text-xs text-gray-600 hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="text-xs text-gray-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
              <p className="text-xs text-gray-500">
                @ Copyright - By Data Cakra 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
