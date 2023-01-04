import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [, setUser] = useState();
  const navigate = useNavigate();

  return () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();

    navigate("/login");
  };
};
