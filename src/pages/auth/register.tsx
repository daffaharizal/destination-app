import { FloatingLabelInput } from "@/components/molecules/floating-label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmitRegister = () => {};

  return (
    <form
      className="flex flex-col gap-3 justify-center items-center"
      onSubmit={handleSubmitRegister}
    >
      <FloatingLabelInput
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        id="email"
        label="Email"
      />
      <FloatingLabelInput
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        id="username"
        label="Username"
      />
      <FloatingLabelInput
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        id="password"
        label="Password"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
