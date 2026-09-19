import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

interface AuthSessionValue {
  userEmail: string | null;
  isLoading: boolean;
  signIn: (email: string, remember: boolean) => Promise<void>;
}

const AuthSessionContext = React.createContext<AuthSessionValue | undefined>(
  undefined,
);
const AUTH_STORAGE_KEY = "smartecommerce.auth-session";

export const AuthSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem(AUTH_STORAGE_KEY)
      .then((value) => setUserEmail(value))
      .catch(() => setUserEmail(null))
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (email: string, remember: boolean) => {
    if (remember) {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, email.trim());
      setUserEmail(email.trim());
      return;
    }
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    setUserEmail(email.trim());
  };

  return (
    <AuthSessionContext.Provider value={{ userEmail, isLoading, signIn }}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => {
  const context = React.useContext(AuthSessionContext);
  if (!context)
    throw new Error("useAuthSession must be used inside AuthSessionProvider");
  return context;
};
