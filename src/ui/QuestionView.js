import React, { useContext, useId, useRef, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";
import QuestionViewCtx from "../context/questionView";
import { useLocation } from "react-router";
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
