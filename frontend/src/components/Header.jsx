import React from "react";
import NoteIcon from "./icons/NoteIcon";
import { Button } from "react-bootstrap";

const Header = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
  };

  return (
    <div className="fs-6 p-2 d-flex justify-content-between align-items-center">
      <div className="px-2 fs-6">
        <NoteIcon />
        <span>My Tasks App</span>
      </div>
      <div>
        <Button onClick={handleLogout} variant="light">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
