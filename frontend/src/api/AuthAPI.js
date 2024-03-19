import axios from "axios";

const BASE_URL = `http://127.0.0.1:5000`;

class AuthAPI {
  constructor(url) {
    this.BASE_URL = url;
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${this.BASE_URL}/login`, {
        username: username,
        password: password,
      });

      return response.data.access_token;
    } catch (error) {
      console.error("Error occurred while loging", error);
      throw error;
    }
  }

  async register(username, password) {
    try {
      const response = await axios.post(`${this.BASE_URL}/register`, {
        username: username,
        password: password,
      });

      return response;
    } catch (error) {
      console.error("Error occurred while registering new user", error);
      throw error;
    }
  }
}

export default new AuthAPI(BASE_URL);
