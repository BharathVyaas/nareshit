import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
import { AuthCtxProvider } from "./context/auth.context";
import UserDataCtxProvider from "./context/userData.context";
import { Provider } from "react-redux";
import store from "./store/root.store";
<<<<<<< HEAD

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthCtxProvider>
    <Provider store={store}>
      <UserDataCtxProvider>
        <App />
      </UserDataCtxProvider>
    </Provider>
  </AuthCtxProvider>
);
=======

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
>>>>>>> origin/main
=======

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthCtxProvider>
    <Provider store={store}>
      <UserDataCtxProvider>
        <App />
      </UserDataCtxProvider>
    </Provider>
  </AuthCtxProvider>
);
>>>>>>> origin/master

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
<<<<<<< HEAD
reportWebVitals();
=======
reportWebVitals();
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> a30fca1893a425daee4853497f0f827b3ceead45
>>>>>>> origin/master
