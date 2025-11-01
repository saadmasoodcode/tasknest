import {
  getAccessTokenApi,
  signInApi,
  signOutApi,
  signUpApi,
  type IBody,
  type ISignUpApiBody,
} from "@/apis/auth";
import { setTokens } from "@/utils/axios";
import { isAxiosError } from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  signInUser: (body: IBody) => Promise<void>;
  signUpUser: (body: ISignUpApiBody) => Promise<void>;
  getAccessToken: (body: { refresh_token: string }) => Promise<void>;
  signOutUser: () => void;
  user: {
    id: string;
    email: string;
    user_metadata: {
      full_name: string;
    };
  } | null;
  errorMsg: string;
  authenticating: boolean;
  initializing: boolean;
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
  const [user, setUser] = useState<UserInterface | null>({
    id: "",
    email: "",
    user_metadata: {
      full_name: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authenticating, setAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    if (user?.id) {
      setInitializing(false);
    } else {
      setTimeout(() => {
        setInitializing(false);
      }, 1000);
    }
  }, [user?.id]);

  const signInUser = async (body: IBody) => {
    setAuthenticating(true);
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
      setAuthenticating(false);
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
    setAuthenticating(true);
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
      setAuthenticating(false);
    }
  };

  const signOutUser = async () => {
    setAuthenticating(true);
    setErrorMsg("");
    try {
      const response = await signOutApi();
      setUser(null);
      setTokens("", "");
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signInUser,
        signUpUser,
        user,
        errorMsg,
        authenticating,
        initializing,
        getAccessToken,
        signOutUser,
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
