import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Typography } from "@mui/material";

import { getTechnologyDetails } from "../../store/root.actions";

/**
 * Custom hook for handling onGridReady event.
 * @returns {Object} Object containing the `onGridReady` function.
 */
function useGridReady() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onGridReady = (params) => {
    const newColumnDefs = [
      // For Title
      {
        headerName: "Test Name",
        field: "TestName",
        width: 300,
        headerClass: "ag-header-cell-custom",
        cellRenderer: (params) => {
          const { value } = params;

          const handleEdit = () => {
            // Static TestID
            navigate(`/categories/technology/${16217}`);
          };

          return (
            <div className="h-full grid content-center" onClick={handleEdit}>
              <Typography variant="body1">{value}</Typography>
            </div>
          );
        },
      },
      // ...
      {
        headerName: "Active",
        field: "IsActive",
        width: 100,
        headerClass: "ag-header-cell-custom",
        cellStyle: {
          ...getDefaultStyles(),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        cellRenderer: (params) => {
          return params.value ? (
            <div>
              <CheckOutlinedIcon sx={{ fontSize: 18, color: "green" }} />
            </div>
          ) : (
            <div>
              <ClearOutlinedIcon sx={{ fontSize: 18, color: "red" }} />
            </div>
          );
        },
      },
      ...getCell("Start Date", "StartDate"),
      ...getCell("End Date", "EndDate"),
      ...getCell("Start Time", "StartTime"),
      ...getCell("End Time", "EndTime"),
      ...getCell("Created By", "CreatedBy"),
      ...getCell("Created At", "CreatedAt"),
    ];

    params.api.setGridOption("rowHeight", 50);
    params.api.setGridOption("columnDefs", newColumnDefs);
    params.api.setHeaderHeight(60);
  };

  const getDefaultStyles = () => ({
    fontFamily: "Roboto",
    fontSize: "14px",
    color: "#636363",
    fontStyle: "normal",
    display: "grid",
    placeContent: "center start",
  });

  const getCell = (headerName, field) => [
    {
      headerName,
      field,
      width: 200,
      headerClass: "ag-header-cell-custom",
      cellStyle: getDefaultStyles(),
    },
  ];

  return { onGridReady };
}

export default useGridReady;
