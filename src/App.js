import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AdminHomePage from "./pages/AdminHomePage";
import Categories from "./pages/Categories";
import ListOfAssessment, {
  loader as AssessmentLoader,
} from "./pages/ListOfAssessment";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
import { TechnologyV2, TechnologyActionV2 } from "./pages/Technology";
import {
  AssessmentActionV2,
  AssessmentLoaderV2,
  AssessmentsV2,
} from "./pages/Assessments";
import { QuestionViewV2 } from "./pages/QuestionView";
<<<<<<< HEAD
=======
import Technology, {
  loader as TechnologyLoader,
  action as TechnologyAction,
} from "./pages/Technology";
import Assessments, { action as AssessmentAction } from "./pages/Assessments";
import QuestionView, { loader as QuestionLoader } from "./pages/QuestionView";
>>>>>>> origin/main
=======
>>>>>>> origin/master
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";

import { queryClient } from "./util/http";
<<<<<<< HEAD
<<<<<<< HEAD
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";
import { QuestionViewProvider } from "./context/questionView";
import QuestionViewFixed from "./pages/QuestionViewFixed";
import QuestionViewFixedEasy from "./pages/QuestionViewFixedEasy";
import { TableTotalCtxProvider } from "./context/tableTotalCtx";
import Login from "./pages/Login";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EnrollStudent from "./pages/enrollStudent/EnrollStudent";
import UserManagement from "./pages/userManagement/UserManagement";
=======
import BuilderService from "./services/builder";
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";

/**
 * Initializes the Builder service.
 *
 * Builder Service is Necessary to run this application,
 * initializing it in App ensure that all the user interaction is recorded.
 */
function initializeBuilderService() {
  BuilderService.init();
}
>>>>>>> origin/main
=======
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";
import { QuestionViewProvider } from "./context/questionView";
import QuestionViewFixed from "./pages/QuestionViewFixed";
import QuestionViewFixedEasy from "./pages/QuestionViewFixedEasy";
import { TableTotalCtxProvider } from "./context/tableTotalCtx";
import Login from "./pages/Login";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EnrollStudent from "./pages/enrollStudent/EnrollStudent";
import UserManagement from "./pages/userManagement/UserManagement";
>>>>>>> origin/master

/**
 *
 * Main App component that sets up routing and provides QueryClient for React Query.
 */
function App() {
<<<<<<< HEAD
<<<<<<< HEAD
  // Define the routing configuration
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
=======
  initializeBuilderService();

  // Define the routing configuration
  const appRoutes = [
>>>>>>> origin/main
=======
  // Define the routing configuration
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
>>>>>>> origin/master
    { path: "/", element: <AdminHomePage /> },
    {
      path: "questiondb",
      element: <Questiondb />,
      children: [{ path: "uploadtopic", element: <UploadTopic /> }],
    },
    {
      path: "categories",
      element: <Categories />,
<<<<<<< HEAD
<<<<<<< HEAD
      ErrorEvent: <h1>Reload Page</h1>,
=======
>>>>>>> origin/main
=======
      ErrorEvent: <h1>Reload Page</h1>,
>>>>>>> origin/master
      children: [
        {
          path: "assessmentlist",
          element: <ListOfAssessment />,
          loader: AssessmentLoader,
        },
        {
          path: "technology",
<<<<<<< HEAD
<<<<<<< HEAD
          element: <TechnologyV2 />,
          id: "tech",
          action: TechnologyActionV2,
        },
        {
          path: "assessments",
          element: <AssessmentsV2 />,
          action: AssessmentActionV2,
          loader: AssessmentLoaderV2,
        },
        {
          path: "questionview",
          element: (
            <QuestionViewProvider>
              <TableTotalCtxProvider>
                <QuestionViewV2 />
              </TableTotalCtxProvider>
            </QuestionViewProvider>
          ),
        },
        {
          path: "questionviewfixed",
          element: <QuestionViewFixed />,
          children: [{ index: true, element: <QuestionViewFixedEasy /> }],
=======
          element: <Technology />,
=======
          element: <TechnologyV2 />,
>>>>>>> origin/master
          id: "tech",
          action: TechnologyActionV2,
        },
        {
          path: "assessments",
          element: <AssessmentsV2 />,
          action: AssessmentActionV2,
          loader: AssessmentLoaderV2,
        },
        {
          path: "questionview",
<<<<<<< HEAD
          element: <QuestionView />,
          loader: QuestionLoader,
>>>>>>> origin/main
=======
          element: (
            <QuestionViewProvider>
              <TableTotalCtxProvider>
                <QuestionViewV2 />
              </TableTotalCtxProvider>
            </QuestionViewProvider>
          ),
        },
        {
          path: "questionviewfixed",
          element: <QuestionViewFixed />,
          children: [{ index: true, element: <QuestionViewFixedEasy /> }],
>>>>>>> origin/master
        },
        {
          path: "scheduletime",
          element: <ScheduleTime />,
          action: ScheduleTimeAction,
        },
      ],
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
    {
      path: "user-management",
      element: <UserManagement />,
    },
    {
      path: "enroll-student",
      element: <EnrollStudent />,
    },
<<<<<<< HEAD
=======
>>>>>>> origin/main
=======
>>>>>>> origin/master
  ];

  const router = createBrowserRouter(appRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
