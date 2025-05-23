import { useMutation } from "@tanstack/react-query";
import type { AuthResponse, PayloadLogin } from "../lib/model";
import type { ErrorTanstackQuery, HttpResponse } from "@/lib/http-reponse";
import { useToast } from "@/hooks/use-toast";
import { apiAuth } from "@/hooks/api-auth";
import { useNavigate } from "react-router-dom";
import { DOCUMENT_ID, EMAIL, ID_USER, TOKEN, USERNAME } from "@/lib";

export default function useMutationLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload: PayloadLogin) => {
      const formData = new URLSearchParams();
      formData.append("identifier", payload.identifier);
      formData.append("password", payload.password);

      const response: HttpResponse<AuthResponse> = await apiAuth.post(
        "/auth/local",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data;
    },
    onError: (error: ErrorTanstackQuery) => {
      const { message, name } = error?.response.data.error;
      toast({
        title: name,
        description: message,
      });
    },
    onSuccess(data) {
      toast({
        title: "Login Successful",
        description: "Congratulations! You have successfully signed in.",
        variant: "success",
      });

      // Simpan token ke sessionStorage di sini
      sessionStorage.setItem(TOKEN, data.jwt);
      sessionStorage.setItem(ID_USER, data.user.id.toString());
      sessionStorage.setItem(DOCUMENT_ID, data.user.documentId);
      sessionStorage.setItem(USERNAME, data.user.username);
      sessionStorage.setItem(EMAIL, data.user.email);

      navigate("/");
    },
  });

  return {
    login: mutateAsync,
    isPendingLogin: isPending,
  };
}
