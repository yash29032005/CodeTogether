/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/me`,
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.error || "Unexpected error");
      setUser(null);
      navigate("/");
    }
  });

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, user, setUser, checkAuth }}>
      {children}
    </UserContext.Provider>
  );
};
