import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import AuthAPI from "../api/AuthAPI";

const Register = ({ onRegister, setHaveAccount }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.register(username, password);

      setError(null);
      setHaveAccount(true);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-100 p-3">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
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

        <Button variant="primary" type="submit">
          Register
        </Button>
        <Button variant="primary" onClick={() => setHaveAccount(true)}>
          Already have an account?
        </Button>
      </Form>
    </div>
  );
};

export default Register;
