// file: register.tsx
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeClosed, Lock, LogIn, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Animation3D from "@/assets/images/3D.png";
import useMutationRegister from "./hooks/use-mutation-register";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { register, isPendingRegister } =
    useMutationRegister();

  const onSubmit = (data: RegisterFormValues) => {
    const { username, email, password } = data;
    register({ username, email, password });
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
              className="min-w-40 w-full max-w-[430px] mx-auto animate-bounce-slow"
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

        {/* Right Section */}
        <div className="w-full h-dvh md:w-1/2 bg-white p-6 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6 flex flex-col gap-2">
              <h1 className="text-4xl font-extrabold text-blue-500">
                Register Now!
              </h1>
              <p className="text-gray-600">Start your travel journey today.</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-gray-700 mb-1 block">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="e.g. johndoe"
                            className="pl-11 py-5"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
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
                            placeholder="e.g. you@gmail.com"
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

                {/* Link to login */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="text-blue-600 hover:underline font-medium cursor-pointer"
                    >
                      Login
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-5 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Create Account
                  <LogIn className="ml-2" />
                </Button>
              </form>
            </Form>

            {/* <form className="flex flex-col gap-5" onSubmit={handleRegister}>
              <div className="relative flex items-center">
                <User className="absolute left-4 top-2.5 w-4 h-4.5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-11 py-5"
                  required
                />
              </div>

              <div className="relative flex items-center">
                <Mail className="absolute left-4 top-2.5 w-4 h-4.5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 py-5"
                  required
                />
              </div>

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

              <div className="mb-[-8px] text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-gray-800 hover:text-gray-800 font-medium hover:underline hover:cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>

              <Button
                type="submit"
                className="w-full py-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                Create Account
                <LogIn />
              </Button>
            </form> */}

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
