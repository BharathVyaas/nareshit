import React from "react";

function Select({ defaultValue, options, setter }) {
  return (
    <select
      onChange={(e) => setter(e.target.value)}
      defaultValue={defaultValue}
    >
      {options.map((ele) => (
        <option value={ele.value} key={ele.id}>
          {ele.option}
        </option>
      ))}
    </select>
  );
}

export default Select;
