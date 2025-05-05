import { APIS_SUFFIXES, API_BASE } from "@/constants/api-constants";
import { apiService } from "./api.fetch.service";

const { eventBus } = require("@/utils/eventbus");
let expensesList = [];

const storeExpensesList = (data) => {
  expensesList = data;
};
class ExpensesService {
  getExpenses() {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.expenses}`;

    const successHandler = (response) => {
      eventBus.emit("app_expenses", {
        event_name: "EXPENSES_GET_LIST",
        data: response,
      });
      storeExpensesList(response);
    };

    const errorHandler = (error) => {
      console.log(error);
    };
    apiService.getRequest(url, successHandler, errorHandler);
  }

  getPartiesByFilter(queryString, pageNo) {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.parties}?${queryString}&pageNo=${pageNo}`;
    const headers = {};

    const successHandler = (response) => {
      messageBus.publish("app_parties", {
        event_name: "PARTIES_GET_LIST",
        data: response,
      });
    };

    const errorHandler = (error) => {
      //   error?.errorPromise?.then((e) => {
      //     messageBus.publish("app__toast", {
      //       event_name: "TOAST_DISPLAY",
      //       data: { appear: true, message: e?.message, type: "error" },
      //     });
      //   });
    };
    apiService.getRequest(url, headers, successHandler, errorHandler);
  }

  getParty(id) {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.parties}?id=${id}`;
    const headers = {};

    const successHandler = (response) => {
      messageBus.publish("app_parties", {
        event_name: "GET_PARTY_BY_ID",
        data: response,
      });
    };

    const errorHandler = (error) => {
      //   error?.errorPromise?.then((e) => {
      //     messageBus.publish("app__toast", {
      //       event_name: "TOAST_DISPLAY",
      //       data: { appear: true, message: e?.message, type: "error" },
      //     });
      //   });
    };
    apiService.getRequest(url, headers, successHandler, errorHandler);
  }

  updatePartyData(id, data) {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.parties}?id=${id}`;
    const headers = {};

    const successHandler = (response) => {
      messageBus.publish("app_parties", {
        event_name: "UPDATED_PARTY_BY_ID",
        data: response,
      });
      //   messageBus.publish("app__toast", {
      //     event_name: "TOAST_DISPLAY",
      //     data: { appear: true, message: response?.message },
      //   });
    };

    const errorHandler = (error) => {
      //   error?.errorPromise?.then((e) => {
      //     messageBus.publish("app__toast", {
      //       event_name: "TOAST_DISPLAY",
      //       data: { appear: true, message: e?.message, type: "error" },
      //     });
      //   });
    };
    apiService.putRequest(
      url,
      headers,
      JSON.stringify(data),
      successHandler,
      errorHandler
    );
  }

  addParty(data) {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.parties}`;
    const headers = {};

    const successHandler = (response) => {
      messageBus.publish("app_parties", {
        event_name: "ADDED_NEW_PARTY",
        data: response,
      });
      //   messageBus.publish("app__toast", {
      //     event_name: "TOAST_DISPLAY",
      //     data: { appear: true, message: response?.message },
      //   });
    };

    const errorHandler = (error) => {
      console.log("error", error);
      //   error?.errorPromise?.then((e) => {
      //     messageBus.publish("app__toast", {
      //       event_name: "TOAST_DISPLAY",
      //       data: { appear: true, message: e?.message, type: "error" },
      //     });
      //   });
    };
    let body = JSON.stringify(data);
    apiService.postRequest(url, body, successHandler, errorHandler);
  }

  deleteParty(id) {
    const url = `${API_BASE.apiUrl}${APIS_SUFFIXES.parties}?id=${id}`;
    const headers = {};

    const successHandler = (response) => {
      messageBus.publish("app_parties", {
        event_name: "DELETED_PARTY_BY_ID",
        data: response,
      });
      //   messageBus.publish("app__toast", {
      //     event_name: "TOAST_DISPLAY",
      //     data: { appear: true, message: response?.message },
      //   });
    };

    const errorHandler = (error) => {};
    apiService.deleteRequest(url, headers, null, successHandler, errorHandler);
  }
}

const expensesService = new ExpensesService();
export { expensesService };
