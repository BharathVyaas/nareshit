import { Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BatchRenderer from "./BatchRenderer";

function BatchDataRenderer() {
  const {
    data: batchList,
    isLoading,
    isError,
    state,
  } = useSelector((store) => store.batchListReducer);

  if (isError) return <p>Something went wrong, please try refreshing.</p>;

  if (isLoading) return <p>Loading...</p>;

  return batchList.length > 0 ? (
    batchList.map((batch) => (
      <div key={batch.BatchId}>
        <BatchRenderer batch={batch} />
      </div>
    ))
  ) : (
    <i>No batchList to show.</i>
  );
}

export default BatchDataRenderer;
