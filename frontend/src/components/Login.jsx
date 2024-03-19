import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import AuthAPI from "../api/AuthAPI";

const Login = ({ onLogin, setHaveAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await AuthAPI.login(username, password);
      localStorage.setItem("access_token", token);
      onLogin();
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-100 p-3">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
        <Button
          className="mt-3 mx-3"
          variant="primary"
          onClick={() => setHaveAccount(false)}
        >
          Don't have an account?
        </Button>
      </Form>
    </div>
  );
};

export default Login;
