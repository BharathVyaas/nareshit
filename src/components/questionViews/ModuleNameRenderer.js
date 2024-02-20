function ModuleNameRenderer({ modules, selectedModule, setSelectedModule }) {
  return (
    <div>
      <label htmlFor="ModuleID">Module Name:</label>

      <select
        id="ModuleID"
        name="ModuleID"
        onChange={(e) => setSelectedModule(e.target.value)}
      >
        {/**  Default */}
        <option value="-1">Select A Module</option>
        {/** Module names */}
        {modules &&
          modules.map(({ ModuleID, ModuleName }) => {
            return (
              <option key={ModuleID} value={ModuleID}>
                {ModuleName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default ModuleNameRenderer;
