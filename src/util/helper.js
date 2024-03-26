export function getFormatedExcludes(excludedStudents, testIdList, batchIdList) {
  const excludedStudentsObj = {};
  console.log(excludedStudents, testIdList, batchIdList);
  excludedStudents.forEach((combo) => {
    const comboArr = combo.split(":");
    const testId = comboArr[0];
    const batchId = comboArr[1];
    const studentId = comboArr[2];

    if (!excludedStudentsObj[testId]) excludedStudentsObj[testId] = {};

    if (!excludedStudentsObj[testId][batchId])
      excludedStudentsObj[testId][batchId] = [];

    excludedStudentsObj[testId][batchId].push(studentId);
  });

  let obj = { ...excludedStudentsObj };
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
      TestId: Number(testId),
      BatchId: Number(batchId),
      StudentId: excludedStudents,
    });
  });
  console.log(data);
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
    const studentIds = StudentName?.split(",") || [];
    studentIds.forEach((studentId) => {
      if (!result.studentIdList[TestID][BatchID].includes(Number(studentId))) {
        result.studentIdList[TestID][BatchID].push(Number(studentId));
      }
    });
  });

  return result;
}

export function getEnrollmentSubmitDataFromExcludes({
  enrollId,
  selectedTechnology,
  selectedModule,
  testIdList,
  batchIdList,
  excludedStudents,
}) {
  let result = [];
  if (testIdList)
    testIdList.map((test) => {
      if (batchIdList[test] && batchIdList[test].length > 0) {
        const testId = test;
        batchIdList[test].forEach((batch) => {
          const batchId = batch;
          const hashedStudentId = testId + ":" + batchId + ":";
          let currentExcludes = [];

          excludedStudents.map((exclude) => {
            const studentId = exclude.split(":")[2];
            const student = hashedStudentId + studentId;
            if (excludedStudents.includes(student))
              if (!currentExcludes.includes(studentId))
                currentExcludes.push(studentId);
          });

          currentExcludes = currentExcludes.join(",") || null;
          result.push({
            TestId: testId,
            BatchId: batchId,
            StudentId: currentExcludes,
          });
        });
      }
    });

  const resultObj = {
    TechnologyId: selectedTechnology,
    ModuleId: selectedModule,
    EnrollmentId: enrollId,
    data: result,
  };

  return resultObj;
}
