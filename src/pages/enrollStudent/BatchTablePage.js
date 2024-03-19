import BatchTable from "../../components/enrollStudent/BatchTable/BatchTable";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";

const fetchBatchTableHandler = async (test_Id, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/GetBatchesByTestId",
      {
        TestId: test_Id,
      }
    );
    setter(res.data.dbresult || []);
  } catch (err) {
    console.error(err);
  }
};

function BatchTablePage() {
  const { testId } = useParams();
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    fetchBatchTableHandler(testId, setBatchData);
  }, [testId]);

  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <section className="text-black mt-5">
        <div>
          <BatchTable batchData={batchData} />
        </div>
        <div className="mt-10 mx-auto w-4/6">
          <span className="ms-[9%]">
            <Button variant="outlined" color="inherit">
              Submit
            </Button>
          </span>
        </div>
      </section>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden absolute bottom-0">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default BatchTablePage;
