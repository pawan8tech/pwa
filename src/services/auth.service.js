import { APIS_SUFFIXES, API_BASE } from "../constants/api-constants";
import { userInfo } from "../constants/app-constants";

const { eventBus } = require("../utils/eventbus");
const { apiService } = require("./api.fetch.service");

const localStorageAuthDataKey = "a3x3";

class AuthService {
  loginUser(formData) {
    const url = "http://localhost:5001/api/users/login";

    const successHandler = (response) => {
      try {
        localStorage.setItem("a3x3", response.accessToken);
      } catch (err) {
        console.error("Failed to save to localStorage:", err);
      }
      userInfo.data = response.accessToken;
      eventBus.emit("APP_Auth", {
        event_name: "Login_Succecssfully",
        data: response,
      });
    };
    const headers = {};
    const body = {
      email: formData?.email,
      password: btoa(formData?.password),
    };

    const errorHandler = (error) => {
      if (error?.status === 418) {
        eventBus.emit("APP_Auth", {
          event_name: "AUTH_USER_LOGGED_IN_FAILED",
          data: "Login Failed.",
        });
      } else if (error?.status === 400) {
        eventBus.emit("APP_Auth", {
          event_name: "AUTH_USER_LOGGED_IN_FAILED",
          data: "Please enter valid credentials.",
        });
      }
    };

    apiService.postRequest(url, headers, body, successHandler, errorHandler);
  }

  registerUser(formData) {
    // const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.register}`;
    const url = "http://localhost:5001/api/users/register";

    const successHandler = (response) => {
      console.log(response);
      eventBus.emit("APP_Auth", {
        event_name: "USER_REGISTER_SUCCESSFULLY",
        data: response,
      });
    };
    const headers = {};
    const body = {
      userName: formData?.userName,
      email: formData?.email,
      password: btoa(formData?.password),
    };

    const errorHandler = (error) => {
      if (error?.status === 418) {
        eventBus.emit("APP_Auth", {
          event_name: "AUTH_USER_LOGGED_IN_FAILED",
          data: "Login Failed.",
        });
      } else if (error?.status === 400) {
        eventBus.emit("APP_Auth", {
          event_name: "AUTH_USER_LOGGED_IN_FAILED",
          data: "Please enter valid credentials.",
        });
      }
    };

    apiService.postRequest(url, headers, body, successHandler, errorHandler);
  }

  getAuthData() {
    if (userInfo?.data?.length > 0) {
      return userInfo;
    }

    if (typeof localStorage !== "undefined") {
      if (localStorage && localStorage.getItem(localStorageAuthDataKey)) {
        const data = localStorage?.getItem(localStorageAuthDataKey);
        return data;
      }
    }
    return false;
  }

  clearAuthData() {}

  logoutuser() {}
}

const authService = new AuthService();
export { authService };
