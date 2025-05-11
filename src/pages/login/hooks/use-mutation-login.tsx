import { useMutation } from "@tanstack/react-query";
import type { LoginResponse, PayloadLogin } from "../lib/model";
import type { HttpResponse } from "@/core/model/http-reponse";
import { useToast } from "@/hooks/use-toast";
import { apiAuth } from "@/hooks/api-auth";
import { useNavigate } from "react-router-dom";

export default function useMutationLogin() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload: PayloadLogin) => {
      const formData = new URLSearchParams();
      formData.append("identifier", payload.identifier);
      formData.append("password", payload.password);

      const response: HttpResponse<LoginResponse> = await apiAuth.post(
        "/auth/local",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("response login: ", response.data);
      return response.data;
    },
    onError: (error) => {
      const { message, name } = error.response.data.error;
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
      sessionStorage.setItem("token", data.jwt);
      sessionStorage.setItem("idUser", data.user.id.toString());
      sessionStorage.setItem("documentId", data.user.documentId);
      sessionStorage.setItem("username", data.user.username);
      sessionStorage.setItem("emailUser", data.user.email);

      navigate("/");
    },
  });

  return {
    login: mutateAsync,
    isPendingLogin: isPending,
    isErrorLogin: isError,
    isSuccessLogin: isSuccess,
  };
}
