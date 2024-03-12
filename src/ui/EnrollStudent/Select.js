import { MenuItem, Select } from "@mui/material";
import React from "react";

function SelectMenu({ defaultValue, options, setter, label }) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={defaultValue}
      label={label}
      onChange={(e) => setter(e.target.value)}
      sx={{ textAlign: "start" }}
    >
      <MenuItem key={-1} value={0}>
        {`Select a ${label}`}
      </MenuItem>
      {options.map((ele) => {
        return (
          <MenuItem key={ele.key} value={ele.value}>
            {ele.option}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default SelectMenu;