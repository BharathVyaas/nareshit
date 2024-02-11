import { Navigate } from "react-router";
import { NavLink } from "react-router-dom";

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
export function TableBodyRenderer({ element, index, handler }) {
  const {
    TestName,
    IsActive,
    TestStartDate,
    TestEndDate,
    TestStartTime,
    TestEndTime,
  } = element;

  const styles =
    index % 2 === 0
      ? "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
      : "bg-white hover:cursor-pointer hover:bg-gray-300";
  const dateStart = new Date(TestStartDate);
  const dateEnd = new Date(TestEndDate);

  let fullStartDate = "";
  const startYear = TestStartDate && dateStart && dateStart.getUTCFullYear();
  if (startYear) fullStartDate += startYear + "-";
  const startMonth =
    TestStartDate &&
    dateStart &&
    (dateStart.getMonth() + 1).toString().padStart(2, "0");
  if (startMonth) fullStartDate += startMonth + "-";
  const startDate =
    TestStartDate &&
    dateStart &&
    dateStart.getDate().toString().padStart(2, "0");
  if (startDate) fullStartDate += startDate;

  let fullEndDate = "";
  const endYear = TestEndDate && dateEnd && dateEnd.getUTCFullYear();
  if (endYear) fullEndDate += endYear + "-";
  const endMonth =
    TestEndDate &&
    dateEnd &&
    (dateEnd.getMonth() + 1).toString().padStart(2, "0");
  if (endMonth) fullEndDate += endMonth + "-";
  const endDate =
    TestEndDate && dateEnd && dateEnd.getDate().toString().padStart(2, "0");
  if (endDate) fullEndDate += endDate;

  let fullStartTime = "";
  const startHour =
    TestStartDate &&
    dateStart &&
    dateStart.getHours().toString().padStart(2, "0");
  if (startHour) fullStartTime += startHour + ":";
  const startMinute =
    TestStartDate &&
    dateStart &&
    dateStart.getMinutes().toString().padStart(2, "0");
  if (startMinute) fullStartTime += startMinute;

  let fullEndTime = "";
  const endHour =
    TestEndDate && dateEnd && dateEnd.getHours().toString().padStart(2, "0");
  if (endHour) fullEndTime += endHour + ":";
  const endMinute =
    TestEndDate && dateEnd && dateEnd.getMinutes().toString().padStart(2, "0");
  if (endMinute) fullEndTime += endMinute;

  return (
    <tr onClick={() => handler(element)} key={element.id} className={styles}>
      <Tbody data={TestName} />
      <Tbody data={IsActive ? 1 : 0} />
      <Tbody data={fullStartDate} />
      <Tbody data={fullEndDate} />
      <Tbody data={fullStartTime} />
      <Tbody data={fullEndTime} />
    </tr>
  );
}

/*  <tr onClick={() => handler(element)} key={element.id} className={styles}>
      <Tbody data={TestName} />
      <Tbody data={IsActive ? 1 : 0} />
      <Tbody data={fullStartDate} />
      <Tbody data={fullEndDate} />
      <Tbody data={fullStartTime} />
      <Tbody data={fullEndTime} />
    </tr> */

/**
 * Component for rendering table body cells.
 * @param {Object} props - The component props.
 * @param {string} props.data - The data to be displayed in the cell.
 * @returns {JSX.Element} The Tbody component.
 */
export function Tbody({ data, ...props }) {
  return (
    <td
      className="pencil md:px-5 text-center max-w-26 h-10 overflow-clip whitespace-nowrap py-1 border-[1.2px]"
      {...props}
    >
      {data}
    </td>
  );
}
