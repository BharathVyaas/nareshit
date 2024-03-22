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
  enrollmentId,
  selectedTechnology,
  selectedModule,
  filteredExcludedStudents,
}) {
  return {
    data: filteredExcludedStudents,
    TechnologyId: selectedTechnology,
    ModuleId: selectedModule,
    EnrollmentId: enrollmentId,
  };
}
