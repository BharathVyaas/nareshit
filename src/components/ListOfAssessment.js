import DataHandler from "../util/fetchHandler";
import { NavLink, useLoaderData } from "react-router-dom";
import { getAllAssessments, queryClient } from "../util/http";

function ListOfAssessment() {
  const titles = DataHandler.getTitles();

  const { assessments } = useLoaderData();

  return (
    <div className="p-[20px] h-[500px] max-w-[800px] mx-auto my-[20px]">
      <section>
        <h1 className="absolute left-[-9999px]">Assessments</h1>
        <NavLink
          className="px-[6px] py-[1px] bg-[buttonface] border-[1px] border-black"
          to="/categories/technology"
        >
          Create New
        </NavLink>
        <table className="mt-3 border-[2px] border-slate-300">
          <caption>Assessment Details</caption>
          <thead>
            <tr className="border-2 border-black">
              {titles.map(({ title, id }) => (
                <th className="px-5 border-x-2 border-black" key={id}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assessments.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.testName}
                  </td>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.isActive}
                  </td>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.startDate}
                  </td>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.endDate}
                  </td>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.startTime}
                  </td>
                  <td className="px-5 text-center py-1 border-[1.4px] border-gray-400">
                    {element.endTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ListOfAssessment;

export async function loader() {
  const result = await queryClient.fetchQuery({
    queryKey: ["assessment", "getAllAssessments"],
    queryFn: getAllAssessments,
  });
  return result;
}
