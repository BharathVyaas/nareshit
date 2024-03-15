import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AdminHomePage from "./pages/AdminHomePage";
import Categories from "./pages/Categories";
import ListOfAssessment from "./pages/ListOfAssessment";
import Technology from "./pages/Technology";
import Assessments from "./pages/Assessments";
import QuestionView from "./pages/QuestionView";
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";

import { queryClient } from "./util/http";
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";
import Login from "./pages/Login";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EnrollStudent from "./pages/enrollStudent/EnrollStudent";
import UserManagement from "./pages/userManagement/UserManagement";

/**
 *
 * Main App component that sets up routing and provides QueryClient for React Query.
 */
function App() {
  const appRoutes = [
    {
      path: "/login",
      element: <Login />,
      children: [
        { index: true, element: <UserLogin /> },
        { path: "admin", element: <AdminLogin /> },
      ],
    },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/", element: <AdminHomePage /> },
    {
      path: "questiondb",
      element: <Questiondb />,
      children: [{ path: "uploadtopic", element: <UploadTopic /> }],
    },
    {
      path: "categories",
      element: <Categories />,
      ErrorEvent: <h1>Reload Page</h1>,
      children: [
        {
          path: "assessmentlist",
          element: <ListOfAssessment />,
        },
        {
          path: "technology/:testId",
          element: <Technology />,
        },
        {
          path: "assessments/:testId",
          element: <Assessments />,
        },
        {
          path: "questionview",
          element: <QuestionView />,
        },
        {
          path: "scheduletime",
          element: <ScheduleTime />,
          action: ScheduleTimeAction,
        },
      ],
    },
    {
      path: "user-management",
      element: <UserManagement />,
    },
    {
      path: "enroll-student",
      element: <EnrollStudent />,
    },
  ];

  const router = createBrowserRouter(appRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
