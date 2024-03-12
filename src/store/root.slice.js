import getSlice from "./root.utility";
import { types } from "./root.actions";

const technologiesListSlice = getSlice(types.TECHNOLOGY_LIST);
const modulesListSlice = getSlice(types.MODULE_LIST);

export { technologiesListSlice, modulesListSlice };