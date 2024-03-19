import Login from "./Login";
import Register from "./Register";
import React, { useState } from "react";

const Auth = ({ onLogin }) => {
  const [haveAccount, setHaveAccount] = useState(false);
  return haveAccount ? (
    <Login onLogin={onLogin} setHaveAccount={setHaveAccount} />
  ) : (
    <Register setHaveAccount={setHaveAccount} />
  );
};

export default Auth;
