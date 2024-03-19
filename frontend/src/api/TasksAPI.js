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
      throw error
    }
  }

  /**
   * Updates a task by sending a PUT request to the specified API endpoint with the updated task details.
   * @param {number} id - The ID of the task to be updated.
   * @param {string} title - The updated title of the task.
   * @param {string} description - The updated description of the task.
   * @param {boolean} completed - The updated completion status of the task.
   * @returns {Promise<object>} - The updated task object returned by the API.
   */
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
      throw error
    }
  }

  /**
   * Adds a new task by sending a POST request to the specified API endpoint with the task details.
   * @param {string} title - The title of the new task.
   * @param {string} description - The description of the new task.
   * @param {boolean} completed - The completion status of the new task.
   * @returns {Promise<Object>} - The newly added task object returned by the API.
   */
  async addNewTask(title, description, completed) {
    try {
      const response = await axios.post(this.BASE_URL, {
        title,
        description,
        completed,
      });

      return response.data;
    } catch (error) {
      console.error("Error occurred while adding task:", error);
      throw error
    }
  }

  /**
   * Deletes a task by sending a DELETE request to the specified API endpoint with the task ID.
   * @param {number} id - The ID of the task to be deleted.
   * @returns {Promise<object>} - The deleted task object returned by the API.
   */
  async deleteTask(id) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error occurred while deleting task:", error);
    }
  }
}

export default new TasksAPI(BASE_URL);
