import { userInfo } from "../constants/app-constants";

const fetchRequest = async (requestOptions) => {
  try {
    const response = await fetch(requestOptions.url, {
      ...requestOptions,
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...requestOptions.headers,
      },
    });

    if (!response.ok) {
      // If response status is not OK, check for 419 error to trigger token refresh
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = response;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
class APIService {
  async getRequest(url, headers, body, successHandler, errorHandler) {
    const requestOptions = {
      method: "GET",
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...headers,
      },
      body: JSON.stringify(body),
    };
    try {
      const data = await fetchRequest({ url, ...requestOptions });
      successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }

  async postRequest(url, headers, body, successHandler, errorHandler) {
    const requestOptions = {
      method: "POST",
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      console.log(requestOptions?.body);
      const data = await fetchRequest({ url, ...requestOptions });
      successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }

  async deleteRequest(url, headers, body, successHandler, errorHandler) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const data = await fetchRequest({ url, requestOptions });
      successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }

  async putRequest(url, headers, body, successHandler, errorHandler) {
    const requestOptions = {
      method: "PUT",
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const data = await fetchRequest({ url, requestOptions });
      successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }

  async patchRequest(url, headers, body, successHandler, errorHandler) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        ...(userInfo?.data && {
          Authorization: `${userInfo?.data?.accessToken}`,
        }),
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const data = await fetchRequest({ url, requestOptions });
      successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
}

const apiService = new APIService();

export { apiService };
