import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import store from "./redux";
import AllNotesPage from "./routing/AllNotesPage";
import EditNotePage from "./routing/EditNotePage";
import ErrorPage from "./routing/ErrorPage";
import HomePage from "./routing/HomePage";
import Layout from "./routing/Layout";
import LoginPage from "./routing/LoginPage";
import NewNotePage from "./routing/NewNotePage";
import NotePage from "./routing/NotePage";
import SignUpPage from "./routing/SignUpPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        ),
      },
      {
        path: "/notes",
        element:
          <RequireAuth>
            <AllNotesPage />
          </RequireAuth>,
      },
      {
        path: "/notes/create",
        element: (
          <RequireAuth>
            <NewNotePage />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/:id/edit",
        element: (
          <RequireAuth>
            <EditNotePage />
          </RequireAuth>
        ),
      },
      {
        path: "/notes/:id/view",
        element: <NotePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {

  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
