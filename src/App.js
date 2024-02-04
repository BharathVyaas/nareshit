import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import QuestionView, { loader as questionLoader } from "./pages/QuestionView";
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import BuilderService from "./services/builder";

function App() {
  BuilderService.init();

  const router = createBrowserRouter([
    { path: "/", element: <AdminHomePage /> },
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
          element: <QuestionView />,
          loader: questionLoader,
        },
        {
          path: "scheduletime",
          element: <ScheduleTime />,
          action: ScheduleTimeAction,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
