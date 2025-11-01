import {
  getAccessTokenApi,
  guestSignInApi,
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
  signInGuest: () => Promise<void>;
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
  authenticating: IAuthenticating;
  initializing: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthenticating {
  sign_in: boolean;
  guest_sign_in: boolean;
  general: boolean;
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
  const [authenticating, setAuthenticating] = useState<IAuthenticating>({
    sign_in: false,
    guest_sign_in: false,
    general: false,
  });

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
    setAuthenticating((prev) => ({ ...prev, sign_in: true }));
    setErrorMsg("");
    try {
      const response = await signInApi(body);
      setUser(response.data.user);
      setTokens(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setAuthenticating((prev) => ({ ...prev, sign_in: false }));
    }
  };

  const signUpUser = async (body: ISignUpApiBody) => {
    try {
      await signUpApi(body);
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async (body: { refresh_token: string }) => {
    setAuthenticating((prev) => ({ ...prev, general: true }));

    setErrorMsg("");
    try {
      const response = await getAccessTokenApi(body);
      setTokens(response.data.access_token, response.data.refresh_token);
      setUser(response.data.user);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setAuthenticating((prev) => ({ ...prev, general: false }));
    }
  };

  const signOutUser = async () => {
    setAuthenticating((prev) => ({ ...prev, general: true }));

    setErrorMsg("");
    try {
      await signOutApi();
      setUser(null);
      setTokens("", "");
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setAuthenticating((prev) => ({ ...prev, general: false }));
    }
  };

  const signInGuest = async () => {
    setAuthenticating((prev) => ({ ...prev, guest_sign_in: true }));
    setErrorMsg("");
    try {
      const response = await guestSignInApi();
      setUser(response.data.user);
      setTokens(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setAuthenticating((prev) => ({ ...prev, guest_sign_in: false }));
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
        signInGuest,
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
