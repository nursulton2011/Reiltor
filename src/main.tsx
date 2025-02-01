import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/base.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { App } from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { FavoritesPage } from "./pages/FavoritePages/FavoritePages";
import { HouseDetailsPage } from "./pages/HouseDetailsPage/HouseDetailsPage";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/house/:id", // Новый маршрут для страницы с подробной информацией о доме
    element: <HouseDetailsPage />,
  },
  {
    path: "/reg",
    element: <RegistrationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routerConfig} />
  </Provider>
);
