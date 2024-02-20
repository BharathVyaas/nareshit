function SubTopicNameRenderer({
  subTopics,
  selectedSubTopics,
  setSelectedSubTopic,
}) {
  return (
    <div>
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
