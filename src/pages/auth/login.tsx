import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useMutationLogin from "../auth/hooks/use-mutation-login";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed, Lock, LogIn, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import Animation3D from "@/assets/images/3D.png";

const loginSchema = z.object({
  identifier: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    const { identifier, password } = data;
    login({ identifier, password });
  };

  const { login, isPendingLogin } =
    useMutationLogin();

  return (
    <div className="flex flex-col min-h-screen bg-blue-500">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Left Section (Hero) - Hidden on mobile */}
        <div className="hidden md:flex md:w-1/2 relative bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col mx-auto my-auto w-full p-8">
            <img
              className="min-w-40 w-full max-w-[430px] mx-auto animate-bounce-slow"
              src={Animation3D}
              alt=""
            />
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-4xl font-extrabold text-white">
                Travel Platform
              </h1>
              <p className="text-white text-center text-sm">
                ©Copyright By Data Cakra 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full z-50 h-dvh md:w-1/2 bg-white p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-blue-500">
                Login Now!
              </h1>
              <p className="text-gray-600">Login now to start your journey!</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700 mb-1 block">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="e.g. harizal.daffa46@gmail.com"
                            className="pl-11 py-5"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700 mb-1 block">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            className="pl-11 pr-10 py-5"
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span
                      onClick={() => navigate("/register")}
                      className="text-blue-600 hover:underline font-medium cursor-pointer"
                    >
                      Register
                    </span>
                  </p>
                </div>

                <Button type="submit" className="w-full py-5">
                  Log In
                  <LogIn className="ml-2" />
                </Button>
              </form>
            </Form>

            {/* Footer - Only visible on mobile */}
            <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col items-center md:hidden">
              <p className="text-sm text-center text-blue-900 font-normal">
                ©Copyright By Data Cakra 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
