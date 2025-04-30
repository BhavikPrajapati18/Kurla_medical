import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  // const [loder, setLoder] = useState(true);
  const { isAuthentication } = useSelector((state) => state.user);

  useEffect(() => {
    if (authentication && !isAuthentication) {
      navigate("/login");
    }
    if (!authentication && isAuthentication) {
      navigate("/");
    }
    // setLoder(false);
  }, [isAuthentication, navigate, authentication]);

  return <>{children}</>;
}

export default Protected;
