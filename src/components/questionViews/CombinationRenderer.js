import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

/* import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit"; */

function CombinationRenderer({ combination }) {
  const [columnDefs, setColumnDefs] = useState();
  /* [
    { field: "Module", headerName: "Module" },
    { field: "Topic", headerName: "Topic" },
    { field: "SubTopic", headerName: "SubTopic" },
    { field: "Easy", headerName: "Easy" },
    { field: "Medium", headerName: "Medium" },
    { field: "Hard", headerName: "Hard" },
  ]; */

  const [rowData, setRowData] = useState();
  /* [
    {
      Module: "My_module",
      Topic: "My_topic",
      SubTopic: "My_subTopic",
      Easy: 1,
      Medium: 2,
      Hard: 3,
    },
  ]; */

  const onGridReady = (params) => {
    let arr = [
      {
        Module: "My_module",
        Topic: "My_topic",
        SubTopic: "My_subTopic",
        Easy: "1",
        Medium: "2",
        Hard: "3",
      },
    ];

    setColumnDefs([
      {
        field: "Module",
        headerName: "Module",
        width: 300,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "Topic",
        headerName: "Topic",
        width: 300,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "SubTopic",
        headerName: "SubTopic",
        width: 500,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "easy",
        headerName: "easy",
        width: 500,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "medium",
        headerName: "medium",
        width: 500,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "hard",
        headerName: "hard",
        width: 500,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      /* {
        field: "Action",
        width: 100,
        headerName: "Action",
        //  fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
        cellRenderer: (parames) => {
          const { data } = parames;

          return (
            <div>
              <DeleteOutlineIcon
                style={{ color: "Red" }}
                onClick={() => handleDelete(data)}
              ></DeleteOutlineIcon>{" "}
              <EditIcon
                style={{ color: "blue" }}
                onClick={() => handleEdit(data)}
              ></EditIcon>
            </div>
          );
        },
      }, */
    ]);
    console.log("arr", arr);
    setRowData(arr);
  };

  return (
    <div>
      <p>
        Please select an <span className="bg-red-100">underlined value</span> to
        fetch questions:
      </p>
      <div className="w-full h-[50vh]">
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );
}

export default CombinationRenderer;
