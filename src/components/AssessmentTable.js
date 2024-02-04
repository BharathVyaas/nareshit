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
    <table className="mt-3 border-[2px] border-slate-400">
      <caption className="sr-only">Assessment Details</caption>
      <thead>
        <TableHead titles={titles} />
      </thead>
      <tbody>
        {assessments.map((element) => (
          <TableBodyRenderer key={element.id} element={element} />
        ))}
      </tbody>
    </table>
  );
}

/**
 * Component for rendering the table head.
 * @param {Object} props - The component props.
 * @param {Array} props.titles - An array of assessment titles.
 * @returns {JSX.Element} The TableHead component.
 */
function TableHead({ titles }) {
  return (
    <tr className="border-[2px] border-black">
      {titles.map(({ title, id }) => (
        <th className="px-5 border-x-2 border-black" key={id}>
          {title}
        </th>
      ))}
    </tr>
  );
}

/**
 * Component for rendering the table body rows.
 * @param {Object} props - The component props.
 * @param {Object} props.element - An assessment data object.
 * @returns {JSX.Element} The TableBodyRenderer component.
 */
function TableBodyRenderer({ element, index }) {
  const { testName, isActive, startDate, endDate, startTime, endTime } =
    element;

  return (
    <tr
      key={element.id}
      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
    >
      <Tbody data={testName} />
      <Tbody data={isActive} />
      <Tbody data={startDate} />
      <Tbody data={endDate} />
      <Tbody data={startTime} />
      <Tbody data={endTime} />
    </tr>
  );
}

/**
 * Component for rendering table body cells.
 * @param {Object} props - The component props.
 * @param {string} props.data - The data to be displayed in the cell.
 * @returns {JSX.Element} The Tbody component.
 */
function Tbody({ data }) {
  return <td className="md:px-5 text-center py-1 border">{data}</td>;
}

export default AssessmentTable;
