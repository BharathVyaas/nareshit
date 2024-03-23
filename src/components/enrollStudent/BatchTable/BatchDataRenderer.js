import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BatchRenderer from "./BatchRenderer";

function BatchDataRenderer({ testId }) {
  const [batchData, setBatchData] = useState([]);
  const {
    data: batchList,
    isLoading,
    isError,
  } = useSelector((store) => store.batchListReducer);

  useEffect(() => {
    setBatchData(batchList || []);
  }, [batchList]);

  if (isError) return <p>Something went wrong, please try refreshing.</p>;

  if (isLoading) return <p>Loading...</p>;

  return batchData.length > 0 ? (
    batchList.map((batch) => (
      <div key={batch.BatchId}>
        <BatchRenderer batch={batch} testId={testId} />
      </div>
    ))
  ) : (
    <i>No batchList to show.</i>
  );
}

export default BatchDataRenderer;
