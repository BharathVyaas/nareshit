export function getFormatedExcludes(excludedStudents) {
  let obj = { ...excludedStudents };
  let data = [];

  const tests = Object.keys(obj);
  const values = Object.values(obj);

  values.forEach((batch, index) => {
    const keys = Object.keys(batch);
    const values = Object.values(batch);

    const testId = tests[index];
    const batchId = keys[0];
    const excludedStudents = values[0].join(",");

    data.push({
      TestId: testId,
      BatchId: batchId,
      StudentId: excludedStudents,
    });
  });

  return data;
}

export function getEnrollmentSubmitData({
  enrollId,
  selectedTechnology,
  selectedModule,
  filteredIncludedStudents,
}) {
  return {
    data: filteredIncludedStudents,
    TechnologyId: selectedTechnology,
    ModuleId: selectedModule,
    EnrollmentId: enrollId,
  };
}

export function getFilteredEnrollStudentSlice(retrivedData) {
  if (!retrivedData || !Array.isArray(retrivedData)) return undefined;

  const result = {
    testIdList: [],
    batchIdList: {},
    studentIdList: {},
  };

  retrivedData.forEach((entry) => {
    const { TestID, BatchID, StudentName } = entry;

    // Populate testIdList
    if (!result.testIdList.includes(TestID)) {
      result.testIdList.push(TestID);
    }

    // Populate batchIdList
    if (!result.batchIdList[TestID]) {
      result.batchIdList[TestID] = [];
    }
    if (!result.batchIdList[TestID].includes(BatchID)) {
      result.batchIdList[TestID].push(BatchID);
    }

    // Populate studentIdList
    if (!result.studentIdList[TestID]) {
      result.studentIdList[TestID] = {};
    }
    if (!result.studentIdList[TestID][BatchID]) {
      result.studentIdList[TestID][BatchID] = [];
    }
    // Split StudentName and add individual student IDs to the list
    const studentIds = StudentName.split(",");
    studentIds.forEach((studentId) => {
      if (!result.studentIdList[TestID][BatchID].includes(Number(studentId))) {
        result.studentIdList[TestID][BatchID].push(Number(studentId));
      }
    });
  });

  return result;
}
