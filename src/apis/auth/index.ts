import { publicAxios } from "@/utils/axios";

export interface IBody {
  email: string;
  password: string;
}

export interface ISignUpApiBody {
  email: string;
  password: string;
  data: {
    full_name: string;
  };
  confirm_password?: string;
}

export function signInApi(body: IBody) {
  return publicAxios.post("/auth/v1/token?grant_type=password", body);
}

export function signUpApi(body: ISignUpApiBody) {
  return publicAxios.post("/auth/v1/signup", body);
}
