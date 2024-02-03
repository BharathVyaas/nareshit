import React from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  return createPortal(document.querySelector("#modal"), children);
}

export default Modal;
