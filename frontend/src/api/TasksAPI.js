import axios from "axios";

const BASE_URL = `http://127.0.0.1:5000/tasks`;

class TasksAPI {
  constructor(url) {
    this.BASE_URL = url;
  }
  /**
   * Retrieves a list of tasks from the specified API endpoint.
   * @returns {Promise<Array>} The retrieved tasks as an array.
   * @throws {Error} If an error occurs during the GET request.
   */
  async getTasks() {
    try {
      const response = await axios.get(`${this.BASE_URL}`, {
        params: {
          page: 1,
          per_page: 100,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error occurred while fetching tasks", error);
    }
  }

  async updateTask(id, title, description, completed) {
    try {
      const response = await axios.put(`${this.BASE_URL}/${id}`, {
        title,
        description,
        completed,
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred while updating task:", error);
    }
  }

  async addNewTask(title, description, completed) {
    try {
      const response = await axios.post(`${this.BASE_URL}`, {
        title,
        description,
        completed,
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred while adding task:", error);
    }
  }

  async deleteTask (id) {
    try {
        const response = await axios.delete(`${this.BASE_URL}/${id}`);

        return response.data;
      } catch (error) {
        console.error("Error occurred while deleting task:", error);
      }
  }
}

export default new TasksAPI(BASE_URL);
