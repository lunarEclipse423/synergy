import React from "react";
import ReactDOM from "react-dom/client";
import UsersPage from "./pages/UsersPage/UsersPage";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import "./index.css";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UsersPage />
    </Provider>
  </React.StrictMode>
);
