import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBatchList } from "../../store/root.actions";
import BatchTableRenderer from "./ListOfBatches/BatchTableRenderer";

// styles
const cellStyle = {
  fontFamily: "Roboto",
  fontSize: "14px",
  color: "#636363",
  fontStyle: "normal",
};
const tableHeight = "500px";
const tableWidth = "1250px";

function ListOfBatchesComponent({
  data,
  isLoading,
  isError,
  dispatchBatchList,
}) {
  useEffect(() => {
    dispatchBatchList();
  }, [dispatchBatchList]);

  return (
    <div className="flex justify-center bg-gray-50">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <i>Something went wrong. Please try refreshing.</i>
      ) : (
        <BatchTableRenderer
          batchList={data}
          cellStyle={cellStyle}
          height={tableHeight}
          width={tableWidth}
        />
      )}
    </div>
  );
}

const mapBatchListState = (state) => ({
  data: state.batchListReducer.data,
  isLoading: state.batchListReducer.isLoading,
  isError: state.batchListReducer.isError,
});

const mapDispatch = {
  dispatchBatchList: fetchBatchList,
};

const ListOfBatches = connect(
  mapBatchListState,
  mapDispatch
)(ListOfBatchesComponent);

export default ListOfBatches;
