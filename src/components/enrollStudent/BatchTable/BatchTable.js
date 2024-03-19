import { Checkbox, FormControlLabel } from "@mui/material";

function BatchTable({ batchData }) {
  return (
    <div>
      <div className="max-h-[600px] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <Thead />
          <Tbody batchData={batchData} />
        </table>
      </div>
    </div>
  );
}

export default BatchTable;

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
        <th className="py-3 px-4 text-left w-1/6">BatchId</th>
        <th className="py-3 px-4 text-left w-2/6">Batch Name</th>
        <th className="py-3 px-4 text-left w-1/6">Faculty</th>
        <th className="py-3 px-4 text-left w-1/6">Timings</th>
        <th className="py-3 px-4 text-left w-1/6">Active Users</th>
      </tr>
    </thead>
  );
}

function Tbody({ batchData }) {
  return batchData.length > 0 ? (
    <tbody>{batchData && batchData.map((batch) => <Td batch={batch} />)}</tbody>
  ) : (
    <div className="h-[6rem] grid place-content-center w-full">
      <i>Loading...</i>
    </div>
  );
}

function Td({ batch }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4">
        <FormControlLabel
          control={
            <Checkbox
              size=""
              sx={{ padding: 0, margin: 0 }}
              color="default"
              defaultChecked
            />
          }
        />
        <button className="text-blue-500 hover:text-blue-600 underline">
          {batch.BatchId}
        </button>
      </td>
      <td className="py-3 px-4">{batch.BatchName}</td>
      <td className="py-3 px-4">{batch.CreatedBy}</td>
      <td className="py-3 px-4">
        {batch.CreatedAt ? new Date(batch.CreatedAt).toLocaleDateString() : ""}
      </td>
      <td className="py-3 px-4">2</td>
    </tr>
  );
}
