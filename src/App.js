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
import QuestionView from "./pages/QuestionView";
import SheduleTime, { action as SheduleTimeAction } from "./pages/SheduleTime";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";

function App() {
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
        },
        {
          path: "sheduletime",
          element: <SheduleTime />,
          action: SheduleTimeAction,
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
