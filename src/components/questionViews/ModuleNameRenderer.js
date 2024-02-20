function ModuleNameRenderer({ modules }) {
  return (
    <div>
      <label htmlFor="ModuleID">Module Name:</label>

      <select id="ModuleID" name="ModuleID">
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
