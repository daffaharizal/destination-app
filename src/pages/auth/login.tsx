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
    <form
      className="flex flex-col gap-3 justify-center items-center"
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

      <Button type="submit">Submit</Button>
    </form>
  );
}
