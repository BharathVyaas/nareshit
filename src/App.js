import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AdminHomePage from "./pages/AdminHomePage";
import Categories from "./pages/Categories";
import ListOfAssessment, {
  loader as AssessmentLoader,
} from "./pages/ListOfAssessment";
import Technology, {
  loader as TechnologyLoader,
  action as TechnologyAction,
} from "./pages/Technology";
import Assessments, { action as AssessmentAction } from "./pages/Assessments";
import QuestionView, { loader as QuestionLoader } from "./pages/QuestionView";
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";

import { queryClient } from "./util/http";
import BuilderService from "./services/builder";
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";
import { QuestionViewProvider } from "./context/questionView";

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
          element: <Technology />,
          id: "tech",
          loader: TechnologyLoader,
          action: TechnologyAction,
        },
        {
          path: "assessments",
          element: <Assessments />,
          action: AssessmentAction,
        },
        {
          path: "questionview",
          element: (
            <QuestionViewProvider>
              <QuestionView />
            </QuestionViewProvider>
          ),
        },
        {
          path: "scheduletime",
          element: <ScheduleTime />,
          action: ScheduleTimeAction,
        },
      ],
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
