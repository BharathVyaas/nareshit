/**
 * Component for rendering the table head.
 * @param {Object} props - The component props.
 * @param {Array} props.titles - An array of assessment titles.
 * @returns {JSX.Element} The TableHead component.
 */
export function TableHead({ titles }) {
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
export function TableBodyRenderer({ element, index }) {
  const { testName, isActive, startDate, endDate, startTime, endTime } =
    element;

  const styles =
    index % 2 === 0
      ? "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
      : "bg-white hover:cursor-pointer hover:bg-gray-300";

  console.log(styles, index);

  return (
    <tr
      onClick={() => console.log(element)}
      key={element.id}
      className={styles}
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
export function Tbody({ data, ...props }) {
  return (
    <td className="md:px-5 text-center py-1 border-[1.2px]" {...props}>
      {data}
    </td>
  );
}
