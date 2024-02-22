function TopicNameRenderer({ topics, selectedTopic, setSelectedTopic }) {
  return (
    <div className="max-w-[33%] w-[33%] flex flex-col me-6">
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
