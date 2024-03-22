import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import StudentRenderer from "./StudentRenderer";

const fetchStudent = async (id) => {
  const response = await axios.post(
    "https://www.nareshit.net/GetStudentNameByBatchId",
    {
      BatchId: id,
    }
  );

  return response.data.dbresult;
};

function BatchRenderer({ batch }) {
  const [displayStudents, setDisplayStudents] = useState(false);
  const [students, setStudents] = useState([]);

  const {
    data: studentList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student", batch.BatchId],
    queryFn: () => fetchStudent(batch.BatchId),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    setStudents(studentList || []);
  }, [studentList]);

  if (isLoading) return <i>Loading...</i>;
  if (isError) return <i>Something went wrong</i>;

  return (
    <>
      <div className="flex">
        <motion.p
          style={{ rotate: displayStudents ? "90deg" : "0deg" }}
          onClick={() => {
            setDisplayStudents((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          <ArrowForwardIosIcon fontSize="10" />
        </motion.p>
        <p className="px-3">{batch.BatchName}</p>
      </div>

      {displayStudents ? (
        students.length > 0 ? (
          <div className="mb-4 mt-4 ms-10">
            <StudentRenderer students={students} />
          </div>
        ) : (
          <div className="mb-4 mt-4 ms-10">
            <i>No data to show.</i>
          </div>
        )
      ) : null}
    </>
  );
}

export default BatchRenderer;
