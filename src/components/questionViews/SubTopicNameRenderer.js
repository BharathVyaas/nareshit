function SubTopicNameRenderer({
  subTopics,
  selectedSubTopics,
  setSelectedSubTopic,
}) {
  return (
    <div className="max-w-[33%] w-[33%] flex flex-col me-6">
      <label htmlFor="ModuleID">Module Name:</label>

      <select
        id="ModuleID"
        name="ModuleID"
        onChange={(e) => setSelectedSubTopic(e.target.value)}
      >
        {/**  Default */}
        <option value="-1">Select A Module</option>
        {/** Module names */}
        {subTopics &&
          subTopics.map(({ SubTopicID, SubTopicName }) => {
            return (
              <option key={SubTopicID} value={SubTopicID}>
                {SubTopicName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default SubTopicNameRenderer;
