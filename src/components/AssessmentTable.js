import { TableBodyRenderer, TableHead } from "../ui/table/TableUI";

/**
 * Component for displaying a table of assessments.
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.titles - An array of assessment titles.
 * @param {Array} props.assessments - An array of assessment data.
 * @returns {JSX.Element} The AssessmentTable component.
 */
function AssessmentTable({ titles, assessments }) {
  return (
    <table className="mt-3 border-[2px] mx-auto border-slate-400">
      <caption className="sr-only">Assessment Details</caption>
      <thead>
        <TableHead titles={titles} />
      </thead>
      <tbody>
        {assessments.map((element) => {
          console.log(element);
          return (
            <TableBodyRenderer
              key={element.TestID}
              index={element.TestID}
              element={element}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default AssessmentTable;
