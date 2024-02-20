function SubTopicNameRenderer({ subTopics }) {
  return (
    <div>
      <label htmlFor="ModuleID">Module Name:</label>

      <select id="ModuleID" name="ModuleID">
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
