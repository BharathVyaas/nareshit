import Modal from "../../ui/Modal";
import StudentModal from "../../ui/EnrollStudent/StudentModal";
import React from "react";
import axios from "axios";

const fetchstudentsHandler = async (batchId, setter) => {
  try {
    const res = await axios.post(
      "https://www.nareshit.net/GetStudentNameByBatchId",
      {
        BatchId: batchId,
      }
    );
    setter({ batchId: batchId, modalData: res.data.dbresult || [] });
  } catch (err) {
    console.error(err);
  }
};

const studentSubmitHandler = () => {};

function StudentSelectionPage() {
  return (
    <StudentModalHandler
      data={{}}
      setter={{}}
      submitHandler={studentSubmitHandler}
    />
  );
}

export default StudentSelectionPage;

function StudentModalHandler({ data, setter, submitHandler }) {
  return (
    <Modal
      data={data}
      setter={setter}
      ModalParam={StudentModal}
      handler={submitHandler}
    />
  );
}
