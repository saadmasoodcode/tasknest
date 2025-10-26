import { privateAxios, publicAxios } from "@/utils/axios";

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

export function getAccessTokenApi(body: { refresh_token: string }) {
  return publicAxios.post("/auth/v1/token?grant_type=refresh_token", body);
}

export function signInApi(body: IBody) {
  return publicAxios.post("/auth/v1/token?grant_type=password", body);
}

export function signUpApi(body: ISignUpApiBody) {
  return publicAxios.post("/auth/v1/signup", body);
}

export function signOutApi() {
  return privateAxios.post("/auth/v1/logout");
}
