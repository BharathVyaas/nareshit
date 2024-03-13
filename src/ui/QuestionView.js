import React from "react";

import QuestionViewEditModal from "./questionViews/QuestionViewEditModal";
import QuestionViewModalView from "./questionViews/QuestionViewModalView";

function QuestionView({ data, handler, setter }) {
  let currentCombination;

  if (data?.combination && data?.element?.id) {
    currentCombination = data?.combination[data?.element?.id];
  }

  if (data.popupType === "edit")
    return (
      <QuestionViewEditModal data={data} handler={handler} setter={setter} />
    );
  return (
    <QuestionViewModalView
      data={data}
      handler={handler}
      setter={setter}
      currentCombination={currentCombination}
    />
  );
}

export default QuestionView;
