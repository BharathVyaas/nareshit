import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";

const fetchstudentsHandler = async (batchId, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/GetStudentNameByBatchId",
      {
        BatchId: batchId,
      }
    );
    setter(res?.data?.dbresult || []);
  } catch (err) {
    console.error(err);
  }
};

const onUserCheck = (e, studentId, excludedArr, setExcludedArr) => {
  if (e.target.checked) {
    if (excludedArr.includes(studentId)) {
      const index = excludedArr.indexOf(studentId);
      if (index !== -1) {
        const updatedExcludedArr = [...excludedArr];
        updatedExcludedArr.splice(index, 1);
        setExcludedArr(updatedExcludedArr);
      }
    }
  } else {
    if (!e.target.checked) {
      setExcludedArr((prev) => {
        const updatedExcludedArr = [...prev];
        updatedExcludedArr.push(studentId);
        return updatedExcludedArr;
      });
    }
  }
};

function StudentSelectionPage() {
  const { batchId } = useParams();
  const [students, setStudents] = useState([]);
  const [excludedArr, setExcludedArr] = useState([]);

  useEffect(() => {
    if (batchId) fetchstudentsHandler(batchId, setStudents);
    else setStudents([]);
  }, [batchId]);

  return (
    <>
      {/*  */}
      <header className="bg-gray-100 max-w-full overflow-hidden">
        <EnrollStudentNavigation />
      </header>

      <main className="mt-8">
        <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-left w-1/6 whitespace-nowrap">
                  First Name
                </th>
                <th className="py-3 px-4 text-left w-2/6 whitespace-nowrap">
                  Last Name
                </th>
                <th className="py-3 px-4 text-left w-1/6 whitespace-nowrap">
                  Email Name
                </th>
                <th className="py-3 px-4 text-left w-1/6 whitespace-nowrap">
                  Phone number
                </th>
                <th className="py-3 px-4 text-left w-1/6 whitespace-nowrap">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.StudentID}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="default"
                          color="default"
                          defaultChecked
                          onClick={(e) =>
                            onUserCheck(
                              e,
                              student.StudentID,
                              excludedArr,
                              setExcludedArr
                            )
                          }
                        />
                      }
                      className="mr-2"
                      label={student.FirstName}
                    />
                  </td>
                  <td className="py-3 px-4">{student.LastName}</td>
                  <td className="py-3 px-4">{student.Email}</td>
                  <td className="py-3 px-4">{student.PhoneNumber}</td>
                  <td className="py-3 px-4">
                    {student.CreatedAt
                      ? new Date(student.CreatedAt).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <Button
            variant="contained"
            sx={{ width: "8rem" }}
            color="primary"
            onClick={() => {}}
          >
            Submit
          </Button>
        </div>
      </main>

      {/*  */}
      <footer className="grid place-content-center p-6 w-full max-w-full overflow-hidden absolute bottom-0">
        © 2023 Naresh i Technologies | Software Training - Online | All Rights
        Reserved.
      </footer>
    </>
  );
}

export default StudentSelectionPage;
