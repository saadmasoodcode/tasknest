import {
  getAccessTokenApi,
  signInApi,
  signUpApi,
  type IBody,
  type ISignUpApiBody,
} from "@/apis/auth";
import { setTokens } from "@/utils/axios";
import { isAxiosError } from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  signInUser: (body: IBody) => Promise<void>;
  signUpUser: (body: ISignUpApiBody) => Promise<void>;
  getAccessToken: (body: { refresh_token: string }) => Promise<void>;
  user: {
    id: string;
    email: string;
    user_metadata: {
      full_name: string;
    };
  };
  errorMsg: string;
  loading: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}

interface UserInterface {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvidor = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserInterface>({
    id: "",
    email: "",
    user_metadata: {
      full_name: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const signInUser = async (body: IBody) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await signInApi(body);
      setUser(response.data.user);
      setTokens(response.data.access_token, response.data.refresh_token);
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
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

  const getAccessToken = async (body: { refresh_token: string }) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await getAccessTokenApi(body);
      setTokens(response.data.access_token, response.data.refresh_token);
      setUser(response.data.user);
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInUser,
        signUpUser,
        user,
        errorMsg,
        loading,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("something went wrong");
  }
  return context;
}
