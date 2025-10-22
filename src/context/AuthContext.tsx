import {
  signInApi,
  signUpApi,
  type IBody,
  type ISignUpApiBody,
} from "@/apis/auth";
import { setTokens } from "@/utils/axios";
import { createContext, useContext, type ReactNode } from "react";

interface AuthContextType {
  signInUser: (body: IBody) => Promise<void>;
  signUpUser: (body: ISignUpApiBody) => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}
interface IInitialState {
  data: {
    user: {
      id: string;
      email: string;
    };
  };
  loading: boolean;
  error: string;
}

const initialState: IInitialState = {
  data: {
    user: {
      id: "",
      email: "",
    },
  },
  loading: false,
  error: "",
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvidor = ({ children }: AuthProviderProps) => {
  const signInUser = async (body: IBody) => {
    try {
      const response = await signInApi(body);
      setTokens(response.data.access_token, response.data.refresh_token);
      initialState.data.user = response.data.user;
    } catch (error) {
      console.log(error);
    }
  };
  const signUpUser = async (body: ISignUpApiBody) => {
    try {
      const response = await signUpApi(body);
      return console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signInUser, signUpUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw console.log("error");
  }
  return context;
}
