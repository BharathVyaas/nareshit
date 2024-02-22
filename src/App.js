import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AdminHomePage from "./pages/AdminHomePage";
import Categories from "./pages/Categories";
import ListOfAssessment, {
  loader as AssessmentLoader,
} from "./pages/ListOfAssessment";
import { TechnologyV2, TechnologyActionV2 } from "./pages/Technology";
import { AssessmentActionV2, AssessmentsV2 } from "./pages/Assessments";
import QuestionView, {
  loader as QuestionLoader,
  QuestionViewV2,
} from "./pages/QuestionView";
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";

import { queryClient } from "./util/http";
import BuilderService from "./services/builder";
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

/**
 * Initializes the Builder service.
 *
 * Builder Service is Necessary to run this application,
 * initializing it in App ensure that all the user interaction is recorded.
 */
function initializeBuilderService() {
  BuilderService.init();
}

/**
 *
 * Main App component that sets up routing and provides QueryClient for React Query.
 */
function App() {
  initializeBuilderService();

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
    { path: "/", element: <AdminHomePage /> },
    {
      path: "questiondb",
      element: <Questiondb />,
      children: [{ path: "uploadtopic", element: <UploadTopic /> }],
    },
    {
      path: "categories",
      element: <Categories />,
      children: [
        {
          path: "assessmentlist",
          element: <ListOfAssessment />,
          loader: AssessmentLoader,
        },
        {
          path: "technology",
          element: <TechnologyV2 />,
          id: "tech",
          action: TechnologyActionV2,
        },
        {
          path: "assessments",
          element: <AssessmentsV2 />,
          action: AssessmentActionV2,
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
