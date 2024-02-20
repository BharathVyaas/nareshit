function TopicNameRenderer({ topics, selectedTopic, setSelectedTopic }) {
  return (
    <div>
      <label htmlFor="ModuleID">Module Name:</label>

      <select
        id="ModuleID"
        name="ModuleID"
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {/**  Default */}
        <option value="-1">Select A Module</option>
        {/** Module names */}
        {topics &&
          topics.map(({ TopicID, TopicName }) => {
            return (
              <option key={TopicID} value={TopicID}>
                {TopicName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default TopicNameRenderer;
